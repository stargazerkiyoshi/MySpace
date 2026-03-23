import type { UiLocale } from "@/shared/i18n/types";
import { getNodeStatusLabel } from "@/features/node/utils";
import type { TimelineCard, TimelineRecord } from "./types";
import { getTimelineMessages } from "./i18n";

export function getTimelinePlaceholderCards(locale: UiLocale): TimelineCard[] {
  return getTimelineMessages(locale).cards;
}

export function formatTimelineDate(value: string) {
  return new Intl.DateTimeFormat("zh-CN", {
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

export function getTimelineEventSummary(
  locale: UiLocale,
  event: TimelineRecord,
) {
  const title = event.targetTitle ?? event.payload?.title ?? event.targetId;
  const messages = getTimelineMessages(locale).summary;

  switch (event.eventType) {
    case "node_status_changed": {
      const from = event.payload?.previousStatus
        ? getNodeStatusLabel(locale, event.payload.previousStatus)
        : "--";
      const to = event.payload?.status
        ? getNodeStatusLabel(locale, event.payload.status)
        : "--";
      return messages.nodeStatusChanged
        .replace("{title}", title)
        .replace("{from}", from)
        .replace("{to}", to);
    }
    case "node_updated":
      return messages.nodeUpdated.replace("{title}", title);
    default:
      return messages.nodeCreated.replace("{title}", title);
  }
}
