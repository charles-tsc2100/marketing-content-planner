import React, { useState } from 'react';
import { ContentPost, BrandIdentity, PlatformType, PostFormat, PostStatus } from '../types';
import { 
  Plus, 
  Search, 
  Download, 
  Trash2, 
  Copy, 
  Sparkles, 
  ExternalLink,
  Edit3
} from 'lucide-react';

interface MonthlySheetViewProps {
  selectedMonth: string;
  setSelectedMonth: (month: string) => void;
  brandIdentity: BrandIdentity;
  posts: ContentPost[];
  filteredPosts: ContentPost[];
  monthStats: any;
  selectedPlatform: string;
  setSelectedPlatform: (p: string) => void;
  selectedStatus: string;
  setSelectedStatus: (s: string) => void;
  selectedPillar: string;
  setSelectedPillar: (pil: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onAddPost: (post: Omit<ContentPost, 'id'>) => ContentPost;
  onUpdatePost: (id: string, partial: Partial<ContentPost>) => void;
  onDeletePost: (id: string) => void;
  onDuplicatePost: (id: string) => void;
  onEditPost: (post: ContentPost) => void;
  onOpenAiStudio: () => void;
  onOpenSyncMetrics: () => void;
  onExportCsv: (month: string) => void;
}

export const MonthlySheetView: React.FC<MonthlySheetViewProps> = ({
  selectedMonth,
  setSelectedMonth,
  brandIdentity,
  posts,
  filteredPosts,
  monthStats,
  selectedPlatform,
  setSelectedPlatform,
  selectedStatus,
  setSelectedStatus,
  selectedPillar,
  setSelectedPillar,
  searchQuery,
  setSearchQuery,
  onAddPost,
  onUpdatePost,
  onDeletePost,
  onDuplicatePost,
  onEditPost,
  onOpenAiStudio,
  onOpenSyncMetrics,
  onExportCsv,
}) => {
  const [quickTitle, setQuickTitle] = useState('');
  const [quickPlatform, setQuickPlatform] = useState<PlatformType>('instagram');
  const [quickFormat, setQuickFormat] = useState<PostFormat>('carousel');

  const months = [
    { id: '01', label: '01 ม.ค.', en: 'Jan' },
    { id: '02', label: '02 ก.พ.', en: 'Feb' },
    { id: '03', label: '03 มี.ค.', en: 'Mar' },
    { id: '04', label: '04 เม.ย.', en: 'Apr' },
    { id: '05', label: '05 พ.ค.', en: 'May' },
    { id: '06', label: '06 มิ.ย.', en: 'Jun' },
    { id: '07', label: '07 ก.ค.', en: 'Jul' },
    { id: '08', label: '08 ส.ค.', en: 'Aug' },
    { id: '09', label: '09 ก.ย.', en: 'Sep' },
    { id: '10', label: '10 ต.ค.', en: 'Oct' },
    { id: '11', label: '11 พ.ย.', en: 'Nov' },
    { id: '12', label: '12 ธ.ค.', en: 'Dec' },
  ];

  const handleQuickAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickTitle.trim()) return;

    const todayDate = new Date();
    const formattedDay = String(todayDate.getDate()).padStart(2, '0');

    onAddPost({
      month: selectedMonth,
      publishDate: `2026-${selectedMonth}-${formattedDay}`,
      publishTime: '18:00',
      platform: quickPlatform,
      format: quickFormat,
      pillar: brandIdentity.pillars[0] || 'Education',
      title: quickTitle.trim(),
      hook: '',
      caption: '',
      hashtags: ['#ContentPlanner'],
      mediaUrl: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=800&q=80',
      status: 'idea',
      productionCost: 500,
      adSpend: 1000,
      salesRevenue: 0,
      views: 0,
      likes: 0,
      comments: 0,
      shares: 0,
      saves: 0,
      clicks: 0
    });

