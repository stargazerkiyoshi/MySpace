# OpenSpec 全局状态桥（digest）
> 用途：为 AI 助手与协作者提供当前仓库的覆盖式状态快照。
> 规则：本文件是快照，不是日志；每次更新直接覆盖旧内容。

## 1. 快照元信息
- `snapshot_at`: `2026-03-23`
- `owner`: `Codex`
- `scope`: `全仓库（时间线详情与主干/分支结构变更已归档，等待 Git 提交）`
- `status`: `green`

## 2. 当前目标（Top Goal）
- `primary_goal`: `提交 add-timeline-node-detail-and-branch-structure 的归档结果并回到稳定基线`
- `success_signal`: `无活动 change、主规范同步完成、工作区 clean`
- `deadline_or_window`: `归档收尾阶段`

## 3. 当前阶段与主线
- `current_phase`: `archive`
- `change_type`: `spec-impacting`
- `active_change_ids`: `[]`
- `active_specs`: `[]`
- `branch_context`: `main，Timeline 已升级为可查看详情、可区分主干/分支、可表达前后关系的最小历史系统`
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

## 4. 当前已确认决策（Current Decisions）
- `decisions`:
  - `Timeline 仍以 TimelineEvent 作为最小历史对象扩展，而不是引入第二套 HistoryNode 模型`
  - `主干 / 分支结构进入稳定数据模型，由 isMainline、parentNodeId、branchFromNodeId、mergeToNodeId 和 nodeType 表达`
  - `时间线详情继续承载在 Space 页面内部，不引入独立时间线详情路由`
  - `当前阶段只建立最小可理解历史结构，不扩展为完整历史树或复杂 merge 逻辑`

## 5. 当前事实状态（Source-of-Truth Snapshot）
- `spec_status`: `timeline-management、web-app-shell、space-management 主规范已同步新的时间线详情与结构要求`
- `changes_status`: `add-timeline-node-detail-and-branch-structure 已归档到 openspec/changes/archive/2026-03-23-add-timeline-node-detail-and-branch-structure；当前无其他活动 change`
- `code_status`: `core-api 已支持时间线详情接口和结构字段；web 已支持列表增强、详情面板、主干/分支视觉区分和最小分支记录入口`
- `tests_status`: `已完成 Prisma 迁移、前后端 typecheck/build 和真实 API 闭环验证`

## 6. 阻塞与风险（Blockers / Risks）
- `blockers`:
  - `无硬阻塞`
- `risks`:
  - `本次归档结果和实现代码尚未提交到 Git`

## 7. 待确认事项（Open Questions）
- `open_questions`:
  - `下一条业务主线是否优先推进 Snapshot、Sync Candidate，还是更复杂的 Timeline 演化能力，需通过新变更确认`

## 8. 已完成事项（Done）
- `done`:
  - `已完成 add-timeline-node-detail-and-branch-structure 的实现`
  - `已完成时间线节点详情、主干/分支字段、前置/后继关系和当前状态影响展示`
  - `已完成 Node 创建/更新的主干 / 分支记录入口`
  - `已完成 timeline-management、web-app-shell、space-management 主规范同步`

## 9. 下一步动作（Next Actions）
- `next_actions`:
  - `[P1] 提交本次时间线详情与主干/分支结构变更及归档结果`
  - `[P2] 确认工作区恢复 clean`
  - `[P3] 在新基线上发起下一项 OpenSpec 变更`

## 10. 关键路径引用（References）
- `references`:
  - `openspec/project.md`
  - `openspec/changes/archive/2026-03-23-add-timeline-node-detail-and-branch-structure/proposal.md`
  - `openspec/changes/archive/2026-03-23-add-timeline-node-detail-and-branch-structure/design.md`
  - `openspec/changes/archive/2026-03-23-add-timeline-node-detail-and-branch-structure/tasks.md`
  - `openspec/specs/timeline-management/spec.md`
  - `openspec/specs/web-app-shell/spec.md`
  - `openspec/specs/space-management/spec.md`
