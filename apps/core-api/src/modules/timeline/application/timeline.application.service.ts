import { Injectable } from "@nestjs/common";
import type { Prisma } from "@prisma/client";
import {
  TimelineEventDetailDto,
  TimelineEventSummaryDto,
  TimelineRelationNodeDto,
  type TimelineEventPayloadDto,
  type TimelineEventTypeValue,
  type TimelineNodeTypeValue,
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
  summary?: string;
  description?: string | null;
  impactSummary?: string | null;
  isMainline?: boolean;
  branchFromNodeId?: string | null;
  mergeToNodeId?: string | null;
  previousStatus?: string;
};

@Injectable()
export class TimelineApplicationService {
  constructor(private readonly timelineRepository: TimelineRepository) {}

  async listSpaceTimeline(spaceId: string): Promise<TimelineEventSummaryDto[]> {
    const items = await this.timelineRepository.listSpaceTimeline(spaceId);
    return items.map((item) => mapTimelineEvent(item));
  }

  async getTimelineEventDetail(
    eventId: string,
  ): Promise<TimelineEventDetailDto> {
    const item = await this.timelineRepository.getTimelineEventDetail(eventId);
    return mapTimelineEventDetail(item);
  }

  async recordNodeCreated(
    input: NodeTimelineEventInput,
    executor?: PrismaExecutor,
  ) {
    const latest = await this.timelineRepository.getLatestSpaceEvent(
      input.spaceId,
      executor,
    );
    const latestMainline = input.isMainline === false
      ? await this.timelineRepository.getLatestMainlineSpaceEvent(
          input.spaceId,
          executor,
        )
      : null;
    const nodeType = resolveTimelineNodeType("node_created", input);

    return this.timelineRepository.createEvent(
      {
        spaceId: input.spaceId,
        eventType: "node_created",
        targetType: "node",
        targetId: input.nodeId,
        nodeType,
        title: input.title,
        summary:
          input.summary ??
          `Created node "${input.title}" as part of the active space progression.`,
        description:
          input.description ??
          `The node "${input.title}" was added to the space and became a new point in the ongoing history.`,
        impactSummary:
          input.impactSummary ??
          `This node extends the current working path for the space.`,
        isMainline: input.isMainline ?? true,
        parentNodeId: latest?.id ?? null,
        branchFromNodeId:
          input.branchFromNodeId ??
          (input.isMainline === false ? latestMainline?.id ?? latest?.id ?? null : null),
        mergeToNodeId: input.mergeToNodeId ?? null,
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
    const latest = await this.timelineRepository.getLatestSpaceEvent(
      input.spaceId,
      executor,
    );
    const latestMainline = input.isMainline === false
      ? await this.timelineRepository.getLatestMainlineSpaceEvent(
          input.spaceId,
          executor,
        )
      : null;
    const nodeType = resolveTimelineNodeType("node_updated", input);

    return this.timelineRepository.createEvent(
      {
        spaceId: input.spaceId,
        eventType: "node_updated",
        targetType: "node",
        targetId: input.nodeId,
        nodeType,
        title: input.title,
        summary:
          input.summary ??
          `Updated node "${input.title}" and refined the current work path.`,
        description:
          input.description ??
          `The node "${input.title}" was revised to clarify its content or direction.`,
        impactSummary:
          input.impactSummary ??
          `This update influences how the current space continues to move forward.`,
        isMainline: input.isMainline ?? true,
        parentNodeId: latest?.id ?? null,
        branchFromNodeId:
          input.branchFromNodeId ??
          (input.isMainline === false ? latestMainline?.id ?? latest?.id ?? null : null),
        mergeToNodeId: input.mergeToNodeId ?? null,
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
    const latest = await this.timelineRepository.getLatestSpaceEvent(
      input.spaceId,
      executor,
    );
    const latestMainline = input.isMainline === false
      ? await this.timelineRepository.getLatestMainlineSpaceEvent(
          input.spaceId,
          executor,
        )
      : null;
    const nodeType = resolveTimelineNodeType("node_status_changed", input);

    return this.timelineRepository.createEvent(
      {
        spaceId: input.spaceId,
        eventType: "node_status_changed",
        targetType: "node",
        targetId: input.nodeId,
        nodeType,
        title: input.title,
        summary:
          input.summary ??
          `Changed the status of node "${input.title}" from ${input.previousStatus ?? "unknown"} to ${input.status}.`,
        description:
          input.description ??
          `The lifecycle state of "${input.title}" changed, which affects how it relates to the current work path.`,
        impactSummary:
          input.impactSummary ??
          getStatusImpactSummary(input.status, input.previousStatus),
        isMainline: input.isMainline ?? true,
        parentNodeId: latest?.id ?? null,
        branchFromNodeId:
          input.branchFromNodeId ??
          (input.isMainline === false ? latestMainline?.id ?? latest?.id ?? null : null),
        mergeToNodeId: input.mergeToNodeId ?? null,
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
  nodeType: string;
  title: string;
  summary: string;
  description: string | null;
  impactSummary: string | null;
  isMainline: boolean;
  parentNodeId: string | null;
  branchFromNodeId: string | null;
  mergeToNodeId: string | null;
  payload: unknown;
  createdAt: Date;
}): TimelineEventSummaryDto {
  const payload = toPayload(item.payload);

  return {
    id: item.id,
    spaceId: item.spaceId,
    eventType: item.eventType.toLowerCase() as TimelineEventTypeValue,
    targetType: item.targetType.toLowerCase() as TimelineTargetTypeValue,
    targetId: item.targetId,
    nodeType: item.nodeType.toLowerCase() as TimelineNodeTypeValue,
    title: item.title,
    summary: item.summary,
    description: item.description,
    impactSummary: item.impactSummary,
    isMainline: item.isMainline,
    parentNodeId: item.parentNodeId,
    branchFromNodeId: item.branchFromNodeId,
    mergeToNodeId: item.mergeToNodeId,
    payload,
    createdAt: item.createdAt.toISOString(),
  };
}

function mapTimelineEventDetail(item: {
  id: string;
  spaceId: string;
  eventType: string;
  targetType: string;
  targetId: string;
  nodeType: string;
  title: string;
  summary: string;
  description: string | null;
  impactSummary: string | null;
  isMainline: boolean;
  parentNodeId: string | null;
  branchFromNodeId: string | null;
  mergeToNodeId: string | null;
  payload: unknown;
  createdAt: Date;
  previousNode: {
    id: string;
    title: string;
    nodeType: string;
    isMainline: boolean;
    createdAt: Date;
  } | null;
  nextNodes: Array<{
    id: string;
    title: string;
    nodeType: string;
    isMainline: boolean;
    createdAt: Date;
  }>;
}): TimelineEventDetailDto {
  const summary = mapTimelineEvent(item);

  return {
    ...summary,
    previousNode: item.previousNode ? mapRelationNode(item.previousNode) : null,
    nextNodes: item.nextNodes.map(mapRelationNode),
    currentStateRelation: getCurrentStateRelation(summary),
  };
}

function mapRelationNode(item: {
  id: string;
  title: string;
  nodeType: string;
  isMainline: boolean;
  createdAt: Date;
}): TimelineRelationNodeDto {
  return {
    id: item.id,
    title: item.title,
    nodeType: item.nodeType.toLowerCase() as TimelineNodeTypeValue,
    isMainline: item.isMainline,
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

function resolveTimelineNodeType(
  eventType: "node_created" | "node_updated" | "node_status_changed",
  input: NodeTimelineEventInput,
): TimelineEventRecordInput["nodeType"] {
  if (input.nodeType === "decision") {
    return "decision";
  }

  if (eventType === "node_status_changed" && input.status === "done") {
    return "completed";
  }

  if (
    eventType === "node_status_changed" &&
    input.previousStatus === "doing" &&
    input.status === "todo"
  ) {
    return "interrupted";
  }

  if (input.isMainline === false) {
    return "branch_created";
  }

  return "mainline_progress";
}

function getStatusImpactSummary(status: string, previousStatus?: string) {
  if (status === "done") {
    return "This node now marks a completed milestone on the current path.";
  }

  if (previousStatus === "doing" && status === "todo") {
    return "This node has moved away from the active path and is currently interrupted.";
  }

  return "This node continues to influence the active progress of the space.";
}

function getCurrentStateRelation(
  item: Pick<
    TimelineEventSummaryDto,
    "isMainline" | "mergeToNodeId" | "nodeType"
  >,
) {
  if (item.isMainline) {
    return "This node is part of the current mainline.";
  }

  if (item.mergeToNodeId) {
    return "This node belongs to a branch that later returns to the mainline.";
  }

  if (item.nodeType === "interrupted") {
    return "This node currently sits on a path that has paused or diverged.";
  }

  return "This node belongs to a side branch and does not directly represent the active mainline.";
}
