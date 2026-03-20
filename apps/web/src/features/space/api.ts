import { http } from "@/shared/lib/http";
import type { SpaceListResponse } from "./types";

export async function fetchSpaces() {
  const { data } = await http.get<SpaceListResponse>("/spaces");
  return data;
}
