import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { createSpace, fetchSpace, fetchSpaces, updateSpace } from "./api";
import type { CreateSpaceInput, UpdateSpaceInput } from "./types";

export const spaceKeys = {
  all: ["spaces"] as const,
  list: () => [...spaceKeys.all, "list"] as const,
  detail: (spaceId: string) => [...spaceKeys.all, "detail", spaceId] as const,
};

export function useSpacesQuery() {
  return useQuery({
    queryKey: spaceKeys.list(),
    queryFn: fetchSpaces,
    retry: false,
  });
}

export function useSpaceDetailQuery(spaceId: string) {
  return useQuery({
    queryKey: spaceKeys.detail(spaceId),
    queryFn: () => fetchSpace(spaceId),
    enabled: Boolean(spaceId),
    retry: false,
  });
}

export function useCreateSpaceMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateSpaceInput) => createSpace(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: spaceKeys.list() });
    },
  });
}

export function useUpdateSpaceMutation(spaceId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: UpdateSpaceInput) => updateSpace(spaceId, input),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: spaceKeys.list() }),
        queryClient.invalidateQueries({ queryKey: spaceKeys.detail(spaceId) }),
        queryClient.invalidateQueries({ queryKey: ["dashboard"] }),
      ]);
    },
  });
}
