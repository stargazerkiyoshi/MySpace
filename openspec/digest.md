# OpenSpec 全局状态桥（digest）

> 用途：为 AI 助手与协作者提供当前仓库的覆盖式状态快照。
> 规则：本文件是快照，不是日志；每次更新直接覆盖旧内容。

## 1. 快照元信息

- `snapshot_at`: `2026-03-21`
- `owner`: `Codex`
- `scope`: `全仓库（bootstrap-space-collab-mvp-foundation 已归档，当前无活动 change）`
- `status`: `yellow`

## 2. 当前目标（Top Goal）

- `primary_goal`: `在 MVP 基线归档后保持工程、规范与架构文档处于一致且可继续迭代的稳定状态`
- `success_signal`: `归档结果、主规范同步、架构文档与 README 一致，并完成后续 Git 提交`
- `deadline_or_window`: `当前迭代收尾阶段`

## 3. 当前阶段与主线

- `current_phase`: `archive`
- `change_type`: `spec-impacting`
- `active_change_ids`: `[]`
- `active_specs`: `[]`
- `branch_context`: `main；基础工程变更已归档，但归档与规范同步结果尚未提交`
- `git_branch`: `main`
- `git_head`: `8e5733d`
- `git_dirty`: `true`
- `git_changed_files`:
  - `README.md`
  - `docs/ai-service-architecture.md`
  - `docs/backend-architecture.md`
  - `openspec/changes/bootstrap-space-collab-mvp-foundation/.openspec.yaml` (deleted)
  - `openspec/changes/bootstrap-space-collab-mvp-foundation/design.md` (deleted)
  - `openspec/changes/bootstrap-space-collab-mvp-foundation/proposal.md` (deleted)
  - `openspec/changes/bootstrap-space-collab-mvp-foundation/specs/ai-orchestration-service/spec.md` (deleted)
  - `openspec/changes/bootstrap-space-collab-mvp-foundation/specs/core-api-foundation/spec.md` (deleted)
  - `openspec/changes/bootstrap-space-collab-mvp-foundation/specs/local-dev-infrastructure/spec.md` (deleted)
  - `openspec/changes/bootstrap-space-collab-mvp-foundation/specs/web-app-shell/spec.md` (deleted)
  - `openspec/changes/bootstrap-space-collab-mvp-foundation/specs/workspace-monorepo-foundation/spec.md` (deleted)
  - `openspec/changes/bootstrap-space-collab-mvp-foundation/tasks.md` (deleted)
  - `openspec/changes/archive/2026-03-21-bootstrap-space-collab-mvp-foundation/...` (new)
  - `openspec/specs/...` (new)

## 4. 已确认决策（Current Decisions）

- `decisions`:
  - `项目当前处于 MVP 基线搭建后的归档收尾阶段，优先保证结构清晰、边界明确、可持续迭代`
  - `前端长期通用规则沉淀到 docs/frontend-architecture.md；当前项目业务要求继续沉淀到 OpenSpec`
  - `后端与 AI 层的通用架构规则分别沉淀到 docs/backend-architecture.md 与 docs/ai-service-architecture.md`
  - `OpenSpec 变更 bootstrap-space-collab-mvp-foundation 已归档并同步到 openspec/specs`
  - `当前仓库保留根级 AGENTS.md 作为项目级 AI 协作入口`

## 5. 当前事实状态（Source-of-Truth Snapshot）

- `spec_status`: `当前无活动 change；主规范目录已包含 workspace-monorepo-foundation、web-app-shell、core-api-foundation、ai-orchestration-service、local-dev-infrastructure 五项规范`
- `changes_status`: `bootstrap-space-collab-mvp-foundation 已归档至 openspec/changes/archive/2026-03-21-bootstrap-space-collab-mvp-foundation/`
- `code_status`: `monorepo、web、core-api、ai-service、docker compose、.env.example、README 与通用架构文档已落地；当前工作区仍有未提交的归档与文档改动`
- `tests_status`: `此前已完成 pnpm install、pnpm check、pnpm build；当前收尾改动未再次触发新的构建验证`

## 6. 阻塞与风险（Blockers / Risks）

- `blockers`:
  - `无硬阻塞`
- `risks`:
  - `归档与规范同步结果尚未提交，当前工作区仍为 dirty`
  - `README.md 处于已修改状态，需与当前架构文档和归档结果保持一致后再提交`
  - `docs/ai-service-architecture.md` 与 `docs/backend-architecture.md` 尚未进入已提交基线`

## 7. 待确认事项（Open Questions）

- `open_questions`:
  - `README.md 当前修改是否仅为架构文档导航更新，提交前需再确认内容与项目现状一致`
  - `下一轮 OpenSpec 变更应聚焦哪一项核心能力（例如 Space 基础模型、Node/Timeline、Agent 协作边界）`

## 8. 已完成事项（Done）

- `done`:
  - `完成 bootstrap-space-collab-mvp-foundation 变更的 proposal、design、tasks 与五项 capability spec`
  - `完成 monorepo 基线与 web / core-api / ai-service 三个应用的最小可运行骨架`
  - `完成 PostgreSQL / Redis / Docker Compose / Prisma 初始集成`
  - `完成前端、后端、AI 层通用架构文档沉淀到 docs/`
  - `执行 OpenSpec 归档，活动变更已迁移到 openspec/changes/archive/2026-03-21-bootstrap-space-collab-mvp-foundation/`
  - `主规范已同步到 openspec/specs/`
  - `归档相关改动尚未完成 Git 提交`

## 9. 下一步动作（Next Actions）

- `next_actions`:
  - `[P1] 检查并提交当前归档、主规范同步、README 与 docs 架构文档改动`
  - `[P2] 提交后确认工作区恢复 clean，作为新的稳定基线`
  - `[P3] 基于当前项目方向发起下一项 OpenSpec 变更，而不是直接扩散实现`

## 10. 关键路径引用（References）

- `references`:
  - `openspec/project.md` - `项目总览与长期方向`
  - `openspec/changes/archive/2026-03-21-bootstrap-space-collab-mvp-foundation/proposal.md` - `已归档的 MVP 基线提案`
  - `openspec/changes/archive/2026-03-21-bootstrap-space-collab-mvp-foundation/design.md` - `已归档的 MVP 基线设计`
  - `openspec/changes/archive/2026-03-21-bootstrap-space-collab-mvp-foundation/tasks.md` - `已归档的实现任务清单`
  - `openspec/specs/workspace-monorepo-foundation/spec.md` - `monorepo 基线规范`
  - `openspec/specs/web-app-shell/spec.md` - `前端应用壳层规范`
  - `openspec/specs/core-api-foundation/spec.md` - `主业务后端基础规范`
  - `openspec/specs/ai-orchestration-service/spec.md` - `AI 编排服务规范`
  - `openspec/specs/local-dev-infrastructure/spec.md` - `本地基础设施规范`
  - `docs/frontend-architecture.md` - `前端通用架构规则`
  - `docs/backend-architecture.md` - `后端通用架构规则`
  - `docs/ai-service-architecture.md` - `AI 层通用架构规则`
