import type { DashboardCard } from "./types";

export function getDashboardPlaceholderCards(): DashboardCard[] {
  return [
    { title: "Overview", description: "展示核心指标和运行态势。" },
    { title: "Recent Activity", description: "展示空间和节点最近变化。" },
    { title: "AI Entry", description: "连接到独立 ai-service 的入口位。" },
  ];
}
