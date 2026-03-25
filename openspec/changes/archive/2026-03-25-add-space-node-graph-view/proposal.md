## 为什么

当前 Space 页面已经能分别展示节点列表和最近历史，但用户仍然只能通过列表和详情面板理解结构，难以直接观察一个 Space 内 Node 的整体分布、关系连接和局部聚焦结果。随着节点数量增加，Space 会继续停留在“状态页 + 列表页”的表达层，缺少面向结构的可视化视角。

现在推进这项变更，是为了给 Space 增加一个基于真实数据的最小 Graph View，让用户能够在同一 Space 上下文中直接观察 Node 结构，并为后续 Timeline 联动、主线/分支表达和关系分析预留稳定入口。

## 变更内容

- 在现有 Space 详情页中新增一个 Node Visualization / Graph View 入口，优先保持在当前 Space 工作区内，而不是引入独立页面或重型编辑器。
- 使用 React Flow 实现基于真实 Space / Node 数据的节点与连线可视化，支持基础画布交互，包括缩放、拖拽和平移。
- 为 Graph View 定义最小的 Node / Edge 数据映射，使前端不依赖 mock 数据；若当前 Space 没有可识别的关系数据，系统也必须返回空 edge 集合而不是伪造演示连线。
- 支持节点选中态，并让选中节点与同页信息面板或详情区联动；若存在边关系，支持聚焦当前节点及其直接关联节点。
- 为未来 Node 与 Timeline 的联动、主线 / 分支覆盖和更丰富的关系语义预留扩展字段与适配边界，但本次不实现完整图编辑、复杂自动布局或多人协同。

## 功能 (Capabilities)

### 新增功能
- `space-node-visualization`: 定义 Space 内 Node Graph View 的最小可视化能力，包括 graph read model、Node / Edge 映射、选中联动和基础画布交互。

### 修改功能
- `space-management`: Space 详情页需要在现有节点 / 历史工作区之外承载 Node Graph View，并保持在同一 Space 上下文中理解结构。
- `web-app-shell`: Space 页面的工作区切换入口需要支持进入 Graph View，并承载图视图与信息面板的最小布局。

## 影响

- `apps/web` 中的 Space 页面工作区组织、Node feature 视图、Graph View 组件与样式体系。
- `apps/core-api` 中按 Space 读取 Node Graph 所需的读模型、DTO 和接口边界。
- `apps/web/package.json` 中新增 React Flow 相关依赖。
- `openspec/specs/` 中新增 `space-node-visualization` 能力，并更新 `space-management`、`web-app-shell` 的规范。
