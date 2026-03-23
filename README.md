# MySpace

MySpace 是一个“空间型协作系统（Space Collaboration System）”的工程基线仓库。

当前仓库的重点不是一次性实现完整业务，而是围绕 `Space -> Node -> Timeline` 持续搭建可演进的业务闭环，并保持 `web`、`core-api`、`ai-service` 三个子工程的边界清晰。

## Workspace Layout

```text
apps/
  web/         React + Vite + Ant Design + Less
  core-api/    NestJS + Prisma + PostgreSQL + Redis
  ai-service/  Hono orchestration placeholder service
docs/          Long-lived architecture documents
openspec/      OpenSpec project, changes, and specs
```

职责边界：

- `web`：前端应用壳层、页面、feature 组织与交互承载
- `core-api`：主业务模块、数据库访问、Timeline / Node / Space 真相源
- `ai-service`：AI 编排层占位服务，不承载主业务真相

## Prerequisites

- Node.js 20+
- pnpm 10+
- Docker Desktop 或兼容的 Docker Compose 环境

## Getting Started

1. 安装依赖

```bash
pnpm install
```

2. 复制环境变量模板

```bash
cp .env.example .env
cp apps/core-api/.env.example apps/core-api/.env
```

如果 `apps/core-api/.env.example` 不存在，可以直接把根目录 `.env` 里的 `DATABASE_URL` 同步到 `apps/core-api/.env`。

3. 启动 PostgreSQL 与 Redis

```bash
pnpm infra:up
```

4. 生成 Prisma Client 并执行数据库迁移

```bash
pnpm prisma:generate
pnpm prisma:migrate:dev
```

5. 分别启动三个应用

```bash
pnpm dev:web
pnpm dev:core-api
pnpm dev:ai-service
```

## Available Commands

```bash
pnpm dev
pnpm dev:web
pnpm dev:core-api
pnpm dev:ai-service
pnpm infra:up
pnpm infra:down
pnpm infra:restart
pnpm infra:logs
pnpm infra:ps
pnpm build
pnpm check
pnpm prisma:generate
pnpm prisma:migrate:dev
pnpm prisma:migrate:deploy
```

## Service Endpoints

- Web: `http://localhost:5173`
- Core API health: `GET http://localhost:3000/api/health`
- Space list: `GET http://localhost:3000/api/spaces`
- Space create: `POST http://localhost:3000/api/spaces`
- Space detail: `GET http://localhost:3000/api/spaces/:spaceId`
- Space node list: `GET http://localhost:3000/api/spaces/:spaceId/nodes`
- Space node create: `POST http://localhost:3000/api/spaces/:spaceId/nodes`
- Node detail: `GET http://localhost:3000/api/nodes/:nodeId`
- Node update: `PATCH http://localhost:3000/api/nodes/:nodeId`
- Space timeline list: `GET http://localhost:3000/api/timeline/spaces/:spaceId`
- Timeline event detail: `GET http://localhost:3000/api/timeline/:eventId`
- Dashboard current state: `GET http://localhost:3000/api/dashboard`
- AI service health: `GET http://localhost:3001/health`
- AI service chat placeholder: `POST http://localhost:3001/chat`

## Current Product Loop

当前仓库已经具备以下最小业务闭环：

1. 创建并进入某个 `Space`
2. 在 `Space` 内创建、查看、编辑 `Node`
3. Node 关键变化自动写入 `TimelineEvent`
4. 在 `Space` 页面查看时间线列表与节点详情
5. 区分主干事件与分支事件，并查看前置 / 后继关系与当前状态影响说明

时间线当前支持的最小结构字段包括：

- `isMainline`
- `parentNodeId`
- `branchFromNodeId`
- `mergeToNodeId`
- `nodeType`

当前 UI 已支持：

- 在 Space 页面查看最近时间线
- 点击时间线节点查看详情
- 区分主干 / 分支 / 关键节点
- 在 Node 创建和编辑时选择“主干记录 / 分支记录”

## Frontend Notes

- 前端固定采用 `app / pages / features / shared` 分层
- 样式基线为 `Ant Design + Less`
- HTTP 请求使用 `axios`
- 服务端状态管理使用 `TanStack Query`
- UI 双语当前支持 `zh-CN / en`

详细规则见：

- [docs/frontend-architecture.md](docs/frontend-architecture.md)

## Architecture Docs

- [docs/frontend-architecture.md](docs/frontend-architecture.md)
- [docs/backend-architecture.md](docs/backend-architecture.md)
- [docs/ai-service-architecture.md](docs/ai-service-architecture.md)
- [openspec/project.md](openspec/project.md)

## Current State Linking

- `GET /api/dashboard` returns the active space and the current-state linking summary.
- The dashboard can link directly to a history node with `/spaces/:spaceId?timelineEvent=:eventId`.
- Timeline detail now exposes whether a node enters the current mainline, whether it still affects the current state, and its impact type.

## Current Scope

当前明确不包含：

- 完整权限系统
- 多人协作能力
- 完整历史树 / 图谱可视化
- Snapshot / SyncCandidate 闭环
- 完整 Agent 自动写回与编排
- 外部同步网络与向量检索

这些能力应继续通过 OpenSpec 变更逐步推进，而不是直接扩散到当前基线中。
