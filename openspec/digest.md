# OpenSpec 全局状态桥（digest）

> 用途：为 AI 助手 / 协作者提供一个“当前状态快照”。
> 规则：这是**覆盖式快照**，不是日志；每次更新请直接覆盖旧内容，不按时间追加流水记录。

## 1. 快照元信息

- `snapshot_at`: `2026-02-26 11:08`
- `owner`: `AI助手`
- `scope`: `全仓库（v0.3 已归档；最近有开发环境配置提交；当前为维护态）`
- `status`: `yellow`

## 2. 当前目标（Top Goal）

- `primary_goal`: `维护 v0.3 归档后的稳定基线，并保持 digest 与当前 Git/OpenSpec 状态一致`
- `success_signal`: `digest 已反映无活动 change、最新 HEAD 与当前工作区状态`
- `deadline_or_window`: `N/A`

## 3. 当前阶段与主线

- `current_phase`: `archive`
- `change_type`: `implementation-only`
- `active_change_ids`: `[]`
- `active_specs`: `[]`
- `branch_context`: `master（无活动 OpenSpec change；v0.3 已归档；最新提交为开发环境配置调整）`
- `git_branch`: `master`
- `git_head`: `c8823bf`
- `git_dirty`: `true`
- `git_changed_files`: `[openspec/digest.md]`

## 4. 已确认决策（Current Decisions）

- `decisions`:
  - `v0.3 仅提供界面文案中英文切换（zh-CN / en），默认中文`
  - `使用轻量本地方案（文案映射 + localStorage），不引入 vue-i18n`
  - `语言切换不翻译 JSON 字段名与用户输入内容`
  - `覆盖 Home 与 Spec Studio 主要界面文案及导入导出提示`

## 5. 当前事实状态（Source-of-Truth Snapshot）

- `spec_status`: `spec-studio 当前真相已合并 v0.3 中英文界面文案切换；规范包含需求 10（原 8 + 新增 2）`
- `changes_status`: `无活动变更；最近 OpenSpec 主线为 v0.3（add-ui-language-toggle），已归档到 openspec/changes/archive/2026-02-26-add-ui-language-toggle/`
- `code_status`: `Spec Studio 已具备 v0.3 中英文界面文案切换能力（含 localStorage 持久化、字段标签/默认填充内容/Tier 显示/导入导出提示本地化）；最近另有一次开发环境端口配置提交（见 git HEAD）`
- `tests_status`: `v0.3 归档前 pnpm build 与 openspec-cn validate --all 通过；最近 HEAD(c8823bf) 本次仅用于快照更新，未额外复验`

## 6. 阻塞与风险（Blockers / Risks）

- `blockers`:
  - `无`
- `risks`:
  - `当前为手写轻量文案表，后续文案增长时可能出现 key 漏配/漂移`
  - `本次在未完成手动关键路径验证（2.6）的情况下归档；需确认 Home/Spec 切换后语言显示与 localStorage 持久化符合预期`
  - `v0.3 的手动关键路径验证（2.6）仍未补做；若继续叠加功能迭代，问题定位成本会上升`

## 7. 待确认事项（Open Questions）

- `open_questions`:
  - `是否在后续迭代引入更系统化的 i18n 组织方式（按页面拆分字典、自动键检查）`

## 8. 已完成事项（Done）

- `done`:
  - `创建活动变更 add-ui-language-toggle -> proposal/tasks/spec delta 已落盘并通过严格校验`
  - `新增轻量语言状态模块 useUiLocale -> zh-CN/en 文案映射 + localStorage 持久化`
  - `HomeView 与 SpecStudio 接入语言切换按钮 -> 主要界面文案可中英文切换`
  - `本地化 v0.2 导入/导出成功失败提示与主要编辑器文案`
  - `补齐字段标签本地化 -> worldName 与 knobs（fantasyRationality/magicTechRatio/conflictIntensity）显示文案可切换`
  - `补齐默认填充内容本地化 -> 默认 worldName、初始示例规则名称/描述、新增规则默认名称/描述随语言切换（仅在仍为系统默认文案时转换）`
  - `补齐 Tier 列显示本地化 -> 表格中的 hard/soft/flavor 显示为当前语言标签（仅显示层转换）`
  - `运行 pnpm build -> 构建通过（存在 chunk size 警告但不阻塞）`
  - `执行 openspec-cn archive add-ui-language-toggle --yes -> v0.3 变更已归档并合并到正式规范`
  - `执行 openspec-cn validate --all --strict --no-interactive -> 全量 OpenSpec 校验通过`
  - `提交 v0.3 功能与归档记录 -> 68c1f40 feat(spec-studio): 增加中英文界面切换并归档 v0.3`
  - `最近提交开发环境配置调整 -> c8823bf change: 修改开发环境端口（非 OpenSpec change）`

## 9. 下一步动作（Next Actions）

- `next_actions`:
  - `[P1] 补做手动关键路径验证（切换/刷新保持/Home-Spec 同步/导入导出提示） -> 降低归档后回归风险`
  - `[P2] 如需补强文案组织方式（按页面拆分/键检查） -> 新建小范围提案`
  - `[P3] 若开发环境端口调整影响协作说明/README -> 评估是否补充文档说明`
  - `[P4] 继续使用 /prompts:digest 维护快照 -> 后续变更保持 Active Change/Git State 同步`

## 10. 关键路径引用（References）

- `references`:
  - `openspec/project.md` - `长期项目定义（Vision / Constraints / Workflow）`
  - `openspec/specs/spec-studio/spec.md` - `当前规范真相（已包含 v0.3 中英文界面文案切换，需求 10）`
  - `openspec/changes/archive/2026-02-26-add-ui-language-toggle/proposal.md` - `v0.3 归档提案`
  - `openspec/changes/archive/2026-02-26-add-ui-language-toggle/tasks.md` - `v0.3 归档任务清单（保留 2.6 未完成事实）`
  - `openspec/changes/archive/2026-02-26-add-ui-language-toggle/specs/spec-studio/spec.md` - `v0.3 归档增量规范`
  - `src/composables/useUiLocale.ts` - `共享语言状态与文案映射`
  - `src/views/HomeView.vue` - `Home 页语言切换入口`
  - `src/views/SpecStudio.vue` - `Spec Studio 文案切换与提示本地化`
