import { http } from "@/shared/lib/http";
import type { TimelineResponse } from "./types";

export async function fetchTimeline() {
  const { data } = await http.get<TimelineResponse>("/timeline");
  return data;
}
