import { Injectable } from "@nestjs/common";
import type { Space, TimelineEvent, User } from "@prisma/client";
import { PrismaService } from "../../../infrastructure/database/prisma.service";

const DEFAULT_OWNER_EMAIL = "owner@myspace.local";
const DEFAULT_OWNER_DISPLAY_NAME = "Space Owner";

@Injectable()
export class DashboardRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getActiveSpaceWithTimeline(): Promise<{
    activeSpace: Space | null;
    timeline: TimelineEvent[];
  }> {
    const owner = await this.ensureDefaultOwner();
    const latestTimeline = await this.prisma.timelineEvent.findFirst({
      where: {
        space: {
          ownerId: owner.id,
        },
      },
      include: {
        space: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const activeSpace =
      latestTimeline?.space ??
      (await this.prisma.space.findFirst({
        where: {
          ownerId: owner.id,
        },
        orderBy: {
          createdAt: "desc",
        },
      }));

    if (!activeSpace) {
      return {
        activeSpace: null,
        timeline: [],
      };
    }

    const timeline = await this.prisma.timelineEvent.findMany({
      where: {
        spaceId: activeSpace.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      activeSpace,
      timeline,
    };
  }

  private async ensureDefaultOwner(): Promise<User> {
    return this.prisma.user.upsert({
      where: {
        email: DEFAULT_OWNER_EMAIL,
      },
      update: {
        displayName: DEFAULT_OWNER_DISPLAY_NAME,
      },
      create: {
        email: DEFAULT_OWNER_EMAIL,
        displayName: DEFAULT_OWNER_DISPLAY_NAME,
      },
    });
  }
}
