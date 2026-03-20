import { useQuery } from "@tanstack/react-query";
import { fetchSpaces } from "./api";

export function useSpacesQuery() {
  return useQuery({
    queryKey: ["spaces", "list"],
    queryFn: fetchSpaces,
    retry: false,
  });
}
