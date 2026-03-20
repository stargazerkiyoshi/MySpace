import { http } from "@/shared/lib/http";
import type { DashboardResponse } from "./types";

export async function fetchDashboard() {
  const { data } = await http.get<DashboardResponse>("/dashboard");
  return data;
}
