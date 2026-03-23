import { http } from "@/shared/lib/http";
import type { TimelineDetailRecord, TimelineRecord } from "./types";

export async function fetchSpaceTimeline(spaceId: string) {
  const { data } = await http.get<TimelineRecord[]>(`/timeline/spaces/${spaceId}`);
  return data;
}

export async function fetchTimelineEventDetail(eventId: string) {
  const { data } = await http.get<TimelineDetailRecord>(`/timeline/${eventId}`);
  return data;
}
