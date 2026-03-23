import { useEffect, useState } from "react";
import { Alert, Card, Col, Row, Skeleton, Typography } from "antd";
import { useUiLocaleStore } from "@/shared/state/ui-locale.store";
import { TimelineEventDetailPanel } from "../components/TimelineEventDetailPanel";
import { TimelineEventList } from "../components/TimelineEventList";
import { useTimelineDetailQuery, useTimelineQuery } from "../hooks";
import { getTimelineMessages } from "../i18n";

type SpaceTimelinePanelProps = {
  spaceId: string;
};

export function SpaceTimelinePanel({ spaceId }: SpaceTimelinePanelProps) {
  const query = useTimelineQuery(spaceId);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
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
        : query.data[0].id,
    );
  }, [query.data]);

  return (
    <Card title={messages.title}>
      <Typography.Paragraph type="secondary">
        {messages.description}
      </Typography.Paragraph>
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
        <Row gutter={[16, 16]}>
          <Col xs={24} xl={14}>
            <TimelineEventList
              items={query.data}
              selectedEventId={selectedEventId}
              onSelect={setSelectedEventId}
            />
          </Col>
          <Col xs={24} xl={10}>
            <TimelineEventDetailPanel
              item={detailQuery.data}
              isLoading={detailQuery.isLoading}
              errorMessage={detailQuery.isError ? detailQuery.error.message : undefined}
            />
          </Col>
        </Row>
      ) : null}
    </Card>
  );
}
