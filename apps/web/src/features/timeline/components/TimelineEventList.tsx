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
              paddingInline: 16,
              paddingBlock: 16,
              marginBottom: 12,
              borderRadius: 12,
              borderLeft: `4px solid ${tone.borderColor}`,
              background: selected ? tone.background : "#ffffff",
              boxShadow: selected
                ? "0 8px 24px rgba(15, 23, 42, 0.08)"
                : "0 1px 3px rgba(15, 23, 42, 0.08)",
            }}
            actions={[
              <Button key="detail" type={selected ? "primary" : "default"} onClick={() => onSelect(item.id)}>
                {selected ? messages.selected : messages.detailTrigger}
              </Button>,
            ]}
          >
            <Space direction="vertical" size="small" style={{ width: "100%" }}>
              <Space wrap>
                <Tag color={tone.color}>{getTimelineNodeTypeLabel(locale, item.nodeType)}</Tag>
                <Tag color={item.isMainline ? "blue" : "orange"}>
                  {getTimelineStructureLabel(locale, item.isMainline)}
                </Tag>
                <Tag>{getTimelineEventTypeLabel(locale, item.eventType)}</Tag>
                {item.impactSummary ? (
                  <Tag color="geekblue">{messages.affectsCurrentState}</Tag>
                ) : null}
                {isTimelineKeyNode(item) ? (
                  <Tag color="red">{messages.keyNode}</Tag>
                ) : null}
              </Space>
              <Typography.Text type="secondary">
                {messages.timeLabel}: {formatTimelineDate(item.createdAt, locale)}
              </Typography.Text>
              <Typography.Title level={5} style={{ margin: 0 }}>
                {item.title}
              </Typography.Title>
              <Typography.Paragraph style={{ marginBottom: 0, color: "#475569" }}>
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
