import { Card, Col, Row, Typography } from "antd";

type PlaceholderGridProps = {
  items: Array<{
    title: string;
    description: string;
  }>;
};

export function PlaceholderGrid({ items }: PlaceholderGridProps) {
  return (
    <Row gutter={[16, 16]}>
      {items.map((item) => (
        <Col xs={24} md={12} xl={8} key={item.title}>
          <Card className="placeholder-card">
            <Typography.Title level={4}>{item.title}</Typography.Title>
            <Typography.Paragraph style={{ marginBottom: 0, color: "#64748b" }}>
              {item.description}
            </Typography.Paragraph>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
