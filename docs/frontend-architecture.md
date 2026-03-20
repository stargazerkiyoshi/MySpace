# Frontend Architecture Baseline

本文件定义 `web` 前端的固定架构约束，作为后续所有前端开发的长期参考基线。

目标不是一次性规定所有实现细节，而是提前固定目录分层、职责边界、请求方式、状态管理方式和样式约束，避免后续开发中组件、逻辑和状态逐步失控。

## 1. Scope

本基线适用于:

- `apps/web` 下的所有新增页面、功能模块和共享组件
- 后续前端重构、页面扩展、接口接入和状态管理实现

如需偏离本基线，应先说明原因，再调整文档或形成新的架构决策。

## 2. Directory Layers

前端固定采用以下主结构:

```text
src/
  app/
  pages/
  features/
  shared/
```

### `app/`

职责:

- 应用入口
- 路由注册
- 全局 provider
- Ant Design 全局配置
- QueryClientProvider
- 应用级布局壳层

约束:

- 只负责应用级初始化
- 不承载具体领域业务实现

### `pages/`

职责:

- 路由级页面组件
- 页面编排
- 路由参数读取
- 组装 feature container

约束:

- 保持轻量
- 不承载复杂业务逻辑
- 不直接散落 `axios` 请求
- 不在这里堆放大量状态处理
- 除页面级路由参数、布局装配和极少量页面级状态外，页面层不应成为领域逻辑和数据逻辑的主要承载位置

### `features/`

职责:

- 按领域组织前端能力
- 领域逻辑内聚
- 管理该领域的数据请求、hooks、局部组件、局部类型

推荐领域示例:

- `space`
- `node`
- `timeline`
- `dashboard`
- `auth`

约束:

- 领域逻辑优先收敛在 feature 内
- 不外溢到 `pages` 或 `shared`

### `shared/`

职责:

- 真正跨领域复用的能力
- 通用 UI 组件
- 工具函数
- 常量
- 通用 hooks
- HTTP 基础封装

约束:

- 只承载跨页面、跨 feature 的复用内容
- 不放具体业务逻辑
- 只有当某项能力已被至少两个 feature 或页面稳定复用时，才应进入 `shared/`
- “未来可能复用”不作为进入 `shared/` 的充分理由

## 3. Feature Structure

每个 feature 尽量保持一致结构:

```text
features/
  space/
    api.ts
    hooks.ts
    types.ts
    components/
    containers/
    utils.ts
```

各文件职责如下。

### `api.ts`

- 只放该领域的请求函数
- 基于 `shared/lib/http.ts` 发请求
- 不在这里写 React hook
- 如后端返回结构与前端页面展示结构存在明显差异，应优先在 feature 内完成必要的映射与整理，而不是将后端响应结构直接扩散到页面和展示组件。

### `hooks.ts`

- 封装该领域的 `useQuery` / `useMutation`
- 管理 `queryKey`
- 管理失效刷新
- 管理请求组合逻辑
- `features/*/hooks.ts` 仅承载该领域相关 hooks
- 不放跨领域通用 hooks
- 跨领域通用 hooks 应进入 `shared/hooks/`

如后端返回结构与前端页面展示结构存在明显差异，应优先在 feature 内完成必要的映射与整理，而不是将后端响应结构直接扩散到页面和展示组件。

### `types.ts`

- 放该领域前端使用的类型定义

### `components/`

- 放展示型组件
- 放局部组合型组件
- `components/` 默认优先承载展示型组件
- 若某组件已承担明显的数据编排职责，应优先考虑移入 `containers/` 或上移到页面/容器层

### `containers/`

- 放承担数据获取、状态组合、事件分发的容器组件
- 仅在确有必要时使用
- 不做机械拆分

### `utils.ts`

- 放该领域内部纯函数
- 不放跨领域通用工具

## 4. Component Rules

### 页面组件

- 位于 `pages/`
- 负责路由级编排
- 只组装 feature container 和布局

### 容器组件

- 位于 `features/*/containers/`
- 负责数据获取、状态组合、事件分发
- 把整理后的数据传给展示组件

