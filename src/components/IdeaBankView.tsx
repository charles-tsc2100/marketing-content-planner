import React, { useState } from 'react';
import { IdeaItem, HashtagSet, BrandIdentity, PlatformType, PostFormat } from '../types';
import { 
  Lightbulb, 
  Hash, 
  Plus, 
  Copy, 
  Trash2, 
  ArrowRight, 
  Sparkles, 
  Check, 
  Filter,
  Bookmark
} from 'lucide-react';

interface IdeaBankViewProps {
  ideas: IdeaItem[];
  hashtagSets: HashtagSet[];
  brandIdentity: BrandIdentity;
  selectedMonth: string;
  onAddIdea: (idea: Omit<IdeaItem, 'id' | 'createdAt'>) => IdeaItem;
  onUpdateIdea: (id: string, partial: Partial<IdeaItem>) => void;
  onDeleteIdea: (id: string) => void;
  onPromoteIdea: (ideaId: string, month: string, date: string) => void;
  onAddHashtagSet: (set: Omit<HashtagSet, 'id'>) => HashtagSet;
  onDeleteHashtagSet: (id: string) => void;
  onOpenAiStudio: () => void;
}

export const IdeaBankView: React.FC<IdeaBankViewProps> = ({
  ideas,
  hashtagSets,
  brandIdentity,
  selectedMonth,
  onAddIdea,
  onUpdateIdea,
  onDeleteIdea,
  onPromoteIdea,
  onAddHashtagSet,
  onDeleteHashtagSet,
  onOpenAiStudio,
}) => {
  const [activeTab, setActiveTab] = useState<'ideas' | 'hashtags'>('ideas');
  const [newTitle, setNewTitle] = useState('');
  const [newPillar, setNewPillar] = useState(brandIdentity.pillars[0] || 'Education');
  const [newFormat, setNewFormat] = useState<PostFormat>('reel');
  const [newPlatform, setNewPlatform] = useState<PlatformType>('instagram');
  const [newNotes, setNewNotes] = useState('');
  const [newHook, setNewHook] = useState('');
  const [newPriority, setNewPriority] = useState<'low' | 'medium' | 'high'>('high');

  const [promoteModalIdeaId, setPromoteModalIdeaId] = useState<string | null>(null);
  const [promoteMonth, setPromoteMonth] = useState<string>(selectedMonth);
  const [promoteDate, setPromoteDate] = useState<string>(`2026-${selectedMonth}-15`);

  const [copiedTagSetId, setCopiedTagSetId] = useState<string | null>(null);
  const [filterPillar, setFilterPillar] = useState<string>('all');
  const [searchIdea, setSearchIdea] = useState<string>('');

  const handleCreateIdea = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    onAddIdea({
      title: newTitle.trim(),
      pillar: newPillar,
      format: newFormat,
      platform: newPlatform,
      notes: newNotes.trim(),
      hookVariant: newHook.trim(),
      priority: newPriority,
    });

    setNewTitle('');
    setNewNotes('');
    setNewHook('');
  };

  const handleCopyTags = (setId: string, tags: string[]) => {
    navigator.clipboard.writeText(tags.join(' '));
    setCopiedTagSetId(setId);
    setTimeout(() => setCopiedTagSetId(null), 2000);
  };

  const handleConfirmPromote = () => {
    if (!promoteModalIdeaId) return;
    onPromoteIdea(promoteModalIdeaId, promoteMonth, promoteDate);
    setPromoteModalIdeaId(null);
  };

  const filteredIdeas = ideas.filter(idea => {
    if (filterPillar !== 'all' && idea.pillar !== filterPillar) return false;
    if (searchIdea.trim()) {
      const q = searchIdea.toLowerCase();
      const matchTitle = idea.title.toLowerCase().includes(q);
      const matchNotes = (idea.notes || '').toLowerCase().includes(q);
      if (!matchTitle && !matchNotes) return false;
    }
    return true;
  });

  const priorityColors = {
    high: 'text-red-700 bg-red-50 border-red-200',
    medium: 'text-amber-700 bg-amber-50 border-amber-200',
    low: 'text-slate-600 bg-slate-100 border-slate-200',
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header & Sub-Tabs */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-semibold text-indigo-600 uppercase tracking-wider mb-0.5 flex items-center gap-1.5">
            <Lightbulb className="w-3.5 h-3.5" />
            <span>Creative Vault</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            คลังไอเดีย & แฮชแท็กกรุ๊ป (Idea Bank & Hashtags)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            จดไอเดียที่แวบขึ้นมาได้ทันที ไม่ให้หล่นหาย พร้อมกด "ส่งเข้าแผนงาน (Promote)" ไปยังเดือนที่ต้องการได้ใน 1 คลิก
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Sub Navigation */}
          <div className="flex items-center p-1 bg-slate-100 rounded-lg text-xs font-medium">
            <button
              onClick={() => setActiveTab('ideas')}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                activeTab === 'ideas' ? 'bg-white text-slate-950 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Idea Bank ({ideas.length})
            </button>
            <button
              onClick={() => setActiveTab('hashtags')}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                activeTab === 'hashtags' ? 'bg-white text-slate-950 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Hashtag Sets ({hashtagSets.length})
            </button>
          </div>

          <button
            onClick={onOpenAiStudio}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Brainstorm ด้วย AI</span>
          </button>
        </div>
      </div>

      {/* TAB 1: IDEA BANK */}
      {activeTab === 'ideas' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Quick Idea Creation Form (4 Cols) */}
          <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <Plus className="w-4 h-4 text-indigo-600" />
              <span>บันทึกไอเดียใหม่ (New Idea)</span>
            </h3>

            <form onSubmit={handleCreateIdea} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  หัวข้อไอเดีย (Concept / Title) *
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="เช่น เปรียบเทียบ 5 ข้อดีของการ..."
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">
                    ช่องทาง
                  </label>
                  <select
                    value={newPlatform}
                    onChange={(e) => setNewPlatform(e.target.value as PlatformType)}
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700"
                  >
                    <option value="instagram">Instagram</option>
                    <option value="tiktok">TikTok</option>
                    <option value="facebook">Facebook</option>
                    <option value="youtube">YouTube</option>
                    <option value="x">X</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">
                    รูปแบบ
                  </label>
                  <select
                    value={newFormat}
                    onChange={(e) => setNewFormat(e.target.value as PostFormat)}
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700"
                  >
                    <option value="reel">Reel/Video</option>
                    <option value="carousel">Carousel</option>
                    <option value="single">Single Photo</option>
                    <option value="story">Story</option>
                    <option value="thread">Thread</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  เสาหลัก (Content Pillar)
                </label>
                <select
                  value={newPillar}
                  onChange={(e) => setNewPillar(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 truncate"
                >
                  {brandIdentity.pillars.map((pil, idx) => (
                    <option key={idx} value={pil}>{pil}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  ท่อน Hook เปิดหัว (ถ้ามี)
                </label>
                <input
                  type="text"
                  value={newHook}
                  onChange={(e) => setNewHook(e.target.value)}
                  placeholder="เช่น อย่าเพิ่งซื้อสิ่งนี้ถ้าคุณยัง..."
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  โน้ตหรือรายละเอียดเพิ่มเติม
                </label>
                <textarea
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  rows={2}
                  placeholder="จุดประสงค์, คีย์เวิร์ด, หรือตัวอย่างภาพที่อยากถ่าย..."
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  ระดับความสำคัญ (Priority)
                </label>
                <select
                  value={newPriority}
                  onChange={(e) => setNewPriority(e.target.value as 'low' | 'medium' | 'high')}
                  className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700"
                >
                  <option value="high">🔥 High (ต้องทำด่วน)</option>
                  <option value="medium">⚡ Medium (ทำเมื่อมีคิวว่าง)</option>
                  <option value="low">🌱 Low (ไอเดียสำรอง)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              >
                บันทึกลง Idea Bank
              </button>
            </form>
          </div>

          {/* Ideas List Grid (8 Cols) */}
          <div className="lg:col-span-8 space-y-4">
            {/* Search and Filters */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200 text-xs">
              <input
                type="text"
                value={searchIdea}
                onChange={(e) => setSearchIdea(e.target.value)}
                placeholder="ค้นหาไอเดีย..."
                className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg min-w-[200px]"
              />

              <select
                value={filterPillar}
                onChange={(e) => setFilterPillar(e.target.value)}
                className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700"
              >
                <option value="all">ทุกเสาหลัก (All Pillars)</option>
                {brandIdentity.pillars.map((p, idx) => (
                  <option key={idx} value={p}>{p}</option>
                ))}
              </select>
            </div>

            {/* Idea Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {filteredIdeas.length === 0 ? (
                <div className="col-span-2 py-16 text-center text-slate-400 bg-white rounded-xl border border-slate-200 text-xs">
                  ยังไม่มีไอเดียที่ตรงกับเงื่อนไข
                </div>
              ) : (
                filteredIdeas.map((idea) => {
                  const priorityClass = priorityColors[idea.priority];

                  return (
                    <div
                      key={idea.id}
                      className="bg-white rounded-xl border border-slate-200 p-4 space-y-3 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${priorityClass}`}>
                            {idea.priority}
                          </span>
                          <span className="text-[11px] font-mono text-slate-400">
                            {idea.platform} · {idea.format}
                          </span>
                        </div>

                        <h4 className="text-sm font-bold text-slate-900 leading-snug">
                          {idea.title}
                        </h4>

                        {idea.hookVariant && (
                          <p className="text-xs text-amber-900 bg-amber-50/70 p-2 rounded border border-amber-100 italic">
                            "{idea.hookVariant}"
                          </p>
                        )}

                        {idea.notes && (
                          <p className="text-xs text-slate-600 line-clamp-2">
                            {idea.notes}
                          </p>
                        )}

                        <div className="text-[11px] text-slate-400 font-mono">
                          Pillar: {idea.pillar}
                        </div>
                      </div>

                      {/* Card Footer Actions */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                        <button
                          onClick={() => onDeleteIdea(idea.id)}
                          className="text-slate-400 hover:text-red-600 p-1 transition-colors cursor-pointer"
                          title="Delete idea"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => setPromoteModalIdeaId(idea.id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors cursor-pointer"
                        >
                          <span>ส่งเข้าแผนงาน (Promote)</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: HASHTAG SETS */}
      {activeTab === 'hashtags' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {hashtagSets.map((set) => {
              const isCopied = copiedTagSetId === set.id;
              const categoryBadge = {
                mega: 'bg-red-50 text-red-700 border-red-200',
                niche: 'bg-indigo-50 text-indigo-700 border-indigo-200',
                community: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                brand: 'bg-slate-100 text-slate-800 border-slate-300',
              }[set.category] || 'bg-slate-100 text-slate-700 border-slate-200';

              return (
                <div
                  key={set.id}
                  className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${categoryBadge}`}>
                        {set.category} tier
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {set.tags.length} แฮชแท็ก
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900">
                      {set.title}
                    </h4>

                    {/* Tags Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {set.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded bg-slate-50 border border-slate-200 text-slate-700 font-mono text-[11px]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <button
                      onClick={() => onDeleteHashtagSet(set.id)}
                      className="text-slate-400 hover:text-red-500 p-1 cursor-pointer"
                      title="Remove set"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => handleCopyTags(set.id, set.tags)}
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                        isCopied
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-900 hover:bg-slate-800 text-white'
                      }`}
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{isCopied ? 'คัดลอกสำเร็จ!' : 'คัดลอกทั้งหมด (Copy)'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Promote to Monthly Plan Modal */}
      {promoteModalIdeaId && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-slate-200">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                ส่งไอเดียเข้าสู่ตารางงาน (Promote to Monthly Plan)
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                เลือกเดือนและวันที่ต้องการบรรจุไอเดียนี้ลงใน Content Sheet และปฏิทิน
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  เลือกเดือน (Target Month):
                </label>
                <select
                  value={promoteMonth}
                  onChange={(e) => {
                    setPromoteMonth(e.target.value);
                    setPromoteDate(`2026-${e.target.value}-15`);
                  }}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                >
                  {Array.from({ length: 12 }).map((_, i) => {
                    const m = String(i + 1).padStart(2, '0');
                    return <option key={m} value={m}>เดือน {m}</option>;
                  })}
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  กำหนดวันที่เผยแพร่ (Publish Date):
                </label>
                <input
                  type="date"
                  value={promoteDate}
                  onChange={(e) => setPromoteDate(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-slate-800"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setPromoteModalIdeaId(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                ยกเลิก
              </button>
              <button
                type="button"
                onClick={handleConfirmPromote}
                className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors cursor-pointer"
              >
                ยืนยันและซิงค์ทันที (Promote Post)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
