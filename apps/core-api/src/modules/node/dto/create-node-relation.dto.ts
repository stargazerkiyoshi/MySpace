import { IsString, MinLength } from "class-validator";

export class CreateNodeRelationDto {
  @IsString()
  @MinLength(1)
  sourceNodeId!: string;

  @IsString()
  @MinLength(1)
  targetNodeId!: string;
}
