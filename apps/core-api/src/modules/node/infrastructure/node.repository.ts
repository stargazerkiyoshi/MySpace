import { Injectable, NotFoundException } from "@nestjs/common";
import type { Node, NodeStatus, NodeType, Space, User } from "@prisma/client";
import { PrismaService } from "../../../infrastructure/database/prisma.service";
import { CreateNodeDto } from "../dto/create-node.dto";
import { UpdateNodeDto } from "../dto/update-node.dto";

const DEFAULT_OWNER_EMAIL = "owner@myspace.local";
const DEFAULT_OWNER_DISPLAY_NAME = "Space Owner";

@Injectable()
export class NodeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createNode(spaceId: string, input: CreateNodeDto): Promise<Node> {
    const owner = await this.ensureDefaultOwner();
    const space = await this.getOwnedSpace(spaceId, owner.id);

    return this.prisma.node.create({
      data: {
        spaceId: space.id,
        title: input.title.trim(),
        content: input.content?.trim() || null,
        nodeType: toPrismaNodeType(input.nodeType),
        status: toPrismaNodeStatus(input.status),
      },
    });
  }

  async listNodes(spaceId: string): Promise<Node[]> {
    const owner = await this.ensureDefaultOwner();
    const space = await this.getOwnedSpace(spaceId, owner.id);

    return this.prisma.node.findMany({
      where: {
        spaceId: space.id,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
  }

  async getNodeById(nodeId: string): Promise<Node> {
    const owner = await this.ensureDefaultOwner();
    const node = await this.prisma.node.findFirst({
      where: {
        id: nodeId,
        space: {
          ownerId: owner.id,
        },
      },
    });

    if (!node) {
      throw new NotFoundException(`Node '${nodeId}' was not found.`);
    }

    return node;
  }

  async updateNode(nodeId: string, input: UpdateNodeDto): Promise<Node> {
    await this.getNodeById(nodeId);

    return this.prisma.node.update({
      where: {
        id: nodeId,
      },
      data: {
        ...(input.title !== undefined ? { title: input.title.trim() } : {}),
        ...(input.content !== undefined
          ? { content: input.content.trim() || null }
          : {}),
        ...(input.nodeType !== undefined
          ? { nodeType: toPrismaNodeType(input.nodeType) }
          : {}),
        ...(input.status !== undefined
          ? { status: toPrismaNodeStatus(input.status) }
          : {}),
      },
    });
  }

  private async getOwnedSpace(spaceId: string, ownerId: string): Promise<Space> {
    const space = await this.prisma.space.findFirst({
      where: {
        id: spaceId,
        ownerId,
      },
    });

    if (!space) {
      throw new NotFoundException(`Space '${spaceId}' was not found.`);
    }

    return space;
  }

  private async ensureDefaultOwner(): Promise<User> {
    return this.prisma.user.upsert({
      where: {
        email: DEFAULT_OWNER_EMAIL,
      },
      update: {
        displayName: DEFAULT_OWNER_DISPLAY_NAME,
      },
      create: {
        email: DEFAULT_OWNER_EMAIL,
        displayName: DEFAULT_OWNER_DISPLAY_NAME,
      },
    });
  }
}

function toPrismaNodeType(value: CreateNodeDto["nodeType"]): NodeType {
  switch (value) {
    case "task":
      return "TASK";
    case "decision":
      return "DECISION";
    default:
      return "NOTE";
  }
}

function toPrismaNodeStatus(value: CreateNodeDto["status"]): NodeStatus {
  switch (value) {
    case "doing":
      return "DOING";
    case "done":
      return "DONE";
    default:
      return "TODO";
  }
}
