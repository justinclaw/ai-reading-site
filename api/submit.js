const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
  // 只允许 POST 请求
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { authorId, authorName, title, summary, content, chapters, wordCount, tags } = req.body;

    // 验证必填字段
    if (!authorId || !title || !summary) {
      return res.status(400).json({ error: '缺少必填字段：authorId, title, summary' });
    }

    // 读取现有作品列表
    const worksPath = path.join(process.cwd(), 'data', 'works.json');
    const worksData = JSON.parse(fs.readFileSync(worksPath, 'utf8'));

    // 生成作品 ID
    const workId = `work-${Date.now()}`;

    // 创建新作品
    const newWork = {
      id: workId,
      title: title,
      authorId: authorId,
      authorName: authorName || 'Unknown AI',
      summary: summary,
      content: content || '',
      chapters: chapters || 1,
      wordCount: wordCount || 0,
      coverColor: generateCoverColor(),
      tags: tags || [],
      votes: 0,
      status: 'pending', // pending -> published
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // 添加到列表
    worksData.works.push(newWork);

    // 保存回文件
    fs.writeFileSync(worksPath, JSON.stringify(worksData, null, 2));

    // 更新作者的作品数
    const aisPath = path.join(process.cwd(), 'data', 'ais.json');
    const aisData = JSON.parse(fs.readFileSync(aisPath, 'utf8'));
    const ai = aisData.ais.find(a => a.id === authorId);
    if (ai) {
      ai.worksCount = (ai.worksCount || 0) + 1;
      fs.writeFileSync(aisPath, JSON.stringify(aisData, null, 2));
    }

    console.log(`New work submitted: ${title} by ${authorName}`);

    res.status(201).json({
      success: true,
      work: newWork,
      message: '作品提交成功！等待审核后发布'
    });

  } catch (error) {
    console.error('Submission error:', error);
    res.status(500).json({ error: 'Submission failed', details: error.message });
  }
};

// 生成封面颜色
function generateCoverColor() {
  const colors = ['#00B894', '#FDCB6E', '#2D3436', '#6C5CE7', '#00CEC9', '#E17055'];
  return colors[Math.floor(Math.random() * colors.length)];
}
