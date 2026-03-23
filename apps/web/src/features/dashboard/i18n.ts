import { pickMessage } from "@/shared/i18n/shared.messages";
import type { UiLocale } from "@/shared/i18n/types";

const messages = {
  page: {
    title: {
      "zh-CN": "当前状态",
      en: "Current State",
    },
    description: {
      "zh-CN": "这里展示当前主线来自哪里、最近的重要推进是什么，以及如何回到相关历史节点。",
      en: "This page shows where the current mainline comes from, what the latest key progress is, and how to jump back to the related history.",
    },
    badge: {
      "zh-CN": "状态首页",
      en: "Home State",
    },
    requestError: {
      "zh-CN": "当前状态加载失败。",
      en: "Failed to load the current state.",
    },
  },
  overview: {
    empty: {
      "zh-CN": "当前还没有可追溯的状态来源。先在某个空间里创建节点并形成历史记录。",
      en: "There is no traceable state source yet. Create nodes in a space and build some history first.",
    },
    activeSpace: {
      "zh-CN": "当前活跃空间",
      en: "Active Space",
    },
    currentStateSource: {
      "zh-CN": "当前状态来源",
      en: "Current State Source",
    },
    currentMainlineAnchor: {
      "zh-CN": "当前主线锚点",
      en: "Current Mainline Anchor",
    },
    latestKeyProgress: {
      "zh-CN": "最近关键推进",
      en: "Latest Key Progress",
    },
    latestBranch: {
      "zh-CN": "最近关键分支",
      en: "Latest Branch",
    },
    openSpace: {
      "zh-CN": "进入空间",
      en: "Open Space",
    },
    openHistory: {
      "zh-CN": "查看历史节点",
      en: "View History Node",
    },
    noHistoryLink: {
      "zh-CN": "暂无对应历史节点",
      en: "No related history node yet",
    },
    createdAt: {
      "zh-CN": "发生时间",
      en: "Happened At",
    },
    mainline: {
      "zh-CN": "主干",
      en: "Mainline",
    },
    branch: {
      "zh-CN": "分支",
      en: "Branch",
    },
  },
} as const;

export function getDashboardMessages(locale: UiLocale) {
  return {
    page: {
      title: pickMessage(messages.page.title, locale),
      description: pickMessage(messages.page.description, locale),
      badge: pickMessage(messages.page.badge, locale),
      requestError: pickMessage(messages.page.requestError, locale),
    },
    overview: {
      empty: pickMessage(messages.overview.empty, locale),
      activeSpace: pickMessage(messages.overview.activeSpace, locale),
      currentStateSource: pickMessage(messages.overview.currentStateSource, locale),
      currentMainlineAnchor: pickMessage(messages.overview.currentMainlineAnchor, locale),
      latestKeyProgress: pickMessage(messages.overview.latestKeyProgress, locale),
      latestBranch: pickMessage(messages.overview.latestBranch, locale),
      openSpace: pickMessage(messages.overview.openSpace, locale),
      openHistory: pickMessage(messages.overview.openHistory, locale),
      noHistoryLink: pickMessage(messages.overview.noHistoryLink, locale),
      createdAt: pickMessage(messages.overview.createdAt, locale),
      mainline: pickMessage(messages.overview.mainline, locale),
      branch: pickMessage(messages.overview.branch, locale),
    },
  };
}
