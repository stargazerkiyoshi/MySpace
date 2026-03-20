## 1. Monorepo 与基础工程配置

- [x] 1.1 建立 `pnpm workspace` monorepo 目录结构，并整理根级 `package.json`、workspace 配置与统一脚本入口
- [x] 1.2 增加根级 TypeScript 与共享工程配置基线，确保 `web`、`core-api`、`ai-service` 可遵循统一约定
- [x] 1.3 规划应用目录与命名边界，明确 `web`、`core-api`、`ai-service` 的独立职责

## 2. Web 应用骨架

- [x] 2.1 初始化基于 React、TypeScript、Vite 的 `web` 应用，并接入 Ant Design、React Router、TanStack Query、Zustand
- [x] 2.2 实现前端应用基础布局、主导航与通用页面容器
- [x] 2.3 增加空间、节点、时间线、仪表盘等路由占位页，确保路由切换可用

## 3. Core API 与数据基础设施

- [x] 3.1 初始化基于 NestJS 的 `core-api` 应用，并建立最小可运行的服务入口
- [x] 3.2 创建 `auth`、`space`、`node`、`timeline`、`dashboard` 五个基础模块骨架与模块注册关系
- [x] 3.3 接入 Prisma 与 PostgreSQL，补充初始 schema 骨架及数据库配置文件
- [x] 3.4 接入 Redis 基础配置与可扩展封装入口，保持其仅作为基础设施能力

## 4. AI 编排服务骨架

- [x] 4.1 初始化基于 Hono 的 `ai-service` 应用，并建立最小可运行服务入口
- [x] 4.2 实现 `health` 健康检查占位接口与 `chat` 聊天占位接口
- [x] 4.3 明确 `ai-service` 与 `core-api` 的职责边界，避免将主业务逻辑写入 AI 服务

## 5. 本地开发与交付文档

- [x] 5.1 编写 `docker-compose.yml`，提供 PostgreSQL 与 Redis 的本地开发编排
- [x] 5.2 提供 `.env.example`，覆盖三个应用与基础设施所需的关键环境变量
- [x] 5.3 更新 README，说明依赖安装、基础设施启动方式和各应用运行命令
- [x] 5.4 验证本地开发基线完整性，确认三个应用和基础设施具备后续迭代所需的稳定起点
