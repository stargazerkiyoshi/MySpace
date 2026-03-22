import { Alert } from "antd";
import { useUiLocaleStore } from "@/shared/state/ui-locale.store";
import { PlaceholderGrid } from "@/shared/ui/PlaceholderGrid";
import { getNodeMessages } from "../i18n";
import type { NodeCard } from "../types";

type NodeOverviewProps = {
  items: NodeCard[];
  requestState: "idle" | "error" | "success";
};

export function NodeOverview({ items, requestState }: NodeOverviewProps) {
  const locale = useUiLocaleStore((state) => state.locale);
  const messages = getNodeMessages(locale).page;

  return (
    <>
      {requestState === "error" ? (
        <Alert type="warning" showIcon message={messages.requestError} />
      ) : null}
      <PlaceholderGrid items={items} />
    </>
  );
}
