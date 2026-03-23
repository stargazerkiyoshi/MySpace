import { Injectable, NotFoundException } from "@nestjs/common";
import type { Space, User } from "@prisma/client";
import { PrismaService } from "../../../infrastructure/database/prisma.service";
import { CreateSpaceDto } from "../dto/create-space.dto";
import { UpdateSpaceDto } from "../dto/update-space.dto";

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

  async updateSpace(spaceId: string, input: UpdateSpaceDto): Promise<Space> {
    const current = await this.getSpaceById(spaceId);
    const data: {
      name?: string;
      description?: string | null;
      slug?: string;
    } = {};

    if (typeof input.name === "string" && input.name.trim() && input.name.trim() !== current.name) {
      const nextName = input.name.trim();
      data.name = nextName;
      data.slug = await this.generateUniqueSlug(nextName, current.id);
    }

    if (Object.prototype.hasOwnProperty.call(input, "description")) {
      data.description = input.description?.trim() || null;
    }

    if (!Object.keys(data).length) {
      return current;
    }

    return this.prisma.space.update({
      where: {
        id: current.id,
      },
      data,
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

  private async generateUniqueSlug(name: string, excludeSpaceId?: string): Promise<string> {
    const baseSlug = slugify(name);
    const existingSpaces = await this.prisma.space.findMany({
      where: {
        slug: {
          startsWith: baseSlug,
        },
        ...(excludeSpaceId
          ? {
              id: {
                not: excludeSpaceId,
              },
            }
          : {}),
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
