import { Alert, Card, Descriptions, Empty, List, Skeleton, Space, Tag, Typography } from "antd";
import { useUiLocaleStore } from "@/shared/state/ui-locale.store";
import { getTimelineMessages } from "../i18n";
import type { TimelineDetailRecord, TimelineRelationNode } from "../types";
import {
  formatRelationNode,
  formatTimelineDate,
  getTimelineNodeTone,
  getTimelineNodeTypeLabel,
  getTimelineStructureLabel,
} from "../utils";

type TimelineEventDetailPanelProps = {
  item?: TimelineDetailRecord;
  isLoading: boolean;
  errorMessage?: string;
};

export function TimelineEventDetailPanel({
  item,
  isLoading,
  errorMessage,
}: TimelineEventDetailPanelProps) {
  const locale = useUiLocaleStore((state) => state.locale);
  const messages = getTimelineMessages(locale);

  if (isLoading) {
    return (
      <Card title={messages.detail.title}>
        <Skeleton active paragraph={{ rows: 10 }} />
      </Card>
    );
  }

  if (errorMessage) {
    return (
      <Card title={messages.detail.title}>
        <Alert type="error" showIcon message={messages.widget.detailLoadError} description={errorMessage} />
      </Card>
    );
  }

  if (!item) {
    return (
      <Card title={messages.detail.title}>
        <Empty description={messages.detail.empty} />
      </Card>
    );
  }

  const tone = getTimelineNodeTone(item.nodeType);

  return (
    <Card
      title={messages.detail.title}
      styles={{
        body: {
          borderTop: `3px solid ${tone.borderColor}`,
          background: tone.background,
        },
      }}
    >
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Space wrap>
          <Tag color={tone.color}>{getTimelineNodeTypeLabel(locale, item.nodeType)}</Tag>
          <Tag color={item.isMainline ? "blue" : "orange"}>
            {getTimelineStructureLabel(locale, item.isMainline)}
          </Tag>
          <Typography.Text type="secondary">
            {formatTimelineDate(item.createdAt, locale)}
          </Typography.Text>
        </Space>

        <div>
          <Typography.Title level={4} style={{ marginBottom: 8 }}>
            {item.title}
          </Typography.Title>
          <Typography.Paragraph style={{ marginBottom: 0 }}>
            {item.summary}
          </Typography.Paragraph>
        </div>

        <Descriptions size="small" column={1} bordered>
          <Descriptions.Item label={messages.detail.description}>
            {item.description ?? messages.detail.notPlanned}
          </Descriptions.Item>
          <Descriptions.Item label={messages.detail.impactSummary}>
            {item.impactSummary ?? messages.detail.notPlanned}
          </Descriptions.Item>
          <Descriptions.Item label={messages.detail.currentStateRelation}>
            {item.currentStateRelation}
          </Descriptions.Item>
          <Descriptions.Item label={messages.detail.isMainline}>
            {item.isMainline ? messages.detail.yes : messages.detail.no}
          </Descriptions.Item>
          <Descriptions.Item label={messages.detail.branchFromNodeId}>
            {item.branchFromNodeId ?? messages.detail.notPlanned}
          </Descriptions.Item>
          <Descriptions.Item label={messages.detail.mergeToNodeId}>
            {item.mergeToNodeId ?? messages.detail.notPlanned}
          </Descriptions.Item>
        </Descriptions>

        <RelationBlock
          title={messages.detail.previousNode}
          emptyText={messages.detail.noPreviousNode}
          items={item.previousNode ? [item.previousNode] : []}
        />
        <RelationBlock
          title={messages.detail.nextNodes}
          emptyText={messages.detail.noNextNodes}
          items={item.nextNodes}
        />
      </Space>
    </Card>
  );
}

type RelationBlockProps = {
  title: string;
  emptyText: string;
  items: TimelineRelationNode[];
};

function RelationBlock({ title, emptyText, items }: RelationBlockProps) {
  const locale = useUiLocaleStore((state) => state.locale);

  return (
    <div>
      <Typography.Title level={5}>{title}</Typography.Title>
      {!items.length ? (
        <Typography.Text type="secondary">{emptyText}</Typography.Text>
      ) : (
        <List
          size="small"
          dataSource={items}
          renderItem={(item) => (
            <List.Item key={item.id}>
              <Space direction="vertical" size={2}>
                <Typography.Text>{formatRelationNode(locale, item)}</Typography.Text>
                <Typography.Text type="secondary">
                  {formatTimelineDate(item.createdAt, locale)}
                </Typography.Text>
              </Space>
            </List.Item>
          )}
        />
      )}
    </div>
  );
}
