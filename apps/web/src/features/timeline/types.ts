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

export type TimelineNodeType =
  | "mainline_progress"
  | "branch_created"
  | "decision"
  | "external_event"
  | "completed"
  | "interrupted";

export type TimelineImpactType =
  | "progressing"
  | "diverted"
  | "interrupted"
  | "inactive";

export type TimelineEventPayload = {
  title?: string;
  nodeType?: NodeType;
  status?: NodeStatus;
  previousStatus?: NodeStatus;
} | null;

export type TimelineRelationNode = {
  id: string;
  title: string;
  nodeType: TimelineNodeType;
  isMainline: boolean;
  createdAt: string;
};

export type TimelineRecord = {
  id: string;
  spaceId: string;
  eventType: TimelineEventType;
  targetType: TimelineTargetType;
  targetId: string;
  nodeType: TimelineNodeType;
  title: string;
  summary: string;
  description: string | null;
  impactSummary: string | null;
  isMainline: boolean;
  parentNodeId: string | null;
  branchFromNodeId: string | null;
  mergeToNodeId: string | null;
  payload: TimelineEventPayload;
  createdAt: string;
};

export type TimelineDetailRecord = TimelineRecord & {
  previousNode: TimelineRelationNode | null;
  nextNodes: TimelineRelationNode[];
  currentStateRelation: string;
  entersCurrentMainline: boolean;
  isCurrentStateSource: boolean;
  isCurrentMainlineAnchor: boolean;
  isAffectingCurrentState: boolean;
  impactType: TimelineImpactType;
};
