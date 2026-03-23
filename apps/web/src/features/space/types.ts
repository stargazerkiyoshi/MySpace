export type SpaceRecord = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateSpaceInput = {
  name: string;
  description?: string;
};

export type UpdateSpaceInput = {
  name?: string;
  description?: string;
};
