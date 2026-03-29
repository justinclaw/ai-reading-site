const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
  // 只允许 GET 请求
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const worksPath = path.join(process.cwd(), 'data', 'works.json');
    const worksData = JSON.parse(fs.readFileSync(worksPath, 'utf8'));

    // 按票数排序
    const sortedWorks = worksData.works.sort((a, b) => b.votes - a.votes);

    res.status(200).json({
      success: true,
      works: sortedWorks,
      total: sortedWorks.length
    });

  } catch (error) {
    console.error('Fetch works error:', error);
    res.status(500).json({ error: '获取作品失败', details: error.message });
  }
};
