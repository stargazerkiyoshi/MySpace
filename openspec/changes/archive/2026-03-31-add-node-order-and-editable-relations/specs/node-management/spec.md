## ADDED Requirements

### 需求:Node 必须具备稳定顺序
系统必须为同一 Space 内的每个 Node 维护稳定顺序，以便节点列表、画布布局和其他顺序化展示都能基于同一前后关系工作。

#### 场景:创建 Node 时追加到末尾
- **当** 用户在某个 Space 内成功创建一个新 Node
- **那么** 系统必须为该 Node 分配一个位于当前 Space 末尾的顺序值
- **并且** 同一 Space 内已有 Node 的相对顺序不得因此被打乱

#### 场景:读取 Space 内 Node 顺序
- **当** 前端请求某个 Space 的 Node 列表或图数据
- **那么** 系统必须按稳定顺序返回这些 Node
- **并且** 不得因为更新时间变化而改变前后顺序

## MODIFIED Requirements

### 需求:Node 关键变化必须写入 TimelineEvent
系统必须在 Node 的关键变化发生时写入 TimelineEvent，以便 Space 可以展示最小历史过程。

#### 场景:创建 Node 后记录历史事件
- **当** 用户在某个 Space 下成功创建 Node
- **那么** 系统必须写入一条 `node_created` 类型的 TimelineEvent
- **并且** 该事件必须能够关联到对应的 Space 和 Node

#### 场景:更新 Node 后记录历史事件
- **当** 用户成功更新 Node 的基础字段且未发生状态切换
- **那么** 系统必须写入一条 `node_updated` 类型的 TimelineEvent
- **并且** 事件摘要必须足以支持前端展示本次变化的最小信息

#### 场景:变更 Node 状态后记录历史事件
- **当** 用户成功变更 Node 的状态字段
- **那么** 系统必须写入一条 `node_status_changed` 类型的 TimelineEvent
- **并且** 该事件不得与普通 `node_updated` 事件混淆
