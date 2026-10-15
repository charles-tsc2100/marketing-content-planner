import React from 'react';
import { BrandIdentity, ContentPost } from '../types';
import { 
  TrendingUp, 
  Eye, 
  Calendar, 
  DollarSign, 
  Award, 
  ArrowUpRight,
  Sparkles,
  ArrowRight,
  Clock
} from 'lucide-react';

interface SmartDashboardProps {
  selectedMonth: string;
  setSelectedMonth: (month: string) => void;
  brandIdentity: BrandIdentity;
  monthStats: any;
  yearlyStats: any;
  posts: ContentPost[];
  platformBreakdown: Record<string, { count: number; views: number; spend: number; revenue: number; profit: number }>;
  onNavigateToSheet: () => void;
  onNavigateToCalendar: () => void;
  onNavigateToFeed: () => void;
  onOpenAiStudio: () => void;
}

export const SmartDashboardView: React.FC<SmartDashboardProps> = ({
  selectedMonth,
  setSelectedMonth,
  brandIdentity,
  monthStats,
  yearlyStats,
  posts,
  platformBreakdown,
  onNavigateToSheet,
  onNavigateToCalendar,
  onNavigateToFeed,
  onOpenAiStudio,
}) => {
  const monthNames: Record<string, string> = {
    '01': '01 มกราคม (Jan)',
    '02': '02 กุมภาพันธ์ (Feb)',
    '03': '03 มีนาคม (Mar)',
    '04': '04 เมษายน (Apr)',
    '05': '05 พฤษภาคม (May)',
    '06': '06 มิถุนายน (Jun)',
    '07': '07 กรกฎาคม (Jul)',
    '08': '08 สิงหาคม (Aug)',
    '09': '09 กันยายน (Sep)',
    '10': '10 ตุลาคม (Oct)',
    '11': '11 พฤศจิกายน (Nov)',
    '12': '12 ธันวาคม (Dec)'
  };

  const currentMonthPosts = posts.filter(p => p.month === selectedMonth);
  const scheduledUpcoming = currentMonthPosts
    .filter(p => ['scheduled', 'review'].includes(p.status))
    .slice(0, 5);

  const budgetUsagePercent = brandIdentity.monthlyBudgetGoal > 0 
    ? Math.min(100, Math.round((monthStats.totalSpend / brandIdentity.monthlyBudgetGoal) * 100))
    : 0;

  const revenueGoalPercent = brandIdentity.monthlyRevenueGoal > 0
    ? Math.min(100, Math.round((monthStats.salesRevenue / brandIdentity.monthlyRevenueGoal) * 100))
    : 0;

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      {/* Top Banner & Month Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1">
            <span>Smart Dashboard · Month {selectedMonth}</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2.5">
            <span>ภาพรวมประสิทธิภาพและการเติบโต</span>
            <span className="text-xs px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 font-mono font-normal">
              {monthNames[selectedMonth]}
            </span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            ข้อมูลอัปเดตแบบ Auto-Sync จากหน้าลงข้อมูล (Monthly Sheet 01–12) คำนวณกำไรจริงและสถิติให้ทันที
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Month Selector */}
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-3 py-1.5 text-xs font-medium bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer"
          >
            {Object.entries(monthNames).map(([id, label]) => (
              <option key={id} value={id}>เดือน {label}</option>
            ))}
          </select>

          <button
            onClick={onOpenAiStudio}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Content Assistant</span>
          </button>
        </div>
      </div>

      {/* Primary KPI Metric Cards (Tabular Numbers) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {/* Metric 1: Total Posts */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-medium">โพสต์ทั้งหมด</span>
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="text-xl font-bold text-slate-900 font-mono tabular-nums">
            {monthStats.totalPosts}
          </div>
          <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
            <span>ลงแล้ว {monthStats.publishedCount}</span>
            <span>·</span>
            <span>รอลง {monthStats.scheduledCount}</span>
          </div>
        </div>

        {/* Metric 2: Total Reach / Views */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-medium">ยอดวิวรวม (Views)</span>
            <Eye className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="text-xl font-bold text-slate-900 font-mono tabular-nums">
            {monthStats.views.toLocaleString()}
          </div>
          <div className="text-[11px] text-indigo-600 mt-1 font-mono">
            Engage {monthStats.engagementRate.toFixed(1)}%
          </div>
        </div>

        {/* Metric 3: Total Spend */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-medium">ต้นทุน + ยิงแอด</span>
            <DollarSign className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="text-xl font-bold text-slate-900 font-mono tabular-nums">
            {monthStats.totalSpend.toLocaleString()} ฿
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            แอด {monthStats.adSpend.toLocaleString()} ฿
          </div>
        </div>

        {/* Metric 4: Revenue */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-medium">ยอดขายคอนเทนต์</span>
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <div className="text-xl font-bold text-emerald-600 font-mono tabular-nums">
            {monthStats.salesRevenue.toLocaleString()} ฿
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            เป้า {brandIdentity.monthlyRevenueGoal.toLocaleString()} ฿
          </div>
        </div>

        {/* Metric 5: Real Net Profit */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-medium">กำไรสุทธิจริง</span>
            <Award className="w-3.5 h-3.5 text-indigo-600" />
          </div>
          <div className={`text-xl font-bold font-mono tabular-nums ${
            monthStats.netProfit >= 0 ? 'text-slate-900' : 'text-red-600'
          }`}>
            {monthStats.netProfit >= 0 ? '+' : ''}{monthStats.netProfit.toLocaleString()} ฿
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Margin {monthStats.profitMargin.toFixed(1)}%
          </div>
        </div>

        {/* Metric 6: Real ROI */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-medium">True Content ROI</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-indigo-600" />
          </div>
          <div className={`text-xl font-bold font-mono tabular-nums ${
            monthStats.roiPercentage >= 0 ? 'text-indigo-600' : 'text-red-500'
          }`}>
            {monthStats.roiPercentage >= 0 ? '+' : ''}{monthStats.roiPercentage.toFixed(0)}%
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            ผลตอบแทนสุทธิ
          </div>
        </div>
      </div>

      {/* Target Progress Bars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Spend Budget vs Target */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-800">งบประมาณที่ใช้ไป (Spend vs Budget Goal)</span>
            <span className="font-mono tabular-nums text-slate-600">
              {monthStats.totalSpend.toLocaleString()} / {brandIdentity.monthlyBudgetGoal.toLocaleString()} ฿ ({budgetUsagePercent}%)
            </span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${
                budgetUsagePercent > 90 ? 'bg-amber-500' : 'bg-slate-900'
              }`}
              style={{ width: `${Math.min(100, budgetUsagePercent)}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-400">
            {brandIdentity.monthlyBudgetGoal - monthStats.totalSpend >= 0
              ? `เหลืองบประมาณอีก ${(brandIdentity.monthlyBudgetGoal - monthStats.totalSpend).toLocaleString()} ฿`
              : `ใช้งบเกินเป้าหมาย ${Math.abs(brandIdentity.monthlyBudgetGoal - monthStats.totalSpend).toLocaleString()} ฿`}
          </p>
        </div>

        {/* Revenue Target Progress */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-800">เป้ายอดขายประจำเดือน (Revenue Target)</span>
            <span className="font-mono tabular-nums text-emerald-600 font-semibold">
              {monthStats.salesRevenue.toLocaleString()} / {brandIdentity.monthlyRevenueGoal.toLocaleString()} ฿ ({revenueGoalPercent}%)
            </span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
            <div 
              className="h-full rounded-full bg-emerald-500 transition-all duration-500"
              style={{ width: `${Math.min(100, revenueGoalPercent)}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-400">
            {brandIdentity.monthlyRevenueGoal - monthStats.salesRevenue <= 0
              ? '🎉 บรรลุเป้าหมายยอดขายประจำเดือนแล้ว!'
              : `ต้องการอีก ${(brandIdentity.monthlyRevenueGoal - monthStats.salesRevenue).toLocaleString()} ฿ เพื่อแตะเป้าหมาย`}
          </p>
        </div>
      </div>

      {/* Middle Section: Platform Breakdown & Upcoming Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Platform Breakdown (2 Cols) */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">
              ประสิทธิภาพแยกตามช่องทาง (Platform Breakdown)
            </h3>
            <button
              onClick={onNavigateToFeed}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1 cursor-pointer"
            >
              <span>ดู Feed Review</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {Object.entries(platformBreakdown).map(([platform, data]) => {
              const platformLabels: Record<string, { label: string; color: string }> = {
                instagram: { label: 'Instagram', color: 'border-pink-200 bg-pink-50/50 text-pink-700' },
                tiktok: { label: 'TikTok', color: 'border-slate-300 bg-slate-50 text-slate-900' },
                facebook: { label: 'Facebook', color: 'border-blue-200 bg-blue-50/50 text-blue-700' },
                youtube: { label: 'YouTube', color: 'border-red-200 bg-red-50/50 text-red-700' },
                x: { label: 'X (Twitter)', color: 'border-slate-200 bg-slate-50 text-slate-800' },
              };
              const meta = platformLabels[platform] || { label: platform, color: 'border-slate-200 bg-slate-50 text-slate-800' };

              return (
                <div key={platform} className="p-3.5 rounded-lg border border-slate-100 bg-slate-50/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{meta.label}</span>
                    <span className="text-[11px] font-mono text-slate-500 tabular-nums">{data.count} โพสต์</span>
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between text-slate-500">
                      <span>ยอดวิว:</span>
                      <span className="font-mono tabular-nums text-slate-900 font-medium">{data.views.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>ค่าใช้จ่าย:</span>
                      <span className="font-mono tabular-nums text-slate-900">{data.spend.toLocaleString()} ฿</span>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>ยอดขาย:</span>
                      <span className="font-mono tabular-nums text-emerald-600 font-semibold">{data.revenue.toLocaleString()} ฿</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Posts in Pipeline (1 Col) */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-600" />
              <span>รอการเผยแพร่ (Upcoming)</span>
            </h3>
            <button
              onClick={onNavigateToCalendar}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-medium cursor-pointer"
            >
              ดูปฏิทิน
            </button>
          </div>

          <div className="space-y-2.5">
            {scheduledUpcoming.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-400">
                ไม่มีโพสต์ที่รอเผยแพร่ในเดือนนี้
              </div>
            ) : (
              scheduledUpcoming.map(p => (
                <div 
                  key={p.id}
                  onClick={onNavigateToSheet}
                  className="p-2.5 rounded-lg border border-slate-100 hover:border-slate-300 hover:bg-slate-50 transition-all cursor-pointer space-y-1"
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-mono text-indigo-600 font-semibold">{p.publishDate} · {p.publishTime}</span>
                    <span className="uppercase text-[10px] font-bold text-slate-500">{p.platform}</span>
                  </div>
                  <p className="text-xs font-medium text-slate-900 truncate">
                    {p.title}
                  </p>
                </div>
              ))
            )}
          </div>

          <button
            onClick={onNavigateToSheet}
            className="w-full py-2 text-center text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            เปิดหน้าลงข้อมูล (Go to Monthly Sheet)
          </button>
        </div>
      </div>

      {/* Year-to-Date Annual Summary Banner */}
      <div className="bg-slate-900 text-white rounded-xl p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="text-[11px] font-mono text-indigo-300 uppercase tracking-wider block mb-1">
            2026 Year-to-Date Performance
          </span>
          <h3 className="text-lg font-bold tracking-tight">
            สรุปภาพรวมสะสมทั้งปี (All 12 Months Rolled Up)
          </h3>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            ระบบคำนวณยอดสะสมจากหน้าลงข้อมูลทั้ง 12 เดือนโดยอัตโนมัติ เพื่อให้เห็นแนวโน้มการเติบโตและผลตอบแทนในระดับปี
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full md:w-auto">
          <div className="p-3 bg-slate-800/80 rounded-lg border border-slate-700">
            <span className="text-[11px] text-slate-400 block">โพสต์ทั้งหมด</span>
            <span className="text-base font-bold font-mono tabular-nums text-white">
              {yearlyStats.totalPosts}
            </span>
          </div>

          <div className="p-3 bg-slate-800/80 rounded-lg border border-slate-700">
            <span className="text-[11px] text-slate-400 block">ยอดวิวสะสม</span>
            <span className="text-base font-bold font-mono tabular-nums text-white">
              {yearlyStats.views.toLocaleString()}
            </span>
          </div>

          <div className="p-3 bg-slate-800/80 rounded-lg border border-slate-700">
            <span className="text-[11px] text-slate-400 block">ยอดขายสะสม</span>
            <span className="text-base font-bold font-mono tabular-nums text-emerald-400">
              {yearlyStats.salesRevenue.toLocaleString()} ฿
            </span>
          </div>

          <div className="p-3 bg-slate-800/80 rounded-lg border border-slate-700">
            <span className="text-[11px] text-slate-400 block">กำไรสะสม</span>
            <span className="text-base font-bold font-mono tabular-nums text-white">
              {yearlyStats.netProfit >= 0 ? '+' : ''}{yearlyStats.netProfit.toLocaleString()} ฿
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
