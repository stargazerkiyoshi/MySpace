import { Injectable, NotFoundException } from "@nestjs/common";
import type { Space, User } from "@prisma/client";
import { PrismaService } from "../../../infrastructure/database/prisma.service";
import { CreateSpaceDto } from "../dto/create-space.dto";

const DEFAULT_OWNER_EMAIL = "owner@myspace.local";
const DEFAULT_OWNER_DISPLAY_NAME = "Space Owner";

@Injectable()
export class SpaceRepository {
  constructor(private readonly prisma: PrismaService) {}

  async listSpaces(): Promise<Space[]> {
    const owner = await this.ensureDefaultOwner();

    return this.prisma.space.findMany({
      where: {
        ownerId: owner.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async getSpaceById(spaceId: string): Promise<Space> {
    const owner = await this.ensureDefaultOwner();
    const space = await this.prisma.space.findFirst({
      where: {
        id: spaceId,
        ownerId: owner.id,
      },
    });

    if (!space) {
      throw new NotFoundException(`Space '${spaceId}' was not found.`);
    }

    return space;
  }

  async createSpace(input: CreateSpaceDto): Promise<Space> {
    const owner = await this.ensureDefaultOwner();
    const slug = await this.generateUniqueSlug(input.name);

    return this.prisma.space.create({
      data: {
        name: input.name.trim(),
        description: input.description?.trim() || null,
        slug,
        ownerId: owner.id,
      },
    });
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

  private async generateUniqueSlug(name: string): Promise<string> {
    const baseSlug = slugify(name);
    const existingSpaces = await this.prisma.space.findMany({
      where: {
        slug: {
          startsWith: baseSlug,
        },
      },
      select: {
        slug: true,
      },
    });
    const existingSlugs = new Set(existingSpaces.map((space) => space.slug));

    if (!existingSlugs.has(baseSlug)) {
      return baseSlug;
    }

    let suffix = 2;
    let candidate = `${baseSlug}-${suffix}`;

    while (existingSlugs.has(candidate)) {
      suffix += 1;
      candidate = `${baseSlug}-${suffix}`;
    }

    return candidate;
  }
}

function slugify(value: string): string {
  const normalized = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return normalized || "space";
}
