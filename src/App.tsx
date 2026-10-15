/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ActiveNavTab, ContentPost, PlatformType, PostFormat } from './types';
import { useContentPlanner } from './hooks/useContentPlanner';
import { Header } from './components/Header';
import { NavigationSidebar } from './components/NavigationSidebar';
import { BrandIdentityView } from './components/BrandIdentityView';
import { SmartDashboardView } from './components/SmartDashboardView';
import { MonthlySheetView } from './components/MonthlySheetView';
import { SmartCalendarView } from './components/SmartCalendarView';
import { FeedReviewView } from './components/FeedReviewView';
import { IdeaBankView } from './components/IdeaBankView';
import { FinanceRoiView } from './components/FinanceRoiView';
import { PostDetailModal } from './components/PostDetailModal';
import { AiStudioModal } from './components/AiStudioModal';
import { SyncMetricsModal } from './components/SyncMetricsModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveNavTab>('smart-dashboard');
  const [editingPost, setEditingPost] = useState<ContentPost | null>(null);
  const [isAiStudioOpen, setIsAiStudioOpen] = useState(false);
  const [isSyncMetricsOpen, setIsSyncMetricsOpen] = useState(false);

  const planner = useContentPlanner();

  const handleEditPost = (post: ContentPost) => {
    setEditingPost(post);
  };

  const handleSavePost = (id: string, partial: Partial<ContentPost>) => {
    planner.updatePost(id, partial);
    setEditingPost(null);
  };

  const handleSaveAiToIdeaBank = (
    title: string,
    hook: string,
    pillar: string,
    platform: PlatformType,
    format: PostFormat,
    notes: string
  ) => {
    planner.addIdea({
      title,
      hookVariant: hook,
      pillar,
      platform,
      format,
      notes,
      priority: 'high',
    });
  };

  const handleScheduleAiPost = (
    title: string,
    hook: string,
    caption: string,
    hashtags: string[],
    pillar: string,
    platform: PlatformType,
    format: PostFormat
  ) => {
    const today = new Date();
    const dayStr = String(today.getDate()).padStart(2, '0');

    planner.addPost({
      month: planner.selectedMonth,
      publishDate: `2026-${planner.selectedMonth}-${dayStr}`,
      publishTime: '18:00',
      platform,
      format,
      pillar,
      title,
      hook,
      caption,
      hashtags,
      mediaUrl: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=800&q=80',
      status: 'scheduled',
      productionCost: 500,
      adSpend: 1000,
      salesRevenue: 0,
      views: 0,
      likes: 0,
      comments: 0,
      shares: 0,
      saves: 0,
      clicks: 0,
    });
    setActiveTab('monthly-sheet');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedMonth={planner.selectedMonth}
        onOpenAiStudio={() => setIsAiStudioOpen(true)}
        onOpenSyncMetrics={() => setIsSyncMetricsOpen(true)}
        onExportJson={planner.exportDataJson}
        onImportJson={planner.importDataJson}
        onExportCsv={() => planner.exportToCsv(planner.selectedMonth)}
        onResetDemo={planner.resetToDemoData}
      />

      {/* Main Workspace Layout with Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        {/* Navigation Sidebar */}
        <NavigationSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          selectedMonth={planner.selectedMonth}
          setSelectedMonth={planner.setSelectedMonth}
          brandIdentity={planner.brandIdentity}
          totalPostsCount={planner.currentMonthPosts.length}
          monthNetProfit={planner.monthStats.netProfit}
        />

        {/* Content Viewport */}
        <main className="flex-1 overflow-y-auto px-6 py-6 lg:px-8">
          {activeTab === 'brand-identity' && (
            <BrandIdentityView
              brandIdentity={planner.brandIdentity}
              onUpdate={planner.updateBrandIdentity}
              onOpenAiStudio={() => setIsAiStudioOpen(true)}
            />
          )}

          {activeTab === 'smart-dashboard' && (
            <SmartDashboardView
              selectedMonth={planner.selectedMonth}
              setSelectedMonth={planner.setSelectedMonth}
              brandIdentity={planner.brandIdentity}
              monthStats={planner.monthStats}
              yearlyStats={planner.yearlyStats}
              posts={planner.posts}
              platformBreakdown={planner.platformBreakdown}
              onNavigateToSheet={() => setActiveTab('monthly-sheet')}
              onNavigateToCalendar={() => setActiveTab('smart-calendar')}
              onNavigateToFeed={() => setActiveTab('feed-review')}
              onOpenAiStudio={() => setIsAiStudioOpen(true)}
            />
          )}

          {activeTab === 'monthly-sheet' && (
            <MonthlySheetView
              selectedMonth={planner.selectedMonth}
              setSelectedMonth={planner.setSelectedMonth}
              brandIdentity={planner.brandIdentity}
              posts={planner.posts}
              filteredPosts={planner.filteredPosts}
              monthStats={planner.monthStats}
              selectedPlatform={planner.selectedPlatform}
              setSelectedPlatform={planner.setSelectedPlatform}
              selectedStatus={planner.selectedStatus}
              setSelectedStatus={planner.setSelectedStatus}
              selectedPillar={planner.selectedPillar}
              setSelectedPillar={planner.setSelectedPillar}
              searchQuery={planner.searchQuery}
              setSearchQuery={planner.setSearchQuery}
              onAddPost={planner.addPost}
              onUpdatePost={planner.updatePost}
              onDeletePost={planner.deletePost}
              onDuplicatePost={planner.duplicatePost}
              onEditPost={handleEditPost}
              onOpenAiStudio={() => setIsAiStudioOpen(true)}
              onOpenSyncMetrics={() => setIsSyncMetricsOpen(true)}
              onExportCsv={planner.exportToCsv}
            />
          )}

          {activeTab === 'smart-calendar' && (
            <SmartCalendarView
              selectedMonth={planner.selectedMonth}
              setSelectedMonth={planner.setSelectedMonth}
              posts={planner.posts}
              onAddPost={planner.addPost}
              onUpdatePost={planner.updatePost}
              onEditPost={handleEditPost}
              onOpenAiStudio={() => setIsAiStudioOpen(true)}
            />
          )}

          {activeTab === 'feed-review' && (
            <FeedReviewView
              selectedMonth={planner.selectedMonth}
              setSelectedMonth={planner.setSelectedMonth}
              brandIdentity={planner.brandIdentity}
              posts={planner.posts}
              onEditPost={handleEditPost}
              onOpenAiStudio={() => setIsAiStudioOpen(true)}
            />
          )}

          {activeTab === 'idea-bank' && (
            <IdeaBankView
              ideas={planner.ideas}
              hashtagSets={planner.hashtagSets}
              brandIdentity={planner.brandIdentity}
              selectedMonth={planner.selectedMonth}
              onAddIdea={planner.addIdea}
              onUpdateIdea={planner.updateIdea}
              onDeleteIdea={planner.deleteIdea}
              onPromoteIdea={(ideaId, month, date) => {
                planner.promoteIdeaToPost(ideaId, month, date);
                planner.setSelectedMonth(month);
                setActiveTab('monthly-sheet');
              }}
              onAddHashtagSet={planner.addHashtagSet}
              onDeleteHashtagSet={planner.deleteHashtagSet}
              onOpenAiStudio={() => setIsAiStudioOpen(true)}
            />
          )}

          {activeTab === 'finance-roi' && (
            <FinanceRoiView
              selectedMonth={planner.selectedMonth}
              setSelectedMonth={planner.setSelectedMonth}
              brandIdentity={planner.brandIdentity}
              monthStats={planner.monthStats}
              posts={planner.posts}
              platformBreakdown={planner.platformBreakdown}
              onOpenAiStudio={() => setIsAiStudioOpen(true)}
            />
          )}
        </main>
      </div>

      {/* Post Detail & AI Caption Modal */}
      {editingPost && (
        <PostDetailModal
          post={editingPost}
          brandIdentity={planner.brandIdentity}
          onClose={() => setEditingPost(null)}
          onSave={handleSavePost}
        />
      )}

      {/* Gemini AI Creative Studio Modal */}
      {isAiStudioOpen && (
        <AiStudioModal
          brandIdentity={planner.brandIdentity}
          selectedMonth={planner.selectedMonth}
          onClose={() => setIsAiStudioOpen(false)}
          onSaveToIdeaBank={handleSaveAiToIdeaBank}
          onSchedulePost={handleScheduleAiPost}
        />
      )}

      {/* Analytics Insights & Metrics Sync Modal */}
      {isSyncMetricsOpen && (
        <SyncMetricsModal
          selectedMonth={planner.selectedMonth}
          posts={planner.posts}
          onClose={() => setIsSyncMetricsOpen(false)}
          onUpdatePost={planner.updatePost}
        />
      )}
    </div>
  );
}
