## 上下文

当前 Space 详情页通过 Tabs 承载 `NodeWorkspace` 和 `SpaceTimelinePanel`，用户可以分别查看节点列表和最近历史，但还没有“结构可视化”层。现有 `Node` 数据模型只包含基础字段，没有独立的 Node 关系模型；现有 `TimelineEvent` 虽有结构字段，但它描述的是历史节点关系，不适合直接伪装成 Node 图谱真相源。

这意味着本次设计必须同时满足几个约束：

- 前端继续遵守 `app / pages / features / shared` 分层，Graph 相关逻辑优先收敛在 `features/node` 或专门的可视化 feature，而不是扩散到页面层。
- `core-api` 继续保持 `controller -> application/use case -> infrastructure` 的读模型链路，不在 controller 中拼装 Graph 数据。
- 首版必须基于真实 Space / Node 数据，而不是构造演示图；当关系数据不足时，系统可以展示“无连线”结果，但不能伪造边。
- 本次是“可视化浏览 MVP”，不是图编辑器，不引入画布内建模、自由排布或复杂布局配置。

## 目标 / 非目标

**目标：**
- 在 Space 详情页内提供一个 Graph View，让用户能在同一 Space 上下文中切换到结构可视化视角。
- 定义稳定的 Graph read model，统一返回 Node / Edge / 画布辅助元数据，避免前端直接拼装多路数据。
- 支持最小交互：缩放、拖拽、平移、节点选中、信息面板联动、聚焦节点及其直接关联节点。
- 为未来 Timeline 覆盖层、主线 / 分支表达、关系类型扩展和节点编辑能力预留接口与前端适配边界。

**非目标：**
- 不实现图内新建节点、拖拽连线、删除连线、自由编排或多人协同编辑。
- 不引入复杂自动布局配置面板、复杂关系过滤器或图分析能力。
- 不把 TimelineEvent 直接当作 Node Edge 真相源，不把“历史结构”强行混同为“节点关系结构”。
- 不要求首版打通完整 Timeline 联动、主线覆盖层或关系编辑闭环。

## 决策

### 1. Graph View 放在现有 Space 详情页 Tabs 中，而不是独立路由
- 决策：在 `SpaceDetailContainer` 的现有 `Nodes / Recent History` 基础上新增一个 `Graph` tab。
- 理由：当前 Space 工作区已经以 tab 方式承载不同表达视角；Graph View 作为第三种视角放进同一容器，改动最小，也能保持 Space 上下文连续。
- 替代方案：
  - 独立 Graph 路由或页面。
  - 放弃原因：会过早扩大路由复杂度，并打断当前 Space 内工作流。
  - 作为 Node tab 内子面板。
  - 放弃原因：会让节点列表、图视图和详情交互挤在一个视图中，首版复杂度更高。

### 2. 后端提供独立的 Graph read model，而不是让前端用 Node 列表临时拼图
- 决策：在 `core-api` 增加按 Space 读取 Graph View 数据的接口，返回 `nodes[]`、`edges[]` 和最小元数据。
- 理由：Graph 所需数据会逐步扩展为布局 hint、关系类型、未来 timeline overlay 等；由后端统一返回读模型比前端分散拼装更稳定。
- 替代方案：
  - 前端直接复用现有节点列表接口并本地推导边。
  - 放弃原因：当前真实数据没有稳定的边来源，前端推导会很快变成隐式约定。

### 3. Node 和 Edge 采用“真实数据 + 空边可接受”的 MVP 映射
- 决策：Node 直接映射自现有 `Node` 主对象；Edge 则映射自“当前 Space 可识别的显式关系源”。如果当前没有稳定关系源，接口必须返回空 edge 集合，并保留统一 Graph schema。
- 理由：这允许首版先落地真实 Graph 渲染链路，而不是为了连线效果制造 demo 数据。
- 替代方案：
  - 伪造顺序边或按创建时间自动串联。
  - 放弃原因：会把不存在的结构误导为真实关系。
  - 在本次变更里直接引入完整 NodeRelation 编辑系统。
  - 放弃原因：会把 MVP 浏览能力膨胀成关系建模工程。