    setQuickTitle('');
  };

  const statusColors: Record<PostStatus, { label: string; text: string; bg: string }> = {
    idea: { label: '💡 Idea', text: 'text-amber-700', bg: 'bg-amber-50 border-amber-200' },
    scripting: { label: '✍️ Scripting', text: 'text-blue-700', bg: 'bg-blue-50 border-blue-200' },
    review: { label: '👀 In Review', text: 'text-purple-700', bg: 'bg-purple-50 border-purple-200' },
    scheduled: { label: '🗓️ Scheduled', text: 'text-indigo-700', bg: 'bg-indigo-50 border-indigo-200' },
    published: { label: '✅ Published', text: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200' },
  };

  const platformIcons: Record<PlatformType, { name: string; tag: string }> = {
    instagram: { name: 'Instagram', tag: 'bg-pink-50 text-pink-700 border-pink-200' },
    tiktok: { name: 'TikTok', tag: 'bg-slate-100 text-slate-800 border-slate-300' },
    facebook: { name: 'Facebook', tag: 'bg-blue-50 text-blue-700 border-blue-200' },
    youtube: { name: 'YouTube', tag: 'bg-red-50 text-red-700 border-red-200' },
    x: { name: 'X', tag: 'bg-slate-100 text-slate-700 border-slate-200' },
  };

  return (
    <div className="space-y-6 pb-16">
      {/* 01–12 Month Tabs Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-[11px] font-semibold text-indigo-600 uppercase tracking-wider mb-0.5">
              📅 หน้าลงข้อมูล (Data Input Sheets)
            </div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <span>แผ่นงานรายเดือน 01–12 (Monthly Content Plan)</span>
              <span className="text-xs font-mono font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                เดือน {selectedMonth}
              </span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              กรอกข้อมูลเพียงครั้งเดียว ระบบจะคำนวณและ Auto-Sync ไปยัง Smart Calendar, Feed Review และ Finance & ROI ทันที
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenSyncMetrics}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors cursor-pointer"
              title="ดึงสถิติยอดวิว/ยอดเอ็นเกจเข้าชีทด้วย AI หรือไฟล์ CSV"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>ดึงสถิติโพสต์ (Sync Metrics)</span>
            </button>

            <button
              onClick={() => onExportCsv(selectedMonth)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              title="Download CSV for Excel or Google Sheets"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={onOpenAiStudio}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Content Studio</span>
            </button>
          </div>
        </div>

        {/* 12 Month Segmented Buttons */}
        <div className="grid grid-cols-6 sm:grid-cols-12 gap-1.5 pt-2 border-t border-slate-100">
          {months.map(m => {
            const countForMonth = posts.filter(p => p.month === m.id).length;
            const isSelected = selectedMonth === m.id;

            return (
              <button
                key={m.id}
                onClick={() => setSelectedMonth(m.id)}
                className={`py-2 px-1 text-center rounded-lg transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 text-white font-bold shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-600'
                }`}
              >
                <div className="text-[11px] font-mono leading-none">{m.label.split(' ')[0]}</div>
                <div className={`text-[10px] mt-1 font-mono tabular-nums leading-none ${
                  isSelected ? 'text-indigo-200' : 'text-slate-400'
                }`}>
                  {countForMonth}p
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-3 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2 flex-1 min-w-[300px]">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ค้นหาชื่อโพสต์, Hook, แฮชแท็ก..."
              className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-xs"
            />
          </div>

          {/* Platform Filter */}
          <select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 cursor-pointer"
          >
            <option value="all">ทุกแพลตฟอร์ม (All)</option>
            <option value="instagram">Instagram</option>
            <option value="tiktok">TikTok</option>
            <option value="facebook">Facebook</option>
            <option value="youtube">YouTube</option>
            <option value="x">X</option>
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 cursor-pointer"
          >
            <option value="all">ทุกสถานะ (All Status)</option>
            <option value="idea">💡 Idea</option>
            <option value="scripting">✍️ Scripting</option>
            <option value="review">👀 In Review</option>
            <option value="scheduled">🗓️ Scheduled</option>
            <option value="published">✅ Published</option>
          </select>

          {/* Pillar Filter */}
          <select
            value={selectedPillar}
            onChange={(e) => setSelectedPillar(e.target.value)}
            className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 cursor-pointer max-w-[180px] truncate"
          >
            <option value="all">ทุกเสาหลัก (All Pillars)</option>
            {brandIdentity.pillars.map((pil, idx) => (
              <option key={idx} value={pil}>{pil}</option>
            ))}
          </select>
        </div>

        <div className="text-[11px] text-slate-500 font-mono tabular-nums">
          แสดง {filteredPosts.length} จาก {monthStats.totalPosts} โพสต์ในเดือนนี้
        </div>
      </div>

      {/* Quick Add Row */}
      <form onSubmit={handleQuickAdd} className="bg-slate-100/70 p-2.5 rounded-xl border border-slate-200/80 flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-slate-700 pl-1">
          ⚡ เพิ่มด่วน:
        </span>
        <input
          type="text"
          value={quickTitle}
          onChange={(e) => setQuickTitle(e.target.value)}
          placeholder="พิมพ์ชื่อหัวข้อคอนเทนต์ใหม่ (กด Enter หรือคลิกเพิ่ม)..."
          className="flex-1 min-w-[220px] px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        />
        <select
          value={quickPlatform}
          onChange={(e) => setQuickPlatform(e.target.value as PlatformType)}
          className="px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-700"
        >
          <option value="instagram">Instagram</option>
          <option value="tiktok">TikTok</option>
          <option value="facebook">Facebook</option>
          <option value="youtube">YouTube</option>
          <option value="x">X</option>
        </select>
        <select
          value={quickFormat}
          onChange={(e) => setQuickFormat(e.target.value as PostFormat)}
          className="px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-700"
        >
          <option value="reel">Reel / Video</option>
          <option value="carousel">Carousel</option>
          <option value="single">Single Photo</option>
          <option value="story">Story</option>
          <option value="thread">Thread</option>
        </select>
        <button
          type="submit"
          className="px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>เพิ่มโพสต์</span>
        </button>
      </form>

      {/* Spreadsheet Master Table Grid */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            {/* Table Header */}
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-2.5 px-3 w-10 text-center">#</th>
                <th className="py-2.5 px-3 min-w-[130px]">วัน-เวลาลง (Publish Date)</th>
                <th className="py-2.5 px-3 min-w-[95px]">ช่องทาง</th>
                <th className="py-2.5 px-3 min-w-[90px]">รูปแบบ</th>
                <th className="py-2.5 px-3 min-w-[140px]">เสาหลัก (Pillar)</th>
                <th className="py-2.5 px-3 min-w-[280px]">หัวข้อคอนเทนต์ & Hook</th>
                <th className="py-2.5 px-3 min-w-[120px]">สถานะ</th>
                <th className="py-2.5 px-3 min-w-[90px] text-right font-mono">ต้นทุน (฿)</th>
                <th className="py-2.5 px-3 min-w-[90px] text-right font-mono">แอด (฿)</th>
                <th className="py-2.5 px-3 min-w-[95px] text-right font-mono">ยอดขาย (฿)</th>
                <th className="py-2.5 px-3 min-w-[95px] text-right font-mono">กำไรจริง (฿)</th>
                <th className="py-2.5 px-3 min-w-[85px] text-right font-mono">Views</th>
                <th className="py-2.5 px-3 min-w-[110px] text-center">จัดการ</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-slate-100">
              {filteredPosts.length === 0 ? (
                <tr>
                  <td colSpan={13} className="py-12 text-center text-slate-400">
                    <div className="max-w-sm mx-auto space-y-2">
                      <p className="font-medium text-slate-600">ยังไม่มีคอนเทนต์ในเดือน {selectedMonth}</p>
                      <p className="text-xs">พิมพ์ชื่อคอนเทนต์ด้านบนแล้วกด "เพิ่มโพสต์" เพื่อเริ่มต้นวางแผน</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredPosts.map((post, idx) => {
                  const cost = Number(post.productionCost) || 0;
                  const ads = Number(post.adSpend) || 0;
                  const rev = Number(post.salesRevenue) || 0;
                  const netProfit = rev - (cost + ads);
                  const statusInfo = statusColors[post.status] || statusColors.idea;
                  const platformInfo = platformIcons[post.platform] || { name: post.platform, tag: 'bg-slate-100 text-slate-700' };

                  return (
                    <tr 
                      key={post.id}
                      className="hover:bg-slate-50/80 transition-colors group"
                    >
                      {/* Row Index */}
                      <td className="py-2.5 px-3 text-center text-slate-400 font-mono text-[11px]">
                        {idx + 1}
                      </td>

                      {/* Date & Time */}
                      <td className="py-2.5 px-3 font-mono">
                        <div className="flex items-center gap-1.5">
                          <input
                            type="date"
                            value={post.publishDate}
                            onChange={(e) => onUpdatePost(post.id, { publishDate: e.target.value })}
                            className="bg-transparent border-0 p-0 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded text-xs cursor-pointer"
                          />
                          <input
                            type="time"
                            value={post.publishTime}
                            onChange={(e) => onUpdatePost(post.id, { publishTime: e.target.value })}
                            className="bg-transparent border-0 p-0 text-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded text-[11px] w-12 cursor-pointer"
                          />
                        </div>
                      </td>

                      {/* Platform */}
                      <td className="py-2.5 px-3">
                        <select
                          value={post.platform}
                          onChange={(e) => onUpdatePost(post.id, { platform: e.target.value as PlatformType })}
                          className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${platformInfo.tag} focus:outline-none cursor-pointer`}
                        >
                          <option value="instagram">Instagram</option>
                          <option value="tiktok">TikTok</option>
                          <option value="facebook">Facebook</option>
                          <option value="youtube">YouTube</option>
                          <option value="x">X</option>
                        </select>
                      </td>

                      {/* Format */}
                      <td className="py-2.5 px-3">
                        <select
                          value={post.format}
                          onChange={(e) => onUpdatePost(post.id, { format: e.target.value as PostFormat })}
                          className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px] font-medium border border-slate-200 focus:outline-none cursor-pointer"
                        >
                          <option value="reel">Reel/Video</option>
                          <option value="carousel">Carousel</option>
                          <option value="single">Single Photo</option>
                          <option value="story">Story</option>
                          <option value="video">Long Video</option>
                          <option value="thread">Thread</option>
                        </select>
                      </td>

                      {/* Pillar */}
                      <td className="py-2.5 px-3">
                        <select
                          value={post.pillar}
                          onChange={(e) => onUpdatePost(post.id, { pillar: e.target.value })}
                          className="w-full max-w-[130px] bg-slate-50 text-slate-700 px-1.5 py-0.5 rounded text-[11px] truncate border border-slate-200 focus:outline-none cursor-pointer"
                        >
                          {brandIdentity.pillars.map((pil, pIdx) => (
                            <option key={pIdx} value={pil}>{pil}</option>
                          ))}
                        </select>
                      </td>

                      {/* Title & Hook */}
                      <td className="py-2.5 px-3">
                        <div className="space-y-0.5">
                          <input
                            type="text"
                            value={post.title}
                            onChange={(e) => onUpdatePost(post.id, { title: e.target.value })}
                            className="w-full bg-transparent font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded px-1 -mx-1"
                          />
                          {post.hook ? (
                            <div className="text-[11px] text-slate-400 italic truncate px-1">
                              Hook: "{post.hook}"
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => onEditPost(post)}
                              className="text-[10px] text-indigo-500 hover:text-indigo-700 flex items-center gap-1 px-1 cursor-pointer"
                            >
                              <Sparkles className="w-3 h-3" />
                              <span>เขียน Hook ด้วย AI</span>
                            </button>
                          )}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-2.5 px-3">
                        <select
                          value={post.status}
                          onChange={(e) => onUpdatePost(post.id, { status: e.target.value as PostStatus })}
                          className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${statusInfo.bg} ${statusInfo.text} focus:outline-none cursor-pointer`}
                        >
                          <option value="idea">💡 Idea</option>
                          <option value="scripting">✍️ Scripting</option>
                          <option value="review">👀 In Review</option>
                          <option value="scheduled">🗓️ Scheduled</option>
                          <option value="published">✅ Published</option>
                        </select>
                      </td>

                      {/* Production Cost */}
                      <td className="py-2.5 px-3 text-right">
                        <input
                          type="number"
                          value={post.productionCost}
                          onChange={(e) => onUpdatePost(post.id, { productionCost: Number(e.target.value) || 0 })}
                          className="w-16 text-right bg-transparent font-mono tabular-nums text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded px-1"
                        />
                      </td>

                      {/* Ad Spend */}
                      <td className="py-2.5 px-3 text-right">
                        <input
                          type="number"
                          value={post.adSpend}
                          onChange={(e) => onUpdatePost(post.id, { adSpend: Number(e.target.value) || 0 })}
                          className="w-16 text-right bg-transparent font-mono tabular-nums text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded px-1"
                        />
                      </td>

                      {/* Sales Revenue */}
                      <td className="py-2.5 px-3 text-right">
                        <input
                          type="number"
                          value={post.salesRevenue}
                          onChange={(e) => onUpdatePost(post.id, { salesRevenue: Number(e.target.value) || 0 })}
                          className="w-18 text-right bg-transparent font-mono tabular-nums text-emerald-600 font-semibold focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded px-1"
                        />
                      </td>

                      {/* Real Net Profit (Calculated) */}
                      <td className={`py-2.5 px-3 text-right font-mono tabular-nums font-semibold ${
                        netProfit >= 0 ? 'text-slate-900' : 'text-red-600'
                      }`}>
                        {netProfit >= 0 ? '+' : ''}{netProfit.toLocaleString()}
                      </td>

                      {/* Views */}
                      <td className="py-2.5 px-3 text-right">
                        <input
                          type="number"
                          value={post.views}
                          onChange={(e) => onUpdatePost(post.id, { views: Number(e.target.value) || 0 })}
                          className="w-16 text-right bg-transparent font-mono tabular-nums text-slate-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded px-1"
                        />
                      </td>

                      {/* Row Actions */}
                      <td className="py-2.5 px-3 text-center">
                        <div className="flex items-center justify-center gap-1.5 opacity-80 group-hover:opacity-100">
                          <button
                            type="button"
                            onClick={() => onEditPost(post)}
                            className="p-1 text-slate-500 hover:text-indigo-600 rounded hover:bg-slate-100 transition-colors cursor-pointer"
                            title="Edit full content & AI caption"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => onDuplicatePost(post.id)}
                            className="p-1 text-slate-500 hover:text-slate-800 rounded hover:bg-slate-100 transition-colors cursor-pointer"
                            title="Duplicate post"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => onDeletePost(post.id)}
                            className="p-1 text-slate-400 hover:text-red-600 rounded hover:bg-slate-100 transition-colors cursor-pointer"
                            title="Delete post"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>

            {/* Sticky Auto-Sum Formula Footer */}
            <tfoot>
              <tr className="bg-slate-900 text-white font-semibold text-xs border-t-2 border-slate-950 font-mono">
                <td colSpan={7} className="py-3 px-3 text-left">
                  <div className="flex items-center gap-2">
                    <span className="font-sans font-bold">∑ สรุปยอดรวมเดือน {selectedMonth} (Auto-Sum Formula):</span>
                    <span className="text-slate-300 font-mono text-xs">{monthStats.totalPosts} โพสต์</span>
                  </div>
                </td>
                <td className="py-3 px-3 text-right tabular-nums text-slate-300">
                  {monthStats.productionCost.toLocaleString()} ฿
                </td>
                <td className="py-3 px-3 text-right tabular-nums text-slate-300">
                  {monthStats.adSpend.toLocaleString()} ฿
                </td>
                <td className="py-3 px-3 text-right tabular-nums text-emerald-400 font-bold">
                  {monthStats.salesRevenue.toLocaleString()} ฿
                </td>
                <td className={`py-3 px-3 text-right tabular-nums font-bold ${
                  monthStats.netProfit >= 0 ? 'text-white' : 'text-red-400'
                }`}>
                  {monthStats.netProfit >= 0 ? '+' : ''}{monthStats.netProfit.toLocaleString()} ฿
                </td>
                <td className="py-3 px-3 text-right tabular-nums text-slate-300">
                  {monthStats.views.toLocaleString()}
                </td>
                <td className="py-3 px-3 text-center text-slate-400 font-sans text-[11px]">
                  ROI {monthStats.roiPercentage.toFixed(0)}%
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};
