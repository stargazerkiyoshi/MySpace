import { useUiLocaleStore } from "@/shared/state/ui-locale.store";
import { PageSection } from "@/shared/ui/PageSection";
import { NodeOverview } from "../components/NodeOverview";
import { getNodeMessages } from "../i18n";
import { getNodePlaceholderCards } from "../utils";

export function NodeContainer() {
  const locale = useUiLocaleStore((state) => state.locale);
  const messages = getNodeMessages(locale).page;

  return (
    <PageSection
      title={messages.title}
      description={messages.description}
      badge={messages.badge}
    >
      <NodeOverview items={getNodePlaceholderCards(locale)} requestState="idle" />
    </PageSection>
  );
}
