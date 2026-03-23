# OpenSpec 本地状态桥（digest.local）
> 用途：为当前仓库维护本地高频状态快照。
> 规则：本文件是覆盖式快照，不记录时间流水。

## 1. 快照元信息
- `snapshot_at`: `2026-03-23`
- `owner`: `Codex`
- `scope`: `本地工作区（Timeline 闭环已归档，等待 Git 提交）`
- `status`: `green`

## 2. 当前目标（Top Goal）
- `primary_goal`: `完成 implement-timeline-minimal-business-loop 的归档收尾和 Git 提交，回到稳定基线`
- `success_signal`: `无活动 change、主规范已同步、工作区 clean`
- `deadline_or_window`: `归档收尾阶段`

## 3. 当前阶段与主线
- `current_phase`: `archive`
- `change_type`: `spec-impacting`
- `active_change_ids`: `[]`
- `active_specs`: `[]`
- `branch_context`: `main，Timeline 最小业务闭环已完成实现与归档，等待提交归档结果`
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

## 4. 已完成事项（Done）
- `done`:
  - `implement-timeline-minimal-business-loop 已完成实现、联调验证并归档到 archive 目录`
  - `timeline-management 已同步为主规范`
  - `core-api-foundation、node-management、space-management、web-app-shell 已同步最新 Timeline 增量规范`
  - `Node 的创建、普通更新和状态变更都已验证会写入 TimelineEvent`

## 5. 下一步动作（Next Actions）
- `next_actions`:
  - `[P1] 提交本次 Timeline 代码、迁移、主规范同步和归档结果`
  - `[P2] 确认工作区恢复 clean`
  - `[P3] 在新的 Space + Node + Timeline 基线上发起下一项业务变更`

## 6. 阻塞与风险（Blockers / Risks）
- `blockers`:
  - `无硬阻塞`
- `risks`:
  - `归档结果、主规范同步和实现代码尚未提交到 Git`

## 7. 待确认事项（Open Questions）
- `open_questions`:
  - `下一条业务主线是否优先推进 Snapshot、Sync Candidate 或更复杂 Timeline 能力，仍待新变更确认`

## 8. 关键路径引用（References）
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
