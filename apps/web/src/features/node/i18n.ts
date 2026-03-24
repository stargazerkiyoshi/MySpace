import { pickMessage } from "@/shared/i18n/shared.messages";
import type { UiLocale } from "@/shared/i18n/types";

const messages = {
  page: {
    title: {
      "zh-CN": "节点占位页",
      en: "Nodes Placeholder",
    },
    description: {
      "zh-CN":
        "该页面保留为节点独立工作区的后续入口。当前 Node 的最小业务闭环承载在具体 Space 页面内。",
      en: "This page remains reserved as a future standalone node workspace. The current minimum node loop lives inside each Space page.",
    },
    badge: {
      "zh-CN": "节点",
      en: "Node",
    },
    requestError: {
      "zh-CN": "节点占位页当前没有独立数据入口。",
      en: "The standalone node placeholder page does not have a dedicated data entry yet.",
    },
  },
  cards: {
    tree: {
      title: {
        "zh-CN": "节点树",
        en: "Node Tree",
      },
      description: {
        "zh-CN": "未来承载节点层级与过滤。",
        en: "Will host node hierarchy and filtering.",
      },
    },
    canvas: {
      title: {
        "zh-CN": "节点画布",
        en: "Node Canvas",
      },
      description: {
        "zh-CN": "未来承载节点内容编辑视图。",
        en: "Will host the node content editing view.",
      },
    },
    relations: {
      title: {
        "zh-CN": "关系",
        en: "Relations",
      },
      description: {
        "zh-CN": "未来承载节点关系与引用信息。",
        en: "Will host node relations and references.",
      },
    },
  },
  workspace: {
    title: {
      "zh-CN": "节点",
      en: "Nodes",
    },
    description: {
      "zh-CN": "在当前空间内创建、查看并编辑节点，形成第一版结构化内容闭环。",
      en: "Create, review, and edit nodes inside the current space to form the first structured content loop.",
    },
    createTitle: {
      "zh-CN": "创建节点",
      en: "Create Node",
    },
    listTitle: {
      "zh-CN": "节点列表",
      en: "Node List",
    },
    detailTitle: {
      "zh-CN": "节点详情",
      en: "Node Detail",
    },
    listLoadError: {
      "zh-CN": "节点列表加载失败",
      en: "Failed to load nodes",
    },
    detailLoadError: {
      "zh-CN": "节点详情加载失败",
      en: "Failed to load node details",
    },
    createError: {
      "zh-CN": "节点创建失败",
      en: "Failed to create node",
    },
    createSuccess: {
      "zh-CN": "节点创建成功",
      en: "Node created",
    },
    updateError: {
      "zh-CN": "节点更新失败",
      en: "Failed to update node",
    },
    updateSuccess: {
      "zh-CN": "节点更新成功",
      en: "Node updated",
    },
    emptyDetail: {
      "zh-CN": "请选择一个节点，或先创建一个新的节点。",
      en: "Select a node, or create a new one first.",
    },
  },
  graph: {
    tab: {
      "zh-CN": "结构视图",
      en: "Graph",
    },
    title: {
      "zh-CN": "节点结构视图",
      en: "Node Structure View",
    },
    description: {
      "zh-CN": "基于当前空间中的真实节点数据浏览结构分布，并为后续关系扩展预留入口。",
      en: "Browse the structural view with real node data from this space and keep room for richer relations later.",
    },
    loadError: {
      "zh-CN": "节点结构视图加载失败",
      en: "Failed to load the node graph",
    },
    empty: {
      "zh-CN": "当前空间还没有节点，结构视图会在创建节点后出现。",
      en: "There are no nodes in this space yet. The graph view will appear after nodes are created.",
    },
    emptyRelations: {
      "zh-CN": "当前空间还没有可识别的节点关系，首版仅展示真实节点分布。",
      en: "There are no recognizable node relations in this space yet, so the MVP only shows real nodes.",
    },
    stats: {
      "zh-CN": "已加载 {nodeCount} 个节点，{edgeCount} 条关系线。",
      en: "Loaded {nodeCount} nodes and {edgeCount} edges.",
    },
    selectedTitle: {
      "zh-CN": "节点摘要",
      en: "Node Summary",
    },
    noSelection: {
      "zh-CN": "选择一个节点后，这里会显示它的摘要与关系提示。",
      en: "Select a node to inspect its summary and relation hints here.",
    },
    neighborCount: {
      "zh-CN": "直接关联节点",
      en: "Direct Neighbors",
    },
    relationSource: {
      "zh-CN": "关系来源",
      en: "Relation Source",
    },
    relationSourceNone: {
      "zh-CN": "当前未接入独立关系模型",
      en: "No dedicated relation model is connected yet",
    },
    relationSourceTimeline: {
      "zh-CN": "基于 Timeline 结构推导",
      en: "Derived from timeline structure",
    },
    focusHint: {
      "zh-CN": "选中节点后会高亮其一跳邻居；当前关系线来自 Timeline 结构，后续可继续扩展为更稳定的节点关系模型。",
      en: "Selecting a node highlights its direct neighbors. The current edges are derived from the timeline structure and can later evolve into a dedicated node relation model.",
    },
    updatedAt: {
      "zh-CN": "最近更新",
      en: "Updated",
    },
    createdAt: {
      "zh-CN": "创建时间",
      en: "Created",
    },
    sourceKind: {
      "zh-CN": "数据来源",
      en: "Source",
    },
    sourceKindNode: {
      "zh-CN": "Node 主数据",
      en: "Node primary data",
    },
  },
  form: {
    titleLabel: {
      "zh-CN": "标题",
      en: "Title",
    },
    titleRequired: {
      "zh-CN": "请输入节点标题。",
      en: "Please enter a node title.",
    },
    titleMax: {
      "zh-CN": "节点标题不能超过 120 个字符。",
      en: "Node title must be 120 characters or less.",
    },
    titlePlaceholder: {
      "zh-CN": "例如：梳理发布时间线",
      en: "For example: Outline the launch timeline",
    },
    contentLabel: {
      "zh-CN": "内容",
      en: "Content",
    },
    contentMax: {
      "zh-CN": "节点内容不能超过 5000 个字符。",
      en: "Node content must be 5000 characters or less.",
    },
    contentPlaceholder: {
      "zh-CN": "补充这个节点的正文、上下文或处理结论。",
      en: "Add the body, context, or conclusion for this node.",
    },
    typeLabel: {
      "zh-CN": "类型",
      en: "Type",
    },
    statusLabel: {
      "zh-CN": "状态",
      en: "Status",
    },
    branchModeLabel: {
      "zh-CN": "主干记录",
      en: "Mainline record",
    },
    branchModeHelp: {
      "zh-CN": "开启时记录为主干推进，关闭时记录为分支路径。",
      en: "When on, the event is recorded on the mainline. When off, it is recorded as a branch path.",
    },
    mainlineOn: {
      "zh-CN": "主干",
      en: "Mainline",
    },
    mainlineOff: {
      "zh-CN": "分支",
      en: "Branch",
    },
    submitCreate: {
      "zh-CN": "创建节点",
      en: "Create Node",
    },
    submitUpdate: {
      "zh-CN": "保存修改",
      en: "Save Changes",
    },
  },
  list: {
    empty: {
      "zh-CN": "当前空间还没有节点。先创建第一个节点。",
      en: "There are no nodes in this space yet. Create the first node.",
    },
    open: {
      "zh-CN": "查看",
      en: "Open",
    },
    updatedAt: {
      "zh-CN": "最近更新",
      en: "Updated",
    },
    typeLabel: {
      "zh-CN": "类型",
      en: "Type",
    },
    statusLabel: {
      "zh-CN": "状态",
      en: "Status",
    },
    noContent: {
      "zh-CN": "暂无内容。",
      en: "No content yet.",
    },
  },
  detail: {
    metaTitle: {
      "zh-CN": "节点元信息",
      en: "Node Metadata",
    },
    createdAt: {
      "zh-CN": "创建时间",
      en: "Created At",
    },
    updatedAt: {
      "zh-CN": "更新时间",
      en: "Updated At",
    },
    noContent: {
      "zh-CN": "暂无内容。",
      en: "No content yet.",
    },
  },
  typeOptions: {
    note: {
      "zh-CN": "笔记",
      en: "Note",
    },
    task: {
      "zh-CN": "任务",
      en: "Task",
    },
    decision: {
      "zh-CN": "决策",
      en: "Decision",
    },
  },
  statusOptions: {
    todo: {
      "zh-CN": "待办",
      en: "Todo",
    },
    doing: {
      "zh-CN": "进行中",
      en: "Doing",
    },
    done: {
      "zh-CN": "已完成",
      en: "Done",
    },
  },
} as const;

