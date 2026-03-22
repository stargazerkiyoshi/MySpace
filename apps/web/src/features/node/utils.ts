import type { UiLocale } from "@/shared/i18n/types";
import type { NodeCard, NodeStatus, NodeType } from "./types";
import { getNodeMessages } from "./i18n";

export function getNodePlaceholderCards(locale: UiLocale): NodeCard[] {
  return getNodeMessages(locale).cards;
}

export function formatNodeDate(value: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export function getNodeTypeLabel(locale: UiLocale, type: NodeType) {
  return getNodeMessages(locale).typeOptions[type];
}

export function getNodeStatusLabel(locale: UiLocale, status: NodeStatus) {
  return getNodeMessages(locale).statusOptions[status];
}
