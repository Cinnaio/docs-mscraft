# 💱 价格函数与限额策略

:::info 信息
可在 `shop.buy/sell.function` 使用占位符构建动态价格；通过 `limit.player/server` 管理个人与全服限额。
:::

## 动态价格函数

你可以在 `shop.buy.function` 或 `shop.sell.function` 中使用公式，构建供需曲线。

常用占位符：

- `%prismmarket_buy_amount%`
- `%prismmarket_sell_amount%`
- `%prismmarket_buy_amount_server%`
- `%prismmarket_sell_amount_server%`

## 策略类型

- 固定价：仅 `cost`
- 半动态：`cost + function`（由函数覆盖时以函数结果为准）
- 全动态：完全依赖 `function`

## 限额系统
:::warning 警告
设置 `-1` 为不限制；请谨慎用于热门资源，避免被过度消耗或操纵市场。
:::

位置：

```yaml
limit:
  player: 100
  server: 1000
```

语义：

- `player`：玩家个人上限
- `server`：全服共享上限
- `-1`：不限制

## 运营建议

- 热门资源：建议加 `server` 限额防垄断
- 新手资源：建议取消或放宽限额
- 动态曲线：先小范围灰度，再全服应用
:::tip 提示
在测试服或小规模灰度环境验证价格函数与限额效果，再推广到生产环境。
:::

## 验证方法

1. 连续交易并观察价格变化
2. 超限后确认提示与拦截是否生效
3. 用日志命令回查交易结果
