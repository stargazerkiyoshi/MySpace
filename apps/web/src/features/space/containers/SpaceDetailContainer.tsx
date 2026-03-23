import { Alert, Card, Skeleton } from "antd";
import { NodeWorkspace } from "@/features/node/containers/NodeWorkspace";
import { SpaceTimelinePanel } from "@/features/timeline/containers/SpaceTimelinePanel";
import { useUiLocaleStore } from "@/shared/state/ui-locale.store";
import { PageSection } from "@/shared/ui/PageSection";
import { SpaceDetailPanel } from "../components/SpaceDetailPanel";
import { useSpaceDetailQuery } from "../hooks";
import { getSpaceMessages } from "../i18n";

type SpaceDetailContainerProps = {
  spaceId: string;
  initialTimelineEventId?: string | null;
};

export function SpaceDetailContainer({
  spaceId,
  initialTimelineEventId,
}: SpaceDetailContainerProps) {
  const query = useSpaceDetailQuery(spaceId);
  const { locale } = useUiLocaleStore();
  const messages = getSpaceMessages(locale).detailPage;

  return (
    <PageSection
      title={messages.title}
      description={messages.description}
      badge={messages.badge}
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
          message={messages.loadError}
          description={query.error.message}
        />
      ) : null}
      {query.data ? (
        <>
          <SpaceDetailPanel space={query.data} />
          <NodeWorkspace spaceId={query.data.id} />
          <SpaceTimelinePanel
            spaceId={query.data.id}
            initialSelectedEventId={initialTimelineEventId}
          />
        </>
      ) : null}
    </PageSection>
  );
}
