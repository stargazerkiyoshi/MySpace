export class DashboardHistoryNodeDto {
  eventId!: string;
  spaceId!: string;
  targetId!: string;
  title!: string;
  summary!: string;
  nodeType!: string;
  isMainline!: boolean;
  createdAt!: string;
}

export class CurrentStateLinkingDto {
  currentMainlineNodeId!: string | null;
  currentStateSourceNodeId!: string | null;
  latestMainlineEventId!: string | null;
  latestBranchEventId!: string | null;
  activeBranchId!: string | null;
  currentMainlineAnchor!: DashboardHistoryNodeDto | null;
  currentStateSource!: DashboardHistoryNodeDto | null;
  latestKeyProgress!: DashboardHistoryNodeDto | null;
  latestBranch!: DashboardHistoryNodeDto | null;
}

export class DashboardActiveSpaceDto {
  id!: string;
  name!: string;
  slug!: string;
}

export class DashboardResponseDto {
  module!: string;
  status!: string;
  activeSpace!: DashboardActiveSpaceDto | null;
  currentState!: CurrentStateLinkingDto | null;
}
