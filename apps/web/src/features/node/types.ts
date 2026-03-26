export type NodeType = "note" | "task" | "decision";
export type NodeStatus = "todo" | "doing" | "done";

export type NodeCard = {
  title: string;
  description: string;
};

export type NodeRecord = {
  id: string;
  spaceId: string;
  title: string;
  content: string | null;
  nodeType: NodeType;
  status: NodeStatus;
  orderIndex: number;
  createdAt: string;
  updatedAt: string;
};

export type NodeGraphRelationSource = "none" | "node_relation";

export type NodeGraphPosition = {
  x: number;
  y: number;
};

export type NodeGraphNode = {
  id: string;
  spaceId: string;
  title: string;
  content: string | null;
  nodeType: NodeType;
  status: NodeStatus;
  orderIndex: number;
  position: NodeGraphPosition;
  metadata: {
    sourceKind: "node";
  };
  createdAt: string;
  updatedAt: string;
};

export type NodeGraphEdge = {
  id: string;
  source: string;
  target: string;
  relationType: string;
  metadata: Record<string, unknown> | null;
};

export type NodeRelationRecord = {
  id: string;
  spaceId: string;
  sourceNodeId: string;
  targetNodeId: string;
  relationType: string;
  createdAt: string;
};

export type NodeGraphRecord = {
  nodes: NodeGraphNode[];
  edges: NodeGraphEdge[];
  meta: {
    relationSource: NodeGraphRelationSource;
    relationCount: number;
    supportsNeighborFocus: boolean;
  };
};

export type CreateNodeInput = {
  title: string;
  content?: string;
  nodeType: NodeType;
  status: NodeStatus;
  isMainline?: boolean;
};

export type UpdateNodeInput = Partial<CreateNodeInput>;

export type CreateNodeRelationInput = {
  sourceNodeId: string;
  targetNodeId: string;
};
