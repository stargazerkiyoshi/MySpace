import { useUiLocaleStore } from "@/shared/state/ui-locale.store";
import { TimelineOverview } from "../components/TimelineOverview";
import { getTimelinePlaceholderCards } from "../utils";

export function TimelineContainer() {
  const locale = useUiLocaleStore((state) => state.locale);

  return (
    <TimelineOverview
      items={getTimelinePlaceholderCards(locale)}
      requestState="idle"
    />
  );
}
