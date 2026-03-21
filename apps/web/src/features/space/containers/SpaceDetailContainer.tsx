import { Alert, Card, Skeleton } from "antd";
import { PageSection } from "@/shared/ui/PageSection";
import { SpaceDetailPanel } from "../components/SpaceDetailPanel";
import { useSpaceDetailQuery } from "../hooks";

type SpaceDetailContainerProps = {
  spaceId: string;
};

export function SpaceDetailContainer({
  spaceId,
}: SpaceDetailContainerProps) {
  const query = useSpaceDetailQuery(spaceId);

  return (
    <PageSection
      title="Space Home"
      description="这里展示当前 Space 的最小基本信息，并作为后续子能力的稳定承载入口。"
      badge="Space Detail"
    >
      {query.isLoading ? (
        <Card>
          <Skeleton active paragraph={{ rows: 5 }} />
        </Card>
      ) : null}
      {query.isError ? (
        <Alert
          type="error"
          showIcon
          message="Space 详情加载失败"
          description={query.error.message}
        />
      ) : null}
      {query.data ? <SpaceDetailPanel space={query.data} /> : null}
    </PageSection>
  );
}
