import { Alert, Card, List, Space, Typography } from "antd";
import { useUiLocaleStore } from "@/shared/state/ui-locale.store";
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
      <Card style={{ borderRadius: 16 }}>
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <Typography.Paragraph style={{ marginBottom: 0, color: "#64748b" }}>
            {messages.description}
          </Typography.Paragraph>
          <List
            dataSource={items}
            renderItem={(item) => (
              <List.Item style={{ paddingInline: 0 }}>
                <Space direction="vertical" size={2}>
                  <Typography.Text strong>{item.title}</Typography.Text>
                  <Typography.Text type="secondary">{item.description}</Typography.Text>
                </Space>
              </List.Item>
            )}
          />
        </Space>
      </Card>
    </>
  );
}
