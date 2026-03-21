import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { SpaceApplicationService } from "./application/space.application.service";
import { CreateSpaceDto } from "./dto/create-space.dto";

@Controller("spaces")
export class SpaceController {
  constructor(
    private readonly spaceApplicationService: SpaceApplicationService,
  ) {}

  @Post()
  createSpace(@Body() input: CreateSpaceDto) {
    return this.spaceApplicationService.createSpace(input);
  }

  @Get()
  listSpaces() {
    return this.spaceApplicationService.listSpaces();
  }

  @Get(":spaceId")
  getSpaceDetail(@Param("spaceId") spaceId: string) {
    return this.spaceApplicationService.getSpaceDetail(spaceId);
  }
}
