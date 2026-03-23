## 上下文

Space 主对象的最小闭环已经完成，系统现在具备了“创建 Space、查看列表、进入详情页”的基础能力，但 Space 仍然只是一个空容器。按照项目方向，Node 将作为 Space 内部第一版结构化内容单元，承载笔记、任务、决策等最小内容对象，并成为后续 Timeline、Snapshot、Sync Candidate、Agent 等能力可以依附的稳定对象。

当前约束包括：
- 前端必须继续遵循 `app / pages / features / shared` 分层，业务请求通过 feature 内的 `api.ts` 与 `hooks.ts` 组织。
- 主业务后端必须保持 `controller -> application/use case -> infrastructure` 的基本链路，避免在 controller 中直接写 Prisma 查询。
- 本次仅打通 Node 最小闭环，不提前引入树结构、图关系、拖拽排序、复杂筛选和跨能力联动。
- Node 必须从属于某个 Space，但不在本次变更中重构 Space 的主对象边界。

## 目标 / 非目标

**目标：**
- 在数据库中建立 Node 主对象的最小表结构，并与 Space 建立显式归属关系。
- 在 `core-api` 的 `node` 模块内提供创建 Node、查询某个 Space 下的 Node 列表、查询 Node 详情、更新 Node 基础字段的最小接口闭环。
- 在 `web` 的 Space 详情页内提供 Node 列表区域、创建入口、详情查看与基础编辑能力。
- 打通从“进入某个 Space”到“创建 / 查看 / 编辑 Node”的前后端联通闭环。

**非目标：**
- 不实现 Node 的 parent/child 树结构或图关系建模。
- 不实现 Timeline 深联动、Snapshot、SyncCandidate、Agent 写回。
- 不实现复杂搜索、筛选、排序、拖拽或多人协作能力。
- 不把 Node 扩展为完整工作流引擎或复杂状态机。

## 决策

### 1. 将 Node 建模为 Space 下的独立主对象

- 决策：新增 `Node` 表，并通过 `spaceId` 显式归属到某个 `Space`。
- 理由：Node 是 Space 内部的第一版内容单元，必须具备独立生命周期和可持久化字段，同时保持和 Space 的清晰父级关系。
- 替代方案：
  - 把 Node 作为 Space JSON 字段的一部分内嵌存储。
  - 放弃原因：会削弱 Node 的独立查询、更新和后续扩展能力，不利于后续演进。

### 2. Node 字段集合保持最小且稳定

- 决策：Node 当前只保留 `id`、`spaceId`、`title`、`content`、`nodeType`、`status`、`createdAt`、`updatedAt`。
- 理由：本次目标是打通“容器 + 内容单元”的闭环，不是一次性设计完整 Node 领域模型。当前字段足够支撑 note / task / decision 的最小表达。
- 替代方案：
  - 提前加入优先级、标签、排序权重、负责人、截止时间、父子关系等字段。
  - 放弃原因：会过早固化未收敛的业务概念，增加迁移成本和实现复杂度。

### 3. nodeType 与 status 先采用受限枚举

- 决策：`nodeType` 先收敛为 `note | task | decision`，`status` 先收敛为 `todo | doing | done`。
- 理由：有限枚举足以支撑最小闭环，并为前端选择器、后端校验和后续演进提供稳定基础。
- 替代方案：
  - 直接用自由字符串或预留更多类型。
  - 放弃原因：自由字符串会降低一致性，过多类型会让前端和后端接口提前复杂化。

### 4. 后端在 node 模块中维持显式分层

- 决策：Node 相关接口继续通过 `controller -> application/use case -> infrastructure/repository` 链路处理，Prisma 查询全部收敛在 repository。
- 理由：Node 是继 Space 之后第二条正式业务主线，应延续既有后端架构基线，避免 controller 直连 Prisma。
- 替代方案：
  - 在 node service 中直接混合 DTO、业务编排和 Prisma 调用。
  - 放弃原因：会破坏当前后端分层约束，后续接入更复杂 Node 能力时难以维护。

### 5. 前端把 Node 功能收敛到 `features/node`，由 Space 页面承载入口

- 决策：Node 的请求、hooks、容器和展示组件继续收敛在 `features/node`；Node 入口挂在 Space 详情页中，而不是单独先做完整 Node 独立页面流。
- 理由：Node 是 Space 的内部内容单元，当前第一版更适合作为 Space 页面中的局部业务区域存在。这样既符合对象关系，也符合当前前端分层约束。
- 替代方案：
  - 在独立 `NodePage` 中完成全部 Node 创建和编辑。
  - 放弃原因：会弱化 Node 对 Space 的上下文依附关系，也会让当前业务闭环偏离“在某个 Space 内完成内容操作”的主线。

### 6. 编辑交互采用最小表单和选中详情面板

- 决策：在 Space 详情页内使用“左侧 Node 列表 + 创建入口 + 当前选中 Node 详情/编辑表单”的最小布局。
- 理由：这能在不引入复杂布局和多路由编辑流的前提下，完成创建、查看和基础修改闭环。
- 替代方案：
  - 使用抽屉、弹窗或独立路由页承载 Node 编辑。
  - 放弃原因：对于当前最小闭环来说交互成本更高，也会增加状态同步复杂度。

## 风险 / 权衡

- `[风险] Node 字段集合过小，后续可能需要迁移补充字段` → `缓解：本次只保留最稳定字段，未来通过新变更逐步扩展`
- `[风险] Node 详情与编辑都放在 Space 页面中，页面复杂度会上升` → `缓解：业务逻辑仍收敛在 features/node，Space 页面只负责编排和承载`
- `[风险] 受限枚举可能很快不够用` → `缓解：在设计和规范中明确这是第一版受控集合，后续如需扩展再走规范变更`
- `[风险] Node 列表、详情、更新接口都依赖 Space 上下文，前后端联调时容易出现状态不同步` → `缓解：统一通过 feature hooks 管理请求和失效刷新，避免在页面层散落请求逻辑`

## Migration Plan

- 在 Prisma schema 中新增 Node 模型与相关枚举，并生成数据库迁移。
- 在 `core-api` 的 `node` 模块内补齐 DTO、application service / use case、repository 与 controller。
- 在 `web` 的 `features/node` 中补齐 Node 的 `api.ts`、`hooks.ts`、`types.ts`、容器与展示组件，并接入 Space 详情页。
- 联调验证用户能够在某个 Space 内完成 Node 创建、列表查看、详情查看与基础编辑。

## Open Questions

- Node 详情是否需要在第一版中允许空 `content`，当前倾向于允许，以降低创建门槛。
- Node 列表默认排序是否按 `updatedAt` 倒序即可，当前倾向于使用最简单稳定的最近更新优先。
- `status` 是否对 `note` / `decision` 类型也统一开放，当前倾向于统一保留，避免前后端为不同类型做差异逻辑。
