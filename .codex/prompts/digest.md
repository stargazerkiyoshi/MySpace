---
description: 更新 OpenSpec 状态桥（双轨制 digest）并输出摘要。
argument-hint: （可选）补充上下文或关注点
---

$ARGUMENTS

你现在要执行一次 OpenSpec 状态桥的覆盖式快照更新（不是日志追加），并在完成后给出摘要。

默认采用“双轨制”：
- 优先更新 `openspec/digest.local.md`（本地高频快照，通常不提交）
- 在以下情况再同步更新 `openspec/digest.md`（共享基线）：
  - 用户明确要求同步共享 digest
  - 当前是阶段切换/归档收尾/交接上下文
  - `openspec/AGENTS.md` 明确要求同步共享 digest
- 若处于归档/归档收尾上下文：额外检查“归档相关改动是否已完成Git提交”，并在摘要的 `Done` / `Next` 中明确写出

**目标**
- 自动更新状态桥（至少更新 `openspec/digest.local.md`；必要时同步 `openspec/digest.md`）
- 信息来源至少包括：
  - OpenSpec 当前 change（若存在）
  - Git 状态（branch / head / dirty / changed files）
  - 最近改动推断（基于工作区变更、最近提交、或当前会话上下文）
- 完成后在对话中输出 digest 摘要（Done / Next / Blockers / Active Change / 关键路径）

**护栏规则**
- 这是“状态快照”，不要写成时间流水日志。
- 优先写当前有效事实与决策，不写冗长推理过程。
- 不确定内容放入 `open_questions` 或 `risks`，不要伪造确定性。
- 如果仓库里存在 `openspec/AGENTS.md`，先读取并遵循其中约定。
- 只做与 `openspec/digest.local.md` / `openspec/digest.md` 相关的最小必要编辑；不要顺手修改其他文件（除非用户明确要求）。

**执行步骤**
1. 确认当前目录是否是含 `openspec/` 的项目；若不存在 `openspec/`，停止并告知用户无法生成 OpenSpec digest。
2. 读取 `openspec/AGENTS.md`（若存在）并遵循双轨制约定；再读取 `openspec/digest.local.md`（若存在）与 `openspec/digest.md`（若存在）、`openspec/project.md`（若有必要）以获取模板和约定。
3. 识别 OpenSpec 当前 change / spec：
   - 优先查看 `openspec/changes/` 下非 `archive/` 的活动变更目录。
   - 若可用，使用 `openspec-cn list` / `openspec-cn list --specs` 辅助确认。
   - 从活动变更目录推断 `active_change_ids`，从 `changes/<id>/specs/*` 推断 `active_specs`。
4. 收集 Git State：
   - 分支：`git rev-parse --abbrev-ref HEAD`
   - HEAD：`git rev-parse --short HEAD`
   - dirty/changed files：`git status --short`
   - 必要时补充 `git status --porcelain` 或 `git diff --name-only`
5. 推断 `change_type`（显式写入）：
   - `proposal-stage`：主要改动集中在 `openspec/changes/<id>/` 的提案文件，尚未体现实施代码推进
   - `spec-impacting`：涉及 `openspec/specs/` 或提案规范增量并影响规范定义
   - `implementation-only`：主要是代码实现/测试改动，不涉及规范更新
   - 若同时存在混合迹象，按“是否影响规范”优先选择 `spec-impacting`
6. 结合最近改动推断状态：
   - 优先看工作区已改文件与未提交变更
   - 如需要，再看最近 1-3 个提交（例如 `git log --oneline -3`）推断 `done`、`next_actions`、`blockers`
   - 若是归档/交接上下文，明确判断：归档相关改动是否已提交（可通过工作区状态 + 最近提交信息推断）；未提交时在 `next_actions` 标注“归档后提交”
   - 若信息不足，明确写“未知/待确认”，不要猜测具体业务内容
7. 覆盖更新状态桥（双轨制）：
   - 默认目标：`openspec/digest.local.md`
   - 若 `openspec/digest.local.md` 不存在：以 `openspec/digest.md` 为模板创建；若两者都不存在则按标准模板创建
   - 在“归档/交接/明确共享”场景下，再同步更新 `openspec/digest.md`
   - 对每个被更新文件都保留现有模板结构（若模板已存在）
   - 更新至少这些字段：`active_change_ids`、`active_specs`、`change_type`、`git_branch`、`git_head`、`git_dirty`、`git_changed_files`、`done`、`next_actions`、`blockers`、`references`
   - `references` 至少包含相关 `proposal.md` / `tasks.md` / `design.md`（如有）/ `spec.md`
8. 在对话中输出简明摘要：
   - `Active Change / Active Spec`
   - `Git State`
   - `Change Type`
   - `Done`
   - `Next`
   - `Blockers`
   - `Key links`

**输出要求**
- 先说明已更新了哪些状态桥文件（`openspec/digest.local.md` / `openspec/digest.md`）
- 再给 digest 摘要（简洁、可扫描）
- 如果需要用户确认某些不确定项，单独列出 `待确认`
- 若仅更新了本地快照，补一句“共享 `openspec/digest.md` 未同步（按双轨制可选）”
