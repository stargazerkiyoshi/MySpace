import { pickMessage } from "@/shared/i18n/shared.messages";
import type { UiLocale } from "@/shared/i18n/types";

const messages = {
  page: {
    title: {
      "zh-CN": "仪表盘占位",
      en: "Dashboard Placeholder",
    },
    description: {
      "zh-CN": "用于承载空间型协作系统的总览入口，后续可接入统计、活跃空间和任务概览。",
      en: "A placeholder overview entry for the space collaboration system, ready for future metrics, active spaces, and task summaries.",
    },
    badge: {
      "zh-CN": "仪表盘",
      en: "Dashboard",
    },
    requestError: {
      "zh-CN": "仪表盘接口当前不可用，页面仍使用占位数据保持壳层稳定。",
      en: "The dashboard endpoint is currently unavailable. Placeholder data keeps the shell stable.",
    },
  },
  cards: {
    overview: {
      title: {
        "zh-CN": "总览",
        en: "Overview",
      },
      description: {
        "zh-CN": "展示核心指标和运行态势。",
        en: "Shows core metrics and the current operating pulse.",
      },
    },
    recentActivity: {
      title: {
        "zh-CN": "最近活动",
        en: "Recent Activity",
      },
      description: {
        "zh-CN": "展示空间和节点最近变化。",
        en: "Highlights recent changes across spaces and nodes.",
      },
    },
    aiEntry: {
      title: {
        "zh-CN": "AI 入口",
        en: "AI Entry",
      },
      description: {
        "zh-CN": "连接到独立 AI 服务的入口位。",
        en: "Reserves the entry point into the dedicated AI service.",
      },
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
    cards: [
      {
        title: pickMessage(messages.cards.overview.title, locale),
        description: pickMessage(messages.cards.overview.description, locale),
      },
      {
        title: pickMessage(messages.cards.recentActivity.title, locale),
        description: pickMessage(messages.cards.recentActivity.description, locale),
      },
      {
        title: pickMessage(messages.cards.aiEntry.title, locale),
        description: pickMessage(messages.cards.aiEntry.description, locale),
      },
    ],
  };
}
