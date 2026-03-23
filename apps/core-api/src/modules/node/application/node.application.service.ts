import { Injectable } from "@nestjs/common";
import { CreateNodeDto, type NodeStatusValue, type NodeTypeValue } from "../dto/create-node.dto";
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
