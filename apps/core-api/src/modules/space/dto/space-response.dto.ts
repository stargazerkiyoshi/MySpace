export class SpaceSummaryDto {
  id!: string;
  name!: string;
  slug!: string;
  description!: string | null;
  ownerId!: string;
  createdAt!: string;
  updatedAt!: string;
}

export class SpaceDetailDto extends SpaceSummaryDto {}
