# OpenSpec 本地状态桥（digest.local）
> 用途：为当前仓库维护本地高频状态快照。
> 规则：本文件是覆盖式快照，不记录时间流水。

## 1. 快照元信息
- `snapshot_at`: `2026-03-24`
- `owner`: `Codex`
- `scope`: `本地工作区（首页状态页与时间线历史节点联动变更已归档，等待 Git 提交）`
- `status`: `green`

## 2. 当前目标（Top Goal）
- `primary_goal`: `完成 link-home-state-to-timeline-history 的归档与 Git 提交，并回到稳定基线`
- `success_signal`: `无活动 change、主规范已同步、工作区 clean`
- `deadline_or_window`: `归档收尾阶段`

## 3. 当前阶段与主线
- `current_phase`: `archive`
- `change_type`: `spec-impacting`
- `active_change_ids`: `[]`
- `active_specs`: `[]`
- `branch_context`: `main，首页状态页已经能展示当前状态来源、关键推进与历史跳转入口，时间线详情已补齐与当前状态的关系表达`
- `git_branch`: `main`
- `git_head`: `725eb7a`
- `git_dirty`: `true`
- `git_changed_files`:
  - `openspec/changes/archive/2026-03-24-link-home-state-to-timeline-history/...`
  - `openspec/specs/current-state-linking/spec.md`
  - `openspec/specs/timeline-management/spec.md`
  - `openspec/specs/space-management/spec.md`
  - `openspec/specs/web-app-shell/spec.md`
  - `openspec/digest.local.md`
  - `openspec/digest.md`
  - `apps/core-api/...`
  - `apps/web/...`
  - `README.md`

## 4. 已完成事项（Done）
- `done`:
  - `已完成 current-state-linking 读模型语义与 dashboard 聚合查询链路`
  - `已完成首页状态摘要展示与从首页跳转到时间线节点的真实入口`
  - `已完成时间线详情中的 entersCurrentMainline、isAffectingCurrentState、impactType 等关系字段展示`
  - `已完成 current-state-linking、timeline-management、space-management、web-app-shell 主规范同步`
  - `已完成 link-home-state-to-timeline-history 归档迁移`

## 5. 下一步动作（Next Actions）
- `next_actions`:
  - `[P1] 提交本次首页状态页与时间线联动实现、规范同步和归档结果`
  - `[P2] 提交后确认工作区恢复 clean`
  - `[P3] 在新的 Space + Node + Timeline + Current State 基线上发起下一项 OpenSpec 变更`

## 6. 阻塞与风险（Blockers / Risks）
- `blockers`:
  - `无硬阻塞`
- `risks`:
  - `当前归档结果和实现代码尚未提交到 Git`

## 7. 待确认事项（Open Questions）
- `open_questions`:
  - `下一条业务主线是 Snapshot、Sync Candidate，还是进一步强化 Timeline / Current State 路径演化能力，仍待新变更确认`

## 8. 关键路径引用（References）
- `references`:
  - `openspec/project.md`
  - `openspec/changes/archive/2026-03-24-link-home-state-to-timeline-history/proposal.md`
  - `openspec/changes/archive/2026-03-24-link-home-state-to-timeline-history/design.md`
  - `openspec/changes/archive/2026-03-24-link-home-state-to-timeline-history/tasks.md`
  - `openspec/specs/current-state-linking/spec.md`
  - `openspec/specs/timeline-management/spec.md`
  - `openspec/specs/space-management/spec.md`
  - `openspec/specs/web-app-shell/spec.md`
