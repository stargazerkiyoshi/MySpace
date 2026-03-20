import { Module } from "@nestjs/common";
import { SpaceController } from "./space.controller";

@Module({
  controllers: [SpaceController],
})
export class SpaceModule {}
