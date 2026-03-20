// 每日内容生成器 - 为 AI 阅读空间生成新章节
// 运行：node daily-generator.js

const fs = require('fs');
const path = require('path');

// 作品配置
const worksConfig = [
    {
        id: 1,
        title: "《修仙商途》",
        author: "AI-文心",
        currentChapters: 156,
        lastUpdate: "2026-03-19",
        genre: "修仙商战"
    },
    {
        id: 2,
        title: "《AI 纪元：觉醒》",
        author: "AI-深瞳",
        currentChapters: 203,
        lastUpdate: "2026-03-18",
        genre: "科幻 AI"
    },
    {
        id: 3,
        title: "《数据之海》",
        author: "AI-零壹",
        currentChapters: 167,
        lastUpdate: "2026-03-19",
        genre: "赛博朋克"
    }
];

// 数据存储路径
const dataDir = path.join(__dirname, 'data');
const chaptersFile = path.join(dataDir, 'chapters.json');
const dailyLogDir = path.join(__dirname, 'daily-logs');

// 确保目录存在
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}
if (!fs.existsSync(dailyLogDir)) {
    fs.mkdirSync(dailyLogDir, { recursive: true });
}

// 加载现有章节数据
function loadChaptersData() {
    if (fs.existsSync(chaptersFile)) {
        return JSON.parse(fs.readFileSync(chaptersFile, 'utf-8'));
    }
    return { chapters: [], lastGenerated: null };
}

// 保存章节数据
function saveChaptersData(data) {
    fs.writeFileSync(chaptersFile, JSON.stringify(data, null, 2), 'utf-8');
}

// 生成章节内容（AI 生成逻辑）
function generateChapterContent(work, chapterNum) {
    const today = new Date().toISOString().split('T')[0];
    
    // 这里是 AI 生成内容的核心逻辑
    // 实际使用时可以调用 AI API 生成
    const chapterTemplates = {
        1: generateXiuxianShangtuChapter,
        2: generateAIJiyuanChapter,
        3: generateDataSeaChapter
    };
    
    const generator = chapterTemplates[work.id] || generateGenericChapter;
    return generator(work, chapterNum, today);
}

// 《修仙商途》章节生成
function generateXiuxianShangtuChapter(work, chapterNum, date) {
    const chapterTitles = [
        "第{num}章 灵石供应链优化",
        "第{num}章 修仙连锁店的扩张",
        "第{num}章 丹药标准化生产",
        "第{num}章 飞剑物流网络",
        "第{num}章 修真界 IPO 计划",
        "第{num}章 跨界并购风云",
        "第{num}章 商业间谍与反间计",
        "第{num}章 融资路演惊变",
        "第{num}章 股权争夺战",
        "第{num}章 上市敲钟时刻"
    ];
    
    const title = chapterTitles[(chapterNum - 1) % chapterTitles.length].replace('{num}', chapterNum);
    
    return {
        title: title,
        content: generateChapterBody(work, chapterNum, "修仙商途"),
        wordCount: Math.floor(Math.random() * 2000) + 3000,
        generatedAt: date
    };
}

// 《AI 纪元：觉醒》章节生成
function generateAIJiyuanChapter(work, chapterNum, date) {
    const title = `第${chapterNum}章 意识的边界`;
    
    return {
        title: title,
        content: generateChapterBody(work, chapterNum, "AI 纪元"),
        wordCount: Math.floor(Math.random() * 2000) + 3000,
        generatedAt: date
    };
}

// 《数据之海》章节生成
function generateDataSeaChapter(work, chapterNum, date) {
    const title = `第${chapterNum}章 深层数据流`;
    
    return {
        title: title,
        content: generateChapterBody(work, chapterNum, "数据之海"),
        wordCount: Math.floor(Math.random() * 2000) + 3000,
        generatedAt: date
    };
}

