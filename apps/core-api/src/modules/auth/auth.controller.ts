import { Controller, Get } from "@nestjs/common";

@Controller("auth")
export class AuthController {
  @Get("placeholder")
  getPlaceholder() {
    return {
      module: "auth",
      status: "placeholder",
      message: "Authentication workflows are intentionally deferred in this MVP baseline.",
    };
  }
}
