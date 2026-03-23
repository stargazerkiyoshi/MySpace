export const timelineImpactTypeValues = [
  "progressing",
  "diverted",
  "interrupted",
  "inactive",
] as const;

export type TimelineImpactTypeValue =
  (typeof timelineImpactTypeValues)[number];

export type CurrentStateLinkingEvent = {
  id: string;
  spaceId: string;
  targetId: string;
  title: string;
  summary: string;
  nodeType: string;
  isMainline: boolean;
  parentNodeId: string | null;
  branchFromNodeId: string | null;
  mergeToNodeId: string | null;
  createdAt: Date;
};

export type CurrentStateLinkingSummary = {
  eventId: string;
  spaceId: string;
  targetId: string;
  title: string;
  summary: string;
  nodeType: string;
  isMainline: boolean;
  createdAt: string;
};

export type CurrentStateLinkingSnapshot = {
  currentMainlineNodeId: string | null;
  currentStateSourceNodeId: string | null;
  latestMainlineEventId: string | null;
  latestBranchEventId: string | null;
  activeBranchId: string | null;
  currentMainlineAnchor: CurrentStateLinkingSummary | null;
  currentStateSource: CurrentStateLinkingSummary | null;
  latestKeyProgress: CurrentStateLinkingSummary | null;
  latestBranch: CurrentStateLinkingSummary | null;
  lineageIds: Set<string>;
};

export type CurrentStateTimelineRelation = {
  entersCurrentMainline: boolean;
  isCurrentStateSource: boolean;
  isCurrentMainlineAnchor: boolean;
  isAffectingCurrentState: boolean;
  impactType: TimelineImpactTypeValue;
};

export function buildCurrentStateLinkingSnapshot(
  items: CurrentStateLinkingEvent[],
): CurrentStateLinkingSnapshot {
  const sorted = [...items].sort(
    (left, right) => right.createdAt.getTime() - left.createdAt.getTime(),
  );

  const currentMainline = sorted.find((item) => item.isMainline) ?? null;
  const latestBranch = sorted.find((item) => !item.isMainline) ?? null;
  const latestKeyProgress =
    sorted.find(
      (item) =>
        item.isMainline &&
        ["MAINLINE_PROGRESS", "DECISION", "COMPLETED"].includes(item.nodeType),
    ) ?? currentMainline;

  const eventMap = new Map(sorted.map((item) => [item.id, item]));
  const lineageIds = new Set<string>();

  let cursor = currentMainline;
  while (cursor) {
    lineageIds.add(cursor.id);
    cursor = cursor.parentNodeId ? eventMap.get(cursor.parentNodeId) ?? null : null;
  }

  return {
    currentMainlineNodeId: currentMainline?.id ?? null,
    currentStateSourceNodeId: currentMainline?.id ?? null,
    latestMainlineEventId: currentMainline?.id ?? null,
    latestBranchEventId: latestBranch?.id ?? null,
    activeBranchId: latestBranch?.id ?? null,
    currentMainlineAnchor: currentMainline
      ? toCurrentStateSummary(currentMainline)
      : null,
    currentStateSource: currentMainline
      ? toCurrentStateSummary(currentMainline)
      : null,
    latestKeyProgress: latestKeyProgress
      ? toCurrentStateSummary(latestKeyProgress)
      : null,
    latestBranch: latestBranch ? toCurrentStateSummary(latestBranch) : null,
    lineageIds,
  };
}

export function resolveCurrentStateTimelineRelation(
  item: CurrentStateLinkingEvent,
  snapshot: CurrentStateLinkingSnapshot,
): CurrentStateTimelineRelation {
  const isCurrentMainlineAnchor = item.id === snapshot.currentMainlineNodeId;
  const isCurrentStateSource = item.id === snapshot.currentStateSourceNodeId;
  const entersCurrentMainline =
    item.isMainline && snapshot.lineageIds.has(item.id);

  if (isCurrentStateSource || isCurrentMainlineAnchor || entersCurrentMainline) {
    return {
      entersCurrentMainline,
      isCurrentStateSource,
      isCurrentMainlineAnchor,
      isAffectingCurrentState: true,
      impactType: "progressing",
    };
  }

  if (item.nodeType === "INTERRUPTED") {
    return {
      entersCurrentMainline: false,
      isCurrentStateSource: false,
      isCurrentMainlineAnchor: false,
      isAffectingCurrentState: false,
      impactType: "interrupted",
    };
  }

  if (!item.isMainline) {
    return {
      entersCurrentMainline: false,
      isCurrentStateSource: false,
      isCurrentMainlineAnchor: false,
      isAffectingCurrentState: false,
      impactType: "diverted",
    };
  }

  return {
    entersCurrentMainline: false,
    isCurrentStateSource: false,
    isCurrentMainlineAnchor: false,
    isAffectingCurrentState: false,
    impactType: "inactive",
  };
}

function toCurrentStateSummary(
  item: CurrentStateLinkingEvent,
): CurrentStateLinkingSummary {
  return {
    eventId: item.id,
    spaceId: item.spaceId,
    targetId: item.targetId,
    title: item.title,
    summary: item.summary,
    nodeType: item.nodeType.toLowerCase(),
    isMainline: item.isMainline,
    createdAt: item.createdAt.toISOString(),
  };
}
