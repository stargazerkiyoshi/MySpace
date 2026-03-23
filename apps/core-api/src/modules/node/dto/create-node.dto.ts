import { Transform } from "class-transformer";
import { IsBoolean, IsEnum, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export const nodeTypeValues = ["note", "task", "decision"] as const;
export const nodeStatusValues = ["todo", "doing", "done"] as const;

export type NodeTypeValue = (typeof nodeTypeValues)[number];
export type NodeStatusValue = (typeof nodeStatusValues)[number];

export class CreateNodeDto {
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  @IsString()
  @MinLength(1)
  @MaxLength(120)
  title!: string;

  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  @IsOptional()
  @IsString()
  @MaxLength(5000)
  content?: string;

  @IsEnum(nodeTypeValues)
  nodeType!: NodeTypeValue;

  @IsEnum(nodeStatusValues)
  status!: NodeStatusValue;

  @IsOptional()
  @IsBoolean()
  isMainline?: boolean;
}
