# OpenSpec 本地状态桥（digest.local）
> 用途：为当前仓库维护本地高频状态快照。
> 规则：本文件是覆盖式快照，不记录时间流水。

## 1. 快照元信息
- `snapshot_at`: `2026-03-23`
- `owner`: `Codex`
- `scope`: `本地工作区（时间线详情与主干/分支结构变更已归档，等待 Git 提交）`
- `status`: `green`

## 2. 当前目标（Top Goal）
- `primary_goal`: `完成 add-timeline-node-detail-and-branch-structure 的归档与 Git 提交，并回到稳定基线`
- `success_signal`: `无活动 change、主规范已同步、工作区 clean`
- `deadline_or_window`: `归档收尾阶段`

## 3. 当前阶段与主线
- `current_phase`: `archive`
- `change_type`: `spec-impacting`
- `active_change_ids`: `[]`
- `active_specs`: `[]`
- `branch_context`: `main，时间线已从纯展示升级为带详情和主干/分支结构的最小历史系统`
- `git_branch`: `main`
- `git_head`: `4b63003`
- `git_dirty`: `true`
- `git_changed_files`:
  - `openspec/changes/archive/2026-03-23-add-timeline-node-detail-and-branch-structure/...`
  - `openspec/specs/timeline-management/spec.md`
  - `openspec/specs/web-app-shell/spec.md`
  - `openspec/specs/space-management/spec.md`
  - `openspec/digest.local.md`
  - `openspec/digest.md`
  - `apps/core-api/...`
  - `apps/web/...`
  - `README.md`

## 4. 已完成事项（Done）
- `done`:
  - `已完成 TimelineEvent 结构字段扩展，包括 isMainline、parentNodeId、branchFromNodeId、mergeToNodeId 和 nodeType`
  - `已完成 core-api 时间线详情接口和前置 / 后继关系读取能力`
  - `已完成 web 端时间线列表增强、详情面板和主干 / 分支区分展示`
  - `已在 Node 创建与更新中补充主干 / 分支记录入口，并验证真实 API 闭环`
  - `已同步 timeline-management、web-app-shell、space-management 主规范`

## 5. 下一步动作（Next Actions）
- `next_actions`:
  - `[P1] 提交本次时间线详情与主干/分支结构代码、迁移、主规范同步和归档结果`
  - `[P2] 确认工作区恢复 clean`
  - `[P3] 在新的 Space + Node + Timeline 基线之上发起下一项业务变更`

## 6. 阻塞与风险（Blockers / Risks）
- `blockers`:
  - `无硬阻塞`
- `risks`:
  - `本次归档结果和实现改动尚未提交到 Git`

## 7. 待确认事项（Open Questions）
- `open_questions`:
  - `下一条正式业务主线是否优先推进 Snapshot、Sync Candidate，还是更完整的 Timeline 演化能力，仍待新变更确认`

## 8. 关键路径引用（References）
- `references`:
  - `openspec/project.md`
  - `openspec/changes/archive/2026-03-23-add-timeline-node-detail-and-branch-structure/proposal.md`
  - `openspec/changes/archive/2026-03-23-add-timeline-node-detail-and-branch-structure/design.md`
  - `openspec/changes/archive/2026-03-23-add-timeline-node-detail-and-branch-structure/tasks.md`
  - `openspec/specs/timeline-management/spec.md`
  - `openspec/specs/web-app-shell/spec.md`
  - `openspec/specs/space-management/spec.md`
