# Backend Architecture Baseline

本文件定义主业务后端子工程的通用架构基线，作为后续同类项目或本仓库 `core-api` 持续演进时的长期参考。

本文档关注的是稳定的后端结构、职责边界、分层方式和演进原则，而不是当前项目某个阶段的具体业务需求。  
具体业务规则、领域能力变化和阶段性实现要求，应继续写入 OpenSpec 文档。

## 1. Scope

本基线适用于：

- 承载主业务真相源的后端服务
- 以事务、一致性、权限、核心领域对象管理为主的业务 API 工程
- 基于 Node.js / NestJS / Prisma 一类技术栈的模块化后端项目

本基线不直接约束：

- AI 编排服务
- 平台级模型调用流程
- 独立的异步执行器或实验性边车服务

## 2. Role Of The Backend

主业务后端的定位是：

- 业务真相源
- 核心领域对象承载层
- 权限与访问边界控制层
- 事务与一致性保证层
- 对外提供稳定业务接口的系统边界

主业务后端应优先保证：

- 数据一致性
- 领域边界清晰
- 接口稳定
- 结构可演进

主业务后端不应承担：

- Prompt 编排逻辑
- 模型供应商适配逻辑
- 平台级 Agent 会话编排
- 将 AI 临时结果直接当作业务事实写入系统

## 3. Core Principles

### 3.1 Backend Is The Source Of Truth

主业务后端应被视为核心业务状态的真相源。  
所有关键领域数据、主业务资源状态和正式业务记录，都应以主业务后端为准。

### 3.2 Layering Is More Important Than Convenience

短期实现速度不能成为打破分层的理由。  
即使在 MVP 阶段，也应优先维持 controller、application、domain、infrastructure 的职责边界。

### 3.3 Database Schema Is Not Equal To Domain Model

Prisma schema 是持久化模型，不应直接等同于完整领域模型。  
领域规则、业务约束和用例流程不应被数据库结构反向主导。

### 3.4 Infrastructure Must Not Pollute Business Logic

缓存、队列、外部系统、数据库访问和事件投递都属于基础设施能力。  
这些能力可以被使用，但不应直接污染 controller 或核心领域逻辑。

### 3.5 AI Is External To Business Truth

AI 输出可以成为候选建议、草稿结果或待确认内容，但不应默认等于正式业务事实。  
任何需要写回主业务状态的 AI 结果，都应通过受控业务流程进入系统。

## 4. Recommended Layers

推荐采用以下分层：

```text
src/
  modules/
  application/
  domain/
  infrastructure/
  interfaces/
```

在 NestJS 工程中，也可以保留 `modules/` 作为组织入口，并在模块内部继续按分层组织。

### `modules/`

职责：

- 按领域组织模块
- 聚合该领域的 controller、application service、domain service 和 infrastructure adapter
- 作为主业务能力的清晰边界
- 优先在模块内部保持内聚，避免过早抽取跨模块共享业务服务
- 若某项能力尚未形成稳定跨模块复用，不应提前提升为全局共享抽象

模块示例：

- `auth`
- `space`
- `node`
- `timeline`
- `dashboard`

约束：

- 模块之间通过明确接口协作
- 不要通过“共享 service”随意跨模块侵入

### `application/`

职责：

- 承载用例编排
- 处理命令与查询流程
- 组织跨对象的业务执行步骤
- 调用 domain 与 infrastructure 完成业务闭环

约束：

- application 层负责“做什么”
- 不直接承载底层技术细节
- 不把 controller 层请求对象直接扩散到整个系统
- application 层可以保持薄，但应真正承担用例编排职责
- 不应仅作为对下层调用的机械透传层长期存在

### `domain/`

职责：

- 承载核心领域对象
- 承载领域规则与不变量
- 承载领域服务与关键业务约束

约束：

- domain 层不依赖具体框架
- 不把 Prisma、Redis、BullMQ 或 HTTP 客户端直接引入 domain
- 在 MVP 阶段，domain 层应优先承载稳定规则与关键约束，不要求一开始建立完整的重领域模型体系

### `infrastructure/`

职责：

- 数据库访问
- Redis 接入
- BullMQ 队列能力
- 外部系统适配
- 事件发布
- 文件、缓存、网络等技术实现细节

约束：

- infrastructure 只负责“怎么接”
- 不在这里承载业务规则真相

### `interfaces/`

职责：

- Controller
- DTO
- Serializer
- Request/Response mapping

约束：

