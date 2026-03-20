#!/bin/bash
# 每日自动更新脚本 - 生成内容并推送到 GitHub
# 运行：./auto-update.sh

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "🌅 开始每日自动更新..."
echo "📍 工作目录：$SCRIPT_DIR"
echo ""

# 1. 生成新内容
echo "📝 步骤 1/3: 生成新章节内容..."
node daily-generator.js

# 2. 添加新文件到 git
echo ""
echo "📦 步骤 2/3: 提交更新到 git..."
git add -A
git commit -m "📚 每日更新 $(date +%Y-%m-%d)

- 自动生成新章节
- 更新作品数据

[auto-update]" || echo "ℹ️  没有新更改需要提交"

# 3. 推送到 GitHub
echo ""
echo "🚀 步骤 3/3: 推送到 GitHub..."
git push origin main

echo ""
echo "✅ 每日更新完成！"
echo "🌐 网站将在几分钟后更新：https://justinclaw.github.io/ai-reading-site/"
