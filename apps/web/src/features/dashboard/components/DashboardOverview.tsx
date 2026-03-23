import { Alert } from "antd";
import { useUiLocaleStore } from "@/shared/state/ui-locale.store";
import { getDashboardMessages } from "../i18n";
import type { DashboardResponse } from "../types";
import { CurrentStateOverview } from "./CurrentStateOverview";

type DashboardOverviewProps = {
  dashboard?: DashboardResponse;
  requestState: "idle" | "error" | "success";
};

export function DashboardOverview({
  dashboard,
  requestState,
}: DashboardOverviewProps) {
  const locale = useUiLocaleStore((state) => state.locale);
  const messages = getDashboardMessages(locale).page;

  return (
    <>
      {requestState === "error" ? (
        <Alert type="warning" showIcon message={messages.requestError} />
      ) : null}
      <CurrentStateOverview
        dashboard={
          dashboard ?? {
            module: "dashboard",
            status: "empty",
            activeSpace: null,
            currentState: null,
          }
        }
      />
    </>
  );
}
