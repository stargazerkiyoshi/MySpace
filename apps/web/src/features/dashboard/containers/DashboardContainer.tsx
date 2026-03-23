import { useUiLocaleStore } from "@/shared/state/ui-locale.store";
import { PageSection } from "@/shared/ui/PageSection";
import { DashboardOverview } from "../components/DashboardOverview";
import { useDashboardQuery } from "../hooks";
import { getDashboardMessages } from "../i18n";

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
        dashboard={query.data}
        requestState={query.isError ? "error" : query.isSuccess ? "success" : "idle"}
      />
    </PageSection>
  );
}
