import { http } from "@/shared/lib/http";
import type { CreateNodeInput, NodeRecord, UpdateNodeInput } from "./types";

export async function fetchSpaceNodes(spaceId: string) {
  const { data } = await http.get<NodeRecord[]>(`/spaces/${spaceId}/nodes`);
  return data;
}

export async function fetchNodeDetail(nodeId: string) {
  const { data } = await http.get<NodeRecord>(`/nodes/${nodeId}`);
  return data;
}

export async function createNode(spaceId: string, input: CreateNodeInput) {
  const { data } = await http.post<NodeRecord>(`/spaces/${spaceId}/nodes`, input);
  return data;
}

export async function updateNode(nodeId: string, input: UpdateNodeInput) {
  const { data } = await http.patch<NodeRecord>(`/nodes/${nodeId}`, input);
  return data;
}
