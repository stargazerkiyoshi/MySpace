import type { SpaceCard } from "./types";

export function getSpacePlaceholderCards(): SpaceCard[] {
  return [
    { title: "Space List", description: "未来承载空间卡片和筛选。" },
    { title: "Space Detail", description: "未来承载空间概览和结构入口。" },
    { title: "Membership", description: "未来承载成员与权限协作信息。" },
  ];
}
