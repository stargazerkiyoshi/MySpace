import { useQuery } from "@tanstack/react-query";
import { fetchAuthPlaceholder } from "./api";

export function useAuthPlaceholderQuery() {
  return useQuery({
    queryKey: ["auth", "placeholder"],
    queryFn: fetchAuthPlaceholder,
    enabled: false,
  });
}
