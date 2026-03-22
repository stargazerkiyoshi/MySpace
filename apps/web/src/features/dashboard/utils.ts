import type { UiLocale } from "@/shared/i18n/types";
import type { DashboardCard } from "./types";
import { getDashboardMessages } from "./i18n";

export function getDashboardPlaceholderCards(locale: UiLocale): DashboardCard[] {
  return getDashboardMessages(locale).cards;
}