export function getNodeMessages(locale: UiLocale) {
  return {
    page: {
      title: pickMessage(messages.page.title, locale),
      description: pickMessage(messages.page.description, locale),
      badge: pickMessage(messages.page.badge, locale),
      requestError: pickMessage(messages.page.requestError, locale),
    },
    cards: [
      {
        title: pickMessage(messages.cards.tree.title, locale),
        description: pickMessage(messages.cards.tree.description, locale),
      },
      {
        title: pickMessage(messages.cards.canvas.title, locale),
        description: pickMessage(messages.cards.canvas.description, locale),
      },
      {
        title: pickMessage(messages.cards.relations.title, locale),
        description: pickMessage(messages.cards.relations.description, locale),
      },
    ],
    workspace: {
      title: pickMessage(messages.workspace.title, locale),
      description: pickMessage(messages.workspace.description, locale),
      createTitle: pickMessage(messages.workspace.createTitle, locale),
      listTitle: pickMessage(messages.workspace.listTitle, locale),
      detailTitle: pickMessage(messages.workspace.detailTitle, locale),
      listLoadError: pickMessage(messages.workspace.listLoadError, locale),
      detailLoadError: pickMessage(messages.workspace.detailLoadError, locale),
      createError: pickMessage(messages.workspace.createError, locale),
      createSuccess: pickMessage(messages.workspace.createSuccess, locale),
      updateError: pickMessage(messages.workspace.updateError, locale),
      updateSuccess: pickMessage(messages.workspace.updateSuccess, locale),
      emptyDetail: pickMessage(messages.workspace.emptyDetail, locale),
    },
    graph: {
      tab: pickMessage(messages.graph.tab, locale),
      title: pickMessage(messages.graph.title, locale),
      description: pickMessage(messages.graph.description, locale),
      loadError: pickMessage(messages.graph.loadError, locale),
      empty: pickMessage(messages.graph.empty, locale),
      emptyRelations: pickMessage(messages.graph.emptyRelations, locale),
      stats: pickMessage(messages.graph.stats, locale),
      selectedTitle: pickMessage(messages.graph.selectedTitle, locale),
      noSelection: pickMessage(messages.graph.noSelection, locale),
      neighborCount: pickMessage(messages.graph.neighborCount, locale),
      relationSource: pickMessage(messages.graph.relationSource, locale),
      relationSourceNone: pickMessage(messages.graph.relationSourceNone, locale),
      relationSourceTimeline: pickMessage(messages.graph.relationSourceTimeline, locale),
      focusHint: pickMessage(messages.graph.focusHint, locale),
      updatedAt: pickMessage(messages.graph.updatedAt, locale),
      createdAt: pickMessage(messages.graph.createdAt, locale),
      sourceKind: pickMessage(messages.graph.sourceKind, locale),
      sourceKindNode: pickMessage(messages.graph.sourceKindNode, locale),
    },
    form: {
      titleLabel: pickMessage(messages.form.titleLabel, locale),
      titleRequired: pickMessage(messages.form.titleRequired, locale),
      titleMax: pickMessage(messages.form.titleMax, locale),
      titlePlaceholder: pickMessage(messages.form.titlePlaceholder, locale),
      contentLabel: pickMessage(messages.form.contentLabel, locale),
      contentMax: pickMessage(messages.form.contentMax, locale),
      contentPlaceholder: pickMessage(messages.form.contentPlaceholder, locale),
      typeLabel: pickMessage(messages.form.typeLabel, locale),
      statusLabel: pickMessage(messages.form.statusLabel, locale),
      branchModeLabel: pickMessage(messages.form.branchModeLabel, locale),
      branchModeHelp: pickMessage(messages.form.branchModeHelp, locale),
      mainlineOn: pickMessage(messages.form.mainlineOn, locale),
      mainlineOff: pickMessage(messages.form.mainlineOff, locale),
      submitCreate: pickMessage(messages.form.submitCreate, locale),
      submitUpdate: pickMessage(messages.form.submitUpdate, locale),
    },
    list: {
      empty: pickMessage(messages.list.empty, locale),
      open: pickMessage(messages.list.open, locale),
      updatedAt: pickMessage(messages.list.updatedAt, locale),
      typeLabel: pickMessage(messages.list.typeLabel, locale),
      statusLabel: pickMessage(messages.list.statusLabel, locale),
      noContent: pickMessage(messages.list.noContent, locale),
    },
    detail: {
      metaTitle: pickMessage(messages.detail.metaTitle, locale),
      createdAt: pickMessage(messages.detail.createdAt, locale),
      updatedAt: pickMessage(messages.detail.updatedAt, locale),
      noContent: pickMessage(messages.detail.noContent, locale),
    },
    typeOptions: {
      note: pickMessage(messages.typeOptions.note, locale),
      task: pickMessage(messages.typeOptions.task, locale),
      decision: pickMessage(messages.typeOptions.decision, locale),
    },
    statusOptions: {
      todo: pickMessage(messages.statusOptions.todo, locale),
      doing: pickMessage(messages.statusOptions.doing, locale),
      done: pickMessage(messages.statusOptions.done, locale),
    },
  };
}
