export type NodeType = "note" | "task" | "decision";
export type NodeStatus = "todo" | "doing" | "done";

export type NodeCard = {
  title: string;
  description: string;
};

export type NodeRecord = {
  id: string;
  spaceId: string;
  title: string;
  content: string | null;
  nodeType: NodeType;
  status: NodeStatus;
  createdAt: string;
  updatedAt: string;
};

export type CreateNodeInput = {
  title: string;
  content?: string;
  nodeType: NodeType;
  status: NodeStatus;
  isMainline?: boolean;
};

export type UpdateNodeInput = Partial<CreateNodeInput>;
