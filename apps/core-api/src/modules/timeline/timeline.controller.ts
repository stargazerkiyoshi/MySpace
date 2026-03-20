import { Controller, Get } from "@nestjs/common";

@Controller("timeline")
export class TimelineController {
  @Get()
  getTimeline() {
    return {
      module: "timeline",
      status: "placeholder",
      items: [],
    };
  }
}
