import React from 'react';
import { ActiveNavTab, BrandIdentity } from '../types';
import { 
  Settings, 
  LayoutDashboard, 
  FileSpreadsheet, 
  Calendar as CalendarIcon, 
  Grid3X3, 
  Lightbulb, 
  TrendingUp,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  activeTab: ActiveNavTab;
  setActiveTab: (tab: ActiveNavTab) => void;
  selectedMonth: string;
  setSelectedMonth: (month: string) => void;
  brandIdentity: BrandIdentity;
  totalPostsCount: number;
  monthNetProfit: number;
}

export const NavigationSidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  selectedMonth,
  setSelectedMonth,
  brandIdentity,
  totalPostsCount,
  monthNetProfit,
}) => {
  const months = [
    { id: '01', label: '01 ม.ค.', name: 'Jan' },
    { id: '02', label: '02 ก.พ.', name: 'Feb' },
    { id: '03', label: '03 มี.ค.', name: 'Mar' },
    { id: '04', label: '04 เม.ย.', name: 'Apr' },
    { id: '05', label: '05 พ.ค.', name: 'May' },
    { id: '06', label: '06 มิ.ย.', name: 'Jun' },
    { id: '07', label: '07 ก.ค.', name: 'Jul' },
    { id: '08', label: '08 ส.ค.', name: 'Aug' },
    { id: '09', label: '09 ก.ย.', name: 'Sep' },
    { id: '10', label: '10 ต.ค.', name: 'Oct' },
    { id: '11', label: '11 พ.ย.', name: 'Nov' },
    { id: '12', label: '12 ธ.ค.', name: 'Dec' },
  ];

  return (
    <aside className="w-64 shrink-0 bg-white border-r border-slate-200 flex flex-col justify-between h-[calc(100vh-53px)] sticky top-[53px]">
      <div className="p-4 space-y-6 overflow-y-auto">
        {/* Brand Profile Mini Header */}
        <div 
          onClick={() => setActiveTab('brand-identity')}
          className="flex items-center gap-3 p-2.5 rounded-lg border border-slate-100 hover:border-slate-300 hover:bg-slate-50 transition-all cursor-pointer group"
        >
          <img 
            src={brandIdentity.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'} 
            alt={brandIdentity.name}
            className="w-9 h-9 rounded-md object-cover border border-slate-200"
            referrerPolicy="no-referrer"
          />
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-slate-900 truncate group-hover:text-indigo-600 transition-colors">
              {brandIdentity.name}
            </h4>
            <p className="text-[11px] text-slate-500 font-mono truncate">
              {brandIdentity.handle}
            </p>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
        </div>

        {/* Primary Workspace Navigation */}
        <div className="space-y-1">
          <div className="px-2 pb-1.5 text-[11px] font-semibold text-slate-400 tracking-wider uppercase">
            Core Modules
          </div>

          <button
            onClick={() => setActiveTab('smart-dashboard')}
            className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              activeTab === 'smart-dashboard'
                ? 'bg-slate-900 text-white'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <LayoutDashboard className="w-4 h-4" />
              <span>Smart Dashboard</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('monthly-sheet')}
            className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              activeTab === 'monthly-sheet'
                ? 'bg-slate-900 text-white'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <FileSpreadsheet className="w-4 h-4" />
              <span>Monthly Sheet (01–12)</span>
            </div>
            <span className={`text-[10px] font-mono tabular-nums ${
              activeTab === 'monthly-sheet' ? 'text-slate-300' : 'text-slate-500'
            }`}>
              {totalPostsCount} posts
            </span>
          </button>

          <button
            onClick={() => setActiveTab('smart-calendar')}
            className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              activeTab === 'smart-calendar'
                ? 'bg-slate-900 text-white'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <CalendarIcon className="w-4 h-4" />
              <span>Auto-Sync Calendar</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('feed-review')}
            className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              activeTab === 'feed-review'
                ? 'bg-slate-900 text-white'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Grid3X3 className="w-4 h-4" />
              <span>Feed Review (3x3 / Feed)</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('idea-bank')}
            className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              activeTab === 'idea-bank'
                ? 'bg-slate-900 text-white'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Lightbulb className="w-4 h-4" />
              <span>Idea Bank & Hashtags</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('finance-roi')}
            className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              activeTab === 'finance-roi'
                ? 'bg-slate-900 text-white'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <TrendingUp className="w-4 h-4" />
              <span>Finance & Real ROI</span>
            </div>
            <span className={`text-[10px] font-mono tabular-nums ${
              monthNetProfit >= 0 ? 'text-emerald-600' : 'text-red-500'
            }`}>
              {monthNetProfit >= 0 ? '+' : ''}{monthNetProfit.toLocaleString()} ฿
            </span>
          </button>
        </div>

        {/* 12-Month Quick Switcher */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between px-2 text-[11px] font-semibold text-slate-400 tracking-wider uppercase">
            <span>Month Sheets</span>
            <span className="font-mono text-[10px] text-slate-500">2026</span>
          </div>

          <div className="grid grid-cols-3 gap-1.5">
            {months.map(m => (
              <button
                key={m.id}
                onClick={() => {
                  setSelectedMonth(m.id);
                  if (activeTab !== 'monthly-sheet' && activeTab !== 'smart-calendar' && activeTab !== 'feed-review' && activeTab !== 'finance-roi') {
                    setActiveTab('monthly-sheet');
                  }
                }}
                className={`px-2 py-1.5 text-center text-[11px] font-mono font-medium rounded-md transition-all cursor-pointer ${
                  selectedMonth === m.id
                    ? 'bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold'
                    : 'bg-slate-50 hover:bg-slate-100 border border-transparent text-slate-600'
                }`}
              >
                {m.label.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer System Settings */}
      <div className="p-3 border-t border-slate-200 bg-slate-50/70">
        <button
          onClick={() => setActiveTab('brand-identity')}
          className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-md transition-colors cursor-pointer ${
            activeTab === 'brand-identity'
              ? 'bg-slate-900 text-white'
              : 'text-slate-700 hover:bg-white'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>⚙️ Set Up & Brand Identity</span>
        </button>
      </div>
    </aside>
  );
};
