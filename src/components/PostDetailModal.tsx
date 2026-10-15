import React, { useState } from 'react';
import { ContentPost, BrandIdentity, PlatformType, PostFormat, PostStatus } from '../types';
import { 
  X, 
  Sparkles, 
  Save, 
  Check, 
  Image as ImageIcon,
  DollarSign,
  TrendingUp,
  Tag
} from 'lucide-react';

interface PostDetailModalProps {
  post: ContentPost;
  brandIdentity: BrandIdentity;
  onClose: () => void;
  onSave: (id: string, partial: Partial<ContentPost>) => void;
}

export const PostDetailModal: React.FC<PostDetailModalProps> = ({
  post,
  brandIdentity,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<ContentPost>(post);
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [aiHookOptions, setAiHookOptions] = useState<string[]>([]);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleGenerateHooks = async () => {
    setIsAiGenerating(true);
    try {
      const res = await fetch('/api/gemini/generate-hook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: formData.title,
          platform: formData.platform,
          format: formData.format,
          pillar: formData.pillar,
          tone: brandIdentity.toneOfVoice,
          language: 'th'
        }),
      });
      const data = await res.json();
      if (Array.isArray(data.hooks)) {
        setAiHookOptions(data.hooks);
      }
    } catch (err) {
      console.error('Failed to generate hooks', err);
    } finally {
      setIsAiGenerating(false);
    }
  };

  const handleGenerateCaption = async () => {
    setIsAiGenerating(true);
    try {
      const res = await fetch('/api/gemini/generate-caption', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          hook: formData.hook,
          pillar: formData.pillar,
          platform: formData.platform,
          brandTone: brandIdentity.toneOfVoice,
          language: 'th'
        }),
      });
      const data = await res.json();
      if (data.caption) {
        setFormData(prev => ({
          ...prev,
          caption: data.caption,
          hashtags: Array.isArray(data.suggestedHashtags) && data.suggestedHashtags.length > 0 
            ? data.suggestedHashtags 
            : prev.hashtags
        }));
      }
    } catch (err) {
      console.error('Failed to generate caption', err);
    } finally {
      setIsAiGenerating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(post.id, formData);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 700);
  };

  const cost = Number(formData.productionCost) || 0;
  const ads = Number(formData.adSpend) || 0;
  const rev = Number(formData.salesRevenue) || 0;
  const profit = rev - (cost + ads);

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white z-10 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold text-indigo-600 uppercase tracking-wider">
              Post Editor & AI Assistant
            </div>
            <h3 className="text-base font-bold text-slate-900 truncate max-w-md">
              {formData.title || 'แก้ไขรายละเอียดคอนเทนต์'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 text-xs">
          {/* Row 1: Title & Pillar */}
          <div className="space-y-4">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                หัวข้อคอนเทนต์ (Content Title) *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 font-medium"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-slate-600 font-medium mb-1">แพลตฟอร์ม</label>
                <select
                  value={formData.platform}
                  onChange={(e) => setFormData({ ...formData, platform: e.target.value as PlatformType })}
                  className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg"
                >
                  <option value="instagram">Instagram</option>
                  <option value="tiktok">TikTok</option>
                  <option value="facebook">Facebook</option>
                  <option value="youtube">YouTube</option>
                  <option value="x">X</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-600 font-medium mb-1">รูปแบบ</label>
                <select
                  value={formData.format}
                  onChange={(e) => setFormData({ ...formData, format: e.target.value as PostFormat })}
                  className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg"
                >
                  <option value="reel">Reel/Video</option>
                  <option value="carousel">Carousel</option>
                  <option value="single">Single Photo</option>
                  <option value="story">Story</option>
                  <option value="video">Long Video</option>
                  <option value="thread">Thread</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-600 font-medium mb-1">สถานะ</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as PostStatus })}
                  className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg font-semibold"
                >
                  <option value="idea">💡 Idea</option>
                  <option value="scripting">✍️ Scripting</option>
                  <option value="review">👀 In Review</option>
                  <option value="scheduled">🗓️ Scheduled</option>
                  <option value="published">✅ Published</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-600 font-medium mb-1">เสาหลัก (Pillar)</label>
                <select
                  value={formData.pillar}
                  onChange={(e) => setFormData({ ...formData, pillar: e.target.value })}
                  className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg truncate"
                >
                  {brandIdentity.pillars.map((pil, idx) => (
                    <option key={idx} value={pil}>{pil}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-600 font-medium mb-1">วันเผยแพร่ (Publish Date)</label>
                <input
                  type="date"
                  value={formData.publishDate}
                  onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-medium mb-1">เวลาเผยแพร่ (Publish Time)</label>
                <input
                  type="time"
                  value={formData.publishTime}
                  onChange={(e) => setFormData({ ...formData, publishTime: e.target.value })}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg font-mono"
                />
              </div>
            </div>
          </div>

          {/* Viral Hook Section with AI */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-slate-800 font-bold flex items-center gap-1.5">
                <span>3-Second Viral Hook (ท่อนเปิดหัวหยุดนิ้วโป้ง)</span>
              </label>

              <button
                type="button"
                onClick={handleGenerateHooks}
                disabled={isAiGenerating}
                className="flex items-center gap-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1 rounded-md transition-colors cursor-pointer disabled:opacity-50"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isAiGenerating ? 'กำลังสร้าง...' : 'สร้าง Hook ด้วย Gemini'}</span>
              </button>
            </div>

            <input
              type="text"
              value={formData.hook}
              onChange={(e) => setFormData({ ...formData, hook: e.target.value })}
              placeholder="ท่อน Hook สั้นๆ ที่ดึงดูดความสนใจใน 3 วินาทีแรก..."
              className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />

            {aiHookOptions.length > 0 && (
              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] text-slate-500 font-medium">
                  คลิกเพื่อเลือก Hook ที่ Gemini คิดให้:
                </span>
                <div className="space-y-1">
                  {aiHookOptions.map((h, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setFormData({ ...formData, hook: h })}
                      className="w-full text-left p-2 bg-white hover:bg-indigo-50/50 border border-slate-200 rounded-lg text-slate-800 transition-colors cursor-pointer flex items-center justify-between"
                    >
                      <span>"{h}"</span>
                      <span className="text-[10px] text-indigo-600 font-medium">ใช้ Hook นี้</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Caption & Hashtags */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-slate-700 font-semibold">
                แคปชันและเนื้อหาโพสต์ (Caption)
              </label>

              <button
                type="button"
                onClick={handleGenerateCaption}
                disabled={isAiGenerating}
                className="flex items-center gap-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1 rounded-md transition-colors cursor-pointer disabled:opacity-50"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isAiGenerating ? 'กำลังเขียน...' : 'ร่างแคปชันด้วย Gemini'}</span>
              </button>
            </div>

            <textarea
              value={formData.caption}
              onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
              rows={6}
              placeholder="เขียนเนื้อหา แคปชัน จุดประสงค์ หรือ Call-To-Action..."
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 leading-relaxed font-sans"
            />

            <div>
              <label className="block text-slate-600 font-medium mb-1">
                แฮชแท็ก (คั่นด้วยจุลภาคหรือเว้นวรรค)
              </label>
              <input
                type="text"
                value={formData.hashtags.join(' ')}
                onChange={(e) => setFormData({
                  ...formData,
                  hashtags: e.target.value.split(/\s+/).filter(Boolean)
                })}
                placeholder="#ContentPlanner #KP01 #การตลาด"
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg font-mono text-[11px]"
              />
            </div>
          </div>

          {/* Media URL for Feed Review */}
          <div>
            <label className="block text-slate-700 font-semibold mb-1 flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5 text-slate-500" />
              <span>ลิงก์รูปภาพปกสำหรับ Feed Review (Media Image URL)</span>
            </label>
            <div className="flex gap-3 items-center">
              <img
                src={formData.mediaUrl || 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=200&q=80'}
                alt="Preview"
                className="w-12 h-12 rounded-lg object-cover border border-slate-200 shrink-0"
                referrerPolicy="no-referrer"
              />
              <input
                type="url"
                value={formData.mediaUrl}
                onChange={(e) => setFormData({ ...formData, mediaUrl: e.target.value })}
                placeholder="https://images.unsplash.com/..."
                className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-xs"
              />
            </div>
          </div>

          {/* Finance & Metrics Section */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              <span>การเงินและผลตอบแทนจริง (Finance & Attribution)</span>
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-slate-600 font-medium mb-1">ต้นทุนผลิต (฿)</label>
                <input
                  type="number"
                  value={formData.productionCost}
                  onChange={(e) => setFormData({ ...formData, productionCost: Number(e.target.value) || 0 })}
                  className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg font-mono tabular-nums"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-medium mb-1">งบยิงแอด (฿)</label>
                <input
                  type="number"
                  value={formData.adSpend}
                  onChange={(e) => setFormData({ ...formData, adSpend: Number(e.target.value) || 0 })}
                  className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg font-mono tabular-nums"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-medium mb-1">ยอดขายที่ได้ (฿)</label>
                <input
                  type="number"
                  value={formData.salesRevenue}
                  onChange={(e) => setFormData({ ...formData, salesRevenue: Number(e.target.value) || 0 })}
                  className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg font-mono tabular-nums text-emerald-600 font-semibold"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-medium mb-1">กำไรจริง (฿)</label>
                <div className={`px-3 py-1.5 rounded-lg font-mono tabular-nums font-bold border ${
                  profit >= 0 ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-red-50 border-red-200 text-red-600'
                }`}>
                  {profit >= 0 ? '+' : ''}{profit.toLocaleString()} ฿
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 pt-2 border-t border-slate-200/80">
              <div>
                <label className="block text-[10px] text-slate-500 mb-0.5">Views</label>
                <input
                  type="number"
                  value={formData.views}
                  onChange={(e) => setFormData({ ...formData, views: Number(e.target.value) || 0 })}
                  className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-right font-mono"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-500 mb-0.5">Likes</label>
                <input
                  type="number"
                  value={formData.likes}
                  onChange={(e) => setFormData({ ...formData, likes: Number(e.target.value) || 0 })}
                  className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-right font-mono"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-500 mb-0.5">Comments</label>
                <input
                  type="number"
                  value={formData.comments}
                  onChange={(e) => setFormData({ ...formData, comments: Number(e.target.value) || 0 })}
                  className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-right font-mono"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-500 mb-0.5">Shares</label>
                <input
                  type="number"
                  value={formData.shares}
                  onChange={(e) => setFormData({ ...formData, shares: Number(e.target.value) || 0 })}
                  className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-right font-mono"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-500 mb-0.5">Saves</label>
                <input
                  type="number"
                  value={formData.saves}
                  onChange={(e) => setFormData({ ...formData, saves: Number(e.target.value) || 0 })}
                  className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-right font-mono"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-500 mb-0.5">Clicks</label>
                <input
                  type="number"
                  value={formData.clicks}
                  onChange={(e) => setFormData({ ...formData, clicks: Number(e.target.value) || 0 })}
                  className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-right font-mono"
                />
              </div>
            </div>
          </div>

          {/* Modal Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            {saveSuccess ? (
              <span className="text-xs text-emerald-600 font-medium flex items-center gap-1.5">
                <Check className="w-4 h-4" />
                บันทึกเรียบร้อย
              </span>
            ) : <div />}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                ยกเลิก
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Save className="w-3.5 h-3.5" />
                <span>บันทึกการเปลี่ยนแปลง</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
