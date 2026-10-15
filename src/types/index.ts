export type PlatformType = 'instagram' | 'tiktok' | 'facebook' | 'youtube' | 'x';

export type PostFormat = 'reel' | 'carousel' | 'single' | 'story' | 'video' | 'thread';

export type PostStatus = 'idea' | 'scripting' | 'review' | 'scheduled' | 'published';

export interface ContentPost {
  id: string;
  month: string; // '01' to '12'
  publishDate: string; // YYYY-MM-DD
  publishTime: string; // HH:mm
  platform: PlatformType;
  format: PostFormat;
  pillar: string;
  title: string;
  hook: string;
  caption: string;
  hashtags: string[];
  mediaUrl: string;
  status: PostStatus;
  
  // Finance & Performance Metrics
  productionCost: number;
  adSpend: number;
  salesRevenue: number;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  clicks: number;
}

export interface BrandIdentity {
  name: string;
  handle: string;
  avatarUrl: string;
  bio: string;
  pillars: string[];
  brandColors: string[];
  audiencePersona: string;
  toneOfVoice: string;
  monthlyBudgetGoal: number;
  monthlyRevenueGoal: number;
}

export interface IdeaItem {
  id: string;
  title: string;
  pillar: string;
  format: PostFormat;
  platform: PlatformType;
  notes: string;
  hookVariant: string;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
}

export interface HashtagSet {
  id: string;
  title: string;
  pillar: string;
  category: 'mega' | 'niche' | 'community' | 'brand';
  tags: string[];
}

export type ActiveNavTab = 
  | 'brand-identity'
  | 'smart-dashboard'
  | 'monthly-sheet'
  | 'smart-calendar'
  | 'feed-review'
  | 'idea-bank'
  | 'finance-roi';
