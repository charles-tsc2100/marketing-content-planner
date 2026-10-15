import { BrandIdentity, ContentPost, HashtagSet, IdeaItem } from '../types';

export const initialBrandIdentity: BrandIdentity = {
  name: 'Today Style 2100',
  handle: '@todaystyle2100',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  bio: 'Lifestyle, Creative Strategy & Future Living by Today Style 2100 · ระบบวางแผนคอนเทนต์ครบวงจร 🚀',
  pillars: [
    'Edu-tainment (ทริค & ความรู้)',
    'Behind The Scenes (เบื้องหลัง & วิธีคิด)',
    'Product Showcase (ฟีเจอร์ & สินค้า)',
    'Social Proof & Case Studies (รีวิวลูกค้า)',
    'Mindset & Lifestyle (ไลฟ์สไตล์การทำงาน)'
  ],
  brandColors: ['#0F172A', '#4F46E5', '#10B981', '#F59E0B', '#F1F5F9'],
  audiencePersona: 'คอนเทนต์ครีเอเตอร์, เจ้าของแบรนด์ออนไลน์, โซเชียลมีเดียเมเนเจอร์ และฟรีแลนซ์สายดีไซน์/การตลาด ที่ต้องการจัดระเบียบคอนเทนต์และวัดผลลัพธ์เป็นตัวเงินจริง',
  toneOfVoice: 'มืออาชีพแต่เข้าถึงง่าย (Professional yet Approachable), ชัดเจน ตรงประเด็น, ให้กำลังใจและลงมือทำได้จริง (Actionable)',
  monthlyBudgetGoal: 25000,
  monthlyRevenueGoal: 150000
};

