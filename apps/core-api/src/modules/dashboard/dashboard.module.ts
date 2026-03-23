import { Module } from "@nestjs/common";
import { PrismaModule } from "../../infrastructure/database/prisma.module";
import { DashboardApplicationService } from "./application/dashboard.application.service";
import { DashboardController } from "./dashboard.controller";
import { DashboardRepository } from "./infrastructure/dashboard.repository";

@Module({
  imports: [PrismaModule],
  controllers: [DashboardController],
  providers: [DashboardApplicationService, DashboardRepository],
})
export class DashboardModule {}
