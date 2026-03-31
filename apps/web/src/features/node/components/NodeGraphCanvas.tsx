import { useCallback, useEffect, useMemo, useState } from "react";
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  type Connection,
  Controls,
  Handle,
  MiniMap,
  Position,
  ReactFlow,
  type NodeProps,
  type EdgeChange,
  type NodeChange,
  type ReactFlowInstance,
  type Edge as FlowEdge,
  type Node as FlowNode,
} from "@xyflow/react";
import { useUiLocaleStore } from "@/shared/state/ui-locale.store";
import { getNodeMessages } from "../i18n";
import type { NodeGraphEdge, NodeGraphNode } from "../types";
import { getNodeStatusLabel, getNodeTypeLabel } from "../utils";

type NodeGraphCanvasProps = {
  nodes: NodeGraphNode[];
  edges: NodeGraphEdge[];
  selectedNodeId: string | null;
  neighborIds: string[];
  onSelect: (nodeId: string) => void;
  onEdit?: (nodeId: string) => void;
  onCreateRelation?: (input: { sourceNodeId: string; targetNodeId: string }) => void;
  onDeleteRelation?: (relationId: string) => void;
  isRelationMutating?: boolean;
};

type FlowNodeData = {
  orderIndex: number;
  title: string;
  content: string;
  statusLabel: string;
  typeLabel: string;
};

const graphTheme = {
  selectedBorder: "#5c7591",
  neighborBorder: "#c7d3df",
  defaultBorder: "#ddd6cb",
  selectedBackground: "#f3f6fa",
  neighborBackground: "#fafbfd",
  defaultBackground: "#fcfbf8",
  selectedShadow: "0 14px 30px rgba(92, 117, 145, 0.16)",
  defaultShadow: "0 10px 24px rgba(36, 52, 71, 0.08)",
  edgeSelected: "#6f87a2",
  edgeDefault: "#d7d0c6",
  minimapSelected: "#5c7591",
  minimapDefault: "#bcc8d4",
  backgroundDot: "#ddd6cb",
} as const;

function GraphSummaryNode({
  data,
}: NodeProps<FlowNode<FlowNodeData>>) {
  return (
    <div className="node-graph__node">
      <Handle
        type="target"
        position={Position.Left}
        className="node-graph__handle"
        isConnectable
      />
      <div className="node-graph__node-badges">
        <span className="node-graph__node-order">#{data.orderIndex}</span>
        <span className="node-graph__node-status">{data.statusLabel}</span>
        <span className="node-graph__node-type">{data.typeLabel}</span>
      </div>
      <strong>{data.title}</strong>
      <small>{data.content}</small>
      <Handle
        type="source"
        position={Position.Right}
        className="node-graph__handle"
        isConnectable
      />
    </div>
  );
}

const nodeTypes = {
  summary: GraphSummaryNode,
};

