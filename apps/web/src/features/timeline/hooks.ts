import { useQuery } from "@tanstack/react-query";
import { fetchTimeline } from "./api";

export function useTimelineQuery() {
  return useQuery({
    queryKey: ["timeline", "list"],
    queryFn: fetchTimeline,
    retry: false,
  });
}
