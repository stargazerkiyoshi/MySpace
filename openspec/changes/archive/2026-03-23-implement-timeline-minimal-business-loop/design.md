## 上下文

当前系统已经具备 Space 和 Node 两条正式业务主线：用户可以创建 Space，在某个 Space 中创建、查看和编辑 Node。但 Space 页面仍然只能展示当前对象状态，无法表达最近发生过哪些关键变化，因此“过程可见性”仍然缺失。

本次变更的重点是引入最小 TimelineEvent 闭环，而不是构建完整历史系统。现有约束包括：

- 前端继续遵守 `app / pages / features / shared` 分层，Timeline 请求与状态通过 `features/timeline` 组织。
- 主业务后端继续遵守 `controller -> application/use case -> infrastructure` 链路，Timeline 相关 Prisma 查询不得散落到 controller。
- Timeline 在本阶段只是历史记录能力，不承担完整状态演算、阶段切片或分支建模。
- Node 仍然是事件来源之一，但 timeline 能力必须收敛在 `timeline` 模块内，而不是把历史逻辑直接混入 `node` controller。

## 目标 / 非目标

**目标：**
- 在数据库中建立 `TimelineEvent` 的最小表结构，并显式归属于某个 `Space`。
- 在 Node 的关键变化发生时稳定写入 TimelineEvent，包括创建、更新和状态变更。
- 在 `core-api` 中提供按 Space 维度读取 Timeline 列表的最小接口。
- 在 `web` 的 Space 详情页中展示最近 TimelineEvent 列表，形成“对象变化可见”的最小闭环。

**非目标：**
- 不实现完整 event sourcing、复杂聚合、回放或派生状态计算。
- 不实现 Timeline 分支结构、阶段切片、Snapshot、Sync Candidate 或 Agent 写历史。
- 不实现复杂筛选、分组、统计、图谱可视化或权限体系。
- 不把 Timeline 扩展为通用审计系统或跨领域事件总线。

## 决策

### 1. TimelineEvent 作为 Space 下的独立历史记录对象建模
- 决策：新增 `TimelineEvent` 表，最小字段包括 `id`、`spaceId`、`eventType`、`targetType`、`targetId`、`summary`、`payload`、`createdAt`。
- 理由：TimelineEvent 需要独立查询和独立排序，不能仅作为 Node 的附属字段存在；同时它又必须显式归属于某个 Space。
- 替代方案：
  - 直接把历史文本挂在 `Space` 或 `Node` 表中。
  - 放弃原因：无法支撑统一时间排序、统一列表查询和后续演进。

### 2. 事件类型先收敛为少量 Node 相关值
- 决策：`eventType` 第一版仅收敛为 `node_created`、`node_updated`、`node_status_changed`。
- 理由：当前目标是先让 Node 的关键变化可见，而不是一次性抽象所有事件模型。
- 替代方案：
  - 允许自由字符串或一次性枚举更多事件。
  - 放弃原因：会过早扩大事件面，增加前后端判断复杂度。

### 3. Node 写入 TimelineEvent 采用显式应用层协作
- 决策：在 Node 的应用服务处理创建和更新用例时，显式调用 timeline 模块或其受控写入入口创建事件记录。
- 理由：Node 变化仍然由 node 模块编排，但 TimelineEvent 的持久化和查询能力应由 timeline 模块承载。
- 替代方案：
  - 在 Prisma middleware 或 repository 层隐式写事件。
  - 放弃原因：会弱化业务意图，也更难根据“是否状态变更”决定不同事件类型。

### 4. Timeline 列表接口按 Space 维度提供最近事件
- 决策：`core-api` 提供按 `spaceId` 查询 TimelineEvent 列表的最小接口，默认按 `createdAt` 倒序返回最近记录。
- 理由：当前前端需求只是在某个 Space 内查看最近变化，不需要单事件详情或复杂筛选。
- 替代方案：
  - 同时提供事件详情、分页、过滤、聚合统计。
  - 放弃原因：会超出最小闭环范围。

### 5. 前端把 Timeline 作为 Space 页面中的独立业务区域
- 决策：在 `features/timeline` 中组织 Timeline API、hooks、组件和容器，并由 Space 详情页承载该区域。
- 理由：Timeline 依附于 Space 上下文，但不应把所有历史逻辑塞进 `features/space`。
- 替代方案：
  - 继续只用原有 timeline 占位页，不接入 Space 页面。
  - 放弃原因：无法形成真实业务闭环。

## 风险 / 权衡

- `[风险] TimelineEvent 字段过于收敛，后续可能需要补充 actor、diff 或阶段信息`
  → `缓解：本次把 payload 作为最小扩展位，并通过后续变更逐步扩展模型。`
- `[风险] Node 更新会频繁写入 TimelineEvent，可能产生噪音事件`
  → `缓解：第一版仅记录关键操作，并把状态变更单独区分为 node_status_changed。`
- `[风险] Timeline 区域接入 Space 页面后，页面复杂度继续上升`
  → `缓解：Timeline 逻辑仍收敛在 features/timeline，Space 页面只负责承载和编排。`
- `[风险] node 模块与 timeline 模块的协作边界不清，容易相互侵入`
  → `缓解：明确 node 负责触发业务意图，timeline 负责事件对象的建模、持久化和查询。`

## Migration Plan

- 在 Prisma schema 中新增 TimelineEvent 模型与所需枚举，并生成数据库迁移。
- 在 `core-api` 的 `timeline` 模块内补齐 repository / application service / controller 最小链路。
- 在 Node 创建和更新用例中接入 TimelineEvent 写入逻辑，区分普通更新和状态变更事件。
- 在 `web` 的 `features/timeline` 中实现 Timeline 列表请求、字段映射与展示组件，并接入 Space 详情页。
- 联调验证“创建 Node -> 更新 Node / 变更状态 -> Space 页面出现最新 TimelineEvent”的最小闭环。

## Open Questions

- TimelineEvent 的 `payload` 第一版是否只保存最小结构化摘要，当前倾向于只存最少可扩展信息。
- Timeline 区域第一版是否只展示最近若干条事件，当前倾向于先按简单列表展示，不引入复杂分页。
- Node 的“普通更新”和“状态变更”在前端文案上是否需要差异化摘要模板，当前倾向于提供基础差异化摘要。
