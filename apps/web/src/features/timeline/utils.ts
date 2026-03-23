import type { UiLocale } from "@/shared/i18n/types";
import { getNodeStatusLabel } from "@/features/node/utils";
import type {
  TimelineCard,
  TimelineImpactType,
  TimelineNodeType,
  TimelineRecord,
  TimelineRelationNode,
} from "./types";
import { getTimelineMessages } from "./i18n";

export function getTimelinePlaceholderCards(locale: UiLocale): TimelineCard[] {
  const page = getTimelineMessages(locale).page;

  return [
    {
      title: page.title,
      description: page.description,
    },
  ];
}

export function formatTimelineDate(value: string, locale: UiLocale) {
  return new Intl.DateTimeFormat(locale === "zh-CN" ? "zh-CN" : "en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export function getTimelineEventTypeLabel(
  locale: UiLocale,
  eventType: TimelineRecord["eventType"],
) {
  const messages = getTimelineMessages(locale).eventType;

  switch (eventType) {
    case "node_updated":
      return messages.nodeUpdated;
    case "node_status_changed":
      return messages.nodeStatusChanged;
    default:
      return messages.nodeCreated;
  }
}

export function getTimelineNodeTypeLabel(
  locale: UiLocale,
  nodeType: TimelineNodeType,
) {
  const messages = getTimelineMessages(locale).nodeType;

  switch (nodeType) {
    case "branch_created":
      return messages.branchCreated;
    case "decision":
      return messages.decision;
    case "external_event":
      return messages.externalEvent;
    case "completed":
      return messages.completed;
    case "interrupted":
      return messages.interrupted;
    default:
      return messages.mainlineProgress;
  }
}

export function getTimelineStructureLabel(
  locale: UiLocale,
  isMainline: boolean,
) {
  const messages = getTimelineMessages(locale).structure;
  return isMainline ? messages.mainline : messages.branch;
}

export function getTimelineImpactTypeLabel(
  locale: UiLocale,
  impactType: TimelineImpactType,
) {
  const messages = getTimelineMessages(locale).impactType;

  switch (impactType) {
    case "diverted":
      return messages.diverted;
    case "interrupted":
      return messages.interrupted;
    case "inactive":
      return messages.inactive;
    default:
      return messages.progressing;
  }
}

export function getTimelineEventSummary(
  locale: UiLocale,
  event: TimelineRecord,
) {
  if (event.summary) {
    return event.summary;
  }

  const title = event.title || event.payload?.title || event.targetId;
  const messages = getTimelineMessages(locale).eventType;

  switch (event.eventType) {
    case "node_status_changed": {
      const from = event.payload?.previousStatus
        ? getNodeStatusLabel(locale, event.payload.previousStatus)
        : "--";
      const to = event.payload?.status
        ? getNodeStatusLabel(locale, event.payload.status)
        : "--";
      return `${messages.nodeStatusChanged}: ${title} (${from} -> ${to})`;
    }
    case "node_updated":
      return `${messages.nodeUpdated}: ${title}`;
    default:
      return `${messages.nodeCreated}: ${title}`;
  }
}

export function getTimelineNodeTone(nodeType: TimelineNodeType) {
  switch (nodeType) {
    case "branch_created":
      return { color: "orange", borderColor: "#fb923c", background: "#fff7ed" };
    case "decision":
      return { color: "gold", borderColor: "#f59e0b", background: "#fffbeb" };
    case "completed":
      return { color: "green", borderColor: "#22c55e", background: "#f0fdf4" };
    case "interrupted":
      return { color: "red", borderColor: "#f87171", background: "#fef2f2" };
    case "external_event":
      return { color: "cyan", borderColor: "#22d3ee", background: "#ecfeff" };
    default:
      return { color: "blue", borderColor: "#60a5fa", background: "#eff6ff" };
  }
}

export function isTimelineKeyNode(item: Pick<TimelineRecord, "nodeType">) {
  return item.nodeType !== "mainline_progress";
}

export function formatRelationNode(
  locale: UiLocale,
  node: TimelineRelationNode,
) {
  return `${node.title} · ${getTimelineNodeTypeLabel(locale, node.nodeType)}`;
}
