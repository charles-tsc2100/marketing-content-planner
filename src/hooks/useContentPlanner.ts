import { useState, useEffect, useMemo, useCallback } from 'react';
import { BrandIdentity, ContentPost, HashtagSet, IdeaItem } from '../types';
import { initialBrandIdentity, initialPosts, initialIdeas, initialHashtagSets } from '../data/initialData';

const STORAGE_KEY = 'todaystyle_creator_planner_v1';

export function useContentPlanner() {
  const [brandIdentity, setBrandIdentity] = useState<BrandIdentity>(() => {
    // If previously saved under old key, clear it
    if (localStorage.getItem('kinn_content_planner_kp01_v1_brand')) {
      localStorage.removeItem('kinn_content_planner_kp01_v1_brand');
      localStorage.removeItem('kinn_content_planner_kp01_v1_posts');
      localStorage.removeItem('kinn_content_planner_kp01_v1_ideas');
      localStorage.removeItem('kinn_content_planner_kp01_v1_hashtags');
    }
    const saved = localStorage.getItem(`${STORAGE_KEY}_brand`);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return initialBrandIdentity;
  });

  const [posts, setPosts] = useState<ContentPost[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_posts`);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return initialPosts;
  });

  const [ideas, setIdeas] = useState<IdeaItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_ideas`);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return initialIdeas;
  });

  const [hashtagSets, setHashtagSets] = useState<HashtagSet[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_hashtags`);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return initialHashtagSets;
  });

  const [selectedMonth, setSelectedMonth] = useState<string>('10');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedPillar, setSelectedPillar] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_brand`, JSON.stringify(brandIdentity));
  }, [brandIdentity]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_posts`, JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_ideas`, JSON.stringify(ideas));
  }, [ideas]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_hashtags`, JSON.stringify(hashtagSets));
  }, [hashtagSets]);

  // CRUD for Posts
  const addPost = useCallback((postData: Omit<ContentPost, 'id'>) => {
    const newPost: ContentPost = {
      ...postData,
      id: `post-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    };
    setPosts(prev => [newPost, ...prev]);
    return newPost;
  }, []);

  const updatePost = useCallback((id: string, partial: Partial<ContentPost>) => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, ...partial } : p));
  }, []);

  const deletePost = useCallback((id: string) => {
    setPosts(prev => prev.filter(p => p.id !== id));
  }, []);

  const duplicatePost = useCallback((id: string) => {
    setPosts(prev => {
      const target = prev.find(p => p.id === id);
      if (!target) return prev;
      const duplicated: ContentPost = {
        ...target,
        id: `post-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        title: `${target.title} (Copy)`,
        status: 'idea',
      };
      return [duplicated, ...prev];
    });
  }, []);

  // CRUD for Brand Identity
  const updateBrandIdentity = useCallback((partial: Partial<BrandIdentity>) => {
    setBrandIdentity(prev => ({ ...prev, ...partial }));
  }, []);

  // CRUD for Ideas
  const addIdea = useCallback((ideaData: Omit<IdeaItem, 'id' | 'createdAt'>) => {
    const newIdea: IdeaItem = {
      ...ideaData,
      id: `idea-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setIdeas(prev => [newIdea, ...prev]);
    return newIdea;
  }, []);

  const updateIdea = useCallback((id: string, partial: Partial<IdeaItem>) => {
    setIdeas(prev => prev.map(i => i.id === id ? { ...i, ...partial } : i));
  }, []);

  const deleteIdea = useCallback((id: string) => {
    setIdeas(prev => prev.filter(i => i.id !== id));
  }, []);

  const promoteIdeaToPost = useCallback((ideaId: string, targetMonth: string, publishDate: string) => {
    const idea = ideas.find(i => i.id === ideaId);
    if (!idea) return null;

    const newPost: ContentPost = {
      id: `post-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      month: targetMonth,
      publishDate: publishDate || `2026-${targetMonth}-15`,
      publishTime: '18:00',
      platform: idea.platform,
      format: idea.format,
      pillar: idea.pillar,
      title: idea.title,
      hook: idea.hookVariant || '',
      caption: `${idea.hookVariant || idea.title}\n\n${idea.notes || ''}`,
      hashtags: ['#ContentPlanner', '#ContentStrategy'],
      mediaUrl: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=800&q=80',
      status: 'scheduled',
      productionCost: 500,
      adSpend: 1000,
      salesRevenue: 3000,
      views: 0,
      likes: 0,
      comments: 0,
      shares: 0,
      saves: 0,
      clicks: 0
    };

    setPosts(prev => [newPost, ...prev]);
    return newPost;
  }, [ideas]);

  // CRUD for Hashtag Sets
  const addHashtagSet = useCallback((setData: Omit<HashtagSet, 'id'>) => {
    const newSet: HashtagSet = {
      ...setData,
      id: `hash-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    };
    setHashtagSets(prev => [...prev, newSet]);
    return newSet;
  }, []);

  const updateHashtagSet = useCallback((id: string, partial: Partial<HashtagSet>) => {
    setHashtagSets(prev => prev.map(h => h.id === id ? { ...h, ...partial } : h));
  }, []);

  const deleteHashtagSet = useCallback((id: string) => {
    setHashtagSets(prev => prev.filter(h => h.id !== id));
  }, []);

  // Filtered Posts for current month
  const currentMonthPosts = useMemo(() => {
    return posts.filter(p => p.month === selectedMonth);
  }, [posts, selectedMonth]);

  const filteredPosts = useMemo(() => {
    return currentMonthPosts.filter(post => {
      if (selectedPlatform !== 'all' && post.platform !== selectedPlatform) return false;
      if (selectedStatus !== 'all' && post.status !== selectedStatus) return false;
      if (selectedPillar !== 'all' && post.pillar !== selectedPillar) return false;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = post.title.toLowerCase().includes(query);
        const matchesHook = post.hook.toLowerCase().includes(query);
        const matchesCaption = post.caption.toLowerCase().includes(query);
        const matchesTags = post.hashtags.some(t => t.toLowerCase().includes(query));
        if (!matchesTitle && !matchesHook && !matchesCaption && !matchesTags) return false;
      }
      return true;
    });
  }, [currentMonthPosts, selectedPlatform, selectedStatus, selectedPillar, searchQuery]);

  // Calculations for current selected month
  const monthStats = useMemo(() => {
    const list = currentMonthPosts;
    const totalPosts = list.length;
    const publishedCount = list.filter(p => p.status === 'published').length;
    const scheduledCount = list.filter(p => p.status === 'scheduled').length;
    const inProgressCount = list.filter(p => ['idea', 'scripting', 'review'].includes(p.status)).length;
    const publishRate = totalPosts > 0 ? (publishedCount / totalPosts) * 100 : 0;

    let views = 0;
    let likes = 0;
    let comments = 0;
    let shares = 0;
    let saves = 0;
    let clicks = 0;
    let productionCost = 0;
    let adSpend = 0;
    let salesRevenue = 0;

    list.forEach(p => {
      views += Number(p.views) || 0;
      likes += Number(p.likes) || 0;
      comments += Number(p.comments) || 0;
      shares += Number(p.shares) || 0;
      saves += Number(p.saves) || 0;
      clicks += Number(p.clicks) || 0;
      productionCost += Number(p.productionCost) || 0;
      adSpend += Number(p.adSpend) || 0;
      salesRevenue += Number(p.salesRevenue) || 0;
    });

    const totalSpend = productionCost + adSpend;
    const netProfit = salesRevenue - totalSpend;
    const profitMargin = salesRevenue > 0 ? (netProfit / salesRevenue) * 100 : 0;
    const roiPercentage = totalSpend > 0 ? (netProfit / totalSpend) * 100 : 0;
    const totalEngagement = likes + comments + shares + saves;
    const engagementRate = views > 0 ? (totalEngagement / views) * 100 : 0;
    const cpm = views > 0 ? (adSpend / views) * 1000 : 0;
    const cpe = totalEngagement > 0 ? (totalSpend / totalEngagement) : 0;

    return {
      totalPosts,
      publishedCount,
      scheduledCount,
      inProgressCount,
      publishRate,
      views,
      likes,
      comments,
      shares,
      saves,
      clicks,
      totalEngagement,
      engagementRate,
      productionCost,
      adSpend,
      totalSpend,
      salesRevenue,
      netProfit,
      profitMargin,
      roiPercentage,
      cpm,
      cpe
    };
  }, [currentMonthPosts]);

  // Year-to-date Global Stats across all 12 months
  const yearlyStats = useMemo(() => {
    let totalPosts = posts.length;
    let views = 0;
    let engagement = 0;
    let productionCost = 0;
    let adSpend = 0;
    let salesRevenue = 0;

    posts.forEach(p => {
      views += Number(p.views) || 0;
      engagement += (Number(p.likes) || 0) + (Number(p.comments) || 0) + (Number(p.shares) || 0) + (Number(p.saves) || 0);
      productionCost += Number(p.productionCost) || 0;
      adSpend += Number(p.adSpend) || 0;
      salesRevenue += Number(p.salesRevenue) || 0;
    });

    const totalSpend = productionCost + adSpend;
    const netProfit = salesRevenue - totalSpend;
    const roiPercentage = totalSpend > 0 ? (netProfit / totalSpend) * 100 : 0;

    return {
      totalPosts,
      views,
      engagement,
      totalSpend,
      salesRevenue,
      netProfit,
      roiPercentage
    };
  }, [posts]);

  // Platform breakdown
  const platformBreakdown = useMemo(() => {
    const platforms: Record<string, { count: number; views: number; spend: number; revenue: number; profit: number }> = {
      instagram: { count: 0, views: 0, spend: 0, revenue: 0, profit: 0 },
      tiktok: { count: 0, views: 0, spend: 0, revenue: 0, profit: 0 },
      facebook: { count: 0, views: 0, spend: 0, revenue: 0, profit: 0 },
      youtube: { count: 0, views: 0, spend: 0, revenue: 0, profit: 0 },
      x: { count: 0, views: 0, spend: 0, revenue: 0, profit: 0 },
    };

    currentMonthPosts.forEach(p => {
      if (platforms[p.platform]) {
        platforms[p.platform].count += 1;
        platforms[p.platform].views += Number(p.views) || 0;
        const spend = (Number(p.productionCost) || 0) + (Number(p.adSpend) || 0);
        const rev = Number(p.salesRevenue) || 0;
        platforms[p.platform].spend += spend;
        platforms[p.platform].revenue += rev;
        platforms[p.platform].profit += (rev - spend);
      }
    });

    return platforms;
  }, [currentMonthPosts]);

  // Reset to Demo Data
  const resetToDemoData = useCallback(() => {
    if (confirm('คุณต้องการรีเซ็ตข้อมูลเป็นตัวอย่างเริ่มต้น (Demo Data) หรือไม่?')) {
      setBrandIdentity(initialBrandIdentity);
      setPosts(initialPosts);
      setIdeas(initialIdeas);
      setHashtagSets(initialHashtagSets);
      localStorage.removeItem(`${STORAGE_KEY}_brand`);
      localStorage.removeItem(`${STORAGE_KEY}_posts`);
      localStorage.removeItem(`${STORAGE_KEY}_ideas`);
      localStorage.removeItem(`${STORAGE_KEY}_hashtags`);
    }
  }, []);

  // Export JSON Backup
  const exportDataJson = useCallback(() => {
    const data = {
      brandIdentity,
      posts,
      ideas,
      hashtagSets,
      exportedAt: new Date().toISOString(),
      version: 'CreatorPlannerPro-TodayStyle2100'
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `creator_planner_pro_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [brandIdentity, posts, ideas, hashtagSets]);

  // Import JSON Backup
  const importDataJson = useCallback((jsonString: string) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.brandIdentity) setBrandIdentity(parsed.brandIdentity);
      if (Array.isArray(parsed.posts)) setPosts(parsed.posts);
      if (Array.isArray(parsed.ideas)) setIdeas(parsed.ideas);
      if (Array.isArray(parsed.hashtagSets)) setHashtagSets(parsed.hashtagSets);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  }, []);

  // Export CSV for current month
  const exportToCsv = useCallback((monthStr: string) => {
    const monthData = posts.filter(p => p.month === monthStr);
    const headers = [
      'Month', 'Date', 'Time', 'Platform', 'Format', 'Pillar', 'Title', 'Hook', 'Status',
      'Production Cost (THB)', 'Ad Spend (THB)', 'Sales Revenue (THB)', 'Net Profit (THB)',
      'Views', 'Likes', 'Comments', 'Shares', 'Saves', 'Clicks'
    ];

    const rows = monthData.map(p => {
      const cost = Number(p.productionCost) || 0;
      const ads = Number(p.adSpend) || 0;
      const rev = Number(p.salesRevenue) || 0;
      const profit = rev - (cost + ads);

      return [
        p.month,
        p.publishDate,
        p.publishTime,
        p.platform,
        p.format,
        `"${(p.pillar || '').replace(/"/g, '""')}"`,
        `"${(p.title || '').replace(/"/g, '""')}"`,
        `"${(p.hook || '').replace(/"/g, '""')}"`,
        p.status,
        cost,
        ads,
        rev,
        profit,
        p.views || 0,
        p.likes || 0,
        p.comments || 0,
        p.shares || 0,
        p.saves || 0,
        p.clicks || 0
      ].join(',');
    });

    const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `creator_planner_month_${monthStr}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }, [posts]);

  return {
    brandIdentity,
    posts,
    ideas,
    hashtagSets,
    selectedMonth,
    setSelectedMonth,
    selectedPlatform,
    setSelectedPlatform,
    selectedStatus,
    setSelectedStatus,
    selectedPillar,
    setSelectedPillar,
    searchQuery,
    setSearchQuery,
    currentMonthPosts,
    filteredPosts,
    monthStats,
    yearlyStats,
    platformBreakdown,
    addPost,
    updatePost,
    deletePost,
    duplicatePost,
    updateBrandIdentity,
    addIdea,
    updateIdea,
    deleteIdea,
    promoteIdeaToPost,
    addHashtagSet,
    updateHashtagSet,
    deleteHashtagSet,
    resetToDemoData,
    exportDataJson,
    importDataJson,
    exportToCsv
  };
}