function NodeGraphCanvasInner({
  nodes,
  edges,
  selectedNodeId,
  neighborIds,
  onSelect,
  onEdit,
  onCreateRelation,
  onDeleteRelation,
  isRelationMutating = false,
}: NodeGraphCanvasProps) {
  const locale = useUiLocaleStore((state) => state.locale);
  const messages = getNodeMessages(locale);
  const flowNodes = useMemo<FlowNode<FlowNodeData>[]>(() => {
    const neighborSet = new Set(neighborIds);

    return nodes.map((node) => {
      const isSelected = node.id === selectedNodeId;
      const isNeighbor = neighborSet.has(node.id);
      const isDimmed = Boolean(selectedNodeId) && !isSelected && !isNeighbor;

      return {
        id: node.id,
        position: node.position,
        type: "summary",
        draggable: true,
        selectable: true,
        data: {
          orderIndex: node.orderIndex,
          title: node.title,
          content: node.content ?? messages.list.noContent,
          statusLabel: getNodeStatusLabel(locale, node.status),
          typeLabel: getNodeTypeLabel(locale, node.nodeType),
        },
        style: {
          width: 210,
          borderRadius: 18,
          border: isSelected
            ? `2px solid ${graphTheme.selectedBorder}`
            : isNeighbor
              ? `1px solid ${graphTheme.neighborBorder}`
              : `1px solid ${graphTheme.defaultBorder}`,
          background: isSelected
            ? graphTheme.selectedBackground
            : isNeighbor
              ? graphTheme.neighborBackground
              : graphTheme.defaultBackground,
          boxShadow: isSelected
            ? graphTheme.selectedShadow
            : graphTheme.defaultShadow,
          opacity: isDimmed ? 0.4 : 1,
          padding: 0,
        },
      };
    });
  }, [locale, messages.list.noContent, neighborIds, nodes, selectedNodeId]);
  const flowEdges = useMemo<FlowEdge[]>(() => {
    const neighborSet = new Set(neighborIds);

    return edges.map((edge) => {
      const isSelectedPath =
        edge.source === selectedNodeId ||
        edge.target === selectedNodeId ||
        (neighborSet.has(edge.source) && neighborSet.has(edge.target));

      return {
        ...edge,
        animated: isSelectedPath,
        style: {
          stroke: isSelectedPath ? graphTheme.edgeSelected : graphTheme.edgeDefault,
          strokeWidth: isSelectedPath ? 2 : 1.25,
          opacity: selectedNodeId && !isSelectedPath ? 0.25 : 0.9,
        },
      };
    });
  }, [edges, neighborIds, selectedNodeId]);

  const [displayNodes, setDisplayNodes] = useState<FlowNode<FlowNodeData>[]>(flowNodes);
  const [displayEdges, setDisplayEdges] = useState<FlowEdge[]>(flowEdges);

  useEffect(() => {
    setDisplayNodes(flowNodes);
  }, [flowNodes, setDisplayNodes]);

  useEffect(() => {
    setDisplayEdges(flowEdges);
  }, [flowEdges, setDisplayEdges]);

  const handleNodesChange = useCallback((changes: NodeChange<FlowNode<FlowNodeData>>[]) => {
    setDisplayNodes((current) => applyNodeChanges<FlowNode<FlowNodeData>>(changes, current));
  }, []);

  const handleEdgesChange = useCallback((changes: EdgeChange<FlowEdge>[]) => {
    const removedEdgeIds = changes
      .filter((change) => change.type === "remove")
      .map((change) => change.id);

    if (removedEdgeIds.length && onDeleteRelation) {
      removedEdgeIds.forEach((edgeId) => onDeleteRelation(edgeId));
    }

    setDisplayEdges((current) => applyEdgeChanges<FlowEdge>(changes, current));
  }, [onDeleteRelation]);

  const handleConnect = useCallback(
    (connection: Connection) => {
      if (!connection.source || !connection.target || !onCreateRelation) {
        return;
      }

      if (connection.source === connection.target) {
        return;
      }

      onCreateRelation({
        sourceNodeId: connection.source,
        targetNodeId: connection.target,
      });

      setDisplayEdges((current) =>
        addEdge(
          {
            id: `${connection.source}:${connection.target}`,
            source: connection.source,
            target: connection.target,
            type: "default",
          },
          current,
        ),
      );
    },
    [onCreateRelation],
  );

  const handleInit = useCallback(
    (instance: ReactFlowInstance<FlowNode<FlowNodeData>, FlowEdge>) => {
    requestAnimationFrame(() => {
      instance.fitView({
        padding: 0.2,
        minZoom: 0.65,
      });
    });
    },
    [],
  );

  return (
    <ReactFlow
      nodes={displayNodes}
      edges={displayEdges}
      nodeTypes={nodeTypes}
      onNodesChange={handleNodesChange}
      onEdgesChange={handleEdgesChange}
      onConnect={handleConnect}
      onNodeClick={(_, node) => onSelect(node.id)}
      onNodeDoubleClick={(_, node) => onEdit?.(node.id)}
      onInit={handleInit}
      fitView
      fitViewOptions={{ padding: 0.2, minZoom: 0.65 }}
      minZoom={0.4}
      maxZoom={1.8}
      deleteKeyCode={["Backspace", "Delete"]}
      nodesConnectable={!isRelationMutating}
      elementsSelectable={!isRelationMutating}
      attributionPosition="bottom-left"
      className="node-graph__flow"
    >
      <Background gap={18} color={graphTheme.backgroundDot} />
      <MiniMap
        pannable
        zoomable
        nodeColor={(node) =>
          node.id === selectedNodeId
            ? graphTheme.minimapSelected
            : graphTheme.minimapDefault
        }
      />
      <Controls showInteractive={false} />
    </ReactFlow>
  );
}

export function NodeGraphCanvas(props: NodeGraphCanvasProps) {
  return <NodeGraphCanvasInner {...props} />;
}
