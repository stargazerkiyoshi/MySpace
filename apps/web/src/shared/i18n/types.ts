export const uiLocales = ["zh-CN", "en"] as const;

export type UiLocale = (typeof uiLocales)[number];
