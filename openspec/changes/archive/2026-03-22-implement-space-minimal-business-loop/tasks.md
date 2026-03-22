## 1. 后端 Space 主对象闭环

- [x] 1.1 在 Prisma schema 中新增 Space 主对象最小模型，并生成对应迁移
- [x] 1.2 在 `core-api` 的 `space` 模块内补齐 repository / use case / controller 基础链路
- [x] 1.3 实现创建 Space、查询 Space 列表、查询 Space 详情接口，并保持 Prisma 查询收敛在 infrastructure 层
- [x] 1.4 为 Space 接口补充最小输入校验、返回 DTO 和基础测试或验证用例

## 2. 前端 Space 最小页面流

- [x] 2.1 在 `features/space` 中补齐 `api.ts`、`hooks.ts`、`types.ts` 及所需容器/展示组件
- [x] 2.2 实现 Space 列表页与空状态，并展示可进入的 Space 集合
- [x] 2.3 实现创建 Space 的最小表单或交互入口，并在成功后刷新列表
- [x] 2.4 实现 Space 详情页 / Space 首页占位页，并支持从列表进入具体 Space

## 3. 联调与收尾

- [x] 3.1 打通 web 与 core-api 的 Space 创建、列表、详情联调链路
- [x] 3.2 验证用户能够完成“创建 Space -> 查看列表 -> 进入 Space”的最小闭环
- [x] 3.3 更新相关 README 或开发说明中的接口/运行说明（如有必要）
