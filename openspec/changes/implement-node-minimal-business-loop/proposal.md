## 为什么

Space 主对象的最小业务闭环已经打通，但当前系统仍然停留在“有容器、无内容单元”的状态。为了让 Space 真正承载协作过程，需要尽快引入第一版结构化内容对象 `Node`，形成从 Space 进入、创建内容、查看内容到基础修改的最小闭环。

现在推进这项变更，是为了让系统从“只有协作容器”演进到“容器 + 内容单元”的基础协作形态，并为后续 Timeline、Snapshot、Sync Candidate、Agent 等能力提供稳定依附对象。

## 变更内容

- 为 `Node` 建立最小可用的数据模型，挂接在某个 `Space` 之下。
- 在 `core-api` 的 `node` 模块内实现最小接口链路，包括在某个 Space 下创建 Node、查询某个 Space 下的 Node 列表、查询 Node 详情、更新 Node 基础字段。
- 保持后端 `controller -> application/use case -> infrastructure` 的基本链路，不在 controller 中散落 Prisma 查询。
- 在 `web` 中把 Node 能力接入到 Space 详情页 / Space 首页中，提供 Node 列表区域、创建入口、Node 详情查看和基础编辑能力。
- 打通前后端联通链路，使用户能够在某个 Space 内完成 Node 的创建、查看与基础修改。
- 明确本次不实现 Node 树结构、图关系、复杂筛选排序、拖拽交互、Timeline 深联动、Snapshot、SyncCandidate、Agent 写回和复杂权限体系。

## 功能 (Capabilities)

### 新增功能
- `node-management`: 定义 Node 作为 Space 内最小内容单元的业务闭环，包括最小建模、后端接口、前端展示与基础编辑流程。

### 修改功能
- `core-api-foundation`: 在现有主业务后端基础能力上补充 node 模块的最小业务闭环要求，并明确 Node 相关分层与数据访问边界。
- `web-app-shell`: 在现有前端基础壳层与 Space 页面能力上补充 Space 内 Node 列表、创建、详情查看和基础编辑的最小业务流要求。
- `space-management`: 在 Space 详情 / 首页能力上补充 Node 作为 Space 内内容单元的承载要求。

## 影响

- `apps/core-api` 中的 `node` 模块、Prisma schema、数据库迁移与相关 DTO / 验证逻辑
- `apps/web` 中的 `features/node`、Space 详情页相关容器与组件、路由内联通逻辑与 HTTP 调用
- `openspec/specs/` 中与 Node 管理、Space 承载能力、前端壳层和后端基础能力相关的规范
