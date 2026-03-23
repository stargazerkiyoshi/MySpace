export const timelineEventTypeValues = [
  "node_created",
  "node_updated",
  "node_status_changed",
] as const;

export const timelineTargetTypeValues = ["node"] as const;

export type TimelineEventTypeValue = (typeof timelineEventTypeValues)[number];
export type TimelineTargetTypeValue = (typeof timelineTargetTypeValues)[number];

export type TimelineEventPayloadDto = {
  title?: string;
  nodeType?: string;
  status?: string;
  previousStatus?: string;
} | null;

export class TimelineEventDto {
  id!: string;
  spaceId!: string;
  eventType!: TimelineEventTypeValue;
  targetType!: TimelineTargetTypeValue;
  targetId!: string;
  targetTitle!: string | null;
  summary!: string;
  payload!: TimelineEventPayloadDto;
  createdAt!: string;
}
