import React, { useState } from 'react';
import { Bookmark, Search, Menu, X, ArrowUpRight, FileSpreadsheet, FileText } from 'lucide-react';

interface NavbarProps {
  onNavigateHome: () => void;
  onNavigateSaved: () => void;
  onNavigateKeywordResearch: () => void;
  onNavigateSEOReport: () => void;
  onOpenSearch: () => void;
  onOpenCharter: () => void;
  onScrollToNewsletter: () => void;
  onSelectCategory: (category: string) => void;
  savedCount: number;
  currentView: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigateHome,
  onNavigateSaved,
  onNavigateKeywordResearch,
  onNavigateSEOReport,
  onOpenSearch,
  onOpenCharter,
  onScrollToNewsletter,
  onSelectCategory,
  savedCount,
  currentView,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (action: () => void) => {
    action();
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#fbfbf9]/95 backdrop-blur-md border-b border-neutral-200/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 h-18">
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={onNavigateHome}
            className="text-left group flex items-baseline gap-2 cursor-pointer focus:outline-none shrink-0"
          >
            <span className="text-2xl font-serif-editorial font-bold tracking-tight text-neutral-900 group-hover:text-neutral-700 transition-colors">
              BLOGS VERT
            </span>
            <span className="text-xs uppercase tracking-widest text-neutral-500 font-medium hidden sm:inline font-mono">
              Digital Marketing & AI
            </span>
          </button>

          {/* Zone 2: Clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-neutral-600">
            <button
              onClick={onNavigateHome}
              className={`hover:text-neutral-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                currentView === 'home' ? 'text-neutral-950 font-semibold' : ''
              }`}
            >
              All Articles (10)
            </button>
            <button
              onClick={onNavigateKeywordResearch}
              className={`hover:text-neutral-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1 ${
                currentView === 'keyword-research' ? 'text-neutral-950 font-semibold' : ''
              }`}
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-neutral-700" />
              <span>SEO Keyword Research</span>
            </button>
            <button
              onClick={onNavigateSEOReport}
              className={`hover:text-neutral-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1 ${
                currentView === 'seo-report' ? 'text-neutral-950 font-semibold' : ''
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-neutral-700" />
              <span>SEO Assignment Report</span>
            </button>
            <button
              onClick={() => onSelectCategory('Search & SEO')}
              className="hover:text-neutral-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Search & SEO
            </button>
            <button
              onClick={onOpenCharter}
              className="hover:text-neutral-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Editorial Charter
            </button>
          </nav>

          {/* Zone 3: 1 primary action & utility icons */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenSearch}
              aria-label="Search articles"
              className="p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
              title="Quick Search"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              onClick={onNavigateSaved}
              aria-label="Saved reading list"
              className={`relative p-2 rounded-lg transition-colors cursor-pointer ${
                currentView === 'saved'
                  ? 'text-neutral-950 bg-neutral-200/70'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
              }`}
              title="Saved Articles"
            >
              <Bookmark className="w-4 h-4" />
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-neutral-900 text-white text-[10px] font-semibold flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>

            <button
              onClick={onScrollToNewsletter}
              className="hidden sm:inline-flex items-center gap-1 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-neutral-900 rounded-md hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <span>Subscribe</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
            </button>

            {/* Mobile menu toggle button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-600 hover:text-neutral-900 rounded-lg cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation drop-down drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-neutral-200 bg-[#fbfbf9] px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-2 text-base font-medium text-neutral-700">
            <button
              onClick={() => handleNavClick(onNavigateHome)}
              className="text-left px-3 py-2 rounded-md hover:bg-neutral-100 transition-colors"
            >
              All Articles (10)
            </button>
            <button
              onClick={() => handleNavClick(onNavigateKeywordResearch)}
              className="text-left px-3 py-2 rounded-md bg-neutral-100 font-semibold text-neutral-900 flex items-center gap-2"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>SEO Keyword Research (Step 2)</span>
            </button>
            <button
              onClick={() => handleNavClick(onNavigateSEOReport)}
              className="text-left px-3 py-2 rounded-md bg-neutral-100 font-semibold text-neutral-900 flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>SEO Assignment Report (Step 5)</span>
            </button>
            <button
              onClick={() => handleNavClick(() => onSelectCategory('Search & SEO'))}
              className="text-left px-3 py-2 rounded-md hover:bg-neutral-100 transition-colors"
            >
              Search & SEO (GEO)
            </button>
            <button
              onClick={() => handleNavClick(() => onSelectCategory('Customer Experience'))}
              className="text-left px-3 py-2 rounded-md hover:bg-neutral-100 transition-colors"
            >
              Customer Experience & Agents
            </button>
            <button
              onClick={() => handleNavClick(onNavigateSaved)}
              className="text-left px-3 py-2 rounded-md hover:bg-neutral-100 transition-colors flex items-center justify-between"
            >
              <span>Saved Reading List</span>
              <span className="text-xs font-semibold px-2 py-0.5 bg-neutral-200 rounded text-neutral-800">
                {savedCount}
              </span>
            </button>
            <button
              onClick={() => handleNavClick(onOpenCharter)}
              className="text-left px-3 py-2 rounded-md hover:bg-neutral-100 transition-colors"
            >
              Editorial Charter & Standards
            </button>
            <div className="pt-2">
              <button
                onClick={() => handleNavClick(onScrollToNewsletter)}
                className="w-full text-center px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-neutral-900 rounded-md"
              >
                Subscribe to Weekly Intelligence Briefing
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
