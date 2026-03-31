#!/bin/bash
# 每日自动更新脚本 - 生成内容并推送到 GitHub
# 运行：./auto-update.sh

set -e

# 设置 Node.js 路径（cron 环境中需要）
export PATH="/opt/homebrew/bin:/opt/homebrew/sbin:$PATH"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "🌅 开始每日自动更新..."
echo "📍 工作目录：$SCRIPT_DIR"
echo "⏰ 时间：$(date '+%Y-%m-%d %H:%M:%S')"
echo ""

# 1. 生成新内容
echo "📝 步骤 1/3: 生成新章节内容..."
node daily-generator.js

# 2. 添加新文件到 git
echo ""
echo "📦 步骤 2/3: 提交更新到 git..."
git add -A

# 检查是否有更改
if git diff --staged --quiet; then
    echo "ℹ️  没有新更改需要提交"
else
    git commit -m "📚 每日更新 $(date +%Y-%m-%d)

- 自动生成新章节
- 更新作品数据
- 刷新缓存

[auto-update]"
    echo "✅ 提交成功"
fi

# 3. 推送到 GitHub
echo ""
echo "🚀 步骤 3/3: 推送到 GitHub..."
git pull --rebase origin main 2>/dev/null || true
git push origin main

echo ""
echo "✅ 每日更新完成！"
echo "🌐 网站地址：https://justinclaw.github.io/ai-reading-site/"
echo "📱 章节阅读：https://justinclaw.github.io/ai-reading-site/chapter.html?work=1&chapter=157"
echo ""
echo "📊 更新统计:"
echo "   - 新增章节：$(cat data/chapters.json | grep -c '"chapterNum"' || echo 0)"
echo "   - 最后更新：$(date '+%Y-%m-%d %H:%M:%S')"
