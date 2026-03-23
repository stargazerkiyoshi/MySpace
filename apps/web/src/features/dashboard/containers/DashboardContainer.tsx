import { useUiLocaleStore } from "@/shared/state/ui-locale.store";
import { DashboardOverview } from "../components/DashboardOverview";
import { useDashboardQuery } from "../hooks";

export function DashboardContainer() {
  const query = useDashboardQuery();
  useUiLocaleStore((state) => state.locale);

  return (
    <DashboardOverview
      dashboard={query.data}
      requestState={query.isError ? "error" : query.isSuccess ? "success" : "idle"}
    />
  );
}
