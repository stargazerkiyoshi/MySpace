import { useQuery } from "@tanstack/react-query";
import { fetchNodes } from "./api";

export function useNodesQuery() {
  return useQuery({
    queryKey: ["nodes", "list"],
    queryFn: fetchNodes,
    retry: false,
  });
}
