import { Injectable, NotFoundException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import type {
  Space,
  TimelineEvent,
  TimelineEventType,
  TimelineNodeType,
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
  nodeType:
    | "mainline_progress"
    | "branch_created"
    | "decision"
    | "external_event"
    | "completed"
    | "interrupted";
  title: string;
  summary: string;
  description: string | null;
  impactSummary: string | null;
  isMainline: boolean;
  parentNodeId: string | null;
  branchFromNodeId: string | null;
  mergeToNodeId: string | null;
  payload: Prisma.InputJsonValue | null;
};

export type TimelineEventDetailRecord = TimelineEvent & {
  previousNode: TimelineEvent | null;
  nextNodes: TimelineEvent[];
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

  async getTimelineEventDetail(
    eventId: string,
    executor: PrismaExecutor = this.prisma,
  ): Promise<TimelineEventDetailRecord> {
    const owner = await this.ensureDefaultOwner(executor);
    const event = await executor.timelineEvent.findFirst({
      where: {
        id: eventId,
        space: {
          ownerId: owner.id,
        },
      },
    });

    if (!event) {
      throw new NotFoundException(`Timeline event '${eventId}' was not found.`);
    }

    const [previousNode, nextNodes] = await Promise.all([
      event.parentNodeId
        ? executor.timelineEvent.findFirst({
            where: {
              id: event.parentNodeId,
              spaceId: event.spaceId,
            },
          })
        : Promise.resolve(null),
      executor.timelineEvent.findMany({
        where: {
          spaceId: event.spaceId,
          parentNodeId: event.id,
        },
        orderBy: {
          createdAt: "asc",
        },
      }),
    ]);

    return {
      ...event,
      previousNode,
      nextNodes,
    };
  }

  async getLatestSpaceEvent(
    spaceId: string,
    executor: PrismaExecutor = this.prisma,
  ): Promise<TimelineEvent | null> {
    return executor.timelineEvent.findFirst({
      where: {
        spaceId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async getLatestMainlineSpaceEvent(
    spaceId: string,
    executor: PrismaExecutor = this.prisma,
  ): Promise<TimelineEvent | null> {
    return executor.timelineEvent.findFirst({
      where: {
        spaceId,
        isMainline: true,
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
        nodeType: toPrismaNodeType(input.nodeType),
        title: input.title,
        summary: input.summary,
        description: input.description,
        impactSummary: input.impactSummary,
        isMainline: input.isMainline,
        parentNodeId: input.parentNodeId,
        branchFromNodeId: input.branchFromNodeId,
        mergeToNodeId: input.mergeToNodeId,
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

function toPrismaNodeType(
  value: TimelineEventRecordInput["nodeType"],
): TimelineNodeType {
  switch (value) {
    case "branch_created":
      return "BRANCH_CREATED";
    case "decision":
      return "DECISION";
    case "external_event":
      return "EXTERNAL_EVENT";
    case "completed":
      return "COMPLETED";
    case "interrupted":
      return "INTERRUPTED";
    default:
      return "MAINLINE_PROGRESS";
  }
}
