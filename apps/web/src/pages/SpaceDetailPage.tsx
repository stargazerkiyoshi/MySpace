import { Navigate, useParams } from "react-router-dom";
import { SpaceDetailContainer } from "@/features/space/containers/SpaceDetailContainer";

export function SpaceDetailPage() {
  const { spaceId } = useParams();

  if (!spaceId) {
    return <Navigate to="/spaces" replace />;
  }

  return <SpaceDetailContainer spaceId={spaceId} />;
}
