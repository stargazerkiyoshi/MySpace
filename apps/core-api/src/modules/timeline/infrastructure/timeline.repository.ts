import { Injectable, NotFoundException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import type {
  Space,
  TimelineEvent,
  TimelineEventType,
  TimelineTargetType,
  User,
} from "@prisma/client";
import { PrismaService } from "../../../infrastructure/database/prisma.service";

const DEFAULT_OWNER_EMAIL = "owner@myspace.local";
const DEFAULT_OWNER_DISPLAY_NAME = "Space Owner";

export type PrismaExecutor = PrismaService | Prisma.TransactionClient;

export type TimelineEventRecordInput = {
  spaceId: string;
  eventType: "node_created" | "node_updated" | "node_status_changed";
  targetType: "node";
  targetId: string;
  summary: string;
  payload: Prisma.InputJsonValue | null;
};

@Injectable()
export class TimelineRepository {
  constructor(private readonly prisma: PrismaService) {}

  async listSpaceTimeline(
    spaceId: string,
    executor: PrismaExecutor = this.prisma,
  ): Promise<TimelineEvent[]> {
    const owner = await this.ensureDefaultOwner(executor);
    const space = await this.getOwnedSpace(spaceId, owner.id, executor);

    return executor.timelineEvent.findMany({
      where: {
        spaceId: space.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async createEvent(
    input: TimelineEventRecordInput,
    executor: PrismaExecutor = this.prisma,
  ): Promise<TimelineEvent> {
    return executor.timelineEvent.create({
      data: {
        spaceId: input.spaceId,
        eventType: toPrismaEventType(input.eventType),
        targetType: toPrismaTargetType(input.targetType),
        targetId: input.targetId,
        summary: input.summary,
        payload: input.payload ?? Prisma.JsonNull,
      },
    });
  }

  private async getOwnedSpace(
    spaceId: string,
    ownerId: string,
    executor: PrismaExecutor,
  ): Promise<Space> {
    const space = await executor.space.findFirst({
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

  private async ensureDefaultOwner(
    executor: PrismaExecutor,
  ): Promise<User> {
    return executor.user.upsert({
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

function toPrismaEventType(
  value: TimelineEventRecordInput["eventType"],
): TimelineEventType {
  switch (value) {
    case "node_updated":
      return "NODE_UPDATED";
    case "node_status_changed":
      return "NODE_STATUS_CHANGED";
    default:
      return "NODE_CREATED";
  }
}

function toPrismaTargetType(
  value: TimelineEventRecordInput["targetType"],
): TimelineTargetType {
  switch (value) {
    default:
      return "NODE";
  }
}
