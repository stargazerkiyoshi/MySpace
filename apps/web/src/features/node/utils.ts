import type { NodeCard } from "./types";

export function getNodePlaceholderCards(): NodeCard[] {
  return [
    { title: "Node Tree", description: "未来承载节点层级与过滤。" },
    { title: "Node Canvas", description: "未来承载节点内容编辑视图。" },
    { title: "Relations", description: "未来承载节点关系与引用信息。" },
  ];
}
