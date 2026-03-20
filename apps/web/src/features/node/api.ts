import { http } from "@/shared/lib/http";
import type { NodeListResponse } from "./types";

export async function fetchNodes() {
  const { data } = await http.get<NodeListResponse>("/nodes");
  return data;
}
