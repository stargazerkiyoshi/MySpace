import { Controller, Get } from "@nestjs/common";

@Controller("nodes")
export class NodeController {
  @Get()
  getNodes() {
    return {
      module: "node",
      status: "placeholder",
      items: [],
    };
  }
}
