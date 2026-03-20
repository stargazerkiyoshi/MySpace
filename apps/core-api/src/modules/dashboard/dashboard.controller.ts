import { Controller, Get } from "@nestjs/common";

@Controller("dashboard")
export class DashboardController {
  @Get()
  getDashboard() {
    return {
      module: "dashboard",
      status: "placeholder",
      metrics: [],
    };
  }
}
