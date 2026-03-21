import { Module } from "@nestjs/common";
import { PrismaModule } from "../../infrastructure/database/prisma.module";
import { SpaceApplicationService } from "./application/space.application.service";
import { SpaceRepository } from "./infrastructure/space.repository";
import { SpaceController } from "./space.controller";

@Module({
  imports: [PrismaModule],
  controllers: [SpaceController],
  providers: [SpaceApplicationService, SpaceRepository],
})
export class SpaceModule {}
