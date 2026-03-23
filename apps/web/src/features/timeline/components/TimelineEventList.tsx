import { Button, Empty, List, Space, Tag, Typography } from "antd";
import { useUiLocaleStore } from "@/shared/state/ui-locale.store";
import { getTimelineMessages } from "../i18n";
import type { TimelineRecord } from "../types";
import {
  formatTimelineDate,
  getTimelineEventSummary,
  getTimelineEventTypeLabel,
  getTimelineNodeTone,
  getTimelineNodeTypeLabel,
  getTimelineStructureLabel,
  isTimelineKeyNode,
} from "../utils";

type TimelineEventListProps = {
  items: TimelineRecord[];
  selectedEventId?: string | null;
  onSelect: (eventId: string) => void;
};

export function TimelineEventList({
  items,
  onSelect,
  selectedEventId,
}: TimelineEventListProps) {
  const locale = useUiLocaleStore((state) => state.locale);
  const messages = getTimelineMessages(locale).widget;

  if (!items.length) {
    return <Empty description={messages.empty} />;
  }

  return (
    <List
      itemLayout="vertical"
      dataSource={items}
      renderItem={(item) => {
        const tone = getTimelineNodeTone(item.nodeType);
        const selected = item.id === selectedEventId;

        return (
          <List.Item
            key={item.id}
            style={{
              paddingInline: 12,
              paddingBlock: 14,
              minHeight: 176,
              marginBottom: 10,
              borderRadius: 10,
              borderLeft: `3px solid ${tone.borderColor}`,
              background: selected ? tone.background : "#fafafa",
              boxShadow: selected
                ? "0 6px 18px rgba(15, 23, 42, 0.08)"
                : "none",
            }}
            actions={[
              <Button
                key="detail"
                size="small"
                type={selected ? "primary" : "default"}
                onClick={() => onSelect(item.id)}
              >
                {selected ? messages.selected : messages.detailTrigger}
              </Button>,
            ]}
          >
            <Space
              direction="vertical"
              size="small"
              style={{ width: "100%", minHeight: 146, justifyContent: "space-between" }}
            >
              <Space wrap>
                <Tag color={item.isMainline ? "blue" : "orange"}>
                  {getTimelineStructureLabel(locale, item.isMainline)}
                </Tag>
                <Typography.Text type="secondary">
                  {getTimelineNodeTypeLabel(locale, item.nodeType)}
                </Typography.Text>
                <Typography.Text type="secondary">
                  {getTimelineEventTypeLabel(locale, item.eventType)}
                </Typography.Text>
                {isTimelineKeyNode(item) ? (
                  <Tag color="red">{messages.keyNode}</Tag>
                ) : null}
              </Space>
              <Typography.Text type="secondary">
                {messages.timeLabel}: {formatTimelineDate(item.createdAt, locale)}
              </Typography.Text>
              <Typography.Title
                level={5}
                style={{ margin: 0 }}
                ellipsis={{ rows: 1, tooltip: item.title }}
              >
                {item.title}
              </Typography.Title>
              <Typography.Paragraph
                ellipsis={{ rows: 2, tooltip: getTimelineEventSummary(locale, item) }}
                style={{ marginBottom: 0, color: "#475569" }}
              >
                {getTimelineEventSummary(locale, item)}
              </Typography.Paragraph>
              <Typography.Text type="secondary">
                {messages.targetLabel}: {item.targetType} / {item.targetId}
              </Typography.Text>
            </Space>
          </List.Item>
        );
      }}
    />
  );
}