### 4. 选中态在 Graph tab 内联动信息面板，并与现有 Node 详情能力兼容
- 决策：Graph View 内保持一个选中节点状态，点击节点后更新右侧信息面板；面板展示基础信息，并保留进入现有 Node 详情工作流的扩展点。
- 理由：用户在图上理解结构时需要即时上下文，不应被强制跳转到其他页面；同时又不应重复造一整套详情系统。
- 替代方案：
  - 点击后直接打开现有 Drawer。
  - 放弃原因：首版频繁开关 Drawer 会打断图浏览体验。

### 5. “聚焦当前节点及其直接关联节点”优先作为前端图层行为实现
- 决策：Graph 数据完整加载后，前端根据 edge 集合计算当前节点的一跳邻居，并用高亮、淡化和 `fitView` 等最小方式完成聚焦。
- 理由：这类交互更适合由前端基于已加载图数据即时计算，不必为 MVP 增加复杂后端聚焦接口。
- 替代方案：
  - 由后端返回单独的 focus 子图。
  - 放弃原因：会增加额外接口和状态同步成本。

### 6. 为未来 Timeline 联动预留扩展字段，但不在首版强绑定
- 决策：Graph edge / node schema 预留 `relationType`、`metadata`、`sourceKind` 等扩展字段，供后续接入 Timeline 主线、分支或关系分析。
- 理由：当前 Node 和 Timeline 的结构语义尚未完全统一，先留 adapter 边界比提前耦合更稳妥。
- 替代方案：
  - 首版直接把 Timeline 结构字段混入 Graph 语义。
  - 放弃原因：会把“历史关系”和“节点结构关系”混成一层，后续演进代价高。

## 风险 / 权衡

- `[风险] 当前真实数据缺少稳定的 Node 关系来源，首版图可能出现“节点可见、边较少或为空”的情况`
  → `缓解：在规范中明确空 edge 是合法结果；界面提供空关系说明，但保持统一 graph 渲染链路。`
- `[风险] React Flow 会引入新的前端依赖和画布样式复杂度`
  → `缓解：将图视图收敛在单独容器和样式文件中，不扩散为全局交互模式。`
- `[风险] Graph tab 若同时承载列表、画布和详情，可能让 Space 页面过重`
  → `缓解：首版只在 Graph tab 内保留“画布 + 右侧信息面板”的双栏结构，不与 Node list 叠加。`
- `[风险] 未来如果补充真正的 Node 关系模型，当前 edge adapter 可能需要调整`
  → `缓解：后端先返回独立 Graph DTO，避免前端直接依赖底层关系来源。`

## Migration Plan

- 在 `web` 中引入 React Flow 依赖，并新增 Graph View 容器、组件和样式。
- 在 `core-api` 中新增 Graph read model DTO、查询接口和最小关系映射逻辑。
- 在 Space 详情页 Tabs 中接入 Graph View，并验证节点选中、画布交互和信息面板联动。
- 在 OpenSpec 中新增 `space-node-visualization` 规范，并同步调整 `space-management` 与 `web-app-shell`。

## Open Questions

- 首版 edge 的真实来源是否仅限已存在的显式关系数据，还是需要在实现阶段补一个极小的关系存储结构，仍待结合代码现状确认。
- Graph View 的信息面板是否直接复用现有 `NodeDetailForm` 的只读子集，还是做一层更轻的 Graph-specific summary，当前倾向于先做更轻的摘要面板。
- 是否需要为 Graph tab 增加“定位到选中节点”的显式按钮，还是点击节点后自动聚焦即可，当前倾向于自动聚焦并保留后续按钮扩展点。
