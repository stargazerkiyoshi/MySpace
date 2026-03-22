import { Module } from "@nestjs/common";
import { PrismaModule } from "../../infrastructure/database/prisma.module";
import { NodeApplicationService } from "./application/node.application.service";
import { NodeController } from "./node.controller";
import { NodeRepository } from "./infrastructure/node.repository";

@Module({
  imports: [PrismaModule],
  controllers: [NodeController],
  providers: [NodeApplicationService, NodeRepository],
})
export class NodeModule {}
