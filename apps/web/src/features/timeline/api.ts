import { http } from "@/shared/lib/http";
import type { TimelineRecord } from "./types";

export async function fetchSpaceTimeline(spaceId: string) {
  const { data } = await http.get<TimelineRecord[]>(`/timeline/spaces/${spaceId}`);
  return data;
}
