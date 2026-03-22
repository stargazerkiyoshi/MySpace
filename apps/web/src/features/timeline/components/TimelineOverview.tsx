import { Alert } from "antd";
import { useUiLocaleStore } from "@/shared/state/ui-locale.store";
import { PlaceholderGrid } from "@/shared/ui/PlaceholderGrid";
import { getTimelineMessages } from "../i18n";
import type { TimelineCard } from "../types";

type TimelineOverviewProps = {
  items: TimelineCard[];
  requestState: "idle" | "error" | "success";
};

export function TimelineOverview({
  items,
  requestState,
}: TimelineOverviewProps) {
  const locale = useUiLocaleStore((state) => state.locale);
  const messages = getTimelineMessages(locale).page;

  return (
    <>
      {requestState === "error" ? (
        <Alert
          type="warning"
          showIcon
          message={messages.requestError}
        />
      ) : null}
      <PlaceholderGrid items={items} />
    </>
  );
}
