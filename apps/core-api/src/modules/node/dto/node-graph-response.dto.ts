import type { NodeStatusValue, NodeTypeValue } from "./create-node.dto";

export const nodeGraphRelationSourceValues = ["none", "timeline"] as const;

export type NodeGraphRelationSourceValue =
  (typeof nodeGraphRelationSourceValues)[number];

export class NodeGraphPositionDto {
  x!: number;
  y!: number;
}

export class NodeGraphNodeMetadataDto {
  sourceKind!: "node";
}

export class NodeGraphNodeDto {
  id!: string;
  spaceId!: string;
  title!: string;
  content!: string | null;
  nodeType!: NodeTypeValue;
  status!: NodeStatusValue;
  position!: NodeGraphPositionDto;
  metadata!: NodeGraphNodeMetadataDto;
  createdAt!: string;
  updatedAt!: string;
}

export class NodeGraphEdgeDto {
  id!: string;
  source!: string;
  target!: string;
  relationType!: string;
  metadata!: Record<string, unknown> | null;
}

export class NodeGraphMetaDto {
  relationSource!: NodeGraphRelationSourceValue;
  relationCount!: number;
  supportsNeighborFocus!: boolean;
}

export class NodeGraphDto {
  nodes!: NodeGraphNodeDto[];
  edges!: NodeGraphEdgeDto[];
  meta!: NodeGraphMetaDto;
}
