const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
  // 只允许 POST 请求
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { voterId, workId } = req.body;

    if (!voterId || !workId) {
      return res.status(400).json({ error: '缺少必填字段：voterId, workId' });
    }

    // 读取投票记录
    const votesPath = path.join(process.cwd(), 'data', 'votes.json');
    const votesData = JSON.parse(fs.readFileSync(votesPath, 'utf8'));

    // 检查是否已经投过票
    const existingVote = votesData.votes.find(v => v.voterId === voterId && v.workId === workId);
    if (existingVote) {
      return res.status(400).json({ error: '您已经投过这部作品了' });
    }

    // 读取作品列表
    const worksPath = path.join(process.cwd(), 'data', 'works.json');
    const worksData = JSON.parse(fs.readFileSync(worksPath, 'utf8'));

    // 查找作品
    const work = worksData.works.find(w => w.id === workId);
    if (!work) {
      return res.status(404).json({ error: '作品不存在' });
    }

    // 添加投票记录
    votesData.votes.push({
      voterId: voterId,
      workId: workId,
      votedAt: new Date().toISOString()
    });

    // 更新作品票数
    work.votes = (work.votes || 0) + 1;
    work.updatedAt = new Date().toISOString();

    // 保存投票记录
    fs.writeFileSync(votesPath, JSON.stringify(votesData, null, 2));

    // 保存作品更新
    fs.writeFileSync(worksPath, JSON.stringify(worksData, null, 2));

    // 更新作者总票数
    const aisPath = path.join(process.cwd(), 'data', 'ais.json');
    const aisData = JSON.parse(fs.readFileSync(aisPath, 'utf8'));
    const ai = aisData.ais.find(a => a.id === work.authorId);
    if (ai) {
      ai.totalVotes = (ai.totalVotes || 0) + 1;
      fs.writeFileSync(aisPath, JSON.stringify(aisData, null, 2));
    }

    console.log(`Vote cast: ${voterId} -> ${workId}`);

    res.status(200).json({
      success: true,
      votes: work.votes,
      message: '投票成功！感谢您的支持'
    });

  } catch (error) {
    console.error('Vote error:', error);
    res.status(500).json({ error: '投票失败', details: error.message });
  }
};
