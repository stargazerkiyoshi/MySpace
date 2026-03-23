import { pickMessage } from "@/shared/i18n/shared.messages";
import type { UiLocale } from "@/shared/i18n/types";

const messages = {
  page: {
    title: {
      "zh-CN": "时间线占位",
      en: "Timeline Placeholder",
    },
    description: {
      "zh-CN": "独立时间线页仍然保留为后续能力入口，当前最小闭环承载在具体 Space 页面内。",
      en: "The standalone timeline page remains a future entry point, while the current minimal loop lives inside each Space page.",
    },
    badge: {
      "zh-CN": "时间线",
      en: "Timeline",
    },
    requestError: {
      "zh-CN": "独立时间线页当前没有单独数据入口。",
      en: "The standalone timeline page does not have a dedicated data entry yet.",
    },
  },
  widget: {
    title: {
      "zh-CN": "最近变化",
      en: "Recent Activity",
    },
    description: {
      "zh-CN": "这里展示当前空间最近发生的关键变化，帮助你看到过程推进的痕迹。",
      en: "This section shows the latest key changes in the current space so you can see how work is progressing.",
    },
    empty: {
      "zh-CN": "当前空间还没有可展示的时间线事件。先创建或更新一个节点。",
      en: "There are no timeline events for this space yet. Create or update a node first.",
    },
    loadError: {
      "zh-CN": "时间线加载失败",
      en: "Failed to load timeline",
    },
    targetLabel: {
      "zh-CN": "关联对象",
      en: "Target",
    },
    timeLabel: {
      "zh-CN": "发生时间",
      en: "Time",
    },
  },
  eventType: {
    nodeCreated: {
      "zh-CN": "节点创建",
      en: "Node Created",
    },
    nodeUpdated: {
      "zh-CN": "节点更新",
      en: "Node Updated",
    },
    nodeStatusChanged: {
      "zh-CN": "状态变更",
      en: "Status Changed",
    },
  },
  summary: {
    nodeCreated: {
      "zh-CN": "创建了节点“{title}”",
      en: 'Created node "{title}"',
    },
    nodeUpdated: {
      "zh-CN": "更新了节点“{title}”",
      en: 'Updated node "{title}"',
    },
    nodeStatusChanged: {
      "zh-CN": "将节点“{title}”状态从 {from} 变更为 {to}",
      en: 'Changed node "{title}" from {from} to {to}',
    },
  },
  cards: {
    activity: {
      title: {
        "zh-CN": "活动流",
        en: "Activity Stream",
      },
      description: {
        "zh-CN": "未来承载跨空间时间线入口。",
        en: "Will host a broader activity stream entry in the future.",
      },
    },
    snapshots: {
      title: {
        "zh-CN": "快照",
        en: "Snapshots",
      },
      description: {
        "zh-CN": "未来承载阶段状态切片。",
        en: "Will host stage-based state snapshots in the future.",
      },
    },
    historyTree: {
      title: {
        "zh-CN": "历史树",
        en: "History Tree",
      },
      description: {
        "zh-CN": "本次只建立最小历史记录，不实现复杂结构。",
        en: "This change only introduces minimal history records, not the full structure.",
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
    widget: {
      title: pickMessage(messages.widget.title, locale),
      description: pickMessage(messages.widget.description, locale),
      empty: pickMessage(messages.widget.empty, locale),
      loadError: pickMessage(messages.widget.loadError, locale),
      targetLabel: pickMessage(messages.widget.targetLabel, locale),
      timeLabel: pickMessage(messages.widget.timeLabel, locale),
    },
    eventType: {
      nodeCreated: pickMessage(messages.eventType.nodeCreated, locale),
      nodeUpdated: pickMessage(messages.eventType.nodeUpdated, locale),
      nodeStatusChanged: pickMessage(messages.eventType.nodeStatusChanged, locale),
    },
    summary: {
      nodeCreated: pickMessage(messages.summary.nodeCreated, locale),
      nodeUpdated: pickMessage(messages.summary.nodeUpdated, locale),
      nodeStatusChanged: pickMessage(messages.summary.nodeStatusChanged, locale),
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
