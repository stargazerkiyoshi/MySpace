import { Alert } from "antd";
import { PlaceholderGrid } from "@/shared/ui/PlaceholderGrid";
import type { TimelineCard } from "../types";

type TimelineOverviewProps = {
  items: TimelineCard[];
  requestState: "idle" | "error" | "success";
};

export function TimelineOverview({
  items,
  requestState,
}: TimelineOverviewProps) {
  return (
    <>
      {requestState === "error" ? (
        <Alert
          type="warning"
          showIcon
          message="Timeline 接口当前不可用，页面继续展示时间线占位布局。"
        />
      ) : null}
      <PlaceholderGrid items={items} />
    </>
  );
}
