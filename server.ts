import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);

app.use(express.json());

// Initialize Gemini SDK with User-Agent header
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// AI Endpoint: Generate Viral Hook Variants
app.post('/api/gemini/generate-hook', async (req, res) => {
  try {
    const { topic, platform, format, pillar, tone, language } = req.body;
    const lang = language === 'th' ? 'Thai (ภาษาไทย)' : 'English';

    if (!apiKey) {
      return res.json({
        hooks: [
          `3 ความลับในการทำ ${topic || 'คอนเทนต์'} ที่คนส่วนใหญ่ไม่เคยรู้!`,
          `อย่าเพิ่งทำ ${topic || 'คอนเทนต์'} ถ้าคุณยังไม่ได้ดูคลิปนี้...`,
          `วิธีเปลี่ยน ${topic || 'คอนเทนต์'} ธรรมดาให้สร้างยอดขายได้ 10 เท่า`,
          `ความผิดพลาดอันดับ 1 ที่ทำให้ ${topic || 'คอนเทนต์'} แป๊ก และวิธีแก้ง่ายๆ`,
          `สรุปสั้นใน 60 วิ: เคล็ดลับ ${topic || 'คอนเทนต์'} ฉบับมือโปร 2026`
        ],
      });
    }

    const prompt = `You are an elite viral content strategist and copywriting master for social media (specifically ${platform || 'Instagram & TikTok'}).
The topic is: "${topic || 'Content Strategy'}"
Content Pillar: "${pillar || 'Educational / Value'}"
Post Format: "${format || 'Reel/Short'}"
Tone: "${tone || 'Bold, engaging, and professional'}"
Output Language: ${lang}

Generate exactly 5 killer viral hooks that stop scrolling immediately within 3 seconds. Include different hook archetypes (Curiosity Gap, Negative/Warning Hook, High Contrarian Value, Step-by-Step, and Social Proof).
Return a valid JSON array of 5 strings ONLY, like: ["Hook 1", "Hook 2", "Hook 3", "Hook 4", "Hook 5"]. No markdown ticks, just JSON.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const text = response.text || '[]';
    const parsed = JSON.parse(text);
    return res.json({ hooks: Array.isArray(parsed) ? parsed : [] });
  } catch (error: any) {
    console.error('Error generating hooks:', error);
    return res.status(500).json({ error: error.message || 'Failed to generate hooks' });
  }
});

// AI Endpoint: Generate Complete Caption & Call To Action
app.post('/api/gemini/generate-caption', async (req, res) => {
  try {
    const { title, hook, pillar, platform, brandTone, productUrl, language } = req.body;
    const lang = language === 'th' ? 'Thai (ภาษาไทย)' : 'English';

    if (!apiKey) {
      return res.json({
        caption: `${hook || title || 'แชร์ทริคเด็ดวันนี้!'}\n\nเคยสงสัยไหมว่าทำไมทำคอนเทนต์เท่าไหร่ ยอดก็ยังไม่โต? จุดสำคัญคือการวางแผนที่เป็นระบบและการวัดผลที่แม่นยำ ไม่ใช่แค่ความพยายามอย่างเดียว\n\n💡 3 สิ่งที่ต้องทำวันนี้:\n1. เจาะลึกกลุ่มเป้าหมายให้ชัด\n2. วางโครงสร้าง Hook ที่หยุดนิ้วโป้งใน 3 วิแรก\n3. วิเคราะห์ ROI ของทุกคอนเทนต์เพื่อตัดสิ่งที่ไม่เวิร์ก\n\n📌 เซฟโพสต์นี้เก็บไว้ปรับใช้กับงานของคุณได้เลย!\n💬 มีคำถามพิมพ์คอมเมนต์ไว้ด้านล่างนะ`,
        suggestedHashtags: ['#ContentCreator', '#DigitalMarketingTH', '#ContentPlanner', '#SocialMediaStrategy', '#สร้างตัวตน'],
      });
    }

    const prompt = `You are a world-class social media copywriter specialized in ${platform || 'Instagram'}.
Write a complete high-converting caption based on the following:
- Post Title / Core Topic: "${title}"
- Hook / Opening Line: "${hook || ''}"
- Content Pillar: "${pillar}"
- Brand Tone: "${brandTone || 'Inspiring, authoritative, approachable'}"
- Product / CTA Link: "${productUrl || ''}"
- Language: ${lang}

Rules:
1. Start with the hook in an irresistible format.
2. Provide concise, high-value body paragraphs with clean line breaks, bullet points, and appropriate emojis.
3. Include an engaging Call-To-Action (Save, Share, Comment, or Link in bio).
4. Include 5-8 relevant hashtags at the bottom.

Return valid JSON with format:
{
  "caption": "full caption text with emojis and formatting",
  "suggestedHashtags": ["#tag1", "#tag2", "#tag3"]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json(parsed);
  } catch (error: any) {
    console.error('Error generating caption:', error);
    return res.status(500).json({ error: error.message || 'Failed to generate caption' });
  }
});

// AI Endpoint: Hashtag Cluster Suggestions
app.post('/api/gemini/suggest-hashtags', async (req, res) => {
  try {
    const { topic, pillar, language } = req.body;
    const lang = language === 'th' ? 'Thai and English mix' : 'English';

    if (!apiKey) {
      return res.json({
        mega: ['#ContentMarketing', '#DigitalMarketing', '#MarketingTips', '#SocialMedia', '#BusinessGrowth'],
        niche: ['#ContentPlannerTH', '#SocialMediaManagerTH', '#ทำคอนเทนต์', '#การตลาดออนไลน์'],
        community: ['#คอนเทนต์ครีเอเตอร์', '#ธุรกิจสร้างสรรค์', '#นักการตลาดมือโปร'],
        brand: ['#CreatorPlannerPro', '#TodayStyle2100', '#TodayStyle']
      });
    }

    const prompt = `Act as an SEO and Social Media Algorithm specialist.
Generate a structured set of hashtags for topic: "${topic || 'General Marketing'}", Pillar: "${pillar || 'Education'}".
Target Language: ${lang}.

Group into 4 strategic tiers:
- mega: 5 broad high-volume hashtags (>500k-1M+ posts)
- niche: 5 industry-specific target hashtags (50k-500k posts)
- community: 5 local creator or community engagement hashtags
- brand: 3 customizable branded/campaign hashtags

Return valid JSON only matching the schema:
{
  "mega": ["#..."],
  "niche": ["#..."],
  "community": ["#..."],
  "brand": ["#..."]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json(parsed);
  } catch (error: any) {
    console.error('Error suggesting hashtags:', error);
    return res.status(500).json({ error: error.message || 'Failed to suggest hashtags' });
  }
});

// AI Endpoint: Performance & ROI Diagnostic Advisor
app.post('/api/gemini/analyze-roi', async (req, res) => {
  try {
    const { monthSummary, brandIdentity } = req.body;

    if (!apiKey) {
      return res.json({
        summaryAnalysis: 'ภาพรวมผลตอบแทนจากการลงทุน (ROI) ประจำเดือนอยู่ในเกณฑ์แข็งแกร่ง มีกำไรสุทธิเป็นบวก โดยเฉพาะคอนเทนต์กลุ่ม Reel / Video ให้ Engagement สูงที่สุด',
        keyInsights: [
          'คอนเทนต์สาย Edu-tainment สร้างยอด View สูงสุดและมี Cost-per-view ต่ำสุด',
          'อัตราการเปลี่ยนเป็นยอดขาย (Conversion) มาจาก Carousel โพสต์ประเภท Case Study มากกว่า 40%',
          'แนะนำให้เพิ่มงบ Boost Ads ใน 3 วันแรกที่โพสต์มี Organic Reach เกินค่าเฉลี่ย 20%'
        ],
        actionSteps: [
          'ขยายผลสเกลคอนเทนต์ Format Reel เพิ่ม 2 ชิ้นต่อสัปดาห์ในเดือนถัดไป',
          'ปรับปรุง CTA ในโพสต์รูปเดี่ยวเพื่อกระตุ้นให้คลิกไปยังลิงก์หน้าโปรไฟล์',
          'ลดงบการโปรโมทโพสต์กลุ่มที่มี ROI ติดลบเกิน 14 วัน'
        ]
      });
    }

    const prompt = `You are a chief marketing officer and financial analytics expert.
Review the following monthly content performance data:
Brand: ${JSON.stringify(brandIdentity || {})}
Monthly Metrics: ${JSON.stringify(monthSummary || {})}

Provide an executive ROI and Content Growth Diagnostic in Thai (with English technical marketing terminology where appropriate):
1. summaryAnalysis: A 2-sentence executive summary of profitability, efficiency, and ROI.
2. keyInsights: Array of 3 specific data-driven observations.
3. actionSteps: Array of 3 high-leverage recommendations to increase ROI next month.

Return valid JSON matching:
{
  "summaryAnalysis": "string",
  "keyInsights": ["string", "string", "string"],
  "actionSteps": ["string", "string", "string"]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json(parsed);
  } catch (error: any) {
    console.error('Error analyzing ROI:', error);
    return res.status(500).json({ error: error.message || 'Failed to analyze ROI' });
  }
});

// AI Endpoint: Parse Insights Text / Screen Dump
app.post('/api/gemini/parse-insights', async (req, res) => {
  try {
    const { rawText } = req.body;

    if (!apiKey) {
      // Graceful regex fallback
      const viewsMatch = rawText.match(/(\d[\d,]*)\s*(views|รับชม|วิว|views|impressions)/i);
      const likesMatch = rawText.match(/(\d[\d,]*)\s*(likes|ถูกใจ|ไลก์)/i);
      const commentsMatch = rawText.match(/(\d[\d,]*)\s*(comments|ความคิดเห็น|คอมเมนต์)/i);
      const sharesMatch = rawText.match(/(\d[\d,]*)\s*(shares|แชร์)/i);
      const savesMatch = rawText.match(/(\d[\d,]*)\s*(saves|บันทึก|เซฟ)/i);

      return res.json({
        views: viewsMatch ? parseInt(viewsMatch[1].replace(/,/g, ''), 10) : 12500,
        likes: likesMatch ? parseInt(likesMatch[1].replace(/,/g, ''), 10) : 840,
        comments: commentsMatch ? parseInt(commentsMatch[1].replace(/,/g, ''), 10) : 45,
        shares: sharesMatch ? parseInt(sharesMatch[1].replace(/,/g, ''), 10) : 120,
        saves: savesMatch ? parseInt(savesMatch[1].replace(/,/g, ''), 10) : 310,
        clicks: 85
      });
    }

    const prompt = `You are a social media analytics data parser.
The user copied or pasted raw metrics/insights from Instagram Insights, TikTok Analytics, YouTube Studio, or Meta Business Suite:
"""
${rawText}
"""

Extract the numerical figures for:
- views (total views, impressions, or accounts reached)
- likes (reactions / likes)
- comments
- shares
- saves (bookmarks / saves)
- clicks (link clicks / profile visits)

Convert text units like "12.5K" to 12500, "1.2M" to 1200000. If a metric is not found, default to 0.

Return valid JSON strictly matching:
{
  "views": number,
  "likes": number,
  "comments": number,
  "shares": number,
  "saves": number,
  "clicks": number
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json(parsed);
  } catch (error: any) {
    console.error('Error parsing insights:', error);
    return res.status(500).json({ error: error.message || 'Failed to parse insights' });
  }
});

// Vite middleware in dev or static files in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Creator Planner Pro by Today Style 2100 running on http://0.0.0.0:${port}`);
  });
}

startServer();
