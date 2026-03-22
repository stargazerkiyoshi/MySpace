import type { UiLocale } from "./types";

export const sharedMessages = {
  appShell: {
    brandEyebrow: {
      "zh-CN": "空间型协作",
      en: "Space Collaboration",
    },
    brandTitle: {
      "zh-CN": "MySpace",
      en: "MySpace",
    },
    brandDescription: {
      "zh-CN": "工程壳层与后续业务能力的统一入口。",
      en: "A shared entry point for the app shell and future business capabilities.",
    },
    headerEyebrow: {
      "zh-CN": "当前工作区",
      en: "Current Workspace",
    },
    workspace: {
      "zh-CN": "工作台",
      en: "Workspace",
    },
    statusTag: {
      "zh-CN": "双语已启用",
      en: "Bilingual Ready",
    },
    localeLabel: {
      "zh-CN": "语言",
      en: "Language",
    },
    locales: {
      "zh-CN": {
        "zh-CN": "中文",
        en: "英文",
      },
      en: {
        "zh-CN": "Chinese",
        en: "English",
      },
    },
    menu: {
      dashboard: {
        "zh-CN": "仪表盘",
        en: "Dashboard",
      },
      spaces: {
        "zh-CN": "空间",
        en: "Spaces",
      },
      nodes: {
        "zh-CN": "节点",
        en: "Nodes",
      },
      timeline: {
        "zh-CN": "时间线",
        en: "Timeline",
      },
    },
  },
} as const;

export function pickMessage(
  message: Record<UiLocale, string>,
  locale: UiLocale,
) {
  return message[locale];
}
