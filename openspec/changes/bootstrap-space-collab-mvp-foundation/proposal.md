## 为什么

当前仓库尚未形成可持续演进的“空间型协作系统”基础工程骨架，前后端、AI 服务与本地开发基础设施之间缺少统一的工程边界与启动基线。现在先建立一套可运行、可扩展、职责清晰的 MVP monorepo，可以降低后续功能开发、模块扩展与协作集成的成本。

## 变更内容

- 建立基于 `pnpm workspace` 的 monorepo 目录结构，统一管理前端、主业务后端、AI 编排服务与共享工程配置。
- 初始化 `web`、`core-api`、`ai-service` 三个应用，提供最小可运行骨架和清晰的模块边界。
- 为前端提供基础布局、路由结构与占位页面，作为后续空间、节点、时间线、仪表盘等页面的稳定入口。
- 为 `core-api` 提供 NestJS 基础模块骨架，包括 `auth`、`space`、`node`、`timeline`、`dashboard`，并接入 Prisma、PostgreSQL、Redis 的基础配置。
- 为 `ai-service` 提供 Hono 基础服务、`health` 与 `chat` 占位接口，并明确其作为 AI 编排层的职责，不直接承载主业务逻辑。
- 提供 `docker-compose.yml`、`.env.example` 与 `README` 启动说明，形成统一的本地开发基线。
- 不实现完整业务逻辑、复杂权限、完整 Agent 编排、向量检索、外部同步及完整图谱能力。

## 功能 (Capabilities)

### 新增功能
- `workspace-monorepo-foundation`: 定义基于 pnpm workspace 的 monorepo 目录结构、共享配置与多应用工程组织方式。
- `web-app-shell`: 定义 React 前端应用的基础布局、路由入口与页面占位结构。
- `core-api-foundation`: 定义 NestJS 主业务服务的基础模块边界、基础配置以及 PostgreSQL/Redis 接入方式。
- `ai-orchestration-service`: 定义 Hono AI 编排服务的基础运行结构以及 `health`、`chat` 占位接口。
- `local-dev-infrastructure`: 定义 Docker Compose、本地依赖服务、环境变量模板与启动文档要求。

### 修改功能

无。

## 影响

- 受影响代码范围包括 monorepo 根目录结构、前端应用目录、NestJS 后端应用目录、Hono 服务目录、Prisma schema、Docker Compose 配置、环境变量模板与项目 README。
- 会引入或固定的关键依赖包括 React、Vite、Ant Design、React Router、TanStack Query、Zustand、NestJS、Prisma、PostgreSQL、Redis、Hono、pnpm workspace 与 Docker Compose。
- 会建立前端、主业务后端与 AI 编排层之间的工程边界，为后续能力扩展提供稳定基线。
