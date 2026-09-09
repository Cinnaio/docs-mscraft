# 季节玩法 <Badge type="tip" text="兼容入口" />

> 季节、天气、环境和 TeaStory 作物已经合并到 [茶风纪事的茶园章节](/tutorial/Teastory#tea-garden)。本页保留旧地址和旧标题，避免收藏或外部链接失效；当前数值请以合并页为准。

<div class="teastory-figure-row" aria-label="季节玩法入口预览">
  <figure class="teastory-figure"><img src="/images/teastory/tea_seeds.png" alt="茶树种子" /><figcaption>种下茶园</figcaption></figure>
  <figure class="teastory-figure"><img src="/images/teastory/green_tea_leaf.png" alt="绿茶叶" /><figcaption>观察生长</figcaption></figure>
  <figure class="teastory-figure"><img src="/images/teastory/paddy_field.png" alt="稻田" /><figcaption>安排环境</figcaption></figure>
  <figure class="teastory-figure"><img src="/images/teastory/green_tea_glass.png" alt="绿茶杯" /><figcaption>回到茶风纪事</figcaption></figure>
</div>

## 四季速览

| 季节 | 持续时间 | 基准温度 | 基准湿度 | 生长倍率 | 产量倍率 |
|---|---:|---:|---:|---:|---:|
| 春 | 10 游戏日 | 15.0 | 0.70 | ×1.2 | ×1.0 |
| 夏 | 10 游戏日 | 25.0 | 0.50 | ×1.1 | ×1.1 |
| 秋 | 10 游戏日 | 10.0 | 0.60 | ×1.0 | ×1.2 |
| 冬 | 10 游戏日 | 0.0 | 0.40 | ×0.5 | ×0.8 |

温度是 NatureEngine 的配置基准；实际环境还会叠加原版世界温度以及天气偏移。产量倍率是季节配置提示，不会自动乘到所有 CraftEngine 战利品。完整作物目标和环境阈值见 [茶园章节](/tutorial/Teastory#tea-garden)。

## 种田指南

### 生长影响因素

当前生长计算综合季节、天气、作物温湿度偏好、光照、结构环境和随机刻推进。季节偏好是目标范围，不是简单的“能种/不能种”开关。大多数 TeaStory 作物要求光照 9；冬季温室只能改善环境稳定性，不能保证每种作物都以固定速度生长。

### 作物推荐

茶树偏好春、夏、秋；茉莉花偏好春夏；桂花、洛神花、枸杞适合夏秋；菊花偏好秋；莲花和水稻偏好夏。温室、室内和露天的完整稳定性、温湿度容差及 14 种作物清单见 [茶风纪事 → 茶园](/tutorial/Teastory#tea-garden)。

### 环境效果

| 环境 | 稳定性 | 推进修正 | 判定摘要 |
|---|---:|---:|---|
| 温室 | 1.00 | ×1.02 | 封闭度 ≥ 0.60 |
| 室内 | 0.80 | ×0.98 | 开放度 < 0.25 |
| 半室外 | 0.60 | ×1.00 | 其余中间状态 |
| 室外 | 0.35 | ×1.00 | 开放度 ≥ 0.80 |

环境扫描半径为 4 格，向上检查屋顶最多 6 格；附近水体加成当前关闭。推进阈值、枯萎阈值和天气配置已在合并页统一说明。

## 二十四节气

节气只修改下一场天气的抽选权重，不直接改写天气档案的温湿度和生长倍率。当前配置方向为：清明至谷雨提高降雨，夏季节气略提高雷雨，秋季提高晴天，立冬至大寒提高降雪并降低降雨。不要把旧页面曾经写过的百分比加成当作当前固定值。

## 天气系统

天气每 90 秒重新抽选；配置目标时长为晴 300 秒、雨 240 秒、雷雨 180 秒、雪 240 秒。天气配置的温湿度、土壤和生长偏移如下：

| 天气 | 温度偏移 | 湿度偏移 | 土壤偏移 | 生长倍率 |
|---|---:|---:|---:|---:|
| 晴 | +0.05 | -0.02 | -0.02 | ×1.00 |
| 雨 | -0.03 | +0.05 | +0.20 | ×1.10 |
| 雷雨 | -0.05 | +0.06 | +0.25 | ×0.93 |
| 雪 | -0.12 | +0.02 | +0.10 | ×0.85 |

Bukkit 天气层目前把雪映射为普通降雨状态；可见天气不等同于已经验证的独立积雪系统。

## 常用指令

NatureEngine 根命令要求 OP。常用查看与排错命令如下：

| 指令 | 作用 |
|---|---|
| `/ne season info` | 查看当前世界季节、进度和覆盖状态 |
| `/ne debug` | 查看季节、天气、环境摘要 |
| `/ne debug crop [detail]` | 查看脚下作物生长摘要或完整数据 |
| `/ne sim crop` | 模拟作物计算，不修改方块 |
| `/ne season set <spring\|summer\|autumn\|winter>` | 设置手动季节覆盖 |
| `/ne season clear` | 清除手动覆盖 |
| `/ne season next` | 切换到下一季节 |
| `/ne season apply` | 重新应用季节视觉 |

完整命令、权限和配置边界见 [茶风纪事 → NatureEngine 指令](/tutorial/Teastory#tea-garden)。

## 常见问题

::: details Q：作物怎么不动了？
先用 `/ne debug crop detail` 查看光照、温湿度、季节、天气和环境分类，再检查底部方块与作物登记。不要只根据季节倍率推断固定生长时间。
:::

::: details Q：冬季一定要温室吗？
温室能提供 1.00 稳定性和 ×1.02 推进修正，但最终结果仍由作物目标、天气和世界温度共同决定。茶树的配置标记为不易枯萎，其他作物需要逐个检查。
:::

::: details Q：茶树和果树的完整规则在哪里？
请看 [茶风纪事 → 茶园、田园与果园](/tutorial/Teastory#tea-garden) 和 [田园、稻田与果园](/tutorial/Teastory#garden-orchard)。
:::
