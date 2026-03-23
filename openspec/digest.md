# OpenSpec 全局状态桥（digest）
> 用途：为 AI 助手与协作者提供当前仓库的覆盖式状态快照。
> 规则：本文件是快照，不是日志；每次更新直接覆盖旧内容。

## 1. 快照元信息
- `snapshot_at`: `2026-03-23`
- `owner`: `Codex`
- `scope`: `全仓库（UI 双语切换与 Node 闭环已归档）`
- `status`: `green`

## 2. 当前目标（Top Goal）
- `primary_goal`: `在连续完成 UI 双语切换和 Node 闭环后，保持新的稳定基线并提交归档结果`
- `success_signal`: `无活动 change、主规范同步完成、工作区 clean`
- `deadline_or_window`: `归档收尾阶段`

## 3. 当前阶段与主线
- `current_phase`: `archive`
- `change_type`: `spec-impacting`
- `active_change_ids`: `[]`
- `active_specs`: `[]`
- `branch_context`: `main，add-ui-language-toggle 与 implement-node-minimal-business-loop 已归档`
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

## 4. 已确认决策（Current Decisions）
- `decisions`:
  - `前端 UI 文案切换能力已成为正式能力规范，由 web-ui-localization 主规范承载`
  - `Node 已成为 Space 内第一版内容单元，由 node-management 主规范承载`
  - `web-app-shell 继续作为壳层与页面接入规范，承接 Space 和 Node 的前端行为要求`
  - `core-api-foundation 与 space-management 继续保持分层实现和 Space 主对象真相源边界`

## 5. 当前事实状态（Source-of-Truth Snapshot）
- `spec_status`: `web-ui-localization、node-management 主规范已存在；web-app-shell、core-api-foundation、space-management 已同步最新要求`
- `changes_status`: `add-ui-language-toggle 与 implement-node-minimal-business-loop 已归档到 openspec/changes/archive/；当前无活动 change`
- `code_status`: `web 已支持中英文切换，并在 Space 页面内支持 Node 创建、列表、详情和基础编辑；core-api 已支持对应 Node 接口`
- `tests_status`: `Node 闭环已完成真实联调；归档后当前待完成的是 Git 提交收尾`

## 6. 阻塞与风险（Blockers / Risks）
- `blockers`:
  - `无硬阻塞`
- `risks`:
  - `归档结果和 digest 更新尚未提交到 Git`

## 7. 待确认事项（Open Questions）
- `open_questions`:
  - `下一项正式业务主线是否优先推进 Timeline、Snapshot 或其他 Space 内演化能力，需通过新变更明确`

## 8. 已完成事项（Done）
- `done`:
  - `完成 add-ui-language-toggle 的实现、任务收尾和归档`
  - `完成 implement-node-minimal-business-loop 的实现、联调验证和归档`
  - `完成 web-ui-localization 与 node-management 主规范同步`
  - `完成 web-app-shell、core-api-foundation、space-management 的增量规范同步`

## 9. 下一步动作（Next Actions）
- `next_actions`:
  - `[P1] 提交本次归档和主规范同步结果`
  - `[P2] 确认工作区恢复 clean`
  - `[P3] 基于新的稳定基线发起下一项业务变更`

## 10. 关键路径引用（References）
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
