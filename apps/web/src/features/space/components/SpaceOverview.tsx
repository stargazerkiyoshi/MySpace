import { Alert } from "antd";
import { PlaceholderGrid } from "@/shared/ui/PlaceholderGrid";
import type { SpaceCard } from "../types";

type SpaceOverviewProps = {
  items: SpaceCard[];
  requestState: "idle" | "error" | "success";
};

export function SpaceOverview({ items, requestState }: SpaceOverviewProps) {
  return (
    <>
      {requestState === "error" ? (
        <Alert
          type="warning"
          showIcon
          message="Spaces 接口当前不可用，页面继续以占位结构展示。"
        />
      ) : null}
      <PlaceholderGrid items={items} />
    </>
  );
}
