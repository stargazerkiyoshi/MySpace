## 1. Graph Read Model

- [x] 1.1 盘点当前 Space / Node 可用于 Graph 的真实数据来源，并确定首版 edge 映射策略不得依赖 mock 数据
- [x] 1.2 在 `core-api` 中新增按 Space 读取 Node Graph 的 DTO、application/use case 和 controller 入口
- [x] 1.3 在 `core-api` 中实现最小 Graph 查询与映射，返回 `nodes[]`、`edges[]`、关系类型和后续扩展所需的元数据字段

## 2. Space Graph View

- [x] 2.1 在 `apps/web` 引入 React Flow 依赖，并在 `features/node` 或对应可视化模块中建立 Graph View 组件结构
- [x] 2.2 在 Space 详情页工作区中新增 Graph tab，保持与现有 Nodes / Recent History 并列而不引入独立路由
- [x] 2.3 实现 Graph View 的基础画布交互、Node / Edge 渲染、空关系状态和加载/错误态
- [x] 2.4 实现节点选中、信息面板联动，以及基于一跳邻居的最小聚焦与高亮

## 3. Verification

- [x] 3.1 为 Graph read model 与前端映射补充必要的类型检查或测试
- [x] 3.2 验证 Graph tab 在中英文环境下可用，并且不破坏现有 Space 页面工作区结构
- [x] 3.3 验证当 Space 没有关系边时，Graph View 仍能基于真实 Node 数据正常工作