### 展示组件

- 位于 `features/*/components/` 或 `shared/ui/`
- 只接收 `props` 渲染 UI
- 不直接发请求
- 不耦合页面路由

### 基础组件

- 位于 `shared/ui/`
- 例如页面容器、面板、空状态、加载骨架、通用列表壳
- 保持无业务语义或弱业务语义

## 5. Request And Server State

固定采用以下组合:

- `axios`: HTTP 请求库
- `TanStack Query`: 服务端状态管理、缓存、重试、失效刷新
- `Zustand`: 仅承担必要的客户端全局状态

### `shared/lib/http.ts`

职责:

- 创建 `axios` 实例
- 配置 `baseURL`
- 配置请求/响应拦截器
- 处理统一错误结构
- 预留 token 注入能力

### `features/*/api.ts`

- 定义该领域接口请求函数
- 不写 React hook

### `features/*/hooks.ts`

- 基于 `TanStack Query` 封装 `useQuery` / `useMutation`
- 统一管理 `queryKey`
- 管理请求组合和缓存失效

### 强制要求

- 不要在页面组件中直接散落 `axios` 调用
- 不要把 query 逻辑直接堆进 `shared`
- 服务端状态优先经由 feature hooks 管理

## 6. State Management Rules

### 服务端状态

一律优先使用 `TanStack Query`。

适用示例:

- `space` 列表
- `dashboard` 数据
- `node` 详情
- `timeline` 数据

### 客户端状态

使用 `Zustand`，仅用于:

- UI 面板开关
- 当前选中节点
- 局部工作台状态
- 非服务端真相源的临时状态
- Zustand store 应保持克制
- 优先按稳定 UI 作用域划分
- 避免为每个小功能单独创建 store

### 禁止事项

- 不要用 `Zustand` 存后端列表数据真相
- 不要把 Query 缓存和 `Zustand` 重复维护

## 7. Styling Rules

当前阶段的样式基线是:

- `Ant Design` 作为主 UI 组件库
- `Less` 仅用于:
  - Ant Design 主题变量覆盖
  - 少量需要集中维护的复杂样式

当前约束:

- 不引入 Tailwind 作为当前基线依赖
- 不建议大量普通 CSS 文件散落

原则:

- MVP 阶段优先保证结构清晰和一致性
- 样式体系先保持简单
- 如后续确有必要，再单独评估是否引入 Tailwind

## 8. Entities Policy

当前 MVP 阶段先不单独建立 `entities/` 层。

原因:

- 当前领域模型尚在收敛
- 过早抽象 `entities` 会增加复杂度

后续若空间、节点、时间线等领域对象逐步稳定，再评估是否引入:

```text
entities/
  user/
  space/
  node/
```

## 9. Implementation Checklist

后续新增前端功能时，至少检查以下几点:

- 是否遵守 `app / pages / features / shared` 分层
- 页面组件是否保持轻量
- 请求函数是否进入 feature `api.ts`
- Query 逻辑是否进入 feature `hooks.ts`
- 是否错误地把服务端真相源放进 `Zustand`
- 是否把业务逻辑污染到了 `shared`
- 是否引入了不必要的样式体系
- 如新增新的目录层级或组织模式，应先确认现有 app / pages / features / shared 无法合理承载，再引入新结构。

## 10. Source Of Truth

本文件是当前仓库前端架构规则的长期参考文档。

相关实现和规范可参考:

- `apps/web/src/`
- `openspec/changes/bootstrap-space-collab-mvp-foundation/design.md`
- `openspec/changes/bootstrap-space-collab-mvp-foundation/specs/web-app-shell/spec.md`

## 11. Evolution Constraint

后续前端演进应优先在现有 `app / pages / features / shared` 结构内完成。

如需引入新的目录层级、组织模式或新的状态/样式体系，应先确认现有结构无法合理承载，再说明原因并调整基线文档。

禁止在未经说明的情况下逐步引入并并存多套组织方式，避免后续出现目录分层漂移、职责重叠和维护成本上升。