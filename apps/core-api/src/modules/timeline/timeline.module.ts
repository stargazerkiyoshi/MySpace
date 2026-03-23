import { Module } from "@nestjs/common";
import { PrismaModule } from "../../infrastructure/database/prisma.module";
import { TimelineApplicationService } from "./application/timeline.application.service";
import { TimelineController } from "./timeline.controller";
import { TimelineRepository } from "./infrastructure/timeline.repository";

@Module({
  imports: [PrismaModule],
  controllers: [TimelineController],
  providers: [TimelineApplicationService, TimelineRepository],
  exports: [TimelineApplicationService],
})
export class TimelineModule {}
