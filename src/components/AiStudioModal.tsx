import React, { useState } from 'react';
import { BrandIdentity, PlatformType, PostFormat } from '../types';
import { 
  Sparkles, 
  X, 
  Copy, 
  Check, 
  ArrowRight, 
  Lightbulb, 
  Layers, 
  Hash, 
  PenTool
} from 'lucide-react';

interface AiStudioModalProps {
  brandIdentity: BrandIdentity;
  selectedMonth: string;
  onClose: () => void;
  onSaveToIdeaBank: (title: string, hook: string, pillar: string, platform: PlatformType, format: PostFormat, notes: string) => void;
  onSchedulePost: (title: string, hook: string, caption: string, hashtags: string[], pillar: string, platform: PlatformType, format: PostFormat) => void;
}

export const AiStudioModal: React.FC<AiStudioModalProps> = ({
  brandIdentity,
  selectedMonth,
  onClose,
  onSaveToIdeaBank,
  onSchedulePost,
}) => {
  const [activeTab, setActiveTab] = useState<'hooks' | 'caption' | 'hashtags'>('hooks');
  const [topic, setTopic] = useState('');
  const [platform, setPlatform] = useState<PlatformType>('instagram');
  const [format, setFormat] = useState<PostFormat>('carousel');
  const [pillar, setPillar] = useState(brandIdentity.pillars[0] || 'Education');
  const [language, setLanguage] = useState<'th' | 'en'>('th');

  const [loading, setLoading] = useState(false);
  const [generatedHooks, setGeneratedHooks] = useState<string[]>([]);
  const [selectedHook, setSelectedHook] = useState('');
  const [generatedCaption, setGeneratedCaption] = useState('');
  const [suggestedTags, setSuggestedTags] = useState<string[]>([]);
  const [hashtagClusters, setHashtagClusters] = useState<{
    mega: string[];
    niche: string[];
    community: string[];
    brand: string[];
  } | null>(null);

  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // 1. Generate Hooks
  const handleGenerateHooks = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/gemini/generate-hook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          platform,
          format,
          pillar,
          tone: brandIdentity.toneOfVoice,
          language
        }),
      });
      const data = await res.json();
      if (Array.isArray(data.hooks)) {
        setGeneratedHooks(data.hooks);
        setSelectedHook(data.hooks[0] || '');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // 2. Generate Caption
  const handleGenerateCaption = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/gemini/generate-caption', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: topic,
          hook: selectedHook,
          pillar,
          platform,
          brandTone: brandIdentity.toneOfVoice,
          language
        }),
      });
      const data = await res.json();
      if (data.caption) {
        setGeneratedCaption(data.caption);
        setSuggestedTags(data.suggestedHashtags || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // 3. Generate Hashtags
  const handleGenerateHashtags = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/gemini/suggest-hashtags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          pillar,
          language
        }),
      });
      const data = await res.json();
      setHashtagClusters(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  const handlePushToIdeaBank = () => {
    onSaveToIdeaBank(
      topic || 'ไอเดียใหม่จาก AI',
      selectedHook,
      pillar,
      platform,
      format,
      generatedCaption ? `ร่างแคปชัน: ${generatedCaption.slice(0, 100)}...` : 'สร้างโดย Gemini AI'
    );
    showToast('บันทึกลง Idea Bank เรียบร้อยแล้ว!');
  };

  const handlePushToMonthlyPlan = () => {
    onSchedulePost(
      topic || 'คอนเทนต์ใหม่จาก AI',
      selectedHook,
      generatedCaption || selectedHook,
      suggestedTags.length > 0 ? suggestedTags : ['#ContentPlanner'],
      pillar,
      platform,
      format
    );
    showToast(`บรรจุเข้าแผนงานเดือน ${selectedMonth} เรียบร้อยแล้ว!`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col">
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                Gemini AI Content Studio
              </h3>
              <p className="text-xs text-slate-500 font-mono">
                Model: gemini-3.8-flash · Powered by Google AI
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

        {/* Modal Body */}
        <div className="p-6 space-y-6 text-xs flex-1">
          {/* Top Form Settings */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3.5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="md:col-span-2">
                <label className="block text-slate-700 font-semibold mb-1">
                  หัวข้อคอนเทนต์ หรือ คอนเซปต์หลัก (Topic / Seed Idea) *
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="เช่น เคล็ดลับจัดระเบียบชีวิตด้วย Master Sheet, เทคนิคเลือกสี..."
                  className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  ภาษาที่ต้องการ
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as 'th' | 'en')}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs"
                >
                  <option value="th">🇹🇭 ภาษาไทย (Thai)</option>
                  <option value="en">🇺🇸 English</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-600 font-medium mb-1">แพลตฟอร์ม</label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value as PlatformType)}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                >
                  <option value="instagram">Instagram</option>
                  <option value="tiktok">TikTok</option>
                  <option value="facebook">Facebook</option>
                  <option value="youtube">YouTube</option>
                  <option value="x">X</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-600 font-medium mb-1">รูปแบบโพสต์</label>
                <select
                  value={format}
                  onChange={(e) => setFormat(e.target.value as PostFormat)}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                >
                  <option value="carousel">Carousel (หลายรูป)</option>
                  <option value="reel">Reel / Video (คลิปสั้น)</option>
                  <option value="single">Single Photo (รูปเดี่ยว)</option>
                  <option value="story">Story</option>
                  <option value="thread">Thread</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-600 font-medium mb-1">เสาหลัก (Pillar)</label>
                <select
                  value={pillar}
                  onChange={(e) => setPillar(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs truncate"
                >
                  {brandIdentity.pillars.map((pil, idx) => (
                    <option key={idx} value={pil}>{pil}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Sub Navigation */}
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
            <button
              onClick={() => setActiveTab('hooks')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'hooks'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <PenTool className="w-3.5 h-3.5" />
              <span>1. Viral Hooks (ท่อนเปิดหัว)</span>
            </button>

            <button
              onClick={() => setActiveTab('caption')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'caption'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>2. Full Caption (แคปชัน & CTA)</span>
            </button>

            <button
              onClick={() => setActiveTab('hashtags')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'hashtags'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Hash className="w-3.5 h-3.5" />
              <span>3. Smart Hashtags</span>
            </button>
          </div>

          {/* 1. HOOKS TAB */}
          {activeTab === 'hooks' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    5 ท่อนเปิดหัวแบบหยุดนิ้วโป้ง (3-Second Scroll Stoppers)
                  </h4>
                  <p className="text-xs text-slate-500">
                    ใช้จิตวิทยาหลากหลายมุมมอง: ความสงสัย, คำเตือน, ข้อเท็จจริงที่ตรงข้าม, How-To, และผลลัพธ์
                  </p>
                </div>

                <button
                  onClick={handleGenerateHooks}
                  disabled={loading || !topic.trim()}
                  className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{loading ? 'กำลังคิด Hook...' : 'สร้าง 5 Viral Hooks'}</span>
                </button>
              </div>

              <div className="space-y-2.5">
                {generatedHooks.length === 0 ? (
                  <div className="py-12 text-center text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                    พิมพ์หัวข้อด้านบน แล้วคลิกปุ่ม "สร้าง 5 Viral Hooks" เพื่อเริ่มต้น
                  </div>
                ) : (
                  generatedHooks.map((hook, i) => (
                    <div
                      key={i}
                      className={`p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                        selectedHook === hook
                          ? 'border-indigo-500 bg-indigo-50/50 shadow-xs'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                      onClick={() => setSelectedHook(hook)}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                          {i + 1}
                        </span>
                        <p className="text-xs font-semibold text-slate-900">
                          "{hook}"
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={(e) => { e.stopPropagation(); handleCopy(hook, i); }}
                          className="p-1.5 text-slate-400 hover:text-slate-700 rounded transition-colors cursor-pointer"
                          title="Copy Hook"
                        >
                          {copiedIndex === i ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* 2. CAPTION TAB */}
          {activeTab === 'caption' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    ร่างแคปชันครบวงจร (High-Converting Copy)
                  </h4>
                  <p className="text-xs text-slate-500">
                    เปิดหัวด้วย Hook ตามด้วยเนื้อหาคุณค่า คั่นย่อหน้าสวยงาม และปิดท้ายด้วย Call-To-Action ชัดเจน
                  </p>
                </div>

                <button
                  onClick={handleGenerateCaption}
                  disabled={loading || !topic.trim()}
                  className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{loading ? 'กำลังเขียนแคปชัน...' : 'เขียนแคปชันด้วย Gemini'}</span>
                </button>
              </div>

              {generatedCaption ? (
                <div className="space-y-3">
                  <div className="relative">
                    <textarea
                      value={generatedCaption}
                      onChange={(e) => setGeneratedCaption(e.target.value)}
                      rows={10}
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-sans text-xs text-slate-800 leading-relaxed focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    />
                    <button
                      onClick={() => handleCopy(generatedCaption, 99)}
                      className="absolute top-3 right-3 p-1.5 bg-white border border-slate-200 rounded-md text-slate-600 hover:text-slate-900 shadow-xs cursor-pointer"
                      title="Copy full caption"
                    >
                      {copiedIndex === 99 ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {suggestedTags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 p-3 bg-slate-50 rounded-lg border border-slate-200">
                      <span className="text-[11px] font-semibold text-slate-500 mr-2">แฮชแท็กที่แนะนำ:</span>
                      {suggestedTags.map((t, idx) => (
                        <span key={idx} className="font-mono text-[11px] text-indigo-600 font-medium">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="py-12 text-center text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                  คลิก "เขียนแคปชันด้วย Gemini" เพื่อสร้างเนื้อหาโพสต์ที่พร้อมนำไปใช้งานจริง
                </div>
              )}
            </div>
          )}

          {/* 3. HASHTAGS TAB */}
          {activeTab === 'hashtags' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    โครงสร้างแฮชแท็ก 4 ระดับ (Hashtag Matrix)
                  </h4>
                  <p className="text-xs text-slate-500">
                    แบ่งเป็นกลุ่ม Mega (&gt;1M), Niche เจาะจง, Community ไทย, และ Brand เพื่อเพิ่มโอกาสค้นหาเจอ
                  </p>
                </div>

                <button
                  onClick={handleGenerateHashtags}
                  disabled={loading || !topic.trim()}
                  className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{loading ? 'กำลังวิเคราะห์...' : 'จัดกลุ่มแฮชแท็ก'}</span>
                </button>
              </div>

              {hashtagClusters ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <span className="text-[11px] font-bold text-red-600 uppercase">🔥 Mega Tier (&gt;1M)</span>
                    <div className="flex flex-wrap gap-1 font-mono text-[11px] text-slate-700">
                      {hashtagClusters.mega?.map((tag, i) => (
                        <span key={i} className="bg-white px-2 py-0.5 rounded border border-slate-200">{tag}</span>
                      ))}
                    </div>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <span className="text-[11px] font-bold text-indigo-600 uppercase">🎯 Niche Tier (50K–500K)</span>
                    <div className="flex flex-wrap gap-1 font-mono text-[11px] text-slate-700">
                      {hashtagClusters.niche?.map((tag, i) => (
                        <span key={i} className="bg-white px-2 py-0.5 rounded border border-slate-200">{tag}</span>
                      ))}
                    </div>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <span className="text-[11px] font-bold text-emerald-600 uppercase">👥 Community Tier</span>
                    <div className="flex flex-wrap gap-1 font-mono text-[11px] text-slate-700">
                      {hashtagClusters.community?.map((tag, i) => (
                        <span key={i} className="bg-white px-2 py-0.5 rounded border border-slate-200">{tag}</span>
                      ))}
                    </div>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <span className="text-[11px] font-bold text-slate-800 uppercase">⭐ Brand & Campaign</span>
                    <div className="flex flex-wrap gap-1 font-mono text-[11px] text-slate-700">
                      {hashtagClusters.brand?.map((tag, i) => (
                        <span key={i} className="bg-white px-2 py-0.5 rounded border border-slate-200">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                  คลิก "จัดกลุ่มแฮชแท็ก" เพื่อดึงชุดแฮชแท็กที่ตรงกับหัวข้อของคุณ
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer Actions: Save to Idea Bank or Push to Plan */}
        <div className="sticky bottom-0 bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          {toastMessage ? (
            <span className="text-xs text-emerald-600 font-medium flex items-center gap-1.5 animate-fade-in">
              <Check className="w-4 h-4" />
              {toastMessage}
            </span>
          ) : (
            <span className="text-[11px] text-slate-500">
              {selectedHook ? `Hook ที่เลือก: "${selectedHook.slice(0, 40)}..."` : 'เลือก Hook เพื่อนำไปลงแผน'}
            </span>
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={handlePushToIdeaBank}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
              <span>บันทึกเข้า Idea Bank</span>
            </button>

            <button
              onClick={handlePushToMonthlyPlan}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer shadow-xs"
            >
              <span>ลงแผนเดือน {selectedMonth} ทันที</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
