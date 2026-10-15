import React, { useState } from 'react';
import { ActiveNavTab } from '../types';
import { 
  Sparkles, 
  Download, 
  Upload, 
  FileSpreadsheet, 
  RotateCcw,
  Check,
  TrendingUp
} from 'lucide-react';

interface HeaderProps {
  activeTab: ActiveNavTab;
  setActiveTab: (tab: ActiveNavTab) => void;
  selectedMonth: string;
  onOpenAiStudio: () => void;
  onOpenSyncMetrics: () => void;
  onExportJson: () => void;
  onImportJson: (json: string) => void;
  onExportCsv: () => void;
  onResetDemo: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  selectedMonth,
  onOpenAiStudio,
  onOpenSyncMetrics,
  onExportJson,
  onImportJson,
  onExportCsv,
  onResetDemo,
}) => {
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [copyNotice, setCopyNotice] = useState(false);

  const monthNames: Record<string, string> = {
    '01': '01 ม.ค. (Jan)',
    '02': '02 ก.พ. (Feb)',
    '03': '03 มี.ค. (Mar)',
    '04': '04 เม.ย. (Apr)',
    '05': '05 พ.ค. (May)',
    '06': '06 มิ.ย. (Jun)',
    '07': '07 ก.ค. (Jul)',
    '08': '08 ส.ค. (Aug)',
    '09': '09 ก.ย. (Sep)',
    '10': '10 ต.ค. (Oct)',
    '11': '11 พ.ย. (Nov)',
    '12': '12 ธ.ค. (Dec)'
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        onImportJson(content);
        setCopyNotice(true);
        setTimeout(() => setCopyNotice(false), 2000);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-8 px-6 py-3.5 bg-white border-b border-slate-200 shadow-xs">
      {/* Zone 1: Wordmark */}
      <div className="flex items-center gap-3 shrink-0">
        <a 
          href="#home"
          onClick={(e) => { e.preventDefault(); setActiveTab('smart-dashboard'); }}
          className="text-base font-bold tracking-tight text-slate-900 whitespace-nowrap flex items-center gap-2"
        >
          <span className="w-7 h-7 rounded-md bg-slate-900 text-white flex items-center justify-center font-extrabold text-xs tracking-tighter">
            TS
          </span>
          <span>Creator Planner Pro</span>
        </a>
        <span className="text-xs text-slate-500 font-medium tracking-tight hidden sm:inline">
          by Today Style 2100 <span className="text-slate-300">·</span> <span className="font-mono text-slate-400 text-[11px]">Month {selectedMonth}</span>
        </span>
      </div>

      {/* Zone 2: Navigation Links */}
      <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
        <button
          onClick={() => setActiveTab('smart-dashboard')}
          className={`hover:text-slate-900 transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'smart-dashboard' ? 'text-slate-950 font-semibold underline decoration-slate-900 underline-offset-8' : ''
          }`}
        >
          Dashboard
        </button>
        <button
          onClick={() => setActiveTab('monthly-sheet')}
          className={`hover:text-slate-900 transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'monthly-sheet' ? 'text-slate-950 font-semibold underline decoration-slate-900 underline-offset-8' : ''
          }`}
        >
          Content Sheet ({monthNames[selectedMonth]?.split(' ')[0]})
        </button>
        <button
          onClick={() => setActiveTab('smart-calendar')}
          className={`hover:text-slate-900 transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'smart-calendar' ? 'text-slate-950 font-semibold underline decoration-slate-900 underline-offset-8' : ''
          }`}
        >
          Calendar
        </button>
        <button
          onClick={() => setActiveTab('feed-review')}
          className={`hover:text-slate-900 transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'feed-review' ? 'text-slate-950 font-semibold underline decoration-slate-900 underline-offset-8' : ''
          }`}
        >
          Feed Review
        </button>
        <button
          onClick={() => setActiveTab('idea-bank')}
          className={`hover:text-slate-900 transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'idea-bank' ? 'text-slate-950 font-semibold underline decoration-slate-900 underline-offset-8' : ''
          }`}
        >
          Idea Bank
        </button>
        <button
          onClick={() => setActiveTab('finance-roi')}
          className={`hover:text-slate-900 transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'finance-roi' ? 'text-slate-950 font-semibold underline decoration-slate-900 underline-offset-8' : ''
          }`}
        >
          Finance & ROI
        </button>
      </nav>

      {/* Zone 3: Primary Actions */}
      <div className="flex items-center gap-2.5 shrink-0">
        {/* Backup / Export Menu */}
        <div className="relative">
          <button
            onClick={() => setShowExportMenu(!showExportMenu)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors whitespace-nowrap cursor-pointer"
            title="Export and Backup data"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Data & Sync</span>
          </button>

          {showExportMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-lg shadow-lg py-1.5 z-50 text-xs">
              <button
                onClick={() => { onExportCsv(); setShowExportMenu(false); }}
                className="w-full text-left px-3.5 py-2 hover:bg-slate-50 flex items-center gap-2 text-slate-700 cursor-pointer"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                <span>Export CSV (Google Sheets)</span>
              </button>
              <button
                onClick={() => { onExportJson(); setShowExportMenu(false); }}
                className="w-full text-left px-3.5 py-2 hover:bg-slate-50 flex items-center gap-2 text-slate-700 cursor-pointer"
              >
                <Download className="w-4 h-4 text-indigo-600" />
                <span>Backup JSON File</span>
              </button>
              <label className="w-full text-left px-3.5 py-2 hover:bg-slate-50 flex items-center gap-2 text-slate-700 cursor-pointer">
                <Upload className="w-4 h-4 text-amber-600" />
                <span>Restore JSON Backup</span>
                <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
              </label>
              <div className="border-t border-slate-100 my-1"></div>
              <button
                onClick={() => { onResetDemo(); setShowExportMenu(false); }}
                className="w-full text-left px-3.5 py-2 hover:bg-red-50 text-red-600 flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset to Default Demo Data</span>
              </button>
            </div>
          )}
        </div>

        {/* Sync Insights / Analytics Button */}
        <button
          onClick={onOpenSyncMetrics}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-md transition-colors whitespace-nowrap cursor-pointer"
          title="เชื่อมต่อและดึงสถิติยอดวิว/ยอดเอ็นเกจเข้าชีท"
        >
          <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
          <span className="hidden sm:inline">ดึงสถิติ (Sync Metrics)</span>
        </button>

        {/* AI Studio Button */}
        <button
          onClick={onOpenAiStudio}
          className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition-all shadow-xs hover:shadow-sm whitespace-nowrap cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Gemini AI Studio</span>
        </button>

        {copyNotice && (
          <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white text-xs rounded-lg shadow-xl animate-fade-in">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>นำเข้าข้อมูลเรียบร้อยแล้ว</span>
          </div>
        )}
      </div>
    </header>
  );
};
