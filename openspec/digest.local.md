# OpenSpec 本地状态桥（digest.local）
> 用途：为当前仓库维护本地高频状态快照。
> 规则：本文件是覆盖式快照，不记录时间流水。

## 1. 快照元信息
- `snapshot_at`: `2026-03-23`
- `owner`: `Codex`
- `scope`: `本地工作区（双变更已归档，等待 Git 提交）`
- `status`: `green`

## 2. 当前目标（Top Goal）
- `primary_goal`: `完成 add-ui-language-toggle 与 implement-node-minimal-business-loop 的归档和提交，回到稳定基线`
- `success_signal`: `无活动 change、主规范已同步、工作区 clean`
- `deadline_or_window`: `归档收尾阶段`

## 3. 当前阶段与主线
- `current_phase`: `archive`
- `change_type`: `spec-impacting`
- `active_change_ids`: `[]`
- `active_specs`: `[]`
- `branch_context`: `main，UI 双语切换和 Node 最小业务闭环已归档，等待提交归档结果`
- `git_branch`: `main`
- `git_head`: `00b7134`
- `git_dirty`: `true`
- `git_changed_files`:
  - `openspec/changes/archive/2026-03-23-add-ui-language-toggle/...`
  - `openspec/changes/archive/2026-03-23-implement-node-minimal-business-loop/...`
  - `openspec/specs/web-ui-localization/spec.md`
  - `openspec/specs/node-management/spec.md`
  - `openspec/specs/web-app-shell/spec.md`
  - `openspec/specs/core-api-foundation/spec.md`
  - `openspec/specs/space-management/spec.md`
  - `openspec/digest.local.md`
  - `openspec/digest.md`

## 4. 已完成事项（Done）
- `done`:
  - `add-ui-language-toggle 已完成实现并归档到 archive 目录`
  - `implement-node-minimal-business-loop 已完成实现、联调验证并归档到 archive 目录`
  - `web-ui-localization 与 node-management 已同步为主规范`
  - `web-app-shell、core-api-foundation、space-management 已同步最新增量规范`

## 5. 下一步动作（Next Actions）
- `next_actions`:
  - `[P1] 提交本次归档与主规范同步结果`
  - `[P2] 确认工作区恢复 clean`
  - `[P3] 按新的稳定基线发起下一项业务变更`

## 6. 阻塞与风险（Blockers / Risks）
- `blockers`:
  - `无硬阻塞`
- `risks`:
  - `归档结果和 digest 更新尚未提交到 Git`

## 7. 待确认事项（Open Questions）
- `open_questions`:
  - `下一条业务主线是否继续推进 Timeline、Snapshot 或 Sync Candidate，仍待新变更确认`

## 8. 关键路径引用（References）
- `references`:
  - `openspec/project.md`
  - `openspec/changes/archive/2026-03-23-add-ui-language-toggle/proposal.md`
  - `openspec/changes/archive/2026-03-23-add-ui-language-toggle/design.md`
  - `openspec/changes/archive/2026-03-23-add-ui-language-toggle/tasks.md`
  - `openspec/changes/archive/2026-03-23-implement-node-minimal-business-loop/proposal.md`
  - `openspec/changes/archive/2026-03-23-implement-node-minimal-business-loop/design.md`
  - `openspec/changes/archive/2026-03-23-implement-node-minimal-business-loop/tasks.md`
  - `openspec/specs/web-ui-localization/spec.md`
  - `openspec/specs/node-management/spec.md`
  - `openspec/specs/web-app-shell/spec.md`
  - `openspec/specs/core-api-foundation/spec.md`
  - `openspec/specs/space-management/spec.md`
