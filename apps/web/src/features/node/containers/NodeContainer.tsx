import { useUiLocaleStore } from "@/shared/state/ui-locale.store";
import { NodeOverview } from "../components/NodeOverview";
import { getNodeMessages } from "../i18n";
import { getNodePlaceholderCards } from "../utils";

export function NodeContainer() {
  const locale = useUiLocaleStore((state) => state.locale);

  return (
    <NodeOverview items={getNodePlaceholderCards(locale)} requestState="idle" />
  );
}
