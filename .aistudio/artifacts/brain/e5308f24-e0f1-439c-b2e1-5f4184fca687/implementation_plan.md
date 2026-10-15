# Content Planner Pro (KP01 OS) — All-in-One Content Planning & Operating System

An all-in-one Notion and Google Sheets hybrid workspace inspired by KINN Content Planner Pro (KP01). The system seamlessly integrates Brand Identity setup, 12-Month Content Planning Sheets (01–12), Auto-Sync Smart Calendar, Multi-Platform Feed Review (Instagram 3x3 Grid, TikTok/Reels vertical, Facebook, X), Pillar & Hashtag Idea Bank, and full-funnel Performance + Finance & ROI analytics with built-in Gemini AI content generation.

### User Review & Critical Decisions

> [!IMPORTANT]
> Based on your Phase 1 selections, the following architectural choices have been established:
> - **Multi-Platform Support**: Tailored previews and scheduling workflows for Instagram, TikTok, Facebook, YouTube Shorts, and X.
> - **Notion + Google Sheets Hybrid Dashboard**: High-density spreadsheet-grade formula table views combined with clean Notion-style document drawers, drag-and-drop calendars, and visual feed previews.
> - **Full Gemini AI Studio**: Integrated AI assistant for viral hook generation, multilingual captions (Thai/English), automatic hashtag clustering, content repurposing across formats, and ROI performance diagnostics.
> - **Zero Data Loss & Persistence**: Complete client-side local persistence (IndexedDB/localStorage) with instant JSON/CSV export and import for seamless backup and cross-device usage.

---

### 1. Overview & Core Concept

- **What It Does**: Content Planner Pro (KP01 OS) transforms fragmented content workflows into a unified, synchronized operating system. Creators and marketing teams can define brand guidelines, plan 12 months of multichannel content in high-efficiency sheets, view auto-synced drag-and-drop calendars, curate realistic Instagram 3x3 feeds and vertical video feeds, bank creative ideas and grouped hashtags, and calculate true bottom-line ROI (views, engagement, cost-per-post, ad spend, sales revenue, net profit, and ROI %).
- **Target Audience / Persona**: Solopreneurs, e-commerce brand owners, social media managers, agency strategists, and digital creators producing content across Instagram, TikTok, Facebook, YouTube, and X.
- **Key Value**: "Input Once, Auto-Sync Everywhere" — eliminating manual double-entry between editorial sheets, visual feed planners, scheduling calendars, and financial ROI spreadsheets.

---

### 2. User Experience & Visual Design

#### Key User Flows
1. **Brand Setup & Identity Hub (⚙️ Set Up)**: Configure brand pillars (e.g. Edu-tainment, Behind-the-Scenes, Social Proof, Product Drops), color palettes, target audience personas, voice guidelines, and default budget targets.
2. **Monthly Content Sheets (📅 01–12 Month Selector)**: Switch between January through December with dedicated monthly data grids. Fast inline entry for Post Title, Platform, Content Pillar, Post Format (Reel/Video, Carousel, Single Image, Story, Thread), Publish Date/Time, Status (Idea, Scripting, In Review, Scheduled, Published), Link/Media URL, Production Cost, Ad Budget, and Performance Metrics.
3. **Smart Dashboard & Sync Calendar (🔔 Smart Dashboard + Calendar)**:
   - Real-time monthly KPI summary (Total Posts, Publish Rate, Total Reach/Views, Engagement Rate, Net Profit, ROI %).
   - Monthly and Weekly interactive calendar with color-coded platform badges, status indicators, and drag-to-reschedule support.
4. **Multi-Platform Feed Review (🖼️ Feed Review & Monthly Planner)**:
   - **Instagram 3x3 Grid Simulator**: Preview layout aesthetic, reorder grid positions, toggle carousel indicators, and inspect caption previews.
   - **Vertical Video Feed (TikTok / Reels / Shorts)**: Simulated mobile smartphone frame with sound title, caption text, hashtags, and engagement button overlays.
   - **Facebook & X Feed Cards**: Compact social stream previews.
5. **Idea Bank & Hashtag Groups (💡 Idea Bank & Hashtag)**:
   - Categorized repository of creative hooks, viral video ideas, and trend concepts with priority and pillar tags.
   - 1-click "Promote Idea to Monthly Plan" to push directly into a chosen month's schedule.
   - Hashtag sets grouped by tier (Mega 1M+, Niche 100K+, Community/Local, Brand) with instant 1-click clipboard copy.
6. **Performance, Finance & Real ROI (📊 Finance & ROI)**:
   - Direct formula-driven financial ledger: Total Production Costs + Total Ad Spend vs. Attributed Sales Revenue.
   - Real Profit calculation (`Revenue - (Cost + Ads)`), Profit Margin %, and True Return on Investment (`Net Profit / Total Spend * 100`).
   - Platform performance comparison breakdown (Cost per 1k views / CPM, Cost per Engagement, Conversion Rate).
7. **Gemini AI Content Superpowers**:
   - **Viral Hook Generator**: Generates 5 high-converting hook variants based on the selected pillar and format.
   - **Caption & CTA Crafter**: Generates platform-optimized captions with emojis, structured whitespace, and call-to-actions.
   - **Hashtag Clustered Suggestion**: Suggests high-reach and niche hashtags tailored to the post topic.
   - **Smart ROI Advisor**: Analyzes monthly performance data and produces actionable optimization recommendations.