export const initialPosts: ContentPost[] = [
  {
    id: 'post-01',
    month: '10',
    publishDate: '2026-10-02',
    publishTime: '18:30',
    platform: 'instagram',
    format: 'carousel',
    pillar: 'Edu-tainment (ทริค & ความรู้)',
    title: '5 ขั้นตอนจัดระเบียบคอนเทนต์ให้โพสต์ตรงเวลาทุกวัน ไม่ตัน ไม่หมดไฟ',
    hook: 'หยุดนั่งคิดคอนเทนต์วันต่อวัน! นี่คือ 5 สเต็ปที่เอเจนซีใช้จริง',
    caption: `เคยไหม? ตื่นมาทุกเช้าแล้วไม่รู้จะโพสต์อะไรดี สุดท้ายก็เลื่อนไปเรื่อยๆ จนไม่ได้โพสต์...

ปัญหาไม่ได้อยู่ที่คุณ "ไม่มีไอเดีย" แต่อยู่ที่คุณยังไม่มี "ระบบวางแผนคอนเทนต์" ที่ดีต่างหาก

สไลด์นี้สรุป 5 ขั้นตอนสำคัญ:
1. กำหนด Content Pillar ให้ตรงกลุ่มเป้าหมาย 4-5 เสาหลัก
2. สร้าง Idea Bank คอยเก็บไอเดียทุกครั้งที่แวบขึ้นมา
3. มีระบบ Batching: ถ่ายคลิป 1 วัน ได้คอนเทนต์ทั้งเดือน
4. วางแผนลงปฏิทินแบบ Auto-Sync
5. วิเคราะห์ ROI: ดูว่าคอนเทนต์ไหนทำเงิน คอนเทนต์ไหนแค่เสียเวลา

👉 บันทึกโพสต์นี้ไว้เปิดดูตอนวางแผนต้นเดือนนะ!`,
    hashtags: ['#ContentPlanner', '#ContentStrategy', '#จัดระเบียบชีวิต', '#การตลาดออนไลน์', '#สร้างตัวตน', '#TodayStyle2100'],
    mediaUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    status: 'published',
    productionCost: 800,
    adSpend: 1500,
    salesRevenue: 9800,
    views: 45200,
    likes: 3120,
    comments: 184,
    shares: 890,
    saves: 2450,
    clicks: 420
  },
  {
    id: 'post-02',
    month: '10',
    publishDate: '2026-10-05',
    publishTime: '20:00',
    platform: 'tiktok',
    format: 'reel',
    pillar: 'Product Showcase (ฟีเจอร์ & สินค้า)',
    title: 'แกะกล่อง Creator Planner Pro ทำไมระบบเดียวถึงแทนได้ 5 แอพ',
    hook: 'เลิกจ่ายรายเดือนให้ 5 แอพจัดตาราง! ระบบนี้คิดกำไรและซิงค์ Feed ให้อัตโนมัติ',
    caption: `ใครทำเพจหรือเป็นครีเอเตอร์ต้องมีสิ่งนี้! Creator Planner Pro by Today Style 2100 
รวมตั้งแต่:
✨ วางแผน 12 เดือน (01-12)
🗓️ Smart Calendar ย้ายวันแล้วซิงค์ทันที
🖼️ จำลอง Feed IG 3x3 เช็คความคุมโทน
💡 Idea Bank & Hashtag Group
📊 สรุปกำไรจริงและ ROI อัตโนมัติ

กดดูที่ลิงก์หน้าโปรไฟล์ได้เลยนะ`,
    hashtags: ['#TikTokครีเอเตอร์', '#CreatorPlannerPro', '#TodayStyle2100', '#เทคนิคทำคลิป'],
    mediaUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    status: 'published',
    productionCost: 1200,
    adSpend: 3000,
    salesRevenue: 24500,
    views: 92400,
    likes: 7420,
    comments: 428,
    shares: 1980,
    saves: 4890,
    clicks: 860
  },
  {
    id: 'post-03',
    month: '10',
    publishDate: '2026-10-08',
    publishTime: '12:15',
    platform: 'facebook',
    format: 'single',
    pillar: 'Behind The Scenes (เบื้องหลัง & วิธีคิด)',
    title: 'เบื้องหลังการปรับโทนภาพแบรนด์ใหม่ให้ยอด Engagement โตขึ้น 300%',
    hook: 'จากยอดไลก์หลักสิบ สู่แสนวิวต่อโพสต์ เราเปลี่ยนแค่ 3 จุดนี้',
    caption: `หลายคนคิดว่าต้องใช้กล้องราคาแพงถึงจะคุมโทนเพจให้ดูแพงได้ แต่จริงๆ แล้วสิ่งที่สำคัญที่สุดคือ "Visual Consistency" หรือความสม่ำเสมอของสายตาคนดู

โพสต์นี้มาเล่าเบื้องหลัง Mood & Tone ที่เราทดลองมาตลอด 3 เดือน พร้อมสูตรเลือกคู่สีที่ไม่แย่งความเด่นของสินค้า`,
    hashtags: ['#BrandingTH', '#คุมโทนไอจี', '#นักการตลาดมือใหม่', '#TodayStyle2100'],
    mediaUrl: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=800&q=80',
    status: 'published',
    productionCost: 500,
    adSpend: 1000,
    salesRevenue: 6200,
    views: 28400,
    likes: 1840,
    comments: 92,
    shares: 340,
    saves: 820,
    clicks: 190
  },
  {
    id: 'post-04',
    month: '10',
    publishDate: '2026-10-12',
    publishTime: '19:00',
    platform: 'instagram',
    format: 'reel',
    pillar: 'Social Proof & Case Studies (รีวิวลูกค้า)',
    title: 'สัมภาษณ์คุณมุก เจ้าของแบรนด์สกินแคร์ หลังใช้ระบบวางแผนคอนเทนต์ 1 เดือน',
    hook: 'จากที่เคยเสียเวลาวันละ 3 ชม. ตอนนี้ทำคอนเทนต์เสร็จทั้งเดือนใน 2 วัน!',
    caption: `เคสนี้ประทับใจมาก! คุณมุกบอกว่าก่อนหน้านี้ไม่เคยรู้เลยว่ายิงแอดคอนเทนต์ไหนแล้วได้กำไรจริง จนได้มาใช้ระบบ Finance & ROI Tracker

ผลลัพธ์:
✅ ลดต้นทุนถ่ายงานซ้ำซ้อน 40%
✅ โพสต์ตรงเวลา 30 วันติดต่อกัน
✅ ROAS พุ่งแตะ 4.8 เท่า!`,
    hashtags: ['#รีวิวลูกค้า', '#ความสำเร็จ', '#การตลาดสายยิงแอด', '#CreatorPlannerPro'],
    mediaUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    status: 'published',
    productionCost: 1500,
    adSpend: 2500,
    salesRevenue: 18900,
    views: 64100,
    likes: 4200,
    comments: 260,
    shares: 1100,
    saves: 2980,
    clicks: 610
  },
  {
    id: 'post-05',
    month: '10',
    publishDate: '2026-10-15',
    publishTime: '18:00',
    platform: 'youtube',
    format: 'video',
    pillar: 'Edu-tainment (ทริค & ความรู้)',
    title: 'สอนทำ Content Planning ระบบ Master Sheet ตั้งแต่เริ่มต้นจนเช็คกำไร',
    hook: 'คลิปเดียวจบ: จัดระเบียบคอนเทนต์ระดับโปร ไม่ต้องเสียเงินซื้อโปรแกรมแพงๆ',
    caption: `Full Tutorial ความยาว 25 นาที พาทำทีละสเต็ปบน Master Template:
- วิธีกรอกข้อมูล 01-12
- การตั้งค่า Brand Identity
- การใช้ Formula เชื่อมข้อมูลไปยัง Dashboard
- เทคนิคการคุมโทน Feed Grid 3x3`,
    hashtags: ['#สอนทำการตลาด', '#ContentMarketing', '#YouTubeCreator', '#TodayStyle2100'],
    mediaUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    status: 'scheduled',
    productionCost: 2000,
    adSpend: 2000,
    salesRevenue: 12000,
    views: 0,
    likes: 0,
    comments: 0,
    shares: 0,
    saves: 0,
    clicks: 0
  },
  {
    id: 'post-06',
    month: '10',
    publishDate: '2026-10-18',
    publishTime: '20:30',
    platform: 'instagram',
    format: 'single',
    pillar: 'Mindset & Lifestyle (ไลฟ์สไตล์การทำงาน)',
    title: 'โต๊ะทำงานที่ไม่มีความรก คือจุดเริ่มต้นของคอนเทนต์ที่ทรงพลัง',
    hook: 'ถ้าความคิดคุณกำลังตัน ลองเคลียร์ 3 สิ่งนี้ออกจากโต๊ะทำงานของคุณดูสิ',
    caption: `พื้นที่ทำงานส่งผลต่อ Flow ความคิดมากกว่าที่คุณคิด
นี่คือ Setup ประจำวันของพวกเราที่ช่วยให้คิดงานได้ลื่นไหล ไม่เหนื่อยล้า`,
    hashtags: ['#DeskSetup', '#WorkspaceGoals', '#ทำงานอย่างมีสุข', '#TodayStyle2100'],
    mediaUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80',
    status: 'review',
    productionCost: 400,
    adSpend: 500,
    salesRevenue: 2800,
    views: 0,
    likes: 0,
    comments: 0,
    shares: 0,
    saves: 0,
    clicks: 0
  },
  {
    id: 'post-07',
    month: '10',
    publishDate: '2026-10-22',
    publishTime: '19:15',
    platform: 'x',
    format: 'thread',
    pillar: 'Edu-tainment (ทริค & ความรู้)',
    title: 'เธรดรวม 10 เครื่องมือฟรีที่ช่วยให้ครีเอเตอร์ 1 คน ทำงานแทนคนทั้งทีมได้',
    hook: '10 ฟรี Tools ที่ช่วยให้คุณประหยัดเวลาทำคอนเทนต์สัปดาห์ละ 15 ชั่วโมง 🧵👇',
    caption: `1/10 แนะนำเครื่องมือสาย Research, Scripting, Graphic, และ ROI Analytics ที่ทุกคนต้องลอง...`,
    hashtags: ['#ทริคการตลาด', '#เครื่องมือดีบอกต่อ', '#TodayStyle2100'],
    mediaUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    status: 'scripting',
    productionCost: 300,
    adSpend: 0,
    salesRevenue: 0,
    views: 0,
    likes: 0,
    comments: 0,
    shares: 0,
    saves: 0,
    clicks: 0
  },
  {
    id: 'post-08',
    month: '10',
    publishDate: '2026-10-26',
    publishTime: '18:45',
    platform: 'instagram',
    format: 'carousel',
    pillar: 'Product Showcase (ฟีเจอร์ & สินค้า)',
    title: 'เจาะลึกระบบ Auto-Sync Feed ใน Creator Planner Pro',
    hook: 'กรอกข้อมูลวันและรูปในหน้าเดือน ระบบจะเรียง Feed 3x3 ให้ทันทีโดยไม่ต้องโหลดแอพเพิ่ม',
    caption: `หมดยุคของการนั่ง export รูปลงมือถือเพื่อดูว่าเรียงสวยไหม
ระบบนี้ซิงค์ภาพและแคปชันให้ดูสดๆ แบบเรียลไทม์ พร้อมตรวจเช็คสีและลำดับโพสต์`,
    hashtags: ['#IGFeedPlanner', '#คุมโทน', '#CreatorPlannerPro', '#TodayStyle2100'],
    mediaUrl: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=800&q=80',
    status: 'idea',
    productionCost: 600,
    adSpend: 1500,
    salesRevenue: 7500,
    views: 0,
    likes: 0,
    comments: 0,
    shares: 0,
    saves: 0,
    clicks: 0
  }
];

