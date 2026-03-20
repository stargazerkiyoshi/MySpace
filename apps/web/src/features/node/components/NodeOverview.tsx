import { Alert } from "antd";
import { PlaceholderGrid } from "@/shared/ui/PlaceholderGrid";
import type { NodeCard } from "../types";

type NodeOverviewProps = {
  items: NodeCard[];
  requestState: "idle" | "error" | "success";
};

export function NodeOverview({ items, requestState }: NodeOverviewProps) {
  return (
    <>
      {requestState === "error" ? (
        <Alert
          type="warning"
          showIcon
          message="Nodes 接口当前不可用，页面保持节点工作区占位结构。"
        />
      ) : null}
      <PlaceholderGrid items={items} />
    </>
  );
}
