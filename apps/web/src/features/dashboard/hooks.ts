import { useQuery } from "@tanstack/react-query";
import { fetchDashboard } from "./api";

export function useDashboardQuery() {
  return useQuery({
    queryKey: ["dashboard", "summary"],
    queryFn: fetchDashboard,
    retry: false,
  });
}
