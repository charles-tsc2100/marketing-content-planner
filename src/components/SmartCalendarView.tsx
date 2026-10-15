import React, { useState } from 'react';
import { ContentPost, PlatformType } from '../types';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Sparkles,
  Calendar as CalendarIcon,
  Clock
} from 'lucide-react';

interface SmartCalendarViewProps {
  selectedMonth: string;
  setSelectedMonth: (m: string) => void;
  posts: ContentPost[];
  onAddPost: (post: Omit<ContentPost, 'id'>) => ContentPost;
  onUpdatePost: (id: string, partial: Partial<ContentPost>) => void;
  onEditPost: (post: ContentPost) => void;
  onOpenAiStudio: () => void;
}

export const SmartCalendarView: React.FC<SmartCalendarViewProps> = ({
  selectedMonth,
  setSelectedMonth,
  posts,
  onAddPost,
  onUpdatePost,
  onEditPost,
  onOpenAiStudio,
}) => {
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const year = 2026;
  const monthNum = parseInt(selectedMonth, 10); // 1-12

  // Month date calculations
  const daysInMonth = new Date(year, monthNum, 0).getDate();
  const firstDayOfWeek = new Date(year, monthNum - 1, 1).getDay(); // 0 is Sunday

  const monthNames: Record<string, string> = {
    '01': 'มกราคม (January)',
    '02': 'กุมภาพันธ์ (February)',
    '03': 'มีนาคม (March)',
    '04': 'เมษายน (April)',
    '05': 'พฤษภาคม (May)',
    '06': 'มิถุนายน (June)',
    '07': 'กรกฎาคม (July)',
    '08': 'สิงหาคม (August)',
    '09': 'กันยายน (September)',
    '10': 'ตุลาคม (October)',
    '11': 'พฤศจิกายน (November)',
    '12': 'ธันวาคม (December)'
  };

  const handlePrevMonth = () => {
    let nextNum = monthNum - 1;
    if (nextNum < 1) nextNum = 12;
    setSelectedMonth(String(nextNum).padStart(2, '0'));
  };

  const handleNextMonth = () => {
    let nextNum = monthNum + 1;
    if (nextNum > 12) nextNum = 1;
    setSelectedMonth(String(nextNum).padStart(2, '0'));
  };

  // Group posts by date
  const postsForCurrentMonth = posts.filter(p => {
    if (p.month !== selectedMonth) return false;
    if (platformFilter !== 'all' && p.platform !== platformFilter) return false;
    return true;
  });

  const postsByDay: Record<number, ContentPost[]> = {};
  for (let d = 1; d <= daysInMonth; d++) {
    postsByDay[d] = [];
  }

  postsForCurrentMonth.forEach(p => {
    const parts = p.publishDate.split('-');
    if (parts.length === 3) {
      const day = parseInt(parts[2], 10);
      if (postsByDay[day]) {
        postsByDay[day].push(p);
      }
    }
  });

  const platformColors: Record<PlatformType, { bg: string; text: string; border: string }> = {
    instagram: { bg: 'bg-pink-50', text: 'text-pink-700', border: 'border-pink-200' },
    tiktok: { bg: 'bg-slate-100', text: 'text-slate-900', border: 'border-slate-300' },
    facebook: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
    youtube: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
    x: { bg: 'bg-slate-100', text: 'text-slate-800', border: 'border-slate-200' },
  };

  const handleCreatePostOnDay = (day: number) => {
    const dayStr = String(day).padStart(2, '0');
    onAddPost({
      month: selectedMonth,
      publishDate: `${year}-${selectedMonth}-${dayStr}`,
      publishTime: '18:00',
      platform: 'instagram',
      format: 'carousel',
      pillar: 'Edu-tainment (ทริค & ความรู้)',
      title: `คอนเทนต์วันที่ ${day} ${monthNames[selectedMonth]?.split(' ')[0]}`,
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
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Calendar Header Controls */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-semibold text-indigo-600 uppercase tracking-wider mb-0.5 flex items-center gap-1.5">
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>Auto-Sync Smart Calendar</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <span>ปฏิทินวางแผนคอนเทนต์</span>
            <span className="text-sm font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-md">
              {monthNames[selectedMonth]} {year}
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            ปฏิทินจะซิงค์กับหน้าลงข้อมูล 01–12 โดยอัตโนมัติ คลิกที่วันเพื่อเพิ่มโพสต์ หรือคลิกที่การ์ดเพื่อแก้ไข
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Platform Filter */}
          <select
            value={platformFilter}
            onChange={(e) => setPlatformFilter(e.target.value)}
            className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 cursor-pointer"
          >
            <option value="all">ทุกแพลตฟอร์ม (All)</option>
            <option value="instagram">Instagram</option>
            <option value="tiktok">TikTok</option>
            <option value="facebook">Facebook</option>
            <option value="youtube">YouTube</option>
            <option value="x">X</option>
          </select>

          {/* Month Switcher Nav */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              onClick={handlePrevMonth}
              className="p-1 text-slate-600 hover:text-slate-900 hover:bg-white rounded transition-colors cursor-pointer"
              title="Previous Month"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-2 text-xs font-mono font-medium text-slate-800">
              {selectedMonth}
            </span>
            <button
              onClick={handleNextMonth}
              className="p-1 text-slate-600 hover:text-slate-900 hover:bg-white rounded transition-colors cursor-pointer"
              title="Next Month"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={onOpenAiStudio}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Plan</span>
          </button>
        </div>
      </div>

      {/* Monthly Calendar Grid */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Days of Week Header */}
        <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50 text-center text-xs font-bold text-slate-600 py-2.5">
          <div className="text-red-500">อา. (Sun)</div>
          <div>จ. (Mon)</div>
          <div>อ. (Tue)</div>
          <div>พ. (Wed)</div>
          <div>พฤ. (Thu)</div>
          <div>ศ. (Fri)</div>
          <div className="text-indigo-600">ส. (Sat)</div>
        </div>

        {/* Days Cells */}
        <div className="grid grid-cols-7 auto-rows-fr divide-x divide-y divide-slate-100">
          {/* Empty cells before month start */}
          {Array.from({ length: firstDayOfWeek }).map((_, i) => (
            <div key={`empty-${i}`} className="min-h-[120px] bg-slate-50/40 p-2 text-slate-300" />
          ))}

          {/* Actual days */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const dayNum = i + 1;
            const dayPosts = postsByDay[dayNum] || [];
            const isToday = dayNum === new Date().getDate() && selectedMonth === String(new Date().getMonth() + 1).padStart(2, '0');

            return (
              <div 
                key={dayNum} 
                className={`min-h-[125px] p-2 flex flex-col justify-between group transition-colors ${
                  isToday ? 'bg-indigo-50/20' : 'hover:bg-slate-50/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-xs font-mono font-semibold w-6 h-6 rounded-full flex items-center justify-center ${
                      isToday ? 'bg-indigo-600 text-white' : 'text-slate-800'
                    }`}>
                      {dayNum}
                    </span>

                    <button
                      onClick={() => handleCreatePostOnDay(dayNum)}
                      className="opacity-0 group-hover:opacity-100 p-0.5 text-slate-400 hover:text-indigo-600 transition-opacity cursor-pointer"
                      title="Add content on this day"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Day Content Badges */}
                  <div className="space-y-1">
                    {dayPosts.map(p => {
                      const color = platformColors[p.platform] || { bg: 'bg-slate-100', text: 'text-slate-700', border: 'border-slate-200' };

                      return (
                        <div
                          key={p.id}
                          onClick={() => onEditPost(p)}
                          className={`p-1.5 rounded-md border text-[11px] leading-tight cursor-pointer hover:shadow-xs transition-all ${color.bg} ${color.border} ${color.text}`}
                        >
                          <div className="flex items-center justify-between font-mono text-[9px] mb-0.5">
                            <span className="font-bold uppercase">{p.platform}</span>
                            <span className="flex items-center gap-0.5">
                              <Clock className="w-2.5 h-2.5" />
                              {p.publishTime}
                            </span>
                          </div>
                          <p className="font-medium text-slate-900 truncate">
                            {p.title}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {dayPosts.length === 0 && (
                  <div className="text-[10px] text-slate-300 text-center py-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    + วางแผน
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
