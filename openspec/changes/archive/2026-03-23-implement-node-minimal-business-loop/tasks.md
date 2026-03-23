## 1. 后端 Node 主对象闭环

- [x] 1.1 在 Prisma schema 中新增 Node 模型与所需枚举，并生成对应迁移
- [x] 1.2 在 `core-api` 的 `node` 模块内补齐 repository / application(use case) / controller 基础链路
- [x] 1.3 实现“在某个 Space 下创建 Node、查询某个 Space 下的 Node 列表、查询 Node 详情、更新 Node 基础字段”接口，并保持 Prisma 查询收敛在 infrastructure 层
- [x] 1.4 为 Node 接口补充最小输入校验、返回 DTO 和基础验证用例

## 2. 前端 Space 内的 Node 最小流

- [x] 2.1 在 `features/node` 中补齐 `api.ts`、`hooks.ts`、`types.ts` 及所需容器/展示组件
- [x] 2.2 在 Space 详情页 / Space 首页中接入 Node 列表区域，并展示当前 Space 下的 Node 集合与空状态
- [x] 2.3 实现创建 Node 的最小表单或交互入口，并在成功后刷新当前 Space 下的 Node 列表
- [x] 2.4 实现 Node 详情查看与基础编辑能力，使用户能够修改标题、内容、类型和状态

## 3. 联调与收尾

- [x] 3.1 打通 web 与 core-api 的 Node 创建、列表、详情、更新联调链路
- [x] 3.2 验证用户能够在某个 Space 内完成“创建 Node -> 查看列表 -> 查看详情 -> 基础编辑”的最小闭环
- [x] 3.3 更新相关 README 或开发说明中的接口 / 运行说明（如有必要）
