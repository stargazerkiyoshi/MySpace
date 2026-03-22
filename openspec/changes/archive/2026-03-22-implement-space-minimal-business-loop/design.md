## 上下文

当前项目已经完成 monorepo、`web`、`core-api`、`ai-service` 和本地开发基础设施的 MVP 基线，但仍停留在“可运行骨架”层面。系统的核心对象是 `Space`，后续 `Node`、`Timeline`、`Snapshot`、`Sync Candidate` 和 `Agent` 都需要依附在 Space 之上，因此第一条正式业务主线应先把 Space 的最小闭环跑通。

现有约束包括：

- 前端必须遵循 `app / pages / features / shared` 分层，业务请求通过 feature 内的 `api.ts` 与 `hooks.ts` 管理。
- 主业务后端必须保持 `controller -> application/use case -> infrastructure` 的基本链路，避免在 controller 中直接散落 Prisma 查询。
- `core-api` 继续作为业务真相源，`ai-service` 不参与本次 Space 闭环实现。
- 当前阶段仅支持单用户基础 owner 场景，不引入复杂权限、多人协作或附加子对象。

## 目标 / 非目标

**目标：**

- 为 Space 建立数据库中的最小主对象模型。
- 在 `core-api` 中提供创建 Space、查询 Space 列表、查询 Space 详情接口。
- 在 `web` 中提供 Space 列表页、创建入口和 Space 详情页/首页占位页。
- 打通前后端链路，让用户能够创建、查看并进入具体 Space。

**非目标：**

- 不实现 Node、Timeline、Snapshot、Sync Candidate、Agent 的业务能力。
- 不实现复杂权限体系、多人协作、历史树或分支图谱。
- 不提前抽象过多 Space 子对象或复杂状态机。

## 决策

### 1. 将 Space 作为独立 capability 建模

- 决策：新增 `space-management` capability，而不是把 Space 闭环直接塞进基础工程规范。
- 理由：Space 是第一条正式业务主线，已经超出“基础工程骨架”范围，应有单独规范承载其行为要求。
- 替代方案：
  - 仅修改 `core-api-foundation` 和 `web-app-shell`
  - 放弃原因：会让基础规范承担具体业务语义，后续难以扩展 Space 的正式能力边界

### 2. 采用最小 Space 数据模型

- 决策：Space 模型只保留支撑闭环所需的最小字段，例如 `id`、`name`、`description`、`ownerId`、`createdAt`、`updatedAt`。
- 理由：当前目标是打通对象闭环，不是一次性设计完整协作模型。
- 替代方案：
  - 预先加入阶段、可见性、协作者、归档状态等复杂字段
  - 放弃原因：会提前固化未收敛的业务概念

### 3. 后端在 space 模块内维持显式分层

- 决策：Space 接口经由 controller、application/use case 和 infrastructure/repository 链路处理，Prisma 调用收敛到基础设施层。
- 理由：这条主线会成为后续对象能力的模板，必须在第一步就把分层边界站稳。
- 替代方案：
  - 在 controller 或单个 service 中直接操作 Prisma
  - 放弃原因：虽然更快，但会破坏当前后端架构基线

### 4. 前端以 feature 为单位组织 Space 业务流

- 决策：Space 相关 HTTP 请求、Query hooks、容器组件和展示组件全部收敛到 `features/space`，页面层只负责路由编排。
- 理由：这与既定前端架构一致，也能为后续 Node、Timeline 等领域功能提供统一组织方式。
- 替代方案：
  - 在 `pages/` 中直接处理创建、列表和详情请求
  - 放弃原因：会让页面层过重，破坏现有分层约束

### 5. 详情页先作为 Space 首页占位页

- 决策：本次只要求 Space 详情页展示最小基本信息与后续入口占位，不提前实现更多子能力。
- 理由：详情页需要承担“进入具体 Space”的主对象承载职责，但当前还不应扩展更多业务概念。
- 替代方案：
  - 继续保留纯静态占位页
  - 放弃原因：无法形成“创建 -> 列表 -> 进入”的闭环

## 风险 / 权衡

- `[风险] Space 最小字段过少，后续可能需要迁移补充字段` → `缓解：当前仅保留最稳定字段，后续通过新变更逐步扩展`
- `[风险] 单用户 owner 假设会让接口设计偏简单` → `缓解：在设计和规范中明确这是当前阶段约束，不把它误写成长期权限模型`
- `[风险] 前后端首次打通业务闭环时容易让页面层或 controller 层承担过多逻辑` → `缓解：在任务中显式要求请求逻辑进入 feature，Prisma 查询进入 infrastructure`
- `[风险] Space 详情页过早承载太多后续概念` → `缓解：本次只展示最小信息和占位内容，不引入 Node、Timeline 等附属能力`

## Migration Plan

- 新增 Prisma schema 变更与初始迁移，创建 Space 主对象表结构。
- 实现 `core-api` Space 创建、列表、详情接口，并在本地开发环境中连接现有 PostgreSQL。
- 在 `web` 中接入 Space 列表页、创建交互和详情页路由。
- 完成前后端联调后，再进入后续以 Space 为承载体的业务提案。

## Open Questions

- 单用户 owner 标识在当前仓库中是固定伪值、配置值，还是通过极简用户表承载，需在实现时按现有后端基础选择最小方案。
- Space 列表默认排序是否按创建时间倒序即可，当前倾向于使用稳定且最简单的时间排序。
