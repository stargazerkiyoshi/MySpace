import { useQuery } from "@tanstack/react-query";
import { fetchSpaceTimeline } from "./api";

export const timelineKeys = {
  all: ["timeline"] as const,
  list: (spaceId: string) => [...timelineKeys.all, "list", spaceId] as const,
};

export function useTimelineQuery(spaceId: string) {
  return useQuery({
    queryKey: timelineKeys.list(spaceId),
    queryFn: () => fetchSpaceTimeline(spaceId),
    enabled: Boolean(spaceId),
    retry: false,
  });
}
