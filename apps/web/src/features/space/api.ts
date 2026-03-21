import { http } from "@/shared/lib/http";
import type { CreateSpaceInput, SpaceRecord } from "./types";

export async function fetchSpaces() {
  const { data } = await http.get<SpaceRecord[]>("/spaces");
  return data;
}

export async function fetchSpace(spaceId: string) {
  const { data } = await http.get<SpaceRecord>(`/spaces/${spaceId}`);
  return data;
}

export async function createSpace(input: CreateSpaceInput) {
  const { data } = await http.post<SpaceRecord>("/spaces", input);
  return data;
}
