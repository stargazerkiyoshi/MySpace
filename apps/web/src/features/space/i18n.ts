import { pickMessage } from "@/shared/i18n/shared.messages";
import type { UiLocale } from "@/shared/i18n/types";

const messages = {
  listPage: {
    title: {
      "zh-CN": "空间",
      en: "Spaces",
    },
    description: {
      "zh-CN": "空间是系统中的第一性对象。你可以在这里创建、查看并进入具体的协作空间。",
      en: "Space is the system's primary object. Create, review, and enter concrete collaboration spaces here.",
    },
    createTitle: {
      "zh-CN": "创建空间",
      en: "Create Space",
    },
    listLoadError: {
      "zh-CN": "空间列表加载失败",
      en: "Failed to load spaces",
    },
    createError: {
      "zh-CN": "空间创建失败",
      en: "Failed to create space",
    },
    createSuccess: {
      "zh-CN": "空间创建成功",
      en: "Space created",
    },
    createSuccessDescription: {
      "zh-CN": "列表已刷新，你现在可以直接进入新创建的空间。",
      en: "The list has been refreshed and you can enter the new space now.",
    },
  },
  detailPage: {
    title: {
      "zh-CN": "空间首页",
      en: "Space Home",
    },
    description: {
      "zh-CN": "这里展示当前空间的基础信息，并承载节点内容与后续能力入口。",
      en: "This page shows the current space basics and hosts the node workspace plus future capability entry points.",
    },
    badge: {
      "zh-CN": "空间详情",
      en: "Space Detail",
    },
    loadError: {
      "zh-CN": "空间详情加载失败",
      en: "Failed to load space details",
    },
  },
  form: {
    nameLabel: {
      "zh-CN": "空间名称",
      en: "Space Name",
    },
    nameRequired: {
      "zh-CN": "请输入空间名称。",
      en: "Please enter a space name.",
    },
    nameMax: {
      "zh-CN": "空间名称不能超过 80 个字符。",
      en: "Space name must be 80 characters or less.",
    },
    namePlaceholder: {
      "zh-CN": "例如：产品发布协作空间",
      en: "For example: Product Launch Collaboration",
    },
    descriptionLabel: {
      "zh-CN": "描述",
      en: "Description",
    },
    descriptionMax: {
      "zh-CN": "描述不能超过 400 个字符。",
      en: "Description must be 400 characters or less.",
    },
    descriptionPlaceholder: {
      "zh-CN": "简要说明这个空间正在承载的目标或事项。",
      en: "Briefly describe the goal or work stream this space carries.",
    },
    submit: {
      "zh-CN": "创建空间",
      en: "Create Space",
    },
  },
  list: {
    empty: {
      "zh-CN": "还没有空间。先创建一个新的协作空间。",
      en: "There are no spaces yet. Create a new collaboration space first.",
    },
    open: {
      "zh-CN": "进入空间",
      en: "Open Space",
    },
    noDescription: {
      "zh-CN": "暂无描述。",
      en: "No description yet.",
    },
    createdAt: {
      "zh-CN": "创建于",
      en: "Created",
    },
  },
  detail: {
    back: {
      "zh-CN": "返回空间列表",
      en: "Back to Spaces",
    },
    slug: {
      "zh-CN": "Slug",
      en: "Slug",
    },
    description: {
      "zh-CN": "描述",
      en: "Description",
    },
    noDescription: {
      "zh-CN": "暂无描述。",
      en: "No description yet.",
    },
    createdAt: {
      "zh-CN": "创建时间",
      en: "Created At",
    },
    updatedAt: {
      "zh-CN": "更新时间",
      en: "Updated At",
    },
    placeholderTitle: {
      "zh-CN": "后续能力占位",
      en: "Future Capabilities",
    },
    placeholderDescription: {
      "zh-CN": "当前空间已经承载第一版节点内容。后续这里还会逐步接入时间线、快照、同步候选和 Agent 相关入口。",
      en: "The current space now hosts the first node content loop. Timeline, snapshots, sync candidates, and agent entry points will arrive here in later changes.",
    },
    placeholderEmpty: {
      "zh-CN": "更多子能力将在新的 OpenSpec 变更中补齐。",
      en: "Additional capabilities will be added in new OpenSpec changes.",
    },
  },
} as const;

export function getSpaceMessages(locale: UiLocale) {
  return {
    listPage: {
      title: pickMessage(messages.listPage.title, locale),
      description: pickMessage(messages.listPage.description, locale),
      createTitle: pickMessage(messages.listPage.createTitle, locale),
      listLoadError: pickMessage(messages.listPage.listLoadError, locale),
      createError: pickMessage(messages.listPage.createError, locale),
      createSuccess: pickMessage(messages.listPage.createSuccess, locale),
      createSuccessDescription: pickMessage(
        messages.listPage.createSuccessDescription,
        locale,
      ),
    },
    detailPage: {
      title: pickMessage(messages.detailPage.title, locale),
      description: pickMessage(messages.detailPage.description, locale),
      badge: pickMessage(messages.detailPage.badge, locale),
      loadError: pickMessage(messages.detailPage.loadError, locale),
    },
    form: {
      nameLabel: pickMessage(messages.form.nameLabel, locale),
      nameRequired: pickMessage(messages.form.nameRequired, locale),
      nameMax: pickMessage(messages.form.nameMax, locale),
      namePlaceholder: pickMessage(messages.form.namePlaceholder, locale),
      descriptionLabel: pickMessage(messages.form.descriptionLabel, locale),
      descriptionMax: pickMessage(messages.form.descriptionMax, locale),
      descriptionPlaceholder: pickMessage(
        messages.form.descriptionPlaceholder,
        locale,
      ),
      submit: pickMessage(messages.form.submit, locale),
    },
    list: {
      empty: pickMessage(messages.list.empty, locale),
      open: pickMessage(messages.list.open, locale),
      noDescription: pickMessage(messages.list.noDescription, locale),
      createdAt: pickMessage(messages.list.createdAt, locale),
    },
    detail: {
      back: pickMessage(messages.detail.back, locale),
      slug: pickMessage(messages.detail.slug, locale),
      description: pickMessage(messages.detail.description, locale),
      noDescription: pickMessage(messages.detail.noDescription, locale),
      createdAt: pickMessage(messages.detail.createdAt, locale),
      updatedAt: pickMessage(messages.detail.updatedAt, locale),
      placeholderTitle: pickMessage(messages.detail.placeholderTitle, locale),
      placeholderDescription: pickMessage(
        messages.detail.placeholderDescription,
        locale,
      ),
      placeholderEmpty: pickMessage(messages.detail.placeholderEmpty, locale),
    },
  };
}
