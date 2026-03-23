import { useEffect, useState } from "react";
import { Alert, Drawer, Skeleton } from "antd";
import { useUiLocaleStore } from "@/shared/state/ui-locale.store";
import { TimelineEventDetailPanel } from "../components/TimelineEventDetailPanel";
import { TimelineEventList } from "../components/TimelineEventList";
import { useTimelineDetailQuery, useTimelineQuery } from "../hooks";
import { getTimelineMessages } from "../i18n";

type SpaceTimelinePanelProps = {
  spaceId: string;
  initialSelectedEventId?: string | null;
};

export function SpaceTimelinePanel({
  spaceId,
  initialSelectedEventId,
}: SpaceTimelinePanelProps) {
  const query = useTimelineQuery(spaceId);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const detailQuery = useTimelineDetailQuery(selectedEventId);
  const locale = useUiLocaleStore((state) => state.locale);
  const messages = getTimelineMessages(locale).widget;

  useEffect(() => {
    if (!query.data?.length) {
      setSelectedEventId(null);
      return;
    }

    setSelectedEventId((current) =>
      current && query.data.some((item) => item.id === current)
        ? current
        : initialSelectedEventId &&
            query.data.some((item) => item.id === initialSelectedEventId)
          ? initialSelectedEventId
          : query.data[0].id,
    );
  }, [initialSelectedEventId, query.data]);

  return (
    <>
      {query.isLoading ? <Skeleton active paragraph={{ rows: 6 }} /> : null}
      {query.isError ? (
        <Alert
          type="error"
          showIcon
          message={messages.loadError}
          description={query.error.message}
        />
      ) : null}
      {query.data ? (
        <TimelineEventList
          items={query.data}
          selectedEventId={selectedEventId}
          onSelect={(eventId) => {
            setSelectedEventId(eventId);
            setIsDetailOpen(true);
          }}
        />
      ) : null}
      <Drawer
        title={messages.detailTrigger}
        width={640}
        open={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
      >
        <TimelineEventDetailPanel
          item={detailQuery.data}
          isLoading={detailQuery.isLoading}
          errorMessage={detailQuery.isError ? detailQuery.error.message : undefined}
        />
      </Drawer>
    </>
  );
}
