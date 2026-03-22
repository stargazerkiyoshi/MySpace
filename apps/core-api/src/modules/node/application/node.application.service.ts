import { Injectable } from "@nestjs/common";
import { CreateNodeDto, type NodeStatusValue, type NodeTypeValue } from "../dto/create-node.dto";
import { NodeDetailDto, NodeSummaryDto } from "../dto/node-response.dto";
import { UpdateNodeDto } from "../dto/update-node.dto";
import { NodeRepository } from "../infrastructure/node.repository";

@Injectable()
export class NodeApplicationService {
  constructor(private readonly nodeRepository: NodeRepository) {}

  async createNode(spaceId: string, input: CreateNodeDto): Promise<NodeDetailDto> {
    const created = await this.nodeRepository.createNode(spaceId, input);
    return mapNode(created);
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
    const node = await this.nodeRepository.updateNode(nodeId, input);
    return mapNode(node);
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
