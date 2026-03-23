import { Navigate, useParams, useSearchParams } from "react-router-dom";
import { SpaceDetailContainer } from "@/features/space/containers/SpaceDetailContainer";

export function SpaceDetailPage() {
  const { spaceId } = useParams();
  const [searchParams] = useSearchParams();

  if (!spaceId) {
    return <Navigate to="/spaces" replace />;
  }

  return (
    <SpaceDetailContainer
      spaceId={spaceId}
      initialTimelineEventId={searchParams.get("timelineEvent")}
    />
  );
}
