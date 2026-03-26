import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createNodeRelation,
  createNode,
  deleteNodeRelation,
  fetchNodeDetail,
  fetchSpaceNodeGraph,
  fetchSpaceNodes,
  updateNode,
} from "./api";
import { timelineKeys } from "@/features/timeline/hooks";
import type {
  CreateNodeInput,
  CreateNodeRelationInput,
  UpdateNodeInput,
} from "./types";

export const nodeKeys = {
  all: ["nodes"] as const,
  list: (spaceId: string) => [...nodeKeys.all, "list", spaceId] as const,
  graph: (spaceId: string) => [...nodeKeys.all, "graph", spaceId] as const,
  detail: (nodeId: string) => [...nodeKeys.all, "detail", nodeId] as const,
};

export function useSpaceNodesQuery(spaceId: string) {
  return useQuery({
    queryKey: nodeKeys.list(spaceId),
    queryFn: () => fetchSpaceNodes(spaceId),
    enabled: Boolean(spaceId),
    retry: false,
  });
}

export function useNodeDetailQuery(nodeId: string | null) {
  return useQuery({
    queryKey: nodeId ? nodeKeys.detail(nodeId) : [...nodeKeys.all, "detail", "empty"],
    queryFn: () => fetchNodeDetail(nodeId!),
    enabled: Boolean(nodeId),
    retry: false,
  });
}

export function useSpaceNodeGraphQuery(spaceId: string) {
  return useQuery({
    queryKey: nodeKeys.graph(spaceId),
    queryFn: () => fetchSpaceNodeGraph(spaceId),
    enabled: Boolean(spaceId),
    retry: false,
  });
}

export function useCreateNodeMutation(spaceId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateNodeInput) => createNode(spaceId, input),
    onSuccess: async (created) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: nodeKeys.list(spaceId) }),
        queryClient.invalidateQueries({ queryKey: nodeKeys.graph(spaceId) }),
        queryClient.invalidateQueries({ queryKey: timelineKeys.list(spaceId) }),
        queryClient.setQueryData(nodeKeys.detail(created.id), created),
      ]);
    },
  });
}

export function useUpdateNodeMutation(spaceId: string, nodeId: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: UpdateNodeInput) => updateNode(nodeId!, input),
    onSuccess: async (updated) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: nodeKeys.list(spaceId) }),
        queryClient.invalidateQueries({ queryKey: nodeKeys.graph(spaceId) }),
        queryClient.invalidateQueries({ queryKey: nodeKeys.detail(updated.id) }),
        queryClient.invalidateQueries({ queryKey: timelineKeys.list(spaceId) }),
      ]);
    },
  });
}

export function useCreateNodeRelationMutation(spaceId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateNodeRelationInput) => createNodeRelation(spaceId, input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: nodeKeys.graph(spaceId) });
    },
  });
}

export function useDeleteNodeRelationMutation(spaceId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (relationId: string) => deleteNodeRelation(spaceId, relationId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: nodeKeys.graph(spaceId) });
    },
  });
}
