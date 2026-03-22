# OpenSpec 全局状态桥（digest）

> 用途：为 AI 助手与协作者提供当前仓库的覆盖式状态快照。
> 规则：本文件是快照，不是日志；每次更新直接覆盖旧内容。

## 1. 快照元信息

- `snapshot_at`: `2026-03-22`
- `owner`: `Codex`
- `scope`: `全仓库（Space 主对象最小业务闭环已归档）`
- `status`: `green`

## 2. 当前目标（Top Goal）

- `primary_goal`: `在 Space 第一条正式业务主线归档后维持新的稳定基线`
- `success_signal`: `无活动 change、主规范同步完成、工作区 clean`
- `deadline_or_window`: `归档收尾阶段`

## 3. 当前阶段与主线

- `current_phase`: `archive`
- `change_type`: `spec-impacting`
- `active_change_ids`: `[]`
- `active_specs`: `[]`
- `branch_context`: `main；implement-space-minimal-business-loop 已归档并同步到主规范`
- `git_branch`: `main`
- `git_head`: `c23d3d0`
- `git_dirty`: `true`
- `git_changed_files`:
  - `openspec/changes/archive/2026-03-22-implement-space-minimal-business-loop/...`
  - `openspec/specs/core-api-foundation/spec.md`
  - `openspec/specs/web-app-shell/spec.md`
  - `openspec/specs/space-management/spec.md`
  - `openspec/digest.local.md`
  - `openspec/digest.md`

## 4. 已确认决策（Current Decisions）

- `decisions`:
  - `Space 作为第一条正式业务主线已经从基础工程中分离出来，形成独立 capability`
  - `Space 创建、列表、详情已成为主业务服务与前端壳层的正式能力要求`
  - `后端继续保持显式分层，前端继续保持 feature 内聚与页面轻量`
  - `复杂权限、多人协作、Node、Timeline、Snapshot、Sync Candidate、Agent 仍留在后续变更中推进`

## 5. 当前事实状态（Source-of-Truth Snapshot）

- `spec_status`: `space-management 主规范已存在；core-api-foundation 与 web-app-shell 已包含 Space 闭环相关增量要求`
- `changes_status`: `implement-space-minimal-business-loop 已归档到 openspec/changes/archive/2026-03-22-implement-space-minimal-business-loop/；当前无活动 change`
- `code_status`: `web 已支持创建/查看/进入 Space；core-api 已支持 Space 创建、列表、详情接口；数据库迁移与环境配置已打通`
- `tests_status`: `pnpm check、pnpm build 通过；本地已完成“创建 Space -> 查看列表 -> 进入 Space”手动验证`

## 6. 阻塞与风险（Blockers / Risks）

- `blockers`:
  - `无硬阻塞`
- `risks`:
  - `归档结果和 digest 更新尚未提交到 Git`

## 7. 待确认事项（Open Questions）

- `open_questions`:
  - `下一项业务主线是继续 Space 首页结构，还是引入 Node / Timeline，需要通过新变更明确`

## 8. 已完成事项（Done）

- `done`:
  - `完成 MVP 基线后的第一条正式业务闭环：Space 主对象创建、列表、详情`
  - `完成前后端联通、数据库迁移和真实手动联调验证`
  - `完成 OpenSpec 任务 11/11`
  - `完成手动主规范同步并归档 implement-space-minimal-business-loop`

## 9. 下一步动作（Next Actions）

- `next_actions`:
  - `[P1] 提交归档与规范同步结果`
  - `[P2] 确认工作区 clean`
  - `[P3] 发起下一项业务能力变更`

## 10. 关键路径引用（References）

- `references`:
  - `openspec/project.md` - `项目总览与长期方向`
  - `openspec/changes/archive/2026-03-22-implement-space-minimal-business-loop/proposal.md` - `Space 闭环提案`
  - `openspec/changes/archive/2026-03-22-implement-space-minimal-business-loop/design.md` - `Space 闭环设计`
  - `openspec/changes/archive/2026-03-22-implement-space-minimal-business-loop/tasks.md` - `Space 闭环任务`
  - `openspec/specs/space-management/spec.md` - `Space 主对象主规范`
  - `openspec/specs/core-api-foundation/spec.md` - `后端基础规范`
  - `openspec/specs/web-app-shell/spec.md` - `前端壳层规范`