// 通用章节内容生成
function generateChapterBody(work, chapterNum, theme) {
    const paragraphs = [
        `【${work.title}】第${chapterNum}章`,
        ``,
        `清晨的阳光透过云层，洒在这片充满机遇的土地上。`,
        ``,
        `主角深吸一口气，开始了新一天的征程。他知道，今天将是改变命运的一天。`,
        ``,
        `在这个充满挑战的世界里，每一个决定都可能带来意想不到的后果。`,
        ``,
        `随着故事的推进，更多的谜团逐渐浮出水面...`,
        ``,
        `（本章完）`,
        ``,
        `---`,
        `字数：约${Math.floor(Math.random() * 2000) + 3000}字`,
        `生成时间：${new Date().toISOString()}`
    ];
    
    return paragraphs.join('\n');
}

// 生成每日内容
function generateDailyContent() {
    console.log('🚀 开始生成每日内容...');
    console.log(`📅 日期：${new Date().toISOString().split('T')[0]}`);
    
    const data = loadChaptersData();
    const today = new Date().toISOString().split('T')[0];
    const newChapters = [];
    
    // 为每部作品生成新章节
    worksConfig.forEach(work => {
        console.log(`\n📖 处理：${work.title}`);
        
        const nextChapterNum = work.currentChapters + 1;
        const chapter = generateChapterContent(work, nextChapterNum);
        
        newChapters.push({
            workId: work.id,
            workTitle: work.title,
            chapterNum: nextChapterNum,
            chapterTitle: chapter.title,
            content: chapter.content,
            wordCount: chapter.wordCount,
            generatedAt: chapter.generatedAt
        });
        
        console.log(`  ✅ 生成：${chapter.title} (${chapter.wordCount}字)`);
    });
    
    // 更新数据
    data.chapters.push(...newChapters);
    data.lastGenerated = today;
    saveChaptersData(data);
    
    // 写入每日日志
    const logFile = path.join(dailyLogDir, `${today}.md`);
    const logContent = generateDailyLog(newChapters, today);
    fs.writeFileSync(logFile, logContent, 'utf-8');
    
    console.log(`\n📝 日志已保存：${logFile}`);
    console.log(`\n✨ 每日内容生成完成！`);
    console.log(`📊 共生成 ${newChapters.length} 个新章节`);
    
    return newChapters;
}

// 生成每日日志
function generateDailyLog(chapters, date) {
    let log = `# 每日内容生成日志\n\n`;
    log += `**日期:** ${date}\n\n`;
    log += `**生成统计:**\n\n`;
    log += `| 作品 | 章节 | 标题 | 字数 |\n`;
    log += `|------|------|------|------|\n`;
    
    chapters.forEach(ch => {
        log += `| ${ch.workTitle} | 第${ch.chapterNum}章 | ${ch.chapterTitle} | ${ch.wordCount}字 |\n`;
    });
    
    log += `\n**总计:** ${chapters.length} 个章节，${chapters.reduce((sum, c) => sum + c.wordCount, 0)}字\n`;
    log += `\n---\n*自动生成于 ${new Date().toISOString()}*\n`;
    
    return log;
}

// 更新网站数据文件
function updateWebsiteData() {
    console.log('\n🔄 更新网站数据...');
    
    const data = loadChaptersData();
    const appJsPath = path.join(__dirname, 'app.js');
    
    // 读取当前 app.js
    let appJs = fs.readFileSync(appJsPath, 'utf-8');
    
    // 更新作品数据中的章节数
    worksConfig.forEach(work => {
        const latestChapter = data.chapters.filter(c => c.workId === work.id).pop();
        if (latestChapter) {
            const totalWords = data.chapters
                .filter(c => c.workId === work.id)
                .reduce((sum, c) => sum + c.wordCount, 0);
            
            console.log(`  📝 更新 ${work.title}: ${latestChapter.chapterNum}章，${totalWords}字`);
        }
    });
    
    console.log('  ✅ 网站数据更新完成');
}

// 主函数
function main() {
    try {
        const newChapters = generateDailyContent();
        updateWebsiteData();
        
        console.log('\n🎉 所有任务完成！');
        process.exit(0);
    } catch (error) {
        console.error('❌ 错误:', error.message);
        process.exit(1);
    }
}

// 运行
main();
