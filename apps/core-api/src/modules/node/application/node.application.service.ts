import { Injectable } from "@nestjs/common";
import { CreateNodeDto, type NodeStatusValue, type NodeTypeValue } from "../dto/create-node.dto";
import { NodeGraphDto } from "../dto/node-graph-response.dto";
import { NodeDetailDto, NodeSummaryDto } from "../dto/node-response.dto";
import { UpdateNodeDto } from "../dto/update-node.dto";
import { NodeRepository } from "../infrastructure/node.repository";
import { PrismaService } from "../../../infrastructure/database/prisma.service";
import { TimelineApplicationService } from "../../timeline/application/timeline.application.service";

@Injectable()
export class NodeApplicationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly nodeRepository: NodeRepository,
    private readonly timelineApplicationService: TimelineApplicationService,
  ) {}

  async createNode(spaceId: string, input: CreateNodeDto): Promise<NodeDetailDto> {
    return this.prisma.$transaction(async (tx) => {
      const created = await this.nodeRepository.createNode(spaceId, input, tx);

      await this.timelineApplicationService.recordNodeCreated(
        {
          spaceId: created.spaceId,
          nodeId: created.id,
          title: created.title,
          nodeType: created.nodeType.toLowerCase(),
          status: created.status.toLowerCase(),
          description: created.content,
          impactSummary:
            input.isMainline === false
              ? `This node opens a side path from the current mainline of the space.`
              : `This node extends the active mainline for the space.`,
          isMainline: input.isMainline ?? true,
        },
        tx,
      );

      return mapNode(created);
    });
  }

  async listNodes(spaceId: string): Promise<NodeSummaryDto[]> {
    const nodes = await this.nodeRepository.listNodes(spaceId);
    return nodes.map(mapNode);
  }

  async getNodeGraph(spaceId: string): Promise<NodeGraphDto> {
    const [nodes, timeline] = await Promise.all([
      this.nodeRepository.listNodes(spaceId),
      this.timelineApplicationService.listSpaceTimeline(spaceId),
    ]);
    const graphEdges = mapTimelineEdges(timeline);

    return {
      nodes: nodes.map((node, index) => mapNodeToGraph(node, index)),
      edges: graphEdges,
      meta: {
        relationSource: graphEdges.length ? "timeline" : "none",
        relationCount: graphEdges.length,
        supportsNeighborFocus: graphEdges.length > 0,
      },
    };
  }

  async getNodeDetail(nodeId: string): Promise<NodeDetailDto> {
    const node = await this.nodeRepository.getNodeById(nodeId);
    return mapNode(node);
  }

  async updateNode(nodeId: string, input: UpdateNodeDto): Promise<NodeDetailDto> {
    return this.prisma.$transaction(async (tx) => {
      const existing = await this.nodeRepository.getNodeById(nodeId, tx);
      const node = await this.nodeRepository.updateNode(nodeId, input, tx);
      const statusChanged = existing.status !== node.status;

      if (statusChanged) {
        await this.timelineApplicationService.recordNodeStatusChanged(
          {
            spaceId: node.spaceId,
            nodeId: node.id,
            title: node.title,
            nodeType: node.nodeType.toLowerCase(),
            status: node.status.toLowerCase(),
            previousStatus: existing.status.toLowerCase(),
            description: node.content,
            impactSummary:
              input.isMainline === false
                ? `This status change belongs to a branch path rather than the active mainline.`
                : undefined,
            isMainline: input.isMainline ?? true,
          },
          tx,
        );
      } else {
        await this.timelineApplicationService.recordNodeUpdated(
          {
            spaceId: node.spaceId,
            nodeId: node.id,
            title: node.title,
            nodeType: node.nodeType.toLowerCase(),
            status: node.status.toLowerCase(),
            description: node.content,
            impactSummary:
              input.isMainline === false
                ? `This update refines a branch path that is currently outside the active mainline.`
                : undefined,
            isMainline: input.isMainline ?? true,
          },
          tx,
        );
      }

      return mapNode(node);
    });
  }
}

function mapNode(node: {
  id: string;
  spaceId: string;
  title: string;
  content: string | null;
  nodeType: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}): NodeDetailDto {
  return {
    id: node.id,
    spaceId: node.spaceId,
    title: node.title,
    content: node.content,
    nodeType: node.nodeType.toLowerCase() as NodeTypeValue,
    status: node.status.toLowerCase() as NodeStatusValue,
    createdAt: node.createdAt.toISOString(),
    updatedAt: node.updatedAt.toISOString(),
  };
}

function mapNodeToGraph(
  node: {
    id: string;
    spaceId: string;
    title: string;
    content: string | null;
    nodeType: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
  },
  index: number,
) {
  const columnCount = 3;
  const columnIndex = index % columnCount;
  const rowIndex = Math.floor(index / columnCount);

  return {
    id: node.id,
    spaceId: node.spaceId,
    title: node.title,
    content: node.content,
    nodeType: node.nodeType.toLowerCase() as NodeTypeValue,
    status: node.status.toLowerCase() as NodeStatusValue,
    position: {
      x: columnIndex * 260,
      y: rowIndex * 170,
    },
    metadata: {
      sourceKind: "node" as const,
    },
    createdAt: node.createdAt.toISOString(),
    updatedAt: node.updatedAt.toISOString(),
  };
}

function mapTimelineEdges(
  timeline: Array<{
    id: string;
    targetId: string;
    parentNodeId: string | null;
    branchFromNodeId: string | null;
    mergeToNodeId: string | null;
  }>,
) {
  const eventMap = new Map(timeline.map((item) => [item.id, item]));
  const edges = new Map<
    string,
    {
      id: string;
      source: string;
      target: string;
      relationType: string;
      metadata: Record<string, unknown>;
    }
  >();

  for (const item of timeline) {
    collectTimelineEdge(edges, eventMap, item, item.parentNodeId, "timeline_parent");
    collectTimelineEdge(edges, eventMap, item, item.branchFromNodeId, "timeline_branch");
    collectTimelineEdge(edges, eventMap, item, item.mergeToNodeId, "timeline_merge");
  }

  return Array.from(edges.values());
}

function collectTimelineEdge(
  edges: Map<
    string,
    {
      id: string;
      source: string;
      target: string;
      relationType: string;
      metadata: Record<string, unknown>;
    }
  >,
  eventMap: Map<
    string,
    {
      id: string;
      targetId: string;
    }
  >,
  item: {
    id: string;
    targetId: string;
  },
  relatedEventId: string | null,
  relationType: "timeline_parent" | "timeline_branch" | "timeline_merge",
) {
  if (!relatedEventId) {
    return;
  }

  const relatedEvent = eventMap.get(relatedEventId);
  if (!relatedEvent) {
    return;
  }

  if (relatedEvent.targetId === item.targetId) {
    return;
  }

  const edgeId = `${relationType}:${relatedEvent.targetId}:${item.targetId}`;
  if (edges.has(edgeId)) {
    return;
  }

  edges.set(edgeId, {
    id: edgeId,
    source: relatedEvent.targetId,
    target: item.targetId,
    relationType,
    metadata: {
      sourceEventId: relatedEvent.id,
      targetEventId: item.id,
    },
  });
}
