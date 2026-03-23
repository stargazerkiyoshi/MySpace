import { Alert, Card, Skeleton } from "antd";
import { useUiLocaleStore } from "@/shared/state/ui-locale.store";
import { TimelineEventList } from "../components/TimelineEventList";
import { useTimelineQuery } from "../hooks";
import { getTimelineMessages } from "../i18n";

type SpaceTimelinePanelProps = {
  spaceId: string;
};

export function SpaceTimelinePanel({ spaceId }: SpaceTimelinePanelProps) {
  const query = useTimelineQuery(spaceId);
  const locale = useUiLocaleStore((state) => state.locale);
  const messages = getTimelineMessages(locale).widget;

  return (
    <Card title={messages.title}>
      {query.isLoading ? <Skeleton active paragraph={{ rows: 5 }} /> : null}
      {query.isError ? (
        <Alert
          type="error"
          showIcon
          message={messages.loadError}
          description={query.error.message}
        />
      ) : null}
      {query.data ? <TimelineEventList items={query.data} /> : null}
    </Card>
  );
}
