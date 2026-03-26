import { Card, Empty, Space, Tag, Typography } from "antd";
import { useUiLocaleStore } from "@/shared/state/ui-locale.store";
import { getNodeMessages } from "../i18n";
import type { NodeGraphNode, NodeGraphRelationSource } from "../types";
import { formatNodeDate, getNodeStatusLabel, getNodeTypeLabel } from "../utils";

type NodeGraphInspectorProps = {
  selectedNode: NodeGraphNode | null;
  neighborCount: number;
  relationSource: NodeGraphRelationSource;
};

export function NodeGraphInspector({
  selectedNode,
  neighborCount,
  relationSource,
}: NodeGraphInspectorProps) {
  const locale = useUiLocaleStore((state) => state.locale);
  const messages = getNodeMessages(locale).graph;

  return (
    <Card className="node-graph__inspector" bordered={false}>
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <div>
          <Typography.Text type="secondary">{messages.selectedTitle}</Typography.Text>
          <Typography.Title level={4} style={{ margin: "8px 0 0" }}>
            {selectedNode?.title ?? messages.selectedTitle}
          </Typography.Title>
        </div>

        {!selectedNode ? (
          <Empty description={messages.noSelection} />
        ) : (
          <Space direction="vertical" size="middle" style={{ width: "100%" }}>
            <Space wrap>
              <Tag color="blue">{getNodeTypeLabel(locale, selectedNode.nodeType)}</Tag>
              <Tag
                color={
                  selectedNode.status === "done"
                    ? "green"
                    : selectedNode.status === "doing"
                      ? "gold"
                      : "default"
                }
              >
                {getNodeStatusLabel(locale, selectedNode.status)}
              </Tag>
              <Tag>{messages.sourceKindNode}</Tag>
            </Space>

            <Typography.Paragraph style={{ marginBottom: 0, color: "#475569" }}>
              {selectedNode.content ?? messages.noSelection}
            </Typography.Paragraph>

            <div className="node-graph__meta-grid">
              <div className="node-graph__meta-item">
                <Typography.Text type="secondary">{messages.neighborCount}</Typography.Text>
                <Typography.Paragraph>{neighborCount}</Typography.Paragraph>
              </div>
              <div className="node-graph__meta-item">
                <Typography.Text type="secondary">{messages.relationSource}</Typography.Text>
                <Typography.Paragraph>
                  {relationSource === "node_relation"
                    ? messages.relationSourceTimeline
                    : messages.relationSourceNone}
                </Typography.Paragraph>
              </div>
              <div className="node-graph__meta-item">
                <Typography.Text type="secondary">{messages.createdAt}</Typography.Text>
                <Typography.Paragraph>
                  {formatNodeDate(selectedNode.createdAt)}
                </Typography.Paragraph>
              </div>
              <div className="node-graph__meta-item">
                <Typography.Text type="secondary">{messages.updatedAt}</Typography.Text>
                <Typography.Paragraph>
                  {formatNodeDate(selectedNode.updatedAt)}
                </Typography.Paragraph>
              </div>
            </div>

            <Typography.Paragraph style={{ marginBottom: 0, color: "#64748b" }}>
              {messages.focusHint}
            </Typography.Paragraph>
          </Space>
        )}
      </Space>
    </Card>
  );
}
