## ADDED Requirements

### 需求:TimelineEvent 作为 Space 内的最小历史记录对象被建模
系统必须将 TimelineEvent 建模为归属于某个 Space 的独立主对象，并为其提供可持久化的最小字段集合，以支持关键变化记录和列表展示。

#### 场景:Node 关键变化被写入 TimelineEvent
- **当** 某个 Space 内发生受支持的 Node 关键变化
- **那么** 系统必须写入一条新的 TimelineEvent 记录
- **并且** 该记录必须至少包含 `id`、`spaceId`、`eventType`、`targetType`、`targetId`、`summary`、`payload` 和 `createdAt`

### 需求:系统可以按 Space 维度读取 Timeline 列表
系统必须提供按某个 Space 维度读取 TimelineEvent 列表的能力，以便前端展示最近发生的关键变化。

#### 场景:读取某个 Space 的最近 TimelineEvent
- **当** 前端基于某个 Space 标识请求 Timeline 列表
- **那么** 系统必须只返回属于该 Space 的 TimelineEvent 集合
- **并且** 返回结果必须按最近事件优先的顺序组织，以支持 Space 页面展示

### 需求:TimelineEvent 事件类型在第一版必须保持受控
系统必须将 TimelineEvent 的第一版 `eventType` 收敛为受控集合，而不是开放任意字符串。

#### 场景:记录受支持的第一版 TimelineEvent
- **当** 系统写入第一版 TimelineEvent
- **那么** `eventType` 必须限制在 `node_created`、`node_updated` 或 `node_status_changed`
- **并且** 系统不得在本阶段写入超出该集合的事件类型