#### Visual Identity & Theme
- **Aesthetic Direction**: Contemporary SaaS editorial hybrid. Minimalist, tactile, and functional — inspired by Linear, Notion, and Google Sheets professional workflows.
- **Color Palette**:
  - Neutral Canvas: Ultra-clean Slate/Zinc (`bg-slate-50` / `dark:bg-slate-950`).
  - Structural Surfaces: Crisp white cards (`bg-white` / `dark:bg-slate-900`) with hairline borders (`border-slate-200` / `dark:border-slate-800`).
  - Brand Accents: Emerald Green for positive ROI/Profit (`#059669`), Electric Indigo (`#4F46E5`) for primary actions, Amber (`#D97706`) for in-review states.
  - Platform Identities: Instagram Gradient/Rose, TikTok Black/Cyan, YouTube Red, Facebook Blue, X Monochrome.
- **Typography & Hierarchy**:
  - Display & Headings: `Plus Jakarta Sans` font, weights 600 and 700 with strict `text-wrap: balance`.
  - Body Prose: `Plus Jakarta Sans` (14px–15px, line-height 1.6).
  - Metrics & Numbers: Tabular numbers `tabular-nums` (`font-mono`) for spreadsheet alignment and financial ledger clarity.
- **Zero-Pill Discipline**:
  - Clean inline metadata with middle dots (`·`) for post format, publish times, and status.
  - Functional segmented filter tabs for views and month navigation.
- **Interactive Feedback**:
  - Subtle hover transitions ($\le 150\text{ms}$).
  - Smooth modal drawers for post editing and AI generation.
  - Non-intrusive action toasts for copy actions, idea promotions, and save states.

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: Notion + Sheets Unified Architecture vs. Pure Spreadsheet Grid**:
  - *Chosen Approach*: A tabbed workspace layout with a fast inline spreadsheet table, an interactive calendar view, and visual feed simulator view sharing identical reactive state.
  - *Why*: Solves the main pain point of traditional Google Sheets (clunky mobile review, lack of visual feed rendering) while preserving the high data-density and keyboard-friendly speed creators love.
- **Decision 2: Client-Authoritative State with Server-Side Gemini Proxy**:
  - *Chosen Approach*: Reactive local state stored in browser persistence with JSON/CSV export/import, paired with server-side proxy endpoints (`/api/gemini/*`) using `@google/genai` with `gemini-3.8-flash`.
  - *Why*: Guarantees instant zero-latency UI interactions, complete user privacy, works offline or without login, and securely handles AI API keys on the server.
- **Decision 3: Multi-Month Data Partitioning with Global Aggregate Sync**:
  - *Chosen Approach*: 12 individual monthly datasets (`months: { '01': [...], '02': [...], ... }`) with a global aggregator that rolls up year-to-date and month-to-month growth, spend, and profit.
  - *Why*: Exactly mirrors the KINN KP01 workflow where creators can review monthly cadences in isolation while seeing cross-month ROI trends in the Smart Dashboard.

---

### 4. Technical Architecture & Data Strategy

#### Architecture & Component Diagram

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Top Navigation Bar                              │
│  [ Brand Title: Content Planner Pro ] ── [ Workspace Tabs ] ── [ Action ]
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
┌──────────────────────────────────▼─────────────────────────────────────┐
│                          Workspace Layout                              │
│                                                                        │
│ ┌──────────────────────┐  ┌──────────────────────────────────────────┐ │
│ │  Navigation Sidebar  │  │        Active Workspace View             │ │
│ │  - ⚙️ Brand Identity │  │                                          │ │
│ │  - 🔔 Smart Dashboard│  │  1. Setup & Brand Identity Hub           │ │
│ │  - 📅 Monthly Sheets │  │  2. Monthly Data Grid (01–12 Selector)   │ │
│ │  - 🗓️ Smart Calendar │  │  3. Multi-Platform Feed Review (IG/TT/X) │ │
│ │  - 🖼️ Feed Review    │  │  4. Idea Bank & Hashtag Manager          │ │
│ │  - 💡 Idea Bank      │  │  5. Performance & ROI Financial Ledger   │ │
│ │  - 📊 Finance & ROI  │  │  6. AI Content Generation Studio         │ │
│ └──────────────────────┘  └──────────────────────────────────────────┘ │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
    ┌──────────────────────────────┴──────────────────────────────┐
    │                                                             │
┌───▼───────────────────────────┐   ┌─────────────────────────────▼────┐
│      Client Data Store        │   │    Server API Proxy (/api/*)     │
│  - React State + Hooks        │   │  - Express / Vite Dev Middleware │
│  - LocalStorage Persistence   │   │  - @google/genai SDK Integration │
│  - CSV / JSON Import & Export │   │  - Model: gemini-3.8-flash       │
└───────────────────────────────┘   └──────────────────────────────────┘
```

#### Core Data Models
```typescript
export interface BrandIdentity {
  name: string;
  handle: string;
  bio: string;
  pillars: string[]; // e.g. ["Edu-tainment", "Behind The Scenes", "Case Studies", "Product Highlights"]
  brandColors: string[];
  audiencePersona: string;
  toneOfVoice: string;
  monthlyBudgetGoal: number;
  monthlyRevenueGoal: number;
}

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
```

#### Verification & Test Strategy
- Interactive verification across all 6 core modules (Brand Identity, Monthly 01–12 Sheets, Smart Dashboard, Smart Calendar, Feed Review, Idea Bank, Finance & ROI).
- Verified data sync: changes in the monthly sheet immediately reflect in the calendar, feed preview, and ROI totals.
- Verified AI generation with fallback handling for hook generation, caption writing, and ROI advisor.
- TypeScript compilation check using `compile_applet`.
