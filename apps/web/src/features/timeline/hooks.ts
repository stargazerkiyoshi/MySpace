import { useQuery } from "@tanstack/react-query";
import { fetchSpaceTimeline, fetchTimelineEventDetail } from "./api";

export const timelineKeys = {
  all: ["timeline"] as const,
  list: (spaceId: string) => [...timelineKeys.all, "list", spaceId] as const,
  detail: (eventId: string) => [...timelineKeys.all, "detail", eventId] as const,
};

export function useTimelineQuery(spaceId: string) {
  return useQuery({
    queryKey: timelineKeys.list(spaceId),
    queryFn: () => fetchSpaceTimeline(spaceId),
    enabled: Boolean(spaceId),
    retry: false,
  });
}

export function useTimelineDetailQuery(eventId?: string | null) {
  return useQuery({
    queryKey: timelineKeys.detail(eventId ?? "empty"),
    queryFn: () => fetchTimelineEventDetail(eventId as string),
    enabled: Boolean(eventId),
    retry: false,
  });
}