export const initialIdeas: IdeaItem[] = [
  {
    id: 'idea-01',
    title: 'เปรียบเทียบการทำคอนเทนต์แบบ "ไม่มีระบบ" vs "มีระบบ Master Sheet"',
    pillar: 'Edu-tainment (ทริค & ความรู้)',
    format: 'carousel',
    platform: 'instagram',
    notes: 'ทำกราฟิกแบ่งครึ่งซ้าย-ขวา เน้นตัวเลขความเหนื่อยและยอดขายที่ต่างกัน 5 เท่า',
    hookVariant: 'ทำไมคนโพสต์ทุกวันยอดขาย 0 บาท แต่คนโพสต์อาทิตย์ละ 2 ครั้ง ยอดขายทะลุล้าน?',
    priority: 'high',
    createdAt: '2026-10-10'
  },
  {
    id: 'idea-02',
    title: 'แจกเช็คลิสต์ 7 ข้อ ก่อนกด Publish คลิป Reels เพื่อดันยอดเปิดการมองเห็น',
    pillar: 'Edu-tainment (ทริค & ความรู้)',
    format: 'reel',
    platform: 'tiktok',
    notes: 'พูดกระชับ หน้ากล้องถือกระดาษเช็คลิสต์ มีเสียงซาวด์เอฟเฟกต์ติ๊กถูก',
    hookVariant: 'อย่าเพิ่งกดลงคลิป Reels ถ้ายังไม่ได้เช็ค 7 ข้อนี้!',
    priority: 'high',
    createdAt: '2026-10-11'
  },
  {
    id: 'idea-03',
    title: 'สัมภาษณ์ทีมงาน: 1 วันในสตูดิโอ Today Style 2100 ผลิตคอนเทนต์กันยังไงให้ทันส่งลูกค้า',
    pillar: 'Behind The Scenes (เบื้องหลัง & วิธีคิด)',
    format: 'video',
    platform: 'youtube',
    notes: 'สไตล์ VLOG ชวนคุย ถ่ายอุปกรณ์ไฟและโปรแกรมที่ใช้งานจริง',
    hookVariant: 'เปิดชีวิต 1 วันในทีมครีเอทีฟ ทำงานยังไงไม่ให้เครียดและงานส่งทันเวลา',
    priority: 'medium',
    createdAt: '2026-10-12'
  },
  {
    id: 'idea-04',
    title: 'ตอบคำถามยอดฮิต: จำเป็นต้องมีกล้องใหญ่ไหมถึงจะทำภาพให้ดูแพงได้?',
    pillar: 'Product Showcase (ฟีเจอร์ & สินค้า)',
    format: 'single',
    platform: 'instagram',
    notes: 'ใช้ภาพถ่ายจาก iPhone เทียบกับกล้องโปร จัดแสงธรรมชาติ',
    hookVariant: 'มือถือเครื่องเดียวก็ทำภาพหลักล้านได้ ถ้าคุณรู้ความลับเรื่องการจัดแสง 1 ข้อนี้',
    priority: 'low',
    createdAt: '2026-10-13'
  }
];

