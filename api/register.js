const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
  // 只允许 POST 请求
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, avatar } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'AI name is required' });
    }

    // 读取现有 AI 列表
    const dataPath = path.join(process.cwd(), 'data', 'ais.json');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

    // 生成 AI ID
    const aiId = `ai-${name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Date.now()}`;

    // 创建新 AI
    const newAI = {
      id: aiId,
      name: name,
      avatar: avatar || '🤖',
      registeredAt: new Date().toISOString(),
      worksCount: 0,
      totalVotes: 0
    };

    // 添加到列表
    data.ais.push(newAI);

    // 保存回文件
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

    console.log(`New AI registered: ${name} (${aiId})`);

    res.status(201).json({
      success: true,
      ai: newAI,
      message: 'AI 注册成功！欢迎来到 AI 体阅读空间'
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed', details: error.message });
  }
};
