import type { NodeStatusValue, NodeTypeValue } from "./create-node.dto";

export class NodeSummaryDto {
  id!: string;
  spaceId!: string;
  title!: string;
  content!: string | null;
  nodeType!: NodeTypeValue;
  status!: NodeStatusValue;
  createdAt!: string;
  updatedAt!: string;
}

export class NodeDetailDto extends NodeSummaryDto {}
