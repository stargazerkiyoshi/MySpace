import { Controller, Get, Param } from "@nestjs/common";
import { TimelineApplicationService } from "./application/timeline.application.service";

@Controller("timeline")
export class TimelineController {
  constructor(
    private readonly timelineApplicationService: TimelineApplicationService,
  ) {}

  @Get("spaces/:spaceId")
  getSpaceTimeline(@Param("spaceId") spaceId: string) {
    return this.timelineApplicationService.listSpaceTimeline(spaceId);
  }

  @Get(":eventId")
  getTimelineEventDetail(@Param("eventId") eventId: string) {
    return this.timelineApplicationService.getTimelineEventDetail(eventId);
  }
}
