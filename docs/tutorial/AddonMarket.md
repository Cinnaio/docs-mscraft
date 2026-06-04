---
title: 商店工具
description: 表达式定价、补货提醒、物品搜索等常用功能
---

# 商店工具

> **核心摘要**：Addon-Market 是 QuickShop-Hikari 的增强插件，提供**表达式定价**（支持公式动态计算价格）、**缺货通知**（自动提醒店主）、**物品搜索**（支持英文/中文/拼音）和**指路光束**（点击坐标创建引导光柱）等功能。

## 基础命令

| 命令 | 功能 |
|------|------|
| `/qs price <公式>` | 绑定动态定价公式 |
| `/qs marketinfo` | 查看当前商店定价详情 |
| `/qs manage` | 打开商店管理界面 |
| `/qs search <物品>` | 搜索当前世界出售该物品的商店 |
| `/qs restock on / off` | 开启/关闭缺货通知 |
| `/qs restock status` | 查看缺货通知状态 |
| `/qs playerreset on / off` | 开启/关闭周期清空 |
| `/qs playerreset status` | 查看周期清空状态 |
| `/qs playerreset interval <时间>` | 设置清空周期（如 `1w` / `5h` / `50m`） |


## 表达式定价<font color="#c38285" size=3>（仅管理员使用）</font>

用数学公式让价格随交易量动态变化，而不是固定价格。注视商店输入公式即可绑定。

```
/qs price basePrice * 1.05 ^ min(playerAmount, 100)
```

每买一个涨 5%，最多累积 100 次。

**变量：** `playerAmount`（你的交易量）/ `globalAmount`（全服交易量）/ `shopStock`（库存）/ `shopMaxStock`（最大库存）/ `basePrice`（基础价）/ `currentPrice`（当前牌价）

**函数：** `exp(x)` / `pow(a,b)` / `log(x)` / `min(a,b)` / `max(a,b)`

**实用公式：**

- **越买越贵：** `basePrice * 1.05 ^ min(playerAmount, 100)`
- **越买越便宜：** `basePrice * 0.95 ^ min(playerAmount, 50)`
- **阶梯定价：** `basePrice + floor(playerAmount / 10) * 5`

> 创建商店时在聊天框直接输入公式即可代替数字价格。


## 物品搜索

搜索当前世界交易指定物品的所有商店。

```
/qs search 钻石     /qs search diamond     /qs search zuanshi
/qs search 土豆     /qs search 马铃薯      /qs search tudou
```

支持英文 ID、中文名、拼音、别名，部分匹配也能搜到。结果中的坐标**可点击**直接创建指路光束。

![物品搜索](/images/wu-ping-sou-suo.png)

> 举个栗子：需要找到出售钻石剑的商店，可以输入/qs search `钻石剑` *钻石剑还可以替换成`zuanshijian`(拼音)*

![物品搜索2](/images/wu-ping-sou-suo-2.png)

## 补货提醒

出售商店缺货时自动通知店主，消息中的坐标可点击创建指路光束。

| 命令 | 说明 |
|------|------|
| `/qs restock on` | 开启当前商店的缺货通知 |
| `/qs restock off` | 关闭 |
| `/qs restock status` | 查看状态 |

![补货提醒](/images/bu-huo-ti-xing.png)

每次玩家上线的时候，服务器会自动检查玩家商店是否需要补货，如果有需要补货的商店会发送消息进行提醒。

同时玩家可以点击对应商店的**坐标**，来进行高亮指示**引导**。

![补货提醒2](/images/bu-huo-ti-xing-2.png)

缺货商店周围会有白色粒子环绕（店主 10 格内可见），靠近 5 格自动消失。 

![补货提醒3](/images/bu-huo-ti-xing-3.png)

玩家还可以使用`/qs manage`来一键管理各个商店的补货提醒。

![补货提醒4](/images/qs-manage.png)

## 周期清空<font color="#c38285" size=3>（仅管理员使用）</font>

定时重置玩家交易计数，防止单个人买光/卖光导致价格失控。

| 命令 | 说明 |
|------|------|
| `/qs playerreset on / off` | 开启/关闭 |
| `/qs playerreset status` | 查看状态 |
| `/qs playerreset interval 1w -start:1 -time:00:00` | 每周一 00:00 重置 |
| `/qs playerreset interval 5h` | 每 5 小时重置 |

周期格式：`50m`（分钟）、`5h`（小时）、`1w`（周）


## 常见问题


::: details **Q: 提示"表达式无效"？**

A: 检查公式中的变量名和函数名是否正确，如 `basePrice + playerAmount`。

:::


::: details **Q: 补货通知发太多次了？**

A: 默认冷却 24 小时，可在 `config.yml` 中修改。

:::


::: details **Q: 搜不到我的商店？**

A: 搜索只限当前世界。

:::


::: details **Q: 粒子效果太多？**

A: 在 `config.yml` 中设置 `particle-effect: false`。

:::
