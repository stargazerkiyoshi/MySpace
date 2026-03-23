## MODIFIED Requirements

### 需求:领域模块边界
系统必须在 `core-api` 中建立 `auth`、`space`、`node`、`timeline`、`dashboard` 五个基础模块骨架，并保持模块边界清晰；其中 `space` 模块必须在自身边界内承载 Space 主对象的最小业务闭环，`node` 模块必须在自身边界内承载 Node 主对象的最小业务闭环，不得将 Space 或 Node 相关 Prisma 查询散落在 controller 中。

#### 场景:查看主业务服务模块结构
- **当** 开发者浏览 `core-api` 代码目录
- **那么** 必须能够识别五个独立的领域模块及其基础入口文件
- **并且** `space` 与 `node` 模块中的接口必须通过 controller、application/use case 和 infrastructure 的分层完成请求处理

#### 场景:在某个 Space 下创建并更新 Node
- **当** 前端请求在某个 Space 下创建 Node 或更新某个 Node
- **那么** `core-api` 必须通过 `node` 模块完成请求编排、数据校验与持久化
- **并且** controller 不得直接承担 Prisma 查询与写入逻辑
