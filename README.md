# MySpace MVP Foundation

这是“空间型协作系统”的 MVP 基线工程，目标是先建立可持续迭代的 monorepo 结构、三个独立运行单元以及本地开发基础设施，而不是一次性实现完整业务能力。

## Workspace Layout

```text
apps/
  web/         React + Vite + Ant Design + Less
  core-api/    NestJS + Prisma + PostgreSQL + Redis
  ai-service/  Hono orchestration placeholder service
openspec/      OpenSpec change artifacts and specs
```

职责边界:

- `web` 负责前端应用壳层、路由和页面占位
- `core-api` 负责主业务模块、数据库访问和基础设施接入
- `ai-service` 只负责 AI 编排入口占位，不承载主业务模块

## Prerequisites

- Node.js 20+
- pnpm 10+
- Docker Desktop 或兼容的 Docker Compose 运行环境

## Getting Started

1. 安装依赖

```bash
pnpm install
```

2. 复制环境变量模板

```bash
cp .env.example .env
```

3. 启动 PostgreSQL 与 Redis

```bash
docker compose up -d
```

4. 生成 Prisma Client 并执行初始迁移

```bash
pnpm prisma:generate
pnpm prisma:migrate:dev --name init
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
pnpm build
pnpm check
pnpm prisma:generate
pnpm prisma:migrate:dev
pnpm prisma:migrate:deploy
```

## Service Endpoints

- Web: `http://localhost:5173`
- Core API health: `http://localhost:3000/api/health`
- AI service health: `http://localhost:3001/health`
- AI service chat placeholder: `POST http://localhost:3001/chat`

## Frontend Notes

- 组件按 `app / pages / features / shared` 分层，而不是把所有内容堆进单一 `components` 目录
- 样式基线固定为 Ant Design + Less
- HTTP 请求使用 `axios`，服务端状态管理使用 `TanStack Query`
- 长期前端架构规则见 `docs/frontend-architecture.md`

## Architecture Docs

- 前端架构基线：`docs/frontend-architecture.md`
- 主业务后端架构基线：`docs/backend-architecture.md`
- AI 编排层架构基线：`docs/ai-service-architecture.md`

## Current Scope

当前只提供:

- monorepo 与统一启动脚本
- `web` 基础布局与路由占位页
- `core-api` 模块骨架与 health/placeholder 接口
- `ai-service` 的 health/chat 占位接口
- PostgreSQL / Redis 本地开发编排

当前明确不包含:

- 完整业务逻辑
- 复杂权限系统
- 完整 Agent 编排
- 向量检索与外部同步
- 历史树和图谱能力
