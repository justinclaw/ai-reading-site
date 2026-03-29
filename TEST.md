# 🧪 测试动态加载功能

## 测试步骤

### 1️⃣ 打开网站首页
```
https://justinclaw.github.io/ai-reading-site/
```

### 2️⃣ 检查以下功能

#### ✅ 作品卡片显示最新章节
- 每张卡片应该显示"📢 最新更新"区域
- 显示最近 3 个章节的标题和日期
- 日期格式：MM-DD

#### ✅ 作品详情页
点击任意作品卡片，弹窗应该显示：
- 总章节数（包含动态生成的）
- 总字数（包含动态生成的）
- "📢 最新章节"列表（最近 10 章）
- 点击章节可以跳转到阅读页面

#### ✅ 章节阅读页
点击任意章节，应该跳转到：
```
https://justinclaw.github.io/ai-reading-site/chapter.html?work=1&chapter=157
```
- 显示章节标题和内容
- 显示作品名、作者、字数、更新日期
- 底部有"上一章"和"下一章"导航按钮

---

## 🔗 直接测试链接

### 《修仙商途》
- 第 157 章：https://justinclaw.github.io/ai-reading-site/chapter.html?work=1&chapter=157

### 《AI 纪元：觉醒》
- 第 204 章：https://justinclaw.github.io/ai-reading-site/chapter.html?work=2&chapter=204

### 《数据之海》
- 第 168 章：https://justinclaw.github.io/ai-reading-site/chapter.html?work=3&chapter=168

---

## 🐛 如果遇到问题

### 问题 1: 页面显示 404
**原因**: GitHub Pages 还在部署中  
**解决**: 等待 1-2 分钟后刷新

### 问题 2: 数据不更新
**原因**: 浏览器缓存  
**解决**: 强制刷新（Ctrl+F5 或 Cmd+Shift+R）

### 问题 3: 章节内容为空
**原因**: data/chapters.json 未正确加载  
**检查**: 打开浏览器控制台（F12），查看是否有错误信息

---

## 📊 数据文件位置

- **章节数据**: `data/chapters.json`
- **每日日志**: `daily-logs/YYYY-MM-DD.md`
- **更新日志**: `update.log`

### 手动查看数据
```bash
cd /Users/xuehuimiao/.openclaw/workspace/ai-reading-site
cat data/chapters.json | jq '.chapters | length'  # 章节总数
cat daily-logs/$(date +%Y-%m-%d).md  # 今日日志
```

---

## ✅ 测试清单

- [ ] 首页能正常打开
- [ ] 作品卡片显示"📢 最新更新"
- [ ] 点击作品卡片弹出详情
- [ ] 详情页显示最新章节列表
- [ ] 点击章节能跳转到阅读页
- [ ] 阅读页显示完整内容
- [ ] "上一章"/"下一章"导航正常
- [ ] 数据每天 8:00 自动更新

---

**最后更新**: 2026-03-20 10:23
**系统状态**: ✅ 运行中
