# OpenSpec 全局状态桥（digest）
> 用途：为 AI 助手与协作者提供当前仓库的覆盖式状态快照。
> 规则：本文件是快照，不是日志；每次更新直接覆盖旧内容。

## 1. 快照元信息
- `snapshot_at`: `2026-03-23`
- `owner`: `Codex`
- `scope`: `全仓库（Timeline 最小业务闭环已归档，待提交）`
- `status`: `green`

## 2. 当前目标（Top Goal）
- `primary_goal`: `在完成 Space、Node、Timeline 三条主线后，提交当前归档结果并保持新的稳定基线`
- `success_signal`: `无活动 change、主规范同步完成、工作区 clean`
- `deadline_or_window`: `归档收尾阶段`

## 3. 当前阶段与主线
- `current_phase`: `archive`
- `change_type`: `spec-impacting`
- `active_change_ids`: `[]`
- `active_specs`: `[]`
- `branch_context`: `main，implement-timeline-minimal-business-loop 已归档并同步主规范`
- `git_branch`: `main`
- `git_head`: `033dcc1`
- `git_dirty`: `true`
- `git_changed_files`:
  - `openspec/changes/archive/2026-03-23-implement-timeline-minimal-business-loop/...`
  - `openspec/specs/timeline-management/spec.md`
  - `openspec/specs/core-api-foundation/spec.md`
  - `openspec/specs/node-management/spec.md`
  - `openspec/specs/space-management/spec.md`
  - `openspec/specs/web-app-shell/spec.md`
  - `openspec/digest.local.md`
  - `openspec/digest.md`
  - `apps/core-api/...`
  - `apps/web/...`
  - `README.md`

## 4. 已确认决策（Current Decisions）
- `decisions`:
  - `TimelineEvent 已成为 Space 内第一版历史记录对象，由 timeline-management 主规范承载`
  - `Node 的关键变化通过受控方式写入 TimelineEvent，而不是直接把历史逻辑散落到 controller`
  - `Space 页面继续作为内容与过程的统一承载入口，同时展示 Node 区域与 Timeline 区域`
  - `当前 Timeline 只承载最小历史闭环，不扩展为完整 event sourcing 或复杂历史系统`

## 5. 当前事实状态（Source-of-Truth Snapshot）
- `spec_status`: `timeline-management 主规范已存在；core-api-foundation、node-management、space-management、web-app-shell 已同步 Timeline 增量要求`
- `changes_status`: `implement-timeline-minimal-business-loop 已归档到 openspec/changes/archive/2026-03-23-implement-timeline-minimal-business-loop/；当前无活动 change`
- `code_status`: `core-api 已支持 TimelineEvent 建模、Node 关键变化写历史和 Space Timeline 列表接口；web 已在 Space 页面展示 Timeline 列表区域`
- `tests_status`: `已完成 Prisma 迁移、前后端 typecheck/build，以及 Node -> Timeline 的真实接口联调验证`

## 6. 阻塞与风险（Blockers / Risks）
- `blockers`:
  - `无硬阻塞`
- `risks`:
  - `归档结果、主规范同步和实现代码尚未提交到 Git`

## 7. 待确认事项（Open Questions）
- `open_questions`:
  - `下一条正式业务主线是否优先推进 Snapshot、Sync Candidate 或更复杂 Timeline 演化能力，需要通过新变更明确`

## 8. 已完成事项（Done）
- `done`:
  - `完成 implement-timeline-minimal-business-loop 的实现、联调验证和归档`
  - `完成 timeline-management 主规范同步`
  - `完成 core-api-foundation、node-management、space-management、web-app-shell 的 Timeline 增量规范同步`
  - `完成 Node 创建、普通更新、状态变更触发 TimelineEvent 的真实验证`

## 9. 下一步动作（Next Actions）
- `next_actions`:
  - `[P1] 提交本次 Timeline 变更与归档结果`
  - `[P2] 确认工作区恢复 clean`
  - `[P3] 基于新的 Space + Node + Timeline 基线发起下一项业务变更`

## 10. 关键路径引用（References）
- `references`:
  - `openspec/project.md`
  - `openspec/changes/archive/2026-03-23-implement-timeline-minimal-business-loop/proposal.md`
  - `openspec/changes/archive/2026-03-23-implement-timeline-minimal-business-loop/design.md`
  - `openspec/changes/archive/2026-03-23-implement-timeline-minimal-business-loop/tasks.md`
  - `openspec/specs/timeline-management/spec.md`
  - `openspec/specs/core-api-foundation/spec.md`
  - `openspec/specs/node-management/spec.md`
  - `openspec/specs/space-management/spec.md`
  - `openspec/specs/web-app-shell/spec.md`
