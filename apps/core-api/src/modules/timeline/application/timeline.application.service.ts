import { Injectable } from "@nestjs/common";
import type { Prisma } from "@prisma/client";
import {
  TimelineEventDto,
  type TimelineEventPayloadDto,
  type TimelineEventTypeValue,
  type TimelineTargetTypeValue,
} from "../dto/timeline-response.dto";
import {
  TimelineRepository,
  type PrismaExecutor,
  type TimelineEventRecordInput,
} from "../infrastructure/timeline.repository";

type NodeTimelineEventInput = {
  spaceId: string;
  nodeId: string;
  title: string;
  nodeType: string;
  status: string;
  previousStatus?: string;
};

@Injectable()
export class TimelineApplicationService {
  constructor(private readonly timelineRepository: TimelineRepository) {}

  async listSpaceTimeline(spaceId: string): Promise<TimelineEventDto[]> {
    const items = await this.timelineRepository.listSpaceTimeline(spaceId);
    return items.map((item) => mapTimelineEvent(item));
  }

  async recordNodeCreated(
    input: NodeTimelineEventInput,
    executor?: PrismaExecutor,
  ) {
    return this.timelineRepository.createEvent(
      {
        spaceId: input.spaceId,
        eventType: "node_created",
        targetType: "node",
        targetId: input.nodeId,
        summary: `Node "${input.title}" created`,
        payload: {
          title: input.title,
          nodeType: input.nodeType,
          status: input.status,
        } satisfies Prisma.InputJsonObject,
      },
      executor,
    );
  }

  async recordNodeUpdated(
    input: NodeTimelineEventInput,
    executor?: PrismaExecutor,
  ) {
    return this.timelineRepository.createEvent(
      {
        spaceId: input.spaceId,
        eventType: "node_updated",
        targetType: "node",
        targetId: input.nodeId,
        summary: `Node "${input.title}" updated`,
        payload: {
          title: input.title,
          nodeType: input.nodeType,
          status: input.status,
        } satisfies Prisma.InputJsonObject,
      },
      executor,
    );
  }

  async recordNodeStatusChanged(
    input: NodeTimelineEventInput,
    executor?: PrismaExecutor,
  ) {
    return this.timelineRepository.createEvent(
      {
        spaceId: input.spaceId,
        eventType: "node_status_changed",
        targetType: "node",
        targetId: input.nodeId,
        summary: `Node "${input.title}" status changed`,
        payload: {
          title: input.title,
          nodeType: input.nodeType,
          status: input.status,
          previousStatus: input.previousStatus,
        } satisfies Prisma.InputJsonObject,
      },
      executor,
    );
  }
}

function mapTimelineEvent(item: {
  id: string;
  spaceId: string;
  eventType: string;
  targetType: string;
  targetId: string;
  summary: string;
  payload: unknown;
  createdAt: Date;
}): TimelineEventDto {
  const payload = toPayload(item.payload);

  return {
    id: item.id,
    spaceId: item.spaceId,
    eventType: item.eventType.toLowerCase() as TimelineEventTypeValue,
    targetType: item.targetType.toLowerCase() as TimelineTargetTypeValue,
    targetId: item.targetId,
    targetTitle: payload?.title ?? null,
    summary: item.summary,
    payload,
    createdAt: item.createdAt.toISOString(),
  };
}

function toPayload(value: unknown): TimelineEventPayloadDto {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }

  const candidate = value as Record<string, unknown>;

  return {
    title: typeof candidate.title === "string" ? candidate.title : undefined,
    nodeType:
      typeof candidate.nodeType === "string" ? candidate.nodeType : undefined,
    status: typeof candidate.status === "string" ? candidate.status : undefined,
    previousStatus:
      typeof candidate.previousStatus === "string"
        ? candidate.previousStatus
        : undefined,
  };
}
