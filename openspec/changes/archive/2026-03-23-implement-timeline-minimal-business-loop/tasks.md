## 1. 后端 Timeline 最小闭环

- [x] 1.1 在 Prisma schema 中新增 TimelineEvent 模型与所需枚举，并生成对应迁移
- [x] 1.2 在 `core-api` 的 `timeline` 模块内补齐 repository / application(use case) / controller 基础链路
- [x] 1.3 实现某个 Space 下的 Timeline 列表查询接口，并保持 Prisma 查询收敛在 infrastructure 层
- [x] 1.4 在 Node 创建、更新和状态变更用例中写入对应的 TimelineEvent
- [x] 1.5 为 Timeline 相关接口与事件写入逻辑补充最小输入校验、返回 DTO 或验证用例

## 2. 前端 Space 内的 Timeline 最小流

- [x] 2.1 在 `features/timeline` 中补齐 `api.ts`、`hooks.ts`、`types.ts` 及所需容器/展示组件
- [x] 2.2 在 Space 详情页 / Space 首页中接入 Timeline 列表区域，并展示当前 Space 下最近的 TimelineEvent 集合与空状态
- [x] 2.3 为 Timeline 列表项补充最小展示字段映射，包括事件类型、关联对象标题、事件时间与事件摘要

## 3. 联调与收尾

- [x] 3.1 打通 web 与 core-api 的 Timeline 列表联调链路，并验证 Node 关键变化会触发 TimelineEvent 写入
- [x] 3.2 验证用户能够在某个 Space 内完成“创建 / 更新 Node -> Timeline 出现最近变化”的最小闭环
- [x] 3.3 更新相关 README 或开发说明中的接口 / 运行说明（如有必要）