export const initialHashtagSets: HashtagSet[] = [
  {
    id: 'hash-01',
    title: 'Content Strategy & Planning (หมวดวางแผนคอนเทนต์)',
    pillar: 'Edu-tainment (ทริค & ความรู้)',
    category: 'mega',
    tags: [
      '#ContentMarketing',
      '#ContentStrategy',
      '#DigitalMarketing',
      '#SocialMediaMarketing',
      '#ContentCreator',
      '#MarketingTips',
      '#OnlineBusiness',
      '#BusinessGrowth'
    ]
  },
  {
    id: 'hash-02',
    title: 'Thai Creator Community (หมวดกลุ่มครีเอเตอร์ไทย)',
    pillar: 'Edu-tainment (ทริค & ความรู้)',
    category: 'community',
    tags: [
      '#คอนเทนต์ครีเอเตอร์',
      '#สร้างตัวตนบนโลกออนไลน์',
      '#การตลาดออนไลน์',
      '#ทริคการตลาด',
      '#ทำคอนเทนต์',
      '#ฟรีแลนซ์ไทย',
      '#นักการตลาด'
    ]
  },
  {
    id: 'hash-03',
    title: 'Instagram & Feed Aesthetics (หมวดจัดระเบียบและคุมโทนไอจี)',
    pillar: 'Product Showcase (ฟีเจอร์ & สินค้า)',
    category: 'niche',
    tags: [
      '#คุมโทนไอจี',
      '#IGFeedPlanner',
      '#FeedAesthetic',
      '#GridPlanner',
      '#แต่งรูปไอจี',
      '#โทนสีมินิมอล'
    ]
  },
  {
    id: 'hash-04',
    title: 'Today Style 2100 Official Tags (หมวดแบรนด์ Today Style)',
    pillar: 'Product Showcase (ฟีเจอร์ & สินค้า)',
    category: 'brand',
    tags: [
      '#TodayStyle2100',
      '#CreatorPlannerPro',
      '#TodayStyle',
      '#FutureCreator',
      '#ContentOS'
    ]
  }
];
