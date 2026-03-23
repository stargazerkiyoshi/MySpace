import { Injectable } from "@nestjs/common";
import { CurrentStateLinkingDto, DashboardActiveSpaceDto, DashboardResponseDto } from "../dto/dashboard-response.dto";
import { DashboardRepository } from "../infrastructure/dashboard.repository";
import { buildCurrentStateLinkingSnapshot } from "../../timeline/application/current-state-linking";

@Injectable()
export class DashboardApplicationService {
  constructor(private readonly dashboardRepository: DashboardRepository) {}

  async getDashboard(): Promise<DashboardResponseDto> {
    const { activeSpace, timeline } =
      await this.dashboardRepository.getActiveSpaceWithTimeline();

    if (!activeSpace) {
      return {
        module: "dashboard",
        status: "empty",
        activeSpace: null,
        currentState: null,
      };
    }

    const snapshot = buildCurrentStateLinkingSnapshot(
      timeline.map((item) => ({
        id: item.id,
        spaceId: item.spaceId,
        targetId: item.targetId,
        title: item.title,
        summary: item.summary,
        nodeType: item.nodeType,
        isMainline: item.isMainline,
        parentNodeId: item.parentNodeId,
        branchFromNodeId: item.branchFromNodeId,
        mergeToNodeId: item.mergeToNodeId,
        createdAt: item.createdAt,
      })),
    );

    return {
      module: "dashboard",
      status: timeline.length ? "ready" : "empty",
      activeSpace: mapSpace(activeSpace),
      currentState: mapCurrentState(snapshot),
    };
  }
}

function mapSpace(space: {
  id: string;
  name: string;
  slug: string;
}): DashboardActiveSpaceDto {
  return {
    id: space.id,
    name: space.name,
    slug: space.slug,
  };
}

function mapCurrentState(snapshot: ReturnType<typeof buildCurrentStateLinkingSnapshot>): CurrentStateLinkingDto {
  return {
    currentMainlineNodeId: snapshot.currentMainlineNodeId,
    currentStateSourceNodeId: snapshot.currentStateSourceNodeId,
    latestMainlineEventId: snapshot.latestMainlineEventId,
    latestBranchEventId: snapshot.latestBranchEventId,
    activeBranchId: snapshot.activeBranchId,
    currentMainlineAnchor: snapshot.currentMainlineAnchor,
    currentStateSource: snapshot.currentStateSource,
    latestKeyProgress: snapshot.latestKeyProgress,
    latestBranch: snapshot.latestBranch,
  };
}
