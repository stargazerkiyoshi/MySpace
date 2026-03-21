import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { createSpace, fetchSpace, fetchSpaces } from "./api";
import type { CreateSpaceInput } from "./types";

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
