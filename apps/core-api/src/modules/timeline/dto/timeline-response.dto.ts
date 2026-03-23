export const timelineEventTypeValues = [
  "node_created",
  "node_updated",
  "node_status_changed",
] as const;

export const timelineTargetTypeValues = ["node"] as const;
export const timelineNodeTypeValues = [
  "mainline_progress",
  "branch_created",
  "decision",
  "external_event",
  "completed",
  "interrupted",
] as const;
export const timelineImpactTypeValues = [
  "progressing",
  "diverted",
  "interrupted",
  "inactive",
] as const;

export type TimelineEventTypeValue = (typeof timelineEventTypeValues)[number];
export type TimelineTargetTypeValue = (typeof timelineTargetTypeValues)[number];
export type TimelineNodeTypeValue = (typeof timelineNodeTypeValues)[number];
export type TimelineImpactTypeValue = (typeof timelineImpactTypeValues)[number];

export type TimelineEventPayloadDto = {
  title?: string;
  nodeType?: string;
  status?: string;
  previousStatus?: string;
} | null;

export class TimelineEventSummaryDto {
  id!: string;
  spaceId!: string;
  eventType!: TimelineEventTypeValue;
  targetType!: TimelineTargetTypeValue;
  targetId!: string;
  nodeType!: TimelineNodeTypeValue;
  title!: string;
  summary!: string;
  description!: string | null;
  impactSummary!: string | null;
  isMainline!: boolean;
  parentNodeId!: string | null;
  branchFromNodeId!: string | null;
  mergeToNodeId!: string | null;
  payload!: TimelineEventPayloadDto;
  createdAt!: string;
}

export class TimelineRelationNodeDto {
  id!: string;
  title!: string;
  nodeType!: TimelineNodeTypeValue;
  isMainline!: boolean;
  createdAt!: string;
}

export class TimelineEventDetailDto extends TimelineEventSummaryDto {
  previousNode!: TimelineRelationNodeDto | null;
  nextNodes!: TimelineRelationNodeDto[];
  currentStateRelation!: string;
  entersCurrentMainline!: boolean;
  isCurrentStateSource!: boolean;
  isCurrentMainlineAnchor!: boolean;
  isAffectingCurrentState!: boolean;
  impactType!: TimelineImpactTypeValue;
}
