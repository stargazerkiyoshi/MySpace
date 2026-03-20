import { PageSection } from "@/shared/ui/PageSection";
import { DashboardOverview } from "../components/DashboardOverview";
import { useDashboardQuery } from "../hooks";
import { getDashboardPlaceholderCards } from "../utils";

export function DashboardContainer() {
  const query = useDashboardQuery();

  return (
    <PageSection
      title="Dashboard Placeholder"
      description="用于承载空间协作系统的总览入口，后续可接入统计、活跃空间和任务概览。"
      badge="Dashboard"
    >
      <DashboardOverview
        items={getDashboardPlaceholderCards()}
        requestState={query.isError ? "error" : query.isSuccess ? "success" : "idle"}
      />
    </PageSection>
  );
}
