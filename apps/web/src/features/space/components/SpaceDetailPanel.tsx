import { Button, Card, Descriptions, Empty, Space, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import type { SpaceRecord } from "../types";
import { formatSpaceDate } from "../utils";

type SpaceDetailPanelProps = {
  space: SpaceRecord;
};

export function SpaceDetailPanel({ space }: SpaceDetailPanelProps) {
  const navigate = useNavigate();

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Button onClick={() => navigate("/spaces")}>Back to Spaces</Button>
      <Card>
        <Descriptions
          title={space.name}
          column={1}
          items={[
            { key: "slug", label: "Slug", children: space.slug },
            {
              key: "description",
              label: "Description",
              children: space.description || "暂无描述。",
            },
            {
              key: "createdAt",
              label: "Created At",
              children: formatSpaceDate(space.createdAt),
            },
            {
              key: "updatedAt",
              label: "Updated At",
              children: formatSpaceDate(space.updatedAt),
            },
          ]}
        />
      </Card>
      <Card>
        <Typography.Title level={4}>Space Home Placeholder</Typography.Title>
        <Typography.Paragraph style={{ color: "#64748b", marginBottom: 16 }}>
          这里将继续承载 Node、Timeline、Snapshot、Sync Candidate 和 Agent
          相关入口。本次只打通 Space 主对象的最小闭环。
        </Typography.Paragraph>
        <Empty description="后续子能力将在新的 OpenSpec 变更中补齐。" />
      </Card>
    </Space>
  );
}
