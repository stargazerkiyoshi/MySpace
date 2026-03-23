import { Module } from "@nestjs/common";
import { PrismaModule } from "../../infrastructure/database/prisma.module";
import { TimelineModule } from "../timeline/timeline.module";
import { NodeApplicationService } from "./application/node.application.service";
import { NodeController } from "./node.controller";
import { NodeRepository } from "./infrastructure/node.repository";

@Module({
  imports: [PrismaModule, TimelineModule],
  controllers: [NodeController],
  providers: [NodeApplicationService, NodeRepository],
})
export class NodeModule {}
