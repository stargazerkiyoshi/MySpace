import { Injectable } from "@nestjs/common";
import { CreateSpaceDto } from "../dto/create-space.dto";
import { UpdateSpaceDto } from "../dto/update-space.dto";
import {
  SpaceDetailDto,
  SpaceSummaryDto,
} from "../dto/space-response.dto";
import { SpaceRepository } from "../infrastructure/space.repository";

@Injectable()
export class SpaceApplicationService {
  constructor(private readonly spaceRepository: SpaceRepository) {}

  async createSpace(input: CreateSpaceDto): Promise<SpaceDetailDto> {
    const created = await this.spaceRepository.createSpace(input);
    return mapSpace(created);
  }

  async listSpaces(): Promise<SpaceSummaryDto[]> {
    const spaces = await this.spaceRepository.listSpaces();
    return spaces.map(mapSpace);
  }

  async getSpaceDetail(spaceId: string): Promise<SpaceDetailDto> {
    const space = await this.spaceRepository.getSpaceById(spaceId);
    return mapSpace(space);
  }

  async updateSpace(
    spaceId: string,
    input: UpdateSpaceDto,
  ): Promise<SpaceDetailDto> {
    const updated = await this.spaceRepository.updateSpace(spaceId, input);
    return mapSpace(updated);
  }
}

function mapSpace(space: {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
}): SpaceDetailDto {
  return {
    id: space.id,
    name: space.name,
    slug: space.slug,
    description: space.description,
    ownerId: space.ownerId,
    createdAt: space.createdAt.toISOString(),
    updatedAt: space.updatedAt.toISOString(),
  };
}
