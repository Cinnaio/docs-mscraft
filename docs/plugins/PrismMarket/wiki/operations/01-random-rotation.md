# 🔄 随机轮换与刷新

## random 节点结构

```yaml
random:
  weekly_essential:
    items:
      - wheat
      - potato
    refresh:
      mode: week
      period: true
      start: "2026-01-01;00:00:00"
      time: "1"
```

每个随机组 = 候选商品池 + 刷新计划。

## 字段说明

- `items`：候选商品 ID 列表（来自 `items`）
- `refresh.mode`：`day | week | month | year`
- `refresh.period`：是否循环刷新
- `refresh.start`：起始时间（必填）
- `refresh.time`：间隔数量（整数）

## 刷新流程

1. 定时器检查是否达到下次刷新点
2. 进入刷新前阻断窗口（禁止交易）
3. 从候选池计算并写入新状态
4. 更新下次刷新时间
5. GUI 展示自动切换到新商品

## 主配置联动项（config.yml）
:::warning 警告
设置合理的 `random.refresh-blocking-seconds`，在刷新前短暂阻断交易，避免边界时刻出现并发扣款/发货问题。
:::
:::tip 提示
若刷新周期较长（周/月），优先选择 `dynamic` 以降低轮询成本；活动期或高频刷新场景可临时用 `default`。
:::

- `random.refresh-blocking-seconds`
  - 刷新前阻断交易，避免边界时刻并发问题
- `random.startup-refresh-check`
  - 启动时检查是否错过刷新点
- `random.check-strategy`
  - `default`：每秒检查
  - `dynamic`：按下次刷新远近动态调整检查频率

## dynamic 检测策略价值

当刷新间隔较大（如周/月）时，降低无效轮询开销；  
接近刷新点时再提高检查频率，兼顾性能与准确性。

## 调试命令

- 查看组状态：
  ```bash
  /pm debug change <shopId> info
  ```
- 强制刷新：
  ```bash
  /pm debug change <shopId> force confirm
  ```
- 测试刷新（秒）：
  ```bash
  /pm debug change <shopId> test <seconds>
  ```
- 关闭测试刷新：
  ```bash
  /pm debug change <shopId> test
  ```

## 实战建议

- `start` 建议统一到整点，便于运维记忆
- 候选池规模不要过小，否则随机意义有限
- 强制刷新仅用于活动切换或紧急修复
