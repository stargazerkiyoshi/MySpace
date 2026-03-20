import { PageSection } from "@/shared/ui/PageSection";
import { TimelineOverview } from "../components/TimelineOverview";
import { useTimelineQuery } from "../hooks";
import { getTimelinePlaceholderCards } from "../utils";

export function TimelineContainer() {
  const query = useTimelineQuery();

  return (
    <PageSection
      title="Timeline Placeholder"
      description="时间线页为事件流、版本轨迹和后续历史能力保留边界，但不在本次实现完整历史图谱。"
      badge="Timeline"
    >
      <TimelineOverview
        items={getTimelinePlaceholderCards()}
        requestState={query.isError ? "error" : query.isSuccess ? "success" : "idle"}
      />
    </PageSection>
  );
}
