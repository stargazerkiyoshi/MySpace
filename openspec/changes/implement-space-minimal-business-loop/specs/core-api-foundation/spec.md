## MODIFIED Requirements

### 需求:领域模块边界
系统必须在 `core-api` 中建立 `auth`、`space`、`node`、`timeline`、`dashboard` 五个基础模块骨架，并保持模块边界清晰；其中 `space` 模块必须在自身边界内承载 Space 主对象的最小业务闭环，不得将 Space 相关 Prisma 查询散落在 controller 中。

#### 场景:查看主业务服务模块结构
- **当** 开发者浏览 `core-api` 代码目录
- **那么** 必须能够识别五个独立的领域模块及其基础入口文件
- **并且** `space` 模块中的接口必须通过 controller、application/use case 和 infrastructure 的分层完成请求处理
