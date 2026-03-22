import { create } from "zustand";
import type { UiLocale } from "@/shared/i18n/types";

const STORAGE_KEY = "ui-locale";
const DEFAULT_LOCALE: UiLocale = "zh-CN";

type UiLocaleState = {
  locale: UiLocale;
  setLocale: (locale: UiLocale) => void;
};

function getInitialLocale(): UiLocale {
  if (typeof window === "undefined") {
    return DEFAULT_LOCALE;
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "en" || stored === "zh-CN" ? stored : DEFAULT_LOCALE;
}

export const useUiLocaleStore = create<UiLocaleState>((set) => ({
  locale: getInitialLocale(),
  setLocale: (locale) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, locale);
    }

    set({ locale });
  },
}));
