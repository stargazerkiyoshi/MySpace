import { pickMessage } from "@/shared/i18n/shared.messages";
import type { UiLocale } from "@/shared/i18n/types";

const messages = {
  page: {
    title: {
      "zh-CN": "时间线占位",
      en: "Timeline Placeholder",
    },
    description: {
      "zh-CN": "时间线页为事件流、版本轨迹和后续历史能力保留边界，但本次不实现完整历史图谱。",
      en: "The timeline page reserves boundaries for activity flow, version traces, and future history capabilities without building the full history graph yet.",
    },
    badge: {
      "zh-CN": "时间线",
      en: "Timeline",
    },
    requestError: {
      "zh-CN": "时间线接口当前不可用，页面继续展示时间线占位布局。",
      en: "The timeline endpoint is currently unavailable. The page keeps showing its placeholder layout.",
    },
  },
  cards: {
    activity: {
      title: {
        "zh-CN": "活动流",
        en: "Activity Stream",
      },
      description: {
        "zh-CN": "未来承载最近事件列表。",
        en: "Will host the recent activity stream.",
      },
    },
    snapshots: {
      title: {
        "zh-CN": "快照",
        en: "Snapshots",
      },
      description: {
        "zh-CN": "未来承载关键时间点回看。",
        en: "Will host key moment snapshots for review.",
      },
    },
    historyTree: {
      title: {
        "zh-CN": "历史树",
        en: "History Tree",
      },
      description: {
        "zh-CN": "本次仅保留占位，不实现完整历史树。",
        en: "Reserved as a placeholder in this change without implementing the full history tree.",
      },
    },
  },
} as const;

export function getTimelineMessages(locale: UiLocale) {
  return {
    page: {
      title: pickMessage(messages.page.title, locale),
      description: pickMessage(messages.page.description, locale),
      badge: pickMessage(messages.page.badge, locale),
      requestError: pickMessage(messages.page.requestError, locale),
    },
    cards: [
      {
        title: pickMessage(messages.cards.activity.title, locale),
        description: pickMessage(messages.cards.activity.description, locale),
      },
      {
        title: pickMessage(messages.cards.snapshots.title, locale),
        description: pickMessage(messages.cards.snapshots.description, locale),
      },
      {
        title: pickMessage(messages.cards.historyTree.title, locale),
        description: pickMessage(messages.cards.historyTree.description, locale),
      },
    ],
  };
}
