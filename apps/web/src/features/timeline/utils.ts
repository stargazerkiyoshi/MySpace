import type { TimelineCard } from "./types";

export function getTimelinePlaceholderCards(): TimelineCard[] {
  return [
    { title: "Activity Stream", description: "未来承载最近事件列表。" },
    { title: "Snapshots", description: "未来承载关键时间点回看。" },
    { title: "History Tree", description: "本次仅保留占位，不实现完整历史树。" },
  ];
}
