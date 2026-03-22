import { Alert } from "antd";
import { useUiLocaleStore } from "@/shared/state/ui-locale.store";
import { PlaceholderGrid } from "@/shared/ui/PlaceholderGrid";
import { getDashboardMessages } from "../i18n";
import type { DashboardCard } from "../types";

type DashboardOverviewProps = {
  items: DashboardCard[];
  requestState: "idle" | "error" | "success";
};

export function DashboardOverview({
  items,
  requestState,
}: DashboardOverviewProps) {
  const locale = useUiLocaleStore((state) => state.locale);
  const messages = getDashboardMessages(locale).page;

  return (
    <>
      {requestState === "error" ? (
        <Alert
          type="warning"
          showIcon
          message={messages.requestError}
        />
      ) : null}
      <PlaceholderGrid items={items} />
    </>
  );
}
