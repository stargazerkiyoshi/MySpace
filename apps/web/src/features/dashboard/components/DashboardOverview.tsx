import { Alert } from "antd";
import { PlaceholderGrid } from "@/shared/ui/PlaceholderGrid";
import type { DashboardCard } from "../types";

type DashboardOverviewProps = {
  items: DashboardCard[];
  requestState: "idle" | "error" | "success";
};

export function DashboardOverview({
  items,
  requestState,
}: DashboardOverviewProps) {
  return (
    <>
      {requestState === "error" ? (
        <Alert
          type="warning"
          showIcon
          message="Dashboard 接口当前不可用，页面仍使用占位数据保持壳层稳定。"
        />
      ) : null}
      <PlaceholderGrid items={items} />
    </>
  );
}
