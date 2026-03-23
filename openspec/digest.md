# OpenSpec 全局状态桥（digest）
> 用途：为协作者提供当前仓库的覆盖式状态快照。
> 规则：本文件是快照，不是日志；每次更新直接覆盖旧内容。

## 1. 快照元信息
- `snapshot_at`: `2026-03-24`
- `owner`: `Codex`
- `scope`: `全仓库（首页状态页与时间线历史节点联动变更已归档，等待 Git 提交）`
- `status`: `green`

## 2. 当前目标（Top Goal）
- `primary_goal`: `提交 link-home-state-to-timeline-history 的归档结果并回到稳定基线`
- `success_signal`: `无活动 change、主规范同步完成、工作区 clean`
- `deadline_or_window`: `归档收尾阶段`

## 3. 当前阶段与主线
- `current_phase`: `archive`
- `change_type`: `spec-impacting`
- `active_change_ids`: `[]`
- `active_specs`: `[]`
- `branch_context`: `main，系统已从“首页与历史并存”推进到“首页能够解释当前状态来源并回跳关键历史节点”的状态`
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

## 4. 当前决策（Current Decisions）
- `decisions`:
  - `首页状态与时间线历史节点通过稳定的 current-state linking 语义挂接，而不是依赖前端临时推断`
  - `首页跳转历史节点继续复用 Space 页和 query 参数，不新增独立历史详情路由`
  - `时间线详情返回结构继续承载当前状态关系字段，供首页和历史页共用`

## 5. 当前事实状态（Source-of-Truth Snapshot）
- `spec_status`: `current-state-linking、timeline-management、space-management、web-app-shell 主规范已同步`
- `changes_status`: `link-home-state-to-timeline-history 已归档到 openspec/changes/archive/2026-03-24-link-home-state-to-timeline-history；当前无其他活动 change`
- `code_status`: `core-api 已支持 dashboard 当前状态聚合与 timeline 当前状态关系字段；web 已支持首页状态摘要、历史跳转和时间线详情关系展示`
- `tests_status`: `已完成 core-api typecheck/build 和 web typecheck/build`

## 6. 阻塞与风险（Blockers / Risks）
- `blockers`:
  - `无硬阻塞`
- `risks`:
  - `本次归档结果与实现代码尚未提交到 Git`

## 7. 待确认事项（Open Questions）
- `open_questions`:
  - `下一条业务主线是 Snapshot、Sync Candidate，还是继续强化 Timeline / Current State 演化能力，仍待新变更确认`

## 8. 已完成事项（Done）
- `done`:
  - `已完成首页状态来源摘要与时间线历史节点的最小联动闭环`
  - `已完成时间线详情对当前状态关系的结构化表达`
  - `已完成 current-state-linking 新 capability 的主规范落地`
  - `已完成 link-home-state-to-timeline-history 归档迁移`

## 9. 下一步动作（Next Actions）
- `next_actions`:
  - `[P1] 提交本次实现、规范同步和归档结果`
  - `[P2] 提交后确认工作区恢复 clean`
  - `[P3] 在新的稳定基线上发起下一项 OpenSpec 变更`

## 10. 关键路径引用（References）
- `references`:
  - `openspec/project.md`
  - `openspec/changes/archive/2026-03-24-link-home-state-to-timeline-history/proposal.md`
  - `openspec/changes/archive/2026-03-24-link-home-state-to-timeline-history/design.md`
  - `openspec/changes/archive/2026-03-24-link-home-state-to-timeline-history/tasks.md`
  - `openspec/specs/current-state-linking/spec.md`
  - `openspec/specs/timeline-management/spec.md`
  - `openspec/specs/space-management/spec.md`
  - `openspec/specs/web-app-shell/spec.md`
