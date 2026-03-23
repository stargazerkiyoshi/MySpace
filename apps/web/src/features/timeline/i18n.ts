import { pickMessage } from "@/shared/i18n/shared.messages";
import type { UiLocale } from "@/shared/i18n/types";

const messages = {
  page: {
    title: {
      "zh-CN": "时间线",
      en: "Timeline",
    },
    description: {
      "zh-CN": "独立时间线页仍保留为后续入口，当前最小历史闭环承载在具体 Space 页面内。",
      en: "The standalone timeline page remains a future entry point. The current minimum history loop lives inside each Space page.",
    },
    badge: {
      "zh-CN": "时间线",
      en: "Timeline",
    },
    requestError: {
      "zh-CN": "当前还没有独立时间线页面的数据入口。",
      en: "The standalone timeline page does not have a dedicated data source yet.",
    },
  },
  widget: {
    title: {
      "zh-CN": "最近变化",
      en: "Recent History",
    },
    description: {
      "zh-CN": "这里展示当前空间最近发生的关键变化，帮助你理解主线、分支，以及它们与当前状态的关系。",
      en: "This section shows the latest changes in the current space so you can understand the mainline, branches, and their relation to the current state.",
    },
    empty: {
      "zh-CN": "当前空间还没有可展示的时间线节点。先创建或更新一个节点。",
      en: "There are no timeline events for this space yet. Create or update a node first.",
    },
    loadError: {
      "zh-CN": "时间线加载失败",
      en: "Failed to load timeline",
    },
    detailLoadError: {
      "zh-CN": "时间线详情加载失败",
      en: "Failed to load timeline detail",
    },
    timeLabel: {
      "zh-CN": "发生时间",
      en: "Time",
    },
    structureLabel: {
      "zh-CN": "结构归属",
      en: "Structure",
    },
    targetLabel: {
      "zh-CN": "关联对象",
      en: "Target",
    },
    detailTrigger: {
      "zh-CN": "查看详情",
      en: "View details",
    },
    selected: {
      "zh-CN": "当前查看",
      en: "Selected",
    },
    keyNode: {
      "zh-CN": "关键节点",
      en: "Key Node",
    },
    affectsCurrentState: {
      "zh-CN": "影响当前状态",
      en: "Affects Current State",
    },
  },
  detail: {
    title: {
      "zh-CN": "历史节点详情",
      en: "History Node Detail",
    },
    empty: {
      "zh-CN": "选择一个时间线节点后，这里会展示它的结构关系和对当前状态的影响。",
      en: "Select a timeline event to inspect its structure and impact.",
    },
    summary: {
      "zh-CN": "事件摘要",
      en: "Summary",
    },
    description: {
      "zh-CN": "简述 / 描述",
      en: "Description",
    },
    impactSummary: {
      "zh-CN": "对当前状态的影响",
      en: "Impact on Current State",
    },
    currentStateRelation: {
      "zh-CN": "与当前状态的关系",
      en: "Relation to Current State",
    },
    previousNode: {
      "zh-CN": "前置节点",
      en: "Previous Node",
    },
    nextNodes: {
      "zh-CN": "后继节点",
      en: "Next Nodes",
    },
    noPreviousNode: {
      "zh-CN": "没有前置节点",
      en: "No previous node",
    },
    noNextNodes: {
      "zh-CN": "还没有后继节点",
      en: "No next nodes yet",
    },
    isMainline: {
      "zh-CN": "是否主干",
      en: "Mainline",
    },
    branchFromNodeId: {
      "zh-CN": "分支来源",
      en: "Branch From",
    },
    mergeToNodeId: {
      "zh-CN": "回归主线",
      en: "Merge Target",
    },
    yes: {
      "zh-CN": "是",
      en: "Yes",
    },
    no: {
      "zh-CN": "否",
      en: "No",
    },
    notPlanned: {
      "zh-CN": "当前未设置",
      en: "Not set yet",
    },
    impactType: {
      "zh-CN": "影响类型",
      en: "Impact Type",
    },
    entersCurrentMainline: {
      "zh-CN": "是否进入当前主线",
      en: "Enters Current Mainline",
    },
    isCurrentStateSource: {
      "zh-CN": "是否是当前状态来源",
      en: "Is Current State Source",
    },
    isCurrentMainlineAnchor: {
      "zh-CN": "是否是当前主线锚点",
      en: "Is Current Mainline Anchor",
    },
    isAffectingCurrentState: {
      "zh-CN": "是否仍影响当前状态",
      en: "Still Affects Current State",
    },
  },
  structure: {
    mainline: {
      "zh-CN": "主干",
      en: "Mainline",
    },
    branch: {
      "zh-CN": "分支",
      en: "Branch",
    },
  },
  nodeType: {
    mainlineProgress: {
      "zh-CN": "主线推进",
      en: "Mainline Progress",
    },
    branchCreated: {
      "zh-CN": "分支产生",
      en: "Branch Created",
    },
    decision: {
      "zh-CN": "决策",
      en: "Decision",
    },
    externalEvent: {
      "zh-CN": "外部事件",
      en: "External Event",
    },
    completed: {
      "zh-CN": "完成",
      en: "Completed",
    },
    interrupted: {
      "zh-CN": "中断",
      en: "Interrupted",
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
  impactType: {
    progressing: {
      "zh-CN": "推进",
      en: "Progressing",
    },
    diverted: {
      "zh-CN": "偏移",
      en: "Diverted",
    },
    interrupted: {
      "zh-CN": "中断",
      en: "Interrupted",
    },
    inactive: {
      "zh-CN": "已失效",
      en: "Inactive",
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
      detailLoadError: pickMessage(messages.widget.detailLoadError, locale),
      timeLabel: pickMessage(messages.widget.timeLabel, locale),
      structureLabel: pickMessage(messages.widget.structureLabel, locale),
      targetLabel: pickMessage(messages.widget.targetLabel, locale),
      detailTrigger: pickMessage(messages.widget.detailTrigger, locale),
      selected: pickMessage(messages.widget.selected, locale),
      keyNode: pickMessage(messages.widget.keyNode, locale),
      affectsCurrentState: pickMessage(messages.widget.affectsCurrentState, locale),
    },
    detail: {
      title: pickMessage(messages.detail.title, locale),
      empty: pickMessage(messages.detail.empty, locale),
      summary: pickMessage(messages.detail.summary, locale),
      description: pickMessage(messages.detail.description, locale),
      impactSummary: pickMessage(messages.detail.impactSummary, locale),
      currentStateRelation: pickMessage(messages.detail.currentStateRelation, locale),
      previousNode: pickMessage(messages.detail.previousNode, locale),
      nextNodes: pickMessage(messages.detail.nextNodes, locale),
      noPreviousNode: pickMessage(messages.detail.noPreviousNode, locale),
      noNextNodes: pickMessage(messages.detail.noNextNodes, locale),
      isMainline: pickMessage(messages.detail.isMainline, locale),
      branchFromNodeId: pickMessage(messages.detail.branchFromNodeId, locale),
      mergeToNodeId: pickMessage(messages.detail.mergeToNodeId, locale),
      yes: pickMessage(messages.detail.yes, locale),
      no: pickMessage(messages.detail.no, locale),
      notPlanned: pickMessage(messages.detail.notPlanned, locale),
      impactType: pickMessage(messages.detail.impactType, locale),
      entersCurrentMainline: pickMessage(messages.detail.entersCurrentMainline, locale),
      isCurrentStateSource: pickMessage(messages.detail.isCurrentStateSource, locale),
      isCurrentMainlineAnchor: pickMessage(messages.detail.isCurrentMainlineAnchor, locale),
      isAffectingCurrentState: pickMessage(messages.detail.isAffectingCurrentState, locale),
    },
    structure: {
      mainline: pickMessage(messages.structure.mainline, locale),
      branch: pickMessage(messages.structure.branch, locale),
    },
    nodeType: {
      mainlineProgress: pickMessage(messages.nodeType.mainlineProgress, locale),
      branchCreated: pickMessage(messages.nodeType.branchCreated, locale),
      decision: pickMessage(messages.nodeType.decision, locale),
      externalEvent: pickMessage(messages.nodeType.externalEvent, locale),
      completed: pickMessage(messages.nodeType.completed, locale),
      interrupted: pickMessage(messages.nodeType.interrupted, locale),
    },
    eventType: {
      nodeCreated: pickMessage(messages.eventType.nodeCreated, locale),
      nodeUpdated: pickMessage(messages.eventType.nodeUpdated, locale),
      nodeStatusChanged: pickMessage(messages.eventType.nodeStatusChanged, locale),
    },
    impactType: {
      progressing: pickMessage(messages.impactType.progressing, locale),
      diverted: pickMessage(messages.impactType.diverted, locale),
      interrupted: pickMessage(messages.impactType.interrupted, locale),
      inactive: pickMessage(messages.impactType.inactive, locale),
    },
  };
}
