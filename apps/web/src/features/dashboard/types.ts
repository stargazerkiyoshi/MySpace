export type DashboardResponse = {
  module: string;
  status: "empty" | "ready";
  activeSpace: DashboardActiveSpace | null;
  currentState: DashboardCurrentState | null;
};

export type DashboardActiveSpace = {
  id: string;
  name: string;
  slug: string;
};

export type DashboardHistoryNode = {
  eventId: string;
  spaceId: string;
  targetId: string;
  title: string;
  summary: string;
  nodeType: string;
  isMainline: boolean;
  createdAt: string;
};

export type DashboardCurrentState = {
  currentMainlineNodeId: string | null;
  currentStateSourceNodeId: string | null;
  latestMainlineEventId: string | null;
  latestBranchEventId: string | null;
  activeBranchId: string | null;
  currentMainlineAnchor: DashboardHistoryNode | null;
  currentStateSource: DashboardHistoryNode | null;
  latestKeyProgress: DashboardHistoryNode | null;
  latestBranch: DashboardHistoryNode | null;
};
