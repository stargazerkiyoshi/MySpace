import { Transform } from "class-transformer";
import { IsBoolean, IsEnum, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { nodeStatusValues, nodeTypeValues, type NodeStatusValue, type NodeTypeValue } from "./create-node.dto";

export class UpdateNodeDto {
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(120)
  title?: string;

  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  @IsOptional()
  @IsString()
  @MaxLength(5000)
  content?: string;

  @IsOptional()
  @IsEnum(nodeTypeValues)
  nodeType?: NodeTypeValue;

  @IsOptional()
  @IsEnum(nodeStatusValues)
  status?: NodeStatusValue;

  @IsOptional()
  @IsBoolean()
  isMainline?: boolean;
}
