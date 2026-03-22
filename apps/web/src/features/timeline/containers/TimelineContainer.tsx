import { useUiLocaleStore } from "@/shared/state/ui-locale.store";
import { PageSection } from "@/shared/ui/PageSection";
import { TimelineOverview } from "../components/TimelineOverview";
import { useTimelineQuery } from "../hooks";
import { getTimelineMessages } from "../i18n";
import { getTimelinePlaceholderCards } from "../utils";

export function TimelineContainer() {
  const query = useTimelineQuery();
  const locale = useUiLocaleStore((state) => state.locale);
  const messages = getTimelineMessages(locale).page;

  return (
    <PageSection
      title={messages.title}
      description={messages.description}
      badge={messages.badge}
    >
      <TimelineOverview
        items={getTimelinePlaceholderCards(locale)}
        requestState={query.isError ? "error" : query.isSuccess ? "success" : "idle"}
      />
    </PageSection>
  );
}
