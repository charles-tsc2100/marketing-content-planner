import React, { useState } from 'react';
import { ContentPost } from '../types';
import { 
  X, 
  Sparkles, 
  Upload, 
  Check, 
  HelpCircle, 
  FileSpreadsheet, 
  Share2, 
  ArrowRight,
  TrendingUp,
  Info
} from 'lucide-react';

interface SyncMetricsModalProps {
  selectedMonth: string;
  posts: ContentPost[];
  onClose: () => void;
  onUpdatePost: (id: string, partial: Partial<ContentPost>) => void;
}

export const SyncMetricsModal: React.FC<SyncMetricsModalProps> = ({
  selectedMonth,
  posts,
  onClose,
  onUpdatePost,
}) => {
  const [activeMode, setActiveMode] = useState<'ai-paste' | 'csv-import' | 'api-guide'>('ai-paste');
  const monthPosts = posts.filter(p => p.month === selectedMonth);
  const [targetPostId, setTargetPostId] = useState<string>(monthPosts[0]?.id || '');
  
  // AI Paste State
  const [rawText, setRawText] = useState('');
  const [isParsing, setIsParsing] = useState(false);
  const [parsedMetrics, setParsedMetrics] = useState<{
    views?: number;
    likes?: number;
    comments?: number;
    shares?: number;
    saves?: number;
    clicks?: number;
  } | null>(null);
  const [appliedSuccess, setAppliedSuccess] = useState(false);

  // CSV State
  const [csvStatus, setCsvStatus] = useState<string | null>(null);

  const selectedPost = monthPosts.find(p => p.id === targetPostId);

  const handleParseAi = async () => {
    if (!rawText.trim()) return;
    setIsParsing(true);
    try {
      const res = await fetch('/api/gemini/parse-insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rawText }),
      });
      const data = await res.json();
      setParsedMetrics(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsParsing(false);
    }
  };

  const handleApplyToPost = () => {
    if (!targetPostId || !parsedMetrics) return;
    onUpdatePost(targetPostId, {
      views: Number(parsedMetrics.views) || 0,
      likes: Number(parsedMetrics.likes) || 0,
      comments: Number(parsedMetrics.comments) || 0,
      shares: Number(parsedMetrics.shares) || 0,
      saves: Number(parsedMetrics.saves) || 0,
      clicks: Number(parsedMetrics.clicks) || 0,
    });
    setAppliedSuccess(true);
    setTimeout(() => {
      setAppliedSuccess(false);
      setParsedMetrics(null);
      setRawText('');
    }, 2000);
  };

  // CSV Batch Importer (Meta Business Suite / YouTube / TikTok)
  const handleCsvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (!text) return;

      const lines = text.split('\n').filter(Boolean);
      if (lines.length < 2) {
        setCsvStatus('ไฟล์ CSV ไม่มีข้อมูล');
        return;
      }

      const headers = lines[0].toLowerCase().split(',').map(h => h.trim().replace(/"/g, ''));
      let updatedCount = 0;

      for (let i = 1; i < lines.length; i++) {
        const row = lines[i].split(',').map(c => c.trim().replace(/"/g, ''));
        if (row.length < 2) continue;

        // Find potential title column and metrics columns
        const titleIdx = headers.findIndex(h => h.includes('title') || h.includes('post') || h.includes('name'));
        const viewsIdx = headers.findIndex(h => h.includes('view') || h.includes('impression') || h.includes('reach'));
        const likesIdx = headers.findIndex(h => h.includes('like') || h.includes('reaction'));
        const commentsIdx = headers.findIndex(h => h.includes('comment'));

        if (titleIdx !== -1 && viewsIdx !== -1) {
          const rowTitle = row[titleIdx];
          const matchedPost = monthPosts.find(p => 
            p.title.toLowerCase().includes(rowTitle.toLowerCase()) || 
            rowTitle.toLowerCase().includes(p.title.toLowerCase())
          );

          if (matchedPost) {
            onUpdatePost(matchedPost.id, {
              views: Number(row[viewsIdx]) || matchedPost.views,
              likes: likesIdx !== -1 ? (Number(row[likesIdx]) || matchedPost.likes) : matchedPost.likes,
              comments: commentsIdx !== -1 ? (Number(row[commentsIdx]) || matchedPost.comments) : matchedPost.comments,
            });
            updatedCount++;
          }
        }
      }

      setCsvStatus(`อัปเดตสถิติสำเร็จ ${updatedCount} โพสต์เรียบร้อยแล้ว!`);
      setTimeout(() => setCsvStatus(null), 3500);
    };

    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col">
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                ระบบเชื่อมต่อและดึงสถิติโพสต์ (Post Analytics & Insights Sync)
              </h3>
              <p className="text-xs text-slate-500 font-mono">
                Month {selectedMonth} · Auto-Sync to Sheet & ROI Ledger
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 pt-4 border-b border-slate-100 flex items-center gap-2 bg-slate-50/70">
          <button
            onClick={() => setActiveMode('ai-paste')}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-t-lg transition-all border-b-2 cursor-pointer ${
              activeMode === 'ai-paste'
                ? 'border-indigo-600 text-indigo-700 bg-white shadow-xs font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>1. ดึงสถิติด่วนด้วย AI (Smart Paste)</span>
          </button>

          <button
            onClick={() => setActiveMode('csv-import')}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-t-lg transition-all border-b-2 cursor-pointer ${
              activeMode === 'csv-import'
                ? 'border-indigo-600 text-indigo-700 bg-white shadow-xs font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>2. นำเข้าไฟล์ CSV จาก Meta / TikTok / YouTube</span>
          </button>

          <button
            onClick={() => setActiveMode('api-guide')}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-t-lg transition-all border-b-2 cursor-pointer ${
              activeMode === 'api-guide'
                ? 'border-indigo-600 text-indigo-700 bg-white shadow-xs font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>3. ระบบ Live API ทำงานอย่างไร?</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-6 text-xs flex-1">
          {/* MODE 1: SMART AI PASTE */}
          {activeMode === 'ai-paste' && (
            <div className="space-y-5">
              <div className="bg-indigo-50/70 border border-indigo-100 p-4 rounded-xl flex items-start gap-3">
                <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-bold text-indigo-950 text-xs">
                    ไม่ต้องพิมพ์ทีละช่อง! ก็อปปี้ข้อความสถิติจากหน้าจอมือถือมาวางได้ทันที
                  </h4>
                  <p className="text-slate-600 leading-relaxed">
                    เปิดหน้า Instagram Insights, TikTok Analytics หรือ YouTube Studio แล้วก็อปปี้ตัวเลขสถิติ (เช่น "ยอดเข้าชม 45,200 ไลก์ 3,120 คอมเมนต์ 184 แชร์ 890 เซฟ 2,450") มาวางในช่องด้านล่าง แล้วกด <strong>"แยกสถิติด้วย Gemini AI"</strong>
                  </p>
                </div>
              </div>

              {/* Step 1: Select Target Post */}
              <div>
                <label className="block text-slate-700 font-bold mb-1.5">
                  เลือกโพสต์ในเดือน {selectedMonth} ที่ต้องการอัปเดตสถิติ:
                </label>
                <select
                  value={targetPostId}
                  onChange={(e) => setTargetPostId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-900 cursor-pointer"
                >
                  {monthPosts.map(p => (
                    <option key={p.id} value={p.id}>
                      [{p.platform.toUpperCase()}] {p.publishDate} — {p.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Step 2: Paste Raw Insights */}
              <div className="space-y-2">
                <label className="block text-slate-700 font-bold">
                  วางข้อความสถิติที่ก็อปปี้มา (Raw Insights Text):
                </label>
                <textarea
                  value={rawText}
                  onChange={(e) => setRawText(e.target.value)}
                  rows={4}
                  placeholder="ตัวอย่าง: บัญชีที่เข้าถึง 45.2K การโต้ตอบ 6,444 ไลก์ 3,120 ความคิดเห็น 184 การแชร์ 890 บันทึกไว้ 2,450..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs text-slate-800 leading-relaxed focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />

                <div className="flex items-center justify-between">
                  <div className="flex gap-2 text-[11px] text-slate-400">
                    <span>รองรับทั้งภาษาไทยและอังกฤษ</span>
                    <span>·</span>
                    <span>แปลง 45.2K เป็น 45,200 ให้อัตโนมัติ</span>
                  </div>

                  <button
                    onClick={handleParseAi}
                    disabled={isParsing || !rawText.trim()}
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isParsing ? 'กำลังแยกข้อมูล...' : 'แยกสถิติด้วย Gemini AI'}</span>
                  </button>
                </div>
              </div>

              {/* Step 3: Preview Extracted Figures */}
              {parsedMetrics && (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">
                      ผลลัพธ์ที่ Gemini สกัดได้จากข้อความ:
                    </span>
                    <span className="text-[11px] text-emerald-600 font-semibold">
                      พร้อมบันทึกเข้า Master Sheet
                    </span>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-center font-mono">
                      <span className="text-[10px] text-slate-400 block">Views / วิว</span>
                      <span className="font-bold text-slate-900 text-xs">{(parsedMetrics.views || 0).toLocaleString()}</span>
                    </div>
                    <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-center font-mono">
                      <span className="text-[10px] text-slate-400 block">Likes / ไลก์</span>
                      <span className="font-bold text-slate-900 text-xs">{(parsedMetrics.likes || 0).toLocaleString()}</span>
                    </div>
                    <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-center font-mono">
                      <span className="text-[10px] text-slate-400 block">Comments</span>
                      <span className="font-bold text-slate-900 text-xs">{(parsedMetrics.comments || 0).toLocaleString()}</span>
                    </div>
                    <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-center font-mono">
                      <span className="text-[10px] text-slate-400 block">Shares / แชร์</span>
                      <span className="font-bold text-slate-900 text-xs">{(parsedMetrics.shares || 0).toLocaleString()}</span>
                    </div>
                    <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-center font-mono">
                      <span className="text-[10px] text-slate-400 block">Saves / เซฟ</span>
                      <span className="font-bold text-slate-900 text-xs">{(parsedMetrics.saves || 0).toLocaleString()}</span>
                    </div>
                    <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-center font-mono">
                      <span className="text-[10px] text-slate-400 block">Clicks / คลิก</span>
                      <span className="font-bold text-slate-900 text-xs">{(parsedMetrics.clicks || 0).toLocaleString()}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleApplyToPost}
                    className="w-full py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>ยืนยันและอัปเดตสถิติเข้าโพสต์นี้ทันที</span>
                  </button>
                </div>
              )}

              {appliedSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-center font-semibold animate-fade-in">
                  ✅ อัปเดตสถิติเรียบร้อยแล้ว! ตัวเลขถูกซิงค์ไปยังหน้าลงข้อมูลและคำนวณกำไรจริง (ROI) ให้ทันที
                </div>
              )}
            </div>
          )}

          {/* MODE 2: CSV IMPORT */}
          {activeMode === 'csv-import' && (
            <div className="space-y-5">
              <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
                <h4 className="font-bold text-slate-900 text-sm">
                  นำเข้าไฟล์ CSV สถิติอัตโนมัติ (Batch Analytics Import)
                </h4>
                <p className="text-slate-600 leading-relaxed">
                  หากคุณส่งออก (Export) รายงานประสิทธิภาพคอนเทนต์มาจาก <strong>Meta Business Suite</strong>, <strong>TikTok Analytics</strong> หรือ <strong>YouTube Studio</strong> คุณสามารถอัปโหลดไฟล์ CSV นั้นตรงนี้เพื่อแมปชื่อโพสต์และอัปเดตยอดวิว ไลก์ คอมเมนต์ให้ครบทั้งเดือนในคลิกเดียว
                </p>

                <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center space-y-3 hover:border-slate-300 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-600">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-800 block">
                      คลิกเพื่อเลือกไฟล์ CSV สถิติของคุณ
                    </span>
                    <span className="text-[11px] text-slate-400">
                      รองรับไฟล์ .csv จาก Meta Business Suite, YouTube Studio, TikTok Creator Center
                    </span>
                  </div>
                  <label className="inline-block px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg cursor-pointer transition-colors">
                    <span>เลือกไฟล์ CSV</span>
                    <input type="file" accept=".csv" onChange={handleCsvUpload} className="hidden" />
                  </label>
                </div>

                {csvStatus && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-center font-semibold">
                    {csvStatus}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* MODE 3: HOW LIVE API WORKS */}
          {activeMode === 'api-guide' && (
            <div className="space-y-4 leading-relaxed text-slate-700">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Info className="w-4 h-4 text-indigo-600" />
                  <span>ทำไม Google Sheets และ Content Planner ทั่วไปถึงไม่ได้ต่อ API ดึงข้อมูลสด 100%?</span>
                </h4>
                <p>
                  ตามมาตรฐานความปลอดภัยและความเป็นส่วนตัวของ <strong>Meta (Instagram & Facebook)</strong> และ <strong>TikTok</strong>:
                </p>
                <ul className="space-y-2 list-disc list-inside text-xs text-slate-600">
                  <li>
                    <strong>ต้องมีบัญชี Business + Meta App Review:</strong> การจะดึงสถิติยอด Reach, Views, และ Saves ของโพสต์ส่วนตัวได้ แพลตฟอร์มกำหนดให้ต้องสร้าง Meta Developer App ผ่านการอนุมัติระดับองค์กร (Business Verification)
                  </li>
                  <li>
                    <strong>Access Token มีอายุหมดอายุ:</strong> โทเค็นการเชื่อมต่อมักหมดอายุทุก 60 วัน ทำให้ชีทหลุดการเชื่อมต่อบ่อยครั้ง
                  </li>
                  <li>
                    <strong>ค่าใช้จ่ายของ API Connector:</strong> โปรแกรมที่ดึงอัตโนมัติ 100% แบบ Third-party (เช่น Supermetrics หรือ DashThis) มักคิดค่าบริการรายเดือนตั้งแต่ <strong>$39 - $199 ต่อเดือน (1,400 - 7,000+ บาท/เดือน)</strong>
                  </li>
                </ul>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3">
                <h4 className="font-bold text-slate-900 text-sm">
                  💡 วิธีการทำงานที่ระบบ Creator Planner Pro by Today Style 2100 ใช้จริงและแนะนำ:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5">
                    <span className="font-bold text-slate-900 block text-xs">1. Smart AI Insights Paste</span>
                    <p className="text-[11px] text-slate-500">
                      ก็อปปี้ตัวเลขสถิติจากหน้าแอปในมือถือมาวาง แล้วให้ Gemini สกัดใส่ช่องให้อัตโนมัติใน 3 วินาที
                    </p>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5">
                    <span className="font-bold text-slate-900 block text-xs">2. Meta Business Suite CSV</span>
                    <p className="text-[11px] text-slate-500">
                      Export ไฟล์ CSV สถิติฟรีจาก Meta Business Suite หรือ YouTube ทุกสิ้นเดือน แล้วกดอัปโหลดทีเดียวทั้งเดือน
                    </p>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5">
                    <span className="font-bold text-slate-900 block text-xs">3. Weekly Review Routine</span>
                    <p className="text-[11px] text-slate-500">
                      พิมพ์อัปเดตตัวเลขในหน้าตาราง Monthly Sheet โดยตรงเหมือน Google Sheets ทั่วไป ระบบจะคำนวณกำไรและ ROI ให้ทันที
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            ระบบคำนวณกำไรจริง: ยอดขาย - (ต้นทุน + แอด) = Net Profit & ROI %
          </span>

          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            ปิดหน้าต่าง (Close)
          </button>
        </div>
      </div>
    </div>
  );
};
