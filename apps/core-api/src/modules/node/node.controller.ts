import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { NodeApplicationService } from "./application/node.application.service";
import { CreateNodeDto } from "./dto/create-node.dto";
import { CreateNodeRelationDto } from "./dto/create-node-relation.dto";
import { UpdateNodeDto } from "./dto/update-node.dto";

@Controller()
export class NodeController {
  constructor(
    private readonly nodeApplicationService: NodeApplicationService,
  ) {}

  @Post("spaces/:spaceId/nodes")
  createNode(
    @Param("spaceId") spaceId: string,
    @Body() input: CreateNodeDto,
  ) {
    return this.nodeApplicationService.createNode(spaceId, input);
  }

  @Get("spaces/:spaceId/nodes")
  listNodes(@Param("spaceId") spaceId: string) {
    return this.nodeApplicationService.listNodes(spaceId);
  }

  @Get("spaces/:spaceId/node-graph")
  getNodeGraph(@Param("spaceId") spaceId: string) {
    return this.nodeApplicationService.getNodeGraph(spaceId);
  }

  @Post("spaces/:spaceId/node-relations")
  createNodeRelation(
    @Param("spaceId") spaceId: string,
    @Body() input: CreateNodeRelationDto,
  ) {
    return this.nodeApplicationService.createNodeRelation(spaceId, input);
  }

  @Delete("spaces/:spaceId/node-relations/:relationId")
  deleteNodeRelation(
    @Param("spaceId") spaceId: string,
    @Param("relationId") relationId: string,
  ) {
    return this.nodeApplicationService.deleteNodeRelation(spaceId, relationId);
  }

  @Get("nodes/:nodeId")
  getNodeDetail(@Param("nodeId") nodeId: string) {
    return this.nodeApplicationService.getNodeDetail(nodeId);
  }

  @Patch("nodes/:nodeId")
  updateNode(
    @Param("nodeId") nodeId: string,
    @Body() input: UpdateNodeDto,
  ) {
    return this.nodeApplicationService.updateNode(nodeId, input);
  }
}
