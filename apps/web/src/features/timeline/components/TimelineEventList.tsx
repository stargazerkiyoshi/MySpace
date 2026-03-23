import { Empty, List, Space, Tag, Typography } from "antd";
import { useUiLocaleStore } from "@/shared/state/ui-locale.store";
import { getTimelineMessages } from "../i18n";
import type { TimelineRecord } from "../types";
import {
  formatTimelineDate,
  getTimelineEventSummary,
  getTimelineEventTypeLabel,
} from "../utils";

type TimelineEventListProps = {
  items: TimelineRecord[];
};

export function TimelineEventList({ items }: TimelineEventListProps) {
  const locale = useUiLocaleStore((state) => state.locale);
  const messages = getTimelineMessages(locale).widget;

  if (!items.length) {
    return <Empty description={messages.empty} />;
  }

  return (
    <List
      itemLayout="vertical"
      dataSource={items}
      renderItem={(item) => (
        <List.Item key={item.id}>
          <Space direction="vertical" size="small" style={{ width: "100%" }}>
            <Space wrap>
              <Tag color="blue">
                {getTimelineEventTypeLabel(locale, item.eventType)}
              </Tag>
              <Typography.Text type="secondary">
                {messages.timeLabel}: {formatTimelineDate(item.createdAt)}
              </Typography.Text>
            </Space>
            <Typography.Title level={5} style={{ margin: 0 }}>
              {item.targetTitle ?? item.summary}
            </Typography.Title>
            <Typography.Paragraph style={{ marginBottom: 0, color: "#64748b" }}>
              {getTimelineEventSummary(locale, item)}
            </Typography.Paragraph>
            <Typography.Text type="secondary">
              {messages.targetLabel}: {item.targetType} / {item.targetId}
            </Typography.Text>
          </Space>
        </List.Item>
      )}
    />
  );
}
