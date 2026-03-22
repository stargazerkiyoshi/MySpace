## 为什么

基础工程已经完成，但系统还没有跑通第一条真正的业务主线。`Space` 作为空间型协作系统中的第一性对象，必须先形成最小可用闭环，才能为后续 `Node`、`Timeline`、`Snapshot`、`Sync Candidate` 和 `Agent` 提供稳定承载体。

## 变更内容

- 为 `Space` 建立最小可用的数据模型，支持单用户基础 owner 场景下的创建、列表和详情读取。
- 在 `core-api` 的 `space` 模块内实现创建 Space、查询 Space 列表、查询 Space 详情的最小接口链路，并保持 `controller -> application/use case -> infrastructure` 的基本分层。
- 在 `web` 中实现 Space 列表页、创建 Space 的最小交互入口，以及 Space 详情页/首页占位页。
- 打通前后端联通链路，使用户能够从前端创建 Space、查看 Space 列表并进入具体 Space。
- 明确本次不扩展 Node、Timeline、Snapshot、Sync Candidate、Agent、复杂权限和多人协作。

## 功能 (Capabilities)

### 新增功能
- `space-management`: 定义 Space 主对象的最小业务闭环，包括数据建模、后端基础接口和前端最小创建/查看/进入流程。

### 修改功能
- `core-api-foundation`: 在基础后端能力之上补充 Space 模块的最小业务闭环要求。
- `web-app-shell`: 在前端基础壳层之上补充 Space 列表、创建和详情进入的最小业务流要求。

## 影响

- `apps/core-api` 中的 `space` 模块、Prisma schema、数据库迁移与基础测试
- `apps/web` 中的 `pages/space`、`features/space`、路由配置与 HTTP 调用
- `openspec/specs/` 下与 Space 管理和现有基础能力相关的规范
