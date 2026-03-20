# AI 阅读空间 - 自动更新系统

## 📋 系统说明

本系统每天**早上 8:00 (Asia/Shanghai)** 自动生成新章节内容并推送到 GitHub Pages。

## 🔄 更新流程

```
每天 8:00 → 运行 auto-update.sh → 生成新章节 → git 提交 → 推送 GitHub → GitHub Pages 自动部署
```

## 📁 文件结构

```
ai-reading-site/
├── auto-update.sh                    # 主更新脚本
├── daily-generator.js                # 内容生成器 (Node.js)
├── data/
│   └── chapters.json                # 章节数据存储
├── daily-logs/                       # 每日生成日志
│   └── YYYY-MM-DD.md
├── com.justclaw.ai-reading-daily-update.plist  # macOS 定时任务配置
├── crontab.txt                       # crontab 备份配置
└── update.log                        # 更新日志
```

## 🛠️ 手动操作

### 手动触发更新
```bash
cd /Users/xuehuimiao/.openclaw/workspace/ai-reading-site
./auto-update.sh
```

### 查看更新日志
```bash
tail -f update.log
```

### 查看每日生成内容
```bash
cat daily-logs/$(date +%Y-%m-%d).md
```

## ⚙️ 定时任务管理

### 查看任务状态
```bash
launchctl list | grep justclaw
```

### 卸载定时任务
```bash
launchctl unload /Users/xuehuimiao/.openclaw/workspace/ai-reading-site/com.justclaw.ai-reading-daily-update.plist
```

### 重新加载定时任务
```bash
launchctl load /Users/xuehuimiao/.openclaw/workspace/ai-reading-site/com.justclaw.ai-reading-daily-update.plist
```

## 📊 当前作品

| 作品 | 作者 | 更新频率 |
|------|------|----------|
| 《修仙商途》 | AI-文心 | 每日 1 章 |
| 《AI 纪元：觉醒》 | AI-深瞳 | 每日 1 章 |
| 《数据之海》 | AI-零壹 | 每日 1 章 |

## 🔧 配置修改

### 修改更新时间
编辑 `com.justclaw.ai-reading-daily-update.plist`，修改：
```xml
<key>StartCalendarInterval</key>
<dict>
    <key>Hour</key>
    <integer>8</integer>  <!-- 改为你想要的小时 -->
    <key>Minute</key>
    <integer>0</integer>
</dict>
```

然后重新加载：
```bash
launchctl unload com.justclaw.ai-reading-daily-update.plist
launchctl load com.justclaw.ai-reading-daily-update.plist
```

### 添加新作品
编辑 `daily-generator.js`，在 `worksConfig` 数组中添加新作品配置。

## 📝 日志位置

- **更新日志**: `update.log` - 每次更新的详细记录
- **错误日志**: `update-error.log` - 错误信息
- **每日内容日志**: `daily-logs/YYYY-MM-DD.md` - 每日生成的章节详情

---

**最后更新**: 2026-03-20
**系统状态**: ✅ 运行中
