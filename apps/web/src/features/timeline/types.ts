import type { NodeStatus, NodeType } from "@/features/node/types";

export type TimelineCard = {
  title: string;
  description: string;
};

export type TimelineEventType =
  | "node_created"
  | "node_updated"
  | "node_status_changed";

export type TimelineTargetType = "node";

export type TimelineEventPayload = {
  title?: string;
  nodeType?: NodeType;
  status?: NodeStatus;
  previousStatus?: NodeStatus;
} | null;

export type TimelineRecord = {
  id: string;
  spaceId: string;
  eventType: TimelineEventType;
  targetType: TimelineTargetType;
  targetId: string;
  targetTitle: string | null;
  summary: string;
  payload: TimelineEventPayload;
  createdAt: string;
};
