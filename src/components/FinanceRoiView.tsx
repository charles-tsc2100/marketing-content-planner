import React, { useState } from 'react';
import { BrandIdentity, ContentPost } from '../types';
import { 
  TrendingUp, 
  DollarSign, 
  Sparkles, 
  PieChart, 
  CheckCircle2, 
  AlertTriangle,
  ArrowUpRight,
  Calculator
} from 'lucide-react';

interface FinanceRoiViewProps {
  selectedMonth: string;
  setSelectedMonth: (m: string) => void;
  brandIdentity: BrandIdentity;
  monthStats: any;
  posts: ContentPost[];
  platformBreakdown: Record<string, { count: number; views: number; spend: number; revenue: number; profit: number }>;
  onOpenAiStudio: () => void;
}

export const FinanceRoiView: React.FC<FinanceRoiViewProps> = ({
  selectedMonth,
  setSelectedMonth,
  brandIdentity,
  monthStats,
  posts,
  platformBreakdown,
  onOpenAiStudio,
}) => {
  const [aiReport, setAiReport] = useState<{
    summaryAnalysis: string;
    keyInsights: string[];
    actionSteps: string[];
  } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const monthPosts = posts.filter(p => p.month === selectedMonth);

  // Sort posts by Net Profit
  const rankedPosts = [...monthPosts].sort((a, b) => {
    const profitA = (Number(a.salesRevenue) || 0) - ((Number(a.productionCost) || 0) + (Number(a.adSpend) || 0));
    const profitB = (Number(b.salesRevenue) || 0) - ((Number(b.productionCost) || 0) + (Number(b.adSpend) || 0));
    return profitB - profitA;
  });

  const handleRunAiDiagnostic = async () => {
    setIsAnalyzing(true);
    try {
      const res = await fetch('/api/gemini/analyze-roi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          monthSummary: monthStats,
          brandIdentity: brandIdentity,
        }),
      });
      const data = await res.json();
      setAiReport(data);
    } catch (err) {
      console.error('Failed to run AI diagnostic', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-semibold text-emerald-600 uppercase tracking-wider mb-0.5 flex items-center gap-1.5">
            <Calculator className="w-3.5 h-3.5" />
            <span>Financial & Real ROI Ledger</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <span>วัดผลลัพธ์กำไรจริง และ ROI (Finance & Return on Investment)</span>
            <span className="text-xs font-mono font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
              เดือน {selectedMonth}
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            คำนวณจากสูตร: กำไรจริง = ยอดขายที่ได้ - (ค่าผลิต + งบยิงแอด) พร้อมคำนวณอัตราผลตอบแทนจากการลงทุน (ROI %)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 cursor-pointer"
          >
            {Array.from({ length: 12 }).map((_, i) => {
              const m = String(i + 1).padStart(2, '0');
              return <option key={m} value={m}>เดือน {m}</option>;
            })}
          </select>

          <button
            onClick={handleRunAiDiagnostic}
            disabled={isAnalyzing}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isAnalyzing ? 'กำลังวิเคราะห์...' : 'วิเคราะห์ ROI ด้วย Gemini AI'}</span>
          </button>
        </div>
      </div>

      {/* Financial Health Scorecard */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Spend */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2">
          <span className="text-xs text-slate-500 font-medium block">
            ต้นทุนคอนเทนต์ทั้งหมด (Total Outflow)
          </span>
          <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
            {monthStats.totalSpend.toLocaleString()} ฿
          </div>
          <div className="text-[11px] text-slate-400 font-mono flex items-center gap-2">
            <span>ผลิต: {monthStats.productionCost.toLocaleString()} ฿</span>
            <span>·</span>
            <span>แอด: {monthStats.adSpend.toLocaleString()} ฿</span>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2">
          <span className="text-xs text-slate-500 font-medium block">
            ยอดขายที่คอนเทนต์สร้างได้ (Sales Inflow)
          </span>
          <div className="text-2xl font-bold text-emerald-600 font-mono tabular-nums">
            {monthStats.salesRevenue.toLocaleString()} ฿
          </div>
          <div className="text-[11px] text-slate-400 font-mono">
            เป้าหมาย: {brandIdentity.monthlyRevenueGoal.toLocaleString()} ฿
          </div>
        </div>

        {/* Real Net Profit */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2">
          <span className="text-xs text-slate-500 font-medium block">
            กำไรสุทธิจริง (Real Net Profit)
          </span>
          <div className={`text-2xl font-bold font-mono tabular-nums ${
            monthStats.netProfit >= 0 ? 'text-slate-900' : 'text-red-600'
          }`}>
            {monthStats.netProfit >= 0 ? '+' : ''}{monthStats.netProfit.toLocaleString()} ฿
          </div>
          <div className="text-[11px] text-slate-500 font-mono">
            Profit Margin: {monthStats.profitMargin.toFixed(1)}%
          </div>
        </div>

        {/* Real ROI */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2">
          <span className="text-xs text-slate-500 font-medium block">
            ผลตอบแทนจากการลงทุน (True ROI %)
          </span>
          <div className={`text-2xl font-bold font-mono tabular-nums ${
            monthStats.roiPercentage >= 0 ? 'text-indigo-600' : 'text-red-500'
          }`}>
            {monthStats.roiPercentage >= 0 ? '+' : ''}{monthStats.roiPercentage.toFixed(0)}%
          </div>
          <div className="text-[11px] text-slate-400 font-mono">
            CPM: {monthStats.cpm.toFixed(1)} ฿ · CPE: {monthStats.cpe.toFixed(2)} ฿
          </div>
        </div>
      </div>

      {/* AI Diagnostic Advisor Section (if triggered) */}
      {aiReport && (
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 text-white rounded-2xl p-6 shadow-lg space-y-5 animate-fade-in border border-emerald-500/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white tracking-tight">
                  Gemini Strategic ROI Diagnostic (บทวิเคราะห์ผลตอบแทนจาก AI)
                </h3>
                <p className="text-xs text-emerald-300/80 font-mono">
                  วิเคราะห์โดย gemini-3.8-flash · Real-Time Market Intelligence
                </p>
              </div>
            </div>
          </div>

          <p className="text-sm text-slate-200 leading-relaxed font-medium bg-black/30 p-4 rounded-xl border border-white/5">
            {aiReport.summaryAnalysis}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Key Insights */}
            <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-2">
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                <PieChart className="w-3.5 h-3.5" />
                <span>ข้อสังเกตสำคัญ (Key Insights)</span>
              </span>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {aiReport.keyInsights?.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">·</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Strategic Action Steps */}
            <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-2">
              <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>แผนยกระดับกำไรเดือนหน้า (Action Steps)</span>
              </span>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {aiReport.actionSteps?.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-indigo-400 font-bold">·</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Platform Ledger Table */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900">
          บัญชีรายได้และกำไรแยกตามแพลตฟอร์ม (Platform Financial Breakdown)
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase text-[11px]">
                <th className="py-2.5 px-3">แพลตฟอร์ม</th>
                <th className="py-2.5 px-3 text-center">จำนวนโพสต์</th>
                <th className="py-2.5 px-3 text-right">ยอดวิว</th>
                <th className="py-2.5 px-3 text-right">ค่าใช้จ่าย (฿)</th>
                <th className="py-2.5 px-3 text-right">ยอดขาย (฿)</th>
                <th className="py-2.5 px-3 text-right">กำไรจริง (฿)</th>
                <th className="py-2.5 px-3 text-right">ROI %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {Object.entries(platformBreakdown).map(([platform, data]) => {
                const roi = data.spend > 0 ? (data.profit / data.spend) * 100 : 0;
                return (
                  <tr key={platform} className="hover:bg-slate-50 font-mono">
                    <td className="py-2.5 px-3 font-sans font-bold capitalize text-slate-900">
                      {platform}
                    </td>
                    <td className="py-2.5 px-3 text-center tabular-nums text-slate-600">
                      {data.count}
                    </td>
                    <td className="py-2.5 px-3 text-right tabular-nums text-slate-600">
                      {data.views.toLocaleString()}
                    </td>
                    <td className="py-2.5 px-3 text-right tabular-nums text-slate-600">
                      {data.spend.toLocaleString()} ฿
                    </td>
                    <td className="py-2.5 px-3 text-right tabular-nums text-emerald-600 font-semibold">
                      {data.revenue.toLocaleString()} ฿
                    </td>
                    <td className={`py-2.5 px-3 text-right tabular-nums font-bold ${
                      data.profit >= 0 ? 'text-slate-900' : 'text-red-600'
                    }`}>
                      {data.profit >= 0 ? '+' : ''}{data.profit.toLocaleString()} ฿
                    </td>
                    <td className={`py-2.5 px-3 text-right tabular-nums font-bold ${
                      roi >= 0 ? 'text-indigo-600' : 'text-red-500'
                    }`}>
                      {roi >= 0 ? '+' : ''}{roi.toFixed(0)}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ranked Post-by-Post Profitability */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900">
          จัดอันดับคอนเทนต์ที่ทำกำไรสูงสุดในเดือนนี้ (Post Profitability Ranking)
        </h3>

        <div className="space-y-2 text-xs">
          {rankedPosts.map((post, rank) => {
            const cost = (Number(post.productionCost) || 0) + (Number(post.adSpend) || 0);
            const rev = Number(post.salesRevenue) || 0;
            const profit = rev - cost;
            const roi = cost > 0 ? (profit / cost) * 100 : 0;

            return (
              <div 
                key={post.id}
                className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:border-slate-200 bg-slate-50/50"
              >
                <div className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-md font-mono text-xs font-bold flex items-center justify-center ${
                    rank === 0 ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 text-slate-700'
                  }`}>
                    #{rank + 1}
                  </span>
                  <div>
                    <h5 className="font-semibold text-slate-900 line-clamp-1">{post.title}</h5>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {post.platform} · {post.format} · {post.publishDate}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-6 font-mono tabular-nums text-right">
                  <div>
                    <span className="text-[10px] text-slate-400 block">ต้นทุน</span>
                    <span className="text-slate-600">{cost.toLocaleString()} ฿</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">ยอดขาย</span>
                    <span className="text-emerald-600 font-semibold">{rev.toLocaleString()} ฿</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">กำไรสุทธิ</span>
                    <span className={`font-bold ${profit >= 0 ? 'text-slate-900' : 'text-red-600'}`}>
                      {profit >= 0 ? '+' : ''}{profit.toLocaleString()} ฿
                    </span>
                  </div>
                  <div className="w-16">
                    <span className="text-[10px] text-slate-400 block">ROI</span>
                    <span className={`font-bold ${roi >= 0 ? 'text-indigo-600' : 'text-red-500'}`}>
                      {roi >= 0 ? '+' : ''}{roi.toFixed(0)}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
