import { Injectable } from "@nestjs/common";
import { CreateNodeDto, type NodeStatusValue, type NodeTypeValue } from "../dto/create-node.dto";
import { CreateNodeRelationDto } from "../dto/create-node-relation.dto";
import { NodeGraphDto } from "../dto/node-graph-response.dto";
import { NodeRelationDto } from "../dto/node-relation-response.dto";
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
    const [nodes, relations] = await Promise.all([
      this.nodeRepository.listNodes(spaceId),
      this.nodeRepository.listNodeRelations(spaceId),
    ]);

    return {
      nodes: nodes.map((node, index) => mapNodeToGraph(node, index)),
      edges: relations.map(mapRelationToGraphEdge),
      meta: {
        relationSource: relations.length ? "node_relation" : "none",
        relationCount: relations.length,
        supportsNeighborFocus: relations.length > 0,
      },
    };
  }

  async createNodeRelation(
    spaceId: string,
    input: CreateNodeRelationDto,
  ): Promise<NodeRelationDto> {
    const relation = await this.nodeRepository.createNodeRelation(
      spaceId,
      input.sourceNodeId,
      input.targetNodeId,
    );

    return mapNodeRelation(relation);
  }

  async deleteNodeRelation(spaceId: string, relationId: string): Promise<void> {
    await this.nodeRepository.deleteNodeRelation(spaceId, relationId);
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
  orderIndex: number;
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
    orderIndex: node.orderIndex,
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
  orderIndex: number;
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
    orderIndex: node.orderIndex,
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

function mapNodeRelation(nodeRelation: {
  id: string;
  spaceId: string;
  sourceNodeId: string;
  targetNodeId: string;
  relationType: string;
  createdAt: Date;
}): NodeRelationDto {
  return {
    id: nodeRelation.id,
    spaceId: nodeRelation.spaceId,
    sourceNodeId: nodeRelation.sourceNodeId,
    targetNodeId: nodeRelation.targetNodeId,
    relationType: nodeRelation.relationType,
    createdAt: nodeRelation.createdAt.toISOString(),
  };
}

function mapRelationToGraphEdge(nodeRelation: {
  id: string;
  sourceNodeId: string;
  targetNodeId: string;
  relationType: string;
  createdAt: Date;
}) {
  return {
    id: nodeRelation.id,
    source: nodeRelation.sourceNodeId,
    target: nodeRelation.targetNodeId,
    relationType: nodeRelation.relationType,
    metadata: {
      createdAt: nodeRelation.createdAt.toISOString(),
    },
  };
}
