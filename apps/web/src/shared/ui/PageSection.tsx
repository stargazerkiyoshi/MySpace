import { Card, Space, Tag, Typography } from "antd";
import type { PropsWithChildren } from "react";

type PageSectionProps = PropsWithChildren<{
  title: string;
  description: string;
  badge?: string;
}>;

export function PageSection({
  title,
  description,
  badge,
  children,
}: PageSectionProps) {
  return (
    <Card className="page-card">
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Space direction="vertical" size={4}>
          {badge ? (
            <Tag color="geekblue" className="page-card__badge">
              {badge}
            </Tag>
          ) : null}
          <Typography.Title level={2} style={{ marginBottom: 0 }}>
            {title}
          </Typography.Title>
          <Typography.Paragraph
            style={{ marginBottom: 0, fontSize: 16, color: "#64748b" }}
          >
            {description}
          </Typography.Paragraph>
        </Space>
        {children}
      </Space>
    </Card>
  );
}
