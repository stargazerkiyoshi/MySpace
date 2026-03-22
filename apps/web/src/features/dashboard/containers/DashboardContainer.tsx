import { useUiLocaleStore } from "@/shared/state/ui-locale.store";
import { PageSection } from "@/shared/ui/PageSection";
import { DashboardOverview } from "../components/DashboardOverview";
import { useDashboardQuery } from "../hooks";
import { getDashboardMessages } from "../i18n";
import { getDashboardPlaceholderCards } from "../utils";

export function DashboardContainer() {
  const query = useDashboardQuery();
  const locale = useUiLocaleStore((state) => state.locale);
  const messages = getDashboardMessages(locale).page;

  return (
    <PageSection
      title={messages.title}
      description={messages.description}
      badge={messages.badge}
    >
      <DashboardOverview
        items={getDashboardPlaceholderCards(locale)}
        requestState={query.isError ? "error" : query.isSuccess ? "success" : "idle"}
      />
    </PageSection>
  );
}
