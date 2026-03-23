## ADDED Requirements

### 需求:timeline 模块必须承载 TimelineEvent 的最小闭环
系统必须在 `core-api` 中通过 `timeline` 模块承载 TimelineEvent 的最小业务闭环，并保持与 `node` 模块的分层协作边界清晰。

#### 场景:查看 timeline 模块职责
- **当** 开发者查看 `core-api` 中的 timeline 相关代码
- **那么** 必须能够识别 TimelineEvent 的 controller、application/use case 与 infrastructure/repository 分层入口
- **并且** 某个 Space 的 Timeline 列表读取能力必须通过 timeline 模块完成

## MODIFIED Requirements

### 需求:领域模块边界
系统必须在 `core-api` 中建立 `auth`、`space`、`node`、`timeline`、`dashboard` 五个基础模块骨架，并保持模块边界清晰；其中 `space` 模块必须在自身边界内承载 Space 主对象的最小业务闭环，`node` 模块必须在自身边界内承载 Node 主对象的最小业务闭环，`timeline` 模块必须在自身边界内承载 TimelineEvent 的最小历史记录闭环，不得将 Space、Node 或 TimelineEvent 相关 Prisma 查询散落在 controller 中。

#### 场景:查看主业务服务模块结构
- **当** 开发者浏览 `core-api` 代码目录
- **那么** 必须能够识别五个独立的领域模块及其基础入口文件
- **并且** `space`、`node` 与 `timeline` 模块中的接口必须通过 controller、application/use case 和 infrastructure 的分层完成请求处理

#### 场景:在某个 Space 下创建或更新 Node 并产生 TimelineEvent
- **当** 前端请求在某个 Space 下创建 Node 或更新某个 Node
- **那么** `core-api` 必须通过 `node` 模块完成请求编排、数据校验与 Node 持久化
- **并且** 与该行为对应的 TimelineEvent 必须通过受控的 timeline 能力写入，而不是由 controller 直接承担 Prisma 写入逻辑
