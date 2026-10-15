import React, { useState } from 'react';
import { ContentPost, BrandIdentity, PlatformType } from '../types';
import { 
  Grid3X3, 
  Smartphone, 
  Layers, 
  Heart, 
  MessageCircle, 
  Bookmark, 
  Share2, 
  Music2, 
  Sparkles,
  Play,
  Copy
} from 'lucide-react';

interface FeedReviewViewProps {
  selectedMonth: string;
  setSelectedMonth: (m: string) => void;
  brandIdentity: BrandIdentity;
  posts: ContentPost[];
  onEditPost: (post: ContentPost) => void;
  onOpenAiStudio: () => void;
}

export const FeedReviewView: React.FC<FeedReviewViewProps> = ({
  selectedMonth,
  setSelectedMonth,
  brandIdentity,
  posts,
  onEditPost,
  onOpenAiStudio,
}) => {
  const [activePlatformView, setActivePlatformView] = useState<PlatformType>('instagram');
  const [selectedPreviewPost, setSelectedPreviewPost] = useState<ContentPost | null>(null);
  const [copiedCaption, setCopiedCaption] = useState(false);

  const monthPosts = posts.filter(p => p.month === selectedMonth);
  const platformPosts = monthPosts.filter(p => p.platform === activePlatformView);

  const handleCopyCaption = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCaption(true);
    setTimeout(() => setCopiedCaption(false), 2000);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Top Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-semibold text-indigo-600 uppercase tracking-wider mb-0.5 flex items-center gap-1.5">
            <Grid3X3 className="w-3.5 h-3.5" />
            <span>Feed Review & Visual Aesthetic</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            จำลอง Feed & ตรวจสอบความคุมโทน (Feed Simulator)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            ตรวจเช็คภาพรวมของตารางโพสต์ 3x3 และคลิปสั้นก่อนเผยแพร่จริง เพื่อให้ Mood & Tone ของแบรนด์สอดคล้องกันทุกมิติ
          </p>
        </div>

        {/* Platform Selector Tabs */}
        <div className="flex items-center gap-2">
          <div className="flex items-center p-1 bg-slate-100 rounded-lg text-xs font-medium">
            <button
              onClick={() => setActivePlatformView('instagram')}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                activePlatformView === 'instagram' ? 'bg-white text-slate-950 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Instagram 3x3 Grid
            </button>
            <button
              onClick={() => setActivePlatformView('tiktok')}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                activePlatformView === 'tiktok' ? 'bg-white text-slate-950 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              TikTok / Reels (9:16)
            </button>
            <button
              onClick={() => setActivePlatformView('facebook')}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                activePlatformView === 'facebook' ? 'bg-white text-slate-950 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Facebook
            </button>
            <button
              onClick={() => setActivePlatformView('x')}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                activePlatformView === 'x' ? 'bg-white text-slate-950 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              X Stream
            </button>
          </div>

          <button
            onClick={onOpenAiStudio}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Studio</span>
          </button>
        </div>
      </div>

      {/* Main Preview Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Mockup Frame (7 Cols) */}
        <div className="lg:col-span-7 flex justify-center">
          {/* 1. INSTAGRAM 3x3 GRID SIMULATOR */}
          {activePlatformView === 'instagram' && (
            <div className="w-full max-w-md bg-white rounded-2xl border border-slate-300 shadow-md overflow-hidden">
              {/* Phone Header Mockup */}
              <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
                <span className="font-bold text-sm tracking-tight text-slate-900">
                  {brandIdentity.handle || '@brand'}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Month {selectedMonth}
                </span>
              </div>

              {/* Instagram Profile Header */}
              <div className="p-5 border-b border-slate-100 space-y-4">
                <div className="flex items-center gap-6">
                  <img
                    src={brandIdentity.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                    alt="Profile"
                    className="w-18 h-18 rounded-full object-cover border-2 border-slate-200 p-0.5 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 flex justify-around text-center text-xs">
                    <div>
                      <div className="font-bold font-mono text-sm text-slate-900">{platformPosts.length}</div>
                      <div className="text-slate-400 text-[11px]">Posts</div>
                    </div>
                    <div>
                      <div className="font-bold font-mono text-sm text-slate-900">24.8K</div>
                      <div className="text-slate-400 text-[11px]">Followers</div>
                    </div>
                    <div>
                      <div className="font-bold font-mono text-sm text-slate-900">412</div>
                      <div className="text-slate-400 text-[11px]">Following</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-xs font-bold text-slate-900">{brandIdentity.name}</div>
                  <p className="text-xs text-slate-600 whitespace-pre-line leading-relaxed">
                    {brandIdentity.bio}
                  </p>
                </div>
              </div>

              {/* 3x3 Feed Grid */}
              <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1">
                {platformPosts.length === 0 ? (
                  <div className="col-span-3 py-16 text-center text-xs text-slate-400 bg-white">
                    ยังไม่มีโพสต์ Instagram ในเดือน {selectedMonth}
                  </div>
                ) : (
                  platformPosts.map((post, idx) => (
                    <div
                      key={post.id}
                      onClick={() => setSelectedPreviewPost(post)}
                      className="relative aspect-square bg-slate-200 group cursor-pointer overflow-hidden"
                    >
                      <img
                        src={post.mediaUrl || 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=400&q=80'}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />

                      {/* Format Badge Indicator */}
                      <div className="absolute top-1.5 right-1.5 text-white/90 drop-shadow-md">
                        {post.format === 'carousel' && <Layers className="w-3.5 h-3.5" />}
                        {post.format === 'reel' && <Play className="w-3.5 h-3.5 fill-current" />}
                      </div>

                      {/* Hover Overlay with Stats */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5 text-white text-xs">
                        <div className="flex items-center gap-1 font-mono text-[11px]">
                          <Heart className="w-3 h-3 fill-white" />
                          <span>{post.likes.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1 font-mono text-[11px]">
                          <MessageCircle className="w-3 h-3 fill-white" />
                          <span>{post.comments}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* 2. TIKTOK / REELS VERTICAL FEED (9:16) */}
          {activePlatformView === 'tiktok' && (
            <div className="w-full max-w-sm aspect-[9/16] bg-slate-950 rounded-3xl border-4 border-slate-800 shadow-2xl relative overflow-hidden flex flex-col justify-between text-white p-5">
              {/* Top Controls */}
              <div className="flex items-center justify-between text-xs text-white/80 z-10">
                <span className="font-bold">Following | For You</span>
                <span className="text-[11px] font-mono">9:16 Preview</span>
              </div>

              {/* Background Media */}
              {platformPosts[0] ? (
                <img
                  src={platformPosts[0].mediaUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80'}
                  alt="TikTok frame"
                  className="absolute inset-0 w-full h-full object-cover opacity-80"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-xs text-slate-500">
                  ไม่มีคลิป TikTok ในเดือนนี้
                </div>
              )}

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90 pointer-events-none" />

              {/* Right Action Icons (TikTok Style) */}
              <div className="absolute right-3 bottom-20 flex flex-col items-center gap-4 z-10 text-white">
                <div className="flex flex-col items-center gap-0.5">
                  <div className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center">
                    <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                  </div>
                  <span className="text-[10px] font-mono font-semibold">
                    {platformPosts[0]?.likes || '7.4K'}
                  </span>
                </div>
                <div className="flex flex-col items-center gap-0.5">
                  <div className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono font-semibold">
                    {platformPosts[0]?.comments || '428'}
                  </span>
                </div>
                <div className="flex flex-col items-center gap-0.5">
                  <div className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center">
                    <Bookmark className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono font-semibold">
                    {platformPosts[0]?.saves || '4.8K'}
                  </span>
                </div>
                <div className="flex flex-col items-center gap-0.5">
                  <div className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center">
                    <Share2 className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono font-semibold">Share</span>
                </div>
              </div>

              {/* Bottom Caption & Audio */}
              <div className="z-10 space-y-2 max-w-[80%]">
                <div className="font-bold text-sm tracking-tight flex items-center gap-1.5">
                  <span>{brandIdentity.handle}</span>
                  <span className="text-[11px] text-white/70 font-normal">· {platformPosts[0]?.publishDate}</span>
                </div>
                <p className="text-xs text-white/90 line-clamp-3 leading-relaxed">
                  {platformPosts[0]?.caption || 'ตัวอย่างแคปชันคลิปสั้น TikTok / Reels พร้อมแฮชแท็ก'}
                </p>
                <div className="flex items-center gap-2 text-[11px] text-white/80 font-mono">
                  <Music2 className="w-3 h-3" />
                  <span className="truncate">Original Sound - KINN Creative Lab 🎵</span>
                </div>
              </div>
            </div>
          )}

          {/* 3. FACEBOOK & X PREVIEWS */}
          {(activePlatformView === 'facebook' || activePlatformView === 'x') && (
            <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src={brandIdentity.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="font-bold text-xs text-slate-900">{brandIdentity.name}</div>
                  <div className="text-[11px] text-slate-400 font-mono">{brandIdentity.handle} · Published</div>
                </div>
              </div>

              <p className="text-xs text-slate-800 leading-relaxed whitespace-pre-line">
                {platformPosts[0]?.caption || 'ตัวอย่างโพสต์ Facebook / X'}
              </p>

              {platformPosts[0]?.mediaUrl && (
                <img
                  src={platformPosts[0].mediaUrl}
                  alt="Media"
                  className="w-full h-52 object-cover rounded-xl border border-slate-100"
                  referrerPolicy="no-referrer"
                />
              )}
            </div>
          )}
        </div>

        {/* Right Side: Post Detail Drawer & Caption Inspector (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900">
              รายละเอียดโพสต์ (Post Inspector)
            </h3>
            {selectedPreviewPost && (
              <button
                onClick={() => onEditPost(selectedPreviewPost)}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-medium cursor-pointer"
              >
                แก้ไขเต็มรูปแบบ
              </button>
            )}
          </div>

          {selectedPreviewPost ? (
            <div className="space-y-4 text-xs">
              <div>
                <span className="text-[11px] text-slate-400 uppercase font-semibold">หัวข้อโพสต์</span>
                <h4 className="text-sm font-bold text-slate-900 mt-0.5">
                  {selectedPreviewPost.title}
                </h4>
              </div>

              {selectedPreviewPost.hook && (
                <div className="p-3 bg-amber-50/60 rounded-lg border border-amber-200/80">
                  <span className="text-[10px] text-amber-700 font-bold uppercase tracking-wider block">
                    ⚡ 3-Second Viral Hook:
                  </span>
                  <p className="text-xs text-amber-950 font-medium italic mt-0.5">
                    "{selectedPreviewPost.hook}"
                  </p>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] text-slate-400 uppercase font-semibold">แคปชันพร้อมลง (Caption)</span>
                  <button
                    onClick={() => handleCopyCaption(selectedPreviewPost.caption)}
                    className="flex items-center gap-1 text-[11px] text-indigo-600 hover:text-indigo-800 cursor-pointer"
                  >
                    <Copy className="w-3 h-3" />
                    <span>{copiedCaption ? 'คัดลอกแล้ว!' : 'คัดลอก'}</span>
                  </button>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 font-sans text-slate-700 leading-relaxed whitespace-pre-line max-h-56 overflow-y-auto">
                  {selectedPreviewPost.caption || 'ยังไม่มีแคปชัน'}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
                <div className="p-2 bg-slate-50 rounded border border-slate-100">
                  <span className="text-[10px] text-slate-400 block">ต้นทุนการผลิต:</span>
                  <span className="font-mono tabular-nums font-semibold text-slate-800">
                    {selectedPreviewPost.productionCost.toLocaleString()} ฿
                  </span>
                </div>
                <div className="p-2 bg-slate-50 rounded border border-slate-100">
                  <span className="text-[10px] text-slate-400 block">งบโฆษณา:</span>
                  <span className="font-mono tabular-nums font-semibold text-slate-800">
                    {selectedPreviewPost.adSpend.toLocaleString()} ฿
                  </span>
                </div>
                <div className="p-2 bg-slate-50 rounded border border-slate-100">
                  <span className="text-[10px] text-slate-400 block">ยอดขายที่ทำได้:</span>
                  <span className="font-mono tabular-nums font-bold text-emerald-600">
                    {selectedPreviewPost.salesRevenue.toLocaleString()} ฿
                  </span>
                </div>
                <div className="p-2 bg-slate-50 rounded border border-slate-100">
                  <span className="text-[10px] text-slate-400 block">ยอดวิว:</span>
                  <span className="font-mono tabular-nums font-semibold text-slate-800">
                    {selectedPreviewPost.views.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-12 text-center text-slate-400 text-xs">
              คลิกที่รูปภาพในช่องตาราง 3x3 ทางซ้าย เพื่อตรวจสอบแคปชันและสถิติ
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
