## ADDED Requirements

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
