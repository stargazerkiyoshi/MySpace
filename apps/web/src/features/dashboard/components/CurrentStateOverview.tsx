import { Button, Card, Col, Empty, Row, Space, Tag, Typography } from "antd";
import { Link } from "react-router-dom";
import { formatTimelineDate } from "@/features/timeline/utils";
import { useUiLocaleStore } from "@/shared/state/ui-locale.store";
import { getDashboardMessages } from "../i18n";
import type { DashboardHistoryNode, DashboardResponse } from "../types";

type CurrentStateOverviewProps = {
  dashboard: DashboardResponse;
};

export function CurrentStateOverview({ dashboard }: CurrentStateOverviewProps) {
  const locale = useUiLocaleStore((state) => state.locale);
  const messages = getDashboardMessages(locale).overview;

  if (!dashboard.activeSpace || !dashboard.currentState) {
    return <Empty description={messages.empty} />;
  }

  const { activeSpace, currentState } = dashboard;
  const cards: Array<{ title: string; item: DashboardHistoryNode | null }> = [
    { title: messages.currentStateSource, item: currentState.currentStateSource },
    { title: messages.currentMainlineAnchor, item: currentState.currentMainlineAnchor },
    { title: messages.latestKeyProgress, item: currentState.latestKeyProgress },
    { title: messages.latestBranch, item: currentState.latestBranch },
  ];

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Card>
        <Space direction="vertical" size="small">
          <Typography.Text type="secondary">{messages.activeSpace}</Typography.Text>
          <Typography.Title level={4} style={{ margin: 0 }}>
            {activeSpace.name}
          </Typography.Title>
          <Button type="default">
            <Link to={`/spaces/${activeSpace.id}`}>{messages.openSpace}</Link>
          </Button>
        </Space>
      </Card>

      <Row gutter={[16, 16]}>
        {cards.map(({ title, item }) => (
          <Col xs={24} md={12} key={title}>
            <HistoryAnchorCard title={title} item={item} spaceId={activeSpace.id} />
          </Col>
        ))}
      </Row>
    </Space>
  );

  function HistoryAnchorCard({
    title,
    item,
    spaceId,
    }: {
      title: string;
      item: DashboardHistoryNode | null;
      spaceId: string;
    }) {
    return (
      <Card size="small" title={title} style={{ height: "100%" }}>
        {!item ? (
          <Typography.Text type="secondary">{messages.noHistoryLink}</Typography.Text>
        ) : (
          <Space
            direction="vertical"
            size="small"
            style={{ width: "100%", minHeight: 156, justifyContent: "space-between" }}
          >
            <Space wrap>
              <Tag color={item.isMainline ? "blue" : "orange"}>
                {item.isMainline ? messages.mainline : messages.branch}
              </Tag>
              <Tag>{item.nodeType}</Tag>
            </Space>
            <Typography.Title
              level={5}
              style={{ margin: 0 }}
              ellipsis={{ rows: 1, tooltip: item.title }}
            >
              {item.title}
            </Typography.Title>
            <Typography.Paragraph
              ellipsis={{ rows: 2, tooltip: item.summary }}
              style={{ marginBottom: 0 }}
            >
              {item.summary}
            </Typography.Paragraph>
            <Typography.Text type="secondary">
              {messages.createdAt}: {formatTimelineDate(item.createdAt, locale)}
            </Typography.Text>
            <Button type="link">
              <Link to={`/spaces/${spaceId}?timelineEvent=${item.eventId}`}>
                {messages.openHistory}
              </Link>
            </Button>
          </Space>
        )}
      </Card>
    );
  }
}
