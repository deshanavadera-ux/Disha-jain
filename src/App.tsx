import React, { useState, useEffect, useMemo } from 'react';
import { ARTICLES } from './data/articles';
import { Article } from './types/blog';
import { updateSEOMetadata } from './utils/seo';
import { Navbar } from './components/Navbar';
import { HeroFeatured } from './components/HeroFeatured';
import { ArticleCard } from './components/ArticleCard';
import { ArticleView } from './components/ArticleView';
import { SearchAndFilterBar } from './components/SearchAndFilterBar';
import { HomepageAEOSection } from './components/HomepageAEOSection';
import { SEOKeywordResearch } from './components/SEOKeywordResearch';
import { SEOAssignmentReport } from './components/SEOAssignmentReport';
import { NewsletterSection } from './components/NewsletterSection';
import { EditorialCharterModal } from './components/EditorialCharterModal';
import { Footer } from './components/Footer';
import { Bookmark, Search, ArrowLeft, RotateCcw, FileSpreadsheet, FileText } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'article' | 'saved' | 'keyword-research' | 'seo-report'>('home');
  const [selectedArticleId, setSelectedArticleId] = useState<string>(ARTICLES[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'latest' | 'popular' | 'quick'>('latest');
  const [isCharterOpen, setIsCharterOpen] = useState(false);

  // Saved / Bookmarked articles in LocalStorage
  const [savedArticleIds, setSavedArticleIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('blogsvert_saved_articles');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Keep saved articles synced with LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('blogsvert_saved_articles', JSON.stringify(savedArticleIds));
    } catch {
      // storage unavailable
    }
  }, [savedArticleIds]);

  // Handle URL path and hash changes for deep linking, browser history & Vercel
  useEffect(() => {
    const parseRoute = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;

      if (path.startsWith('/article/') || hash.startsWith('#article/')) {
        const slug = path.startsWith('/article/')
          ? path.replace('/article/', '')
          : hash.replace('#article/', '');

        const found = ARTICLES.find((a) => a.slug === slug || a.id === slug);
        if (found) {
          setSelectedArticleId(found.id);
          setCurrentView('article');
          return;
        }
      }

      if (path === '/keyword-research' || hash === '#keyword-research') {
        setCurrentView('keyword-research');
        updateSEOMetadata({
          title: 'SEO Keyword Research Table | Blogs Vert Assignment',
          description: 'Detailed keyword research table and target query mapping for the Blogs Vert homepage and primary digital marketing articles.',
          canonicalPath: '/keyword-research',
        });
        return;
      }

      if (path === '/seo-report' || hash === '#seo-report') {
        setCurrentView('seo-report');
        updateSEOMetadata({
          title: 'SEO Assignment Report & Implementation Audit | Blogs Vert',
          description: 'Comprehensive SEO assignment report including on-page optimization, Answer Engine Optimization (AEO), technical SEO, and image audit.',
          canonicalPath: '/seo-report',
        });
        return;
      }

      if (path === '/saved' || hash === '#saved') {
        setCurrentView('saved');
        updateSEOMetadata({
          title: 'Saved Reading List | Blogs Vert',
          description: 'Access your bookmarked strategic articles and research reports on Blogs Vert.',
          canonicalPath: '/saved',
        });
        return;
      }

      // Default Home View
      setCurrentView('home');
      updateSEOMetadata({
        title: 'Blogs Vert | Digital Marketing and AI Growth Strategies',
        description: 'Discover expert digital marketing and AI analysis, generative search optimization frameworks, and predictive strategies to drive modern organic growth.',
        canonicalPath: '/',
        image: '/images/hero_ai_marketing_analytics_1791989280565.jpg',
        type: 'website',
      });
    };

    parseRoute();
    window.addEventListener('popstate', parseRoute);
    window.addEventListener('hashchange', parseRoute);
    return () => {
      window.removeEventListener('popstate', parseRoute);
      window.removeEventListener('hashchange', parseRoute);
    };
  }, []);

  const handleToggleSave = (articleId: string) => {
    setSavedArticleIds((prev) =>
      prev.includes(articleId) ? prev.filter((id) => id !== articleId) : [...prev, articleId]
    );
  };

  const navigateTo = (view: 'home' | 'article' | 'saved' | 'keyword-research' | 'seo-report', path: string) => {
    setCurrentView(view);
    try {
      window.history.pushState({}, '', path);
    } catch {
      window.location.hash = path.replace('/', '#');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateHome = () => {
    navigateTo('home', '/');
    updateSEOMetadata({
      title: 'Blogs Vert | Digital Marketing and AI Growth Strategies',
      description: 'Discover expert digital marketing and AI analysis, generative search optimization frameworks, and predictive strategies to drive modern organic growth.',
      canonicalPath: '/',
      image: '/images/hero_ai_marketing_analytics_1791989280565.jpg',
      type: 'website',
    });
  };

  const handleNavigateSaved = () => {
    navigateTo('saved', '/saved');
  };

  const handleNavigateKeywordResearch = () => {
    navigateTo('keyword-research', '/keyword-research');
  };

  const handleNavigateSEOReport = () => {
    navigateTo('seo-report', '/seo-report');
  };

  const handleReadArticle = (articleId: string) => {
    const target = ARTICLES.find((a) => a.id === articleId);
    if (target) {
      setSelectedArticleId(target.id);
      navigateTo('article', target.canonicalPath);
    }
  };

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    if (currentView !== 'home') {
      navigateTo('home', '/');
    }
    const explorerEl = document.getElementById('articles-explorer');
    if (explorerEl) {
      explorerEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToNewsletter = () => {
    const el = document.getElementById('newsletter-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenSearch = () => {
    if (currentView !== 'home') {
      navigateTo('home', '/');
    }
    const explorerEl = document.getElementById('articles-explorer');
    if (explorerEl) {
      explorerEl.scrollIntoView({ behavior: 'smooth' });
      const input = explorerEl.querySelector('input');
      if (input) input.focus();
    }
  };

  // Distinct category list
  const categories = useMemo(() => {
    const set = new Set<string>();
    ARTICLES.forEach((a) => set.add(a.category));
    return Array.from(set);
  }, []);

  // Filter and sort articles for Home view
  const filteredArticles = useMemo(() => {
    return ARTICLES.filter((article) => {
      const matchesCategory =
        selectedCategory === 'All' || article.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        article.title.toLowerCase().includes(q) ||
        article.subtitle.toLowerCase().includes(q) ||
        article.introduction.toLowerCase().includes(q) ||
        article.author.name.toLowerCase().includes(q) ||
        article.primaryKeyword.toLowerCase().includes(q) ||
        article.secondaryKeywords.some((k) => k.toLowerCase().includes(q)) ||
        article.tags.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'popular') {
        return b.initialLikes - a.initialLikes;
      }
      if (sortBy === 'quick') {
        return a.readTimeMinutes - b.readTimeMinutes;
      }
      return 0; // Default ordering preserves editorial chronological order
    });
  }, [searchQuery, selectedCategory, sortBy]);

  // Saved articles list
  const savedArticles = useMemo(() => {
    return ARTICLES.filter((a) => savedArticleIds.includes(a.id));
  }, [savedArticleIds]);

  // Selected article for Article view
  const currentArticle = useMemo(() => {
    return ARTICLES.find((a) => a.id === selectedArticleId) || ARTICLES[0];
  }, [selectedArticleId]);

  return (
    <div className="min-h-screen flex flex-col bg-[#fbfbf9] text-neutral-900 selection:bg-neutral-900 selection:text-white">
      {/* 3-Zone Strict Top Bar */}
      <Navbar
        onNavigateHome={handleNavigateHome}
        onNavigateSaved={handleNavigateSaved}
        onNavigateKeywordResearch={handleNavigateKeywordResearch}
        onNavigateSEOReport={handleNavigateSEOReport}
        onOpenSearch={handleOpenSearch}
        onOpenCharter={() => setIsCharterOpen(true)}
        onScrollToNewsletter={handleScrollToNewsletter}
        onSelectCategory={handleSelectCategory}
        savedCount={savedArticleIds.length}
        currentView={currentView}
      />

      <main className="flex-1">
        {/* VIEW 1: HOME PAGE */}
        {currentView === 'home' && (
          <div>
            {/* Featured Article Section */}
            {selectedCategory === 'All' && !searchQuery && (
              <HeroFeatured
                article={ARTICLES[0]}
                onReadArticle={handleReadArticle}
                isSaved={savedArticleIds.includes(ARTICLES[0].id)}
                onToggleSave={handleToggleSave}
              />
            )}

            {/* SEO Assignment Quick Jump Banner */}
            <div className="bg-neutral-100/80 border-b border-neutral-200 py-3 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-neutral-700">
                  <span className="font-bold uppercase tracking-wider text-neutral-900 font-mono">
                    SEO Assignment Navigation:
                  </span>
                  <span>Explore the keyword research table and verified implementation checklist.</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleNavigateKeywordResearch}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-neutral-200 rounded text-neutral-900 font-semibold hover:bg-neutral-50 transition-colors cursor-pointer"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5 text-neutral-700" />
                    <span>Keyword Research Matrix (Step 2)</span>
                  </button>
                  <button
                    onClick={handleNavigateSEOReport}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-950 text-white rounded font-semibold hover:bg-neutral-800 transition-colors cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>SEO Assignment Report (Step 5)</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Articles Explorer Grid Container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
              {/* Category Filter & Instant Search */}
              <SearchAndFilterBar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                sortBy={sortBy}
                onSortChange={setSortBy}
                categories={categories}
                totalResults={filteredArticles.length}
              />

              {/* Section Header */}
              <div className="flex items-baseline justify-between border-b border-neutral-200 pb-3">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-serif-editorial font-bold text-neutral-950">
                    {selectedCategory === 'All' ? 'All 10 Strategic Articles' : `${selectedCategory}`}
                  </h2>
                  <span className="text-xs text-neutral-400 font-mono tabular-nums">
                    ({filteredArticles.length})
                  </span>
                </div>
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All');
                    }}
                    className="inline-flex items-center gap-1 text-xs text-neutral-500 hover:text-neutral-900 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset Filters</span>
                  </button>
                )}
              </div>

              {/* 10 Articles Grid */}
              {filteredArticles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {filteredArticles.map((article) => (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      onRead={handleReadArticle}
                      isSaved={savedArticleIds.includes(article.id)}
                      onToggleSave={handleToggleSave}
                    />
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center bg-white border border-neutral-200 rounded-xl space-y-4 max-w-lg mx-auto">
                  <Search className="w-8 h-8 text-neutral-300 mx-auto" />
                  <h3 className="text-base font-serif-editorial font-bold text-neutral-900">
                    No articles found
                  </h3>
                  <p className="text-xs text-neutral-500">
                    No matches found for "{searchQuery}". Try searching for terms like "GEO", "Attribution", "ROAS", "Retention", or "Agents".
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All');
                    }}
                    className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-neutral-950 rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
                  >
                    View All 10 Articles
                  </button>
                </div>
              )}
            </div>

            {/* Answer Engine Optimization (AEO) Homepage Section */}
            <HomepageAEOSection />

            {/* Newsletter Dispatch Component */}
            <NewsletterSection />
          </div>
        )}

        {/* VIEW 2: DEDICATED FULL ARTICLE VIEW */}
        {currentView === 'article' && (
          <ArticleView
            article={currentArticle}
            onBack={handleNavigateHome}
            onSelectArticle={handleReadArticle}
            isSaved={savedArticleIds.includes(currentArticle.id)}
            onToggleSave={handleToggleSave}
            allArticles={ARTICLES}
          />
        )}

        {/* VIEW 3: STEP 2 KEYWORD RESEARCH TABLE VIEW */}
        {currentView === 'keyword-research' && (
          <SEOKeywordResearch
            onBackToHome={handleNavigateHome}
            onReadArticle={handleReadArticle}
            onOpenReport={handleNavigateSEOReport}
          />
        )}

        {/* VIEW 4: STEP 5 SEO ASSIGNMENT REPORT VIEW */}
        {currentView === 'seo-report' && (
          <SEOAssignmentReport
            onBackToHome={handleNavigateHome}
            onNavigateKeywordTable={handleNavigateKeywordResearch}
            onReadArticle={handleReadArticle}
          />
        )}

        {/* VIEW 5: SAVED READING LIST */}
        {currentView === 'saved' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
            <div className="flex items-center justify-between pb-6 border-b border-neutral-200">
              <div className="space-y-1">
                <button
                  onClick={handleNavigateHome}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-600 hover:text-neutral-950 transition-colors cursor-pointer mb-2"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to All Articles</span>
                </button>
                <h1 className="text-3xl font-serif-editorial font-bold text-neutral-950">
                  Your Saved Reading List
                </h1>
                <p className="text-xs text-neutral-500">
                  Articles bookmarked for offline review, strategy decks, and citation.
                </p>
              </div>

              {savedArticles.length > 0 && (
                <button
                  onClick={() => setSavedArticleIds([])}
                  className="text-xs text-neutral-500 hover:text-rose-600 transition-colors cursor-pointer"
                >
                  Clear All ({savedArticles.length})
                </button>
              )}
            </div>

            {savedArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {savedArticles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    onRead={handleReadArticle}
                    isSaved={true}
                    onToggleSave={handleToggleSave}
                  />
                ))}
              </div>
            ) : (
              <div className="p-16 text-center bg-white border border-neutral-200 rounded-xl space-y-4 max-w-md mx-auto">
                <Bookmark className="w-10 h-10 text-neutral-300 mx-auto" />
                <h2 className="text-lg font-serif-editorial font-bold text-neutral-900">
                  No Saved Articles Yet
                </h2>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  Click the bookmark icon on any of the 10 articles to save them here for quick access during your campaign planning.
                </p>
                <button
                  onClick={handleNavigateHome}
                  className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-neutral-950 rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  Browse Articles
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Editorial Independence Charter Modal */}
      <EditorialCharterModal
        isOpen={isCharterOpen}
        onClose={() => setIsCharterOpen(false)}
      />

      {/* Global Footer */}
      <Footer
        onSelectCategory={handleSelectCategory}
        onOpenCharter={() => setIsCharterOpen(true)}
        onNavigateHome={handleNavigateHome}
        onNavigateKeywordResearch={handleNavigateKeywordResearch}
        onNavigateSEOReport={handleNavigateSEOReport}
      />
    </div>
  );
}
