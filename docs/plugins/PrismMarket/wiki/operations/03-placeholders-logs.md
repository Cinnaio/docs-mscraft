# 🧾 占位符、日志与数据观察

## PlaceholderAPI

PrismMarket 可与 PlaceholderAPI 协同工作，用于：

- GUI 显示增强
- 消息内容动态化
- 跨插件面板展示交易数据

## 随机位占位符

布局中可使用：

```text
%prismmarket_random_<shop>_<group>_<index>%
```

用于将随机组结果映射到固定槽位。

## 交易日志

管理员可查询玩家交易历史：

```bash
/pm logs <player> [page]
```

可用于：

- 经济回溯
- 争议处理
- 异常交易检查

## debug 观察建议

### 观察 random 状态

```bash
/pm debug memory random
```

### 观察 custom 基准状态

```bash
/pm debug memory custom
```

### 观察单玩家统计

```bash
/pm debug memory player <player>
```
