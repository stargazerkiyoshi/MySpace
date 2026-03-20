import { Controller, Get } from "@nestjs/common";

@Controller("spaces")
export class SpaceController {
  @Get()
  getSpaces() {
    return {
      module: "space",
      status: "placeholder",
      items: [],
    };
  }
}
