## 为什么

Space 与 Node 的最小业务闭环已经打通，但当前系统仍然只能表达“有什么对象”，还不能表达“发生过什么变化”。如果 Space 内的关键变化无法被记录和展示，用户就无法从系统内看到过程推进的痕迹，Space 也仍然缺少长期协作所需的最小历史能力。

现在推进 Timeline 第一版，是为了让系统从“容器 + 内容单元”演进到“容器 + 内容单元 + 过程记录”的基础协作形态，并为后续 Snapshot、Sync Candidate、阶段切片和更复杂的历史能力提供稳定起点。

## 变更内容

- 新增 `TimelineEvent` 最小数据模型，用于承载某个 Space 下的关键变化记录。
- 在 Node 的关键行为发生时写入 TimelineEvent，包括创建 Node、更新 Node，以及 Node 状态变更。
- 在 `core-api` 的 `timeline` 模块内实现某个 Space 下的 Timeline 列表查询接口，并保持分层边界清晰。
- 在 `web` 的 Space 详情页 / Space 首页中加入 Timeline 区域，展示最近发生的关键 TimelineEvent。
- 打通前后端联通链路，使用户能够在某个 Space 中看到 Node 关键变化形成的最小历史闭环。
- 明确本次不实现完整事件溯源、复杂聚合、分支树、Snapshot、SyncCandidate、Agent 自动写历史和复杂可视化。

## 功能 (Capabilities)

### 新增功能
- `timeline-management`: 定义 TimelineEvent 作为 Space 内最小历史记录对象的建模、写入与展示要求。

### 修改功能
- `core-api-foundation`: 在主业务后端基础能力中补充 timeline 模块承载最小 TimelineEvent 闭环的要求，并明确其与 node 模块的分层协作边界。
- `node-management`: 在现有 Node 主对象闭环上补充关键 Node 行为写入 TimelineEvent 的要求。
- `space-management`: 在 Space 详情 / 首页承载能力上补充 Timeline 区域的展示要求。
- `web-app-shell`: 在现有 Space 页面壳层能力上补充 Timeline 列表区域的接入要求。

## 影响

- `apps/core-api` 中的 `timeline`、`node` 模块，Prisma schema，数据库迁移，以及相关 DTO / repository / application service / controller。
- `apps/web` 中的 `features/timeline`、Space 详情页相关容器与组件、前端请求与缓存组织。
- `openspec/specs/` 中与 Timeline 管理、Node 行为、Space 承载和前端壳层相关的规范。