- interfaces 层只负责对外接口适配
- 不在 controller 中直接堆 Prisma 查询
- 不在 controller 中直接拼接复杂业务流程
- DTO 仅用于接口层输入输出，不应直接扩散为 application、domain 或 infrastructure 的通用对象

## 5. Request Flow

推荐请求链路如下：

```text
controller
  -> application service / use case
    -> domain
    -> infrastructure
```

含义如下：

- controller 负责接收请求、参数校验和返回响应
- application 负责组织用例执行
- domain 负责业务约束与规则判断
- infrastructure 负责数据库、缓存、队列和外部调用

禁止做法：

- controller 直接写 Prisma 查询并拼接完整业务逻辑
- service 同时承担业务、数据库、缓存、消息队列和外部 HTTP 调用
- 把数据库表结构直接暴露为所有层的共享事实模型

## 6. Module Boundaries

模块边界应稳定且可扩展。

建议每个模块至少能回答以下问题：

- 这个模块管理什么领域对象
- 哪些状态由它负责
- 它对外暴露哪些用例
- 它依赖哪些外部能力
- 它不应该承担什么职责

模块边界一旦模糊，后续最常见的问题包括：

- 逻辑重复
- 权限失真
- 数据流混乱
- 难以抽离异步流程
- 难以接入 AI 协作层

## 7. Data Access Rules

### Prisma

Prisma 应被定位为持久化访问层工具，而不是业务层本身。

要求：

- Prisma client 通过 infrastructure 层接入
- 不在 controller 中直接散落 Prisma 访问
- 不让 Prisma model 直接主导所有业务对象命名和结构

### PostgreSQL

PostgreSQL 适合作为核心事务型数据存储。

要求：

- 核心业务状态优先落入 PostgreSQL
- 保持 schema 演进受控
- 在 MVP 阶段避免过度设计，但也不要放弃必要的稳定主对象建模

## 8. Cache And Queue Rules

### Redis

Redis 是基础设施能力，不是业务真相源。

适用范围：

- 缓存
- 临时状态
- 队列底层支撑
- 短期加速

禁止：

- 将 Redis 作为正式业务主状态来源
- 让业务语义反向依赖缓存结构

### BullMQ

BullMQ 应作为异步任务和事件处理的工程基础设施。

适用范围：

- 异步任务处理
- 后台作业
- 事件驱动后的后续动作
- 与 AI 服务或外部同步能力的解耦

要求：

- 队列语义先作为基础设施能力接入
- 不要在需求尚未稳定时过早把业务流程硬编码成复杂队列拓扑

## 9. Relationship With The AI Layer

主业务后端与 AI 编排层之间必须保持清晰边界。

主业务后端：

- 承载业务真相
- 提供受控业务接口
- 维护领域状态和正式记录

AI 编排层：

- 承载模型调用和 Agent 编排
- 组织上下文、工具调用与异步流程
- 生成候选结果、建议和草稿

强约束：

- 主业务后端不写 Prompt 编排逻辑
- AI 层不直接成为业务真相源
- AI 写回业务时应通过受控接口或明确契约完成
- AI 层默认优先通过只读方式获取业务上下文
- 任何写回主业务状态的动作，都应通过受控接口、明确契约或候选对象流程完成

## 10. Evolution Rules

后端演进时应遵守：

- 优先新增清晰模块，而不是继续往共享 service 堆逻辑
- 优先增强 application / domain 分层，而不是让 controller 持续膨胀
- 优先通过明确契约对接外部层，而不是直接穿透到底层实现
- 在架构变化明显时，先更新 OpenSpec 设计与规范

## 11. Implementation Checklist

后续新增后端能力时，至少检查以下问题：

- 该能力属于哪个模块
- controller 是否过重
- 业务逻辑是否错误下沉到 infrastructure
- Prisma 是否被直接扩散成业务模型
- Redis / BullMQ 是否被错误用作业务真相源
- 是否把 AI 相关逻辑写进了主业务后端
- 是否需要通过 OpenSpec 先固化边界与设计

## 12. Source Of Truth

本文件是主业务后端架构的长期参考文档。

项目级业务背景与当前阶段要求，应参考：

- `openspec/project.md`
- 当前活跃变更下的 `proposal.md / design.md / specs / tasks.md`

## 13. MVP Guidance

在 MVP 阶段，应优先保证：

- 模块边界清晰
- 请求链路清晰
- 主对象建模稳定
- 基础设施接入位置正确

MVP 阶段不要求一次性将 `application / domain / infrastructure / interfaces` 全部做成最完整形态。

允许以较轻实现起步，但不得打破本文件定义的职责边界，也不得将临时实现固化为长期结构污染。
