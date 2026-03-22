import type { UiLocale } from "@/shared/i18n/types";
import type { TimelineCard } from "./types";
import { getTimelineMessages } from "./i18n";

export function getTimelinePlaceholderCards(locale: UiLocale): TimelineCard[] {
  return getTimelineMessages(locale).cards;
}
