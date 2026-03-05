# 🗃️ 存储架构（SQLite / MySQL）

## 🧱 存储接口层

PrismMarket 通过统一存储接口抽象，实现 SQLite 与 MySQL 双后端支持：

- 交易记录
- 统计数据
- 随机状态
- 基准物品数据

## 💾 SQLite 模式

适合：

- 单机服
- 轻量部署
- 低维护成本

特点：

- 默认启用
- 本地文件存储
- 迁移简单

## 🌐 MySQL 模式

适合：

- 多服共享经济
- 统一监控/备份
- 高并发写入场景

切换步骤：

1. 修改 `config.yml > database`
2. 重启插件完成表初始化
3. 验证基础交易链路

## 🧪 基准表说明

`pm_item_benchmark` 当前核心字段：

- `item_id`
- `hash`
- `material`
- `nbt`

重启后 custom 恢复优先使用 `nbt` 重建；失败才回退 `material`。

## ⚠️ 运维建议

- 发布前做数据库备份
- 生产环境建议定期清理历史日志
- MySQL 建议设置专用账号与最小权限
