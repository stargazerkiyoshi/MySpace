import { Controller, Get } from "@nestjs/common";
import { DashboardApplicationService } from "./application/dashboard.application.service";

@Controller("dashboard")
export class DashboardController {
  constructor(
    private readonly dashboardApplicationService: DashboardApplicationService,
  ) {}

  @Get()
  getDashboard() {
    return this.dashboardApplicationService.getDashboard();
  }
}
