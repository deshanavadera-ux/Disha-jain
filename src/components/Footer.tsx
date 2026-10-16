import React from 'react';
import { ArrowUp, Rss, FileSpreadsheet, FileText, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onSelectCategory: (category: string) => void;
  onOpenCharter: () => void;
  onNavigateHome: () => void;
  onNavigateKeywordResearch: () => void;
  onNavigateSEOReport: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenCharter,
  onNavigateHome,
  onNavigateKeywordResearch,
  onNavigateSEOReport,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#f5f5f2] border-t border-neutral-200 text-neutral-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-neutral-200">
          {/* Brand Col */}
          <div className="md:col-span-4 space-y-3">
            <button
              onClick={onNavigateHome}
              className="text-left group cursor-pointer focus:outline-none"
            >
              <span className="text-xl font-serif-editorial font-bold tracking-tight text-neutral-900">
                BLOGS VERT
              </span>
            </button>
            <p className="text-neutral-500 max-w-sm leading-relaxed">
              The premier editorial publication dissecting generative search, algorithmic paid media, autonomous customer journeys, and predictive marketing science.
            </p>
            <div className="flex items-center gap-3 pt-2 text-neutral-500">
              <span className="inline-flex items-center gap-1 font-mono text-[11px]">
                <Rss className="w-3.5 h-3.5" />
                <span>RSS Feed 2.0</span>
              </span>
              <span>·</span>
              <span className="text-[11px] font-mono">Vol. IV · 2026 Edition</span>
            </div>
          </div>

          {/* SEO Assignment Navigation Col */}
          <div className="md:col-span-3 space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 font-mono">
              SEO Assignment Links
            </h4>
            <ul className="space-y-1.5 text-neutral-600">
              <li>
                <button
                  onClick={onNavigateKeywordResearch}
                  className="hover:text-neutral-950 transition-colors cursor-pointer flex items-center gap-1.5 font-medium"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-neutral-500" />
                  <span>SEO Keyword Research (Step 2)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onNavigateSEOReport}
                  className="hover:text-neutral-950 transition-colors cursor-pointer flex items-center gap-1.5 font-medium"
                >
                  <FileText className="w-3.5 h-3.5 text-neutral-500" />
                  <span>SEO Assignment Report (Step 5)</span>
                </button>
              </li>
              <li>
                <a
                  href="/sitemap.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-neutral-950 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>XML Sitemap (/sitemap.xml)</span>
                </a>
              </li>
              <li>
                <a
                  href="/robots.txt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-neutral-950 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>Robots.txt (/robots.txt)</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Topics Col */}
          <div className="md:col-span-3 space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 font-mono">
              Research Categories
            </h4>
            <ul className="space-y-1.5 text-neutral-600">
              <li>
                <button
                  onClick={() => onSelectCategory('Search & SEO')}
                  className="hover:text-neutral-950 transition-colors cursor-pointer"
                >
                  Generative Engine Optimization (GEO)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Customer Experience')}
                  className="hover:text-neutral-950 transition-colors cursor-pointer"
                >
                  Multi-Modal Customer Personalization
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Paid Media & Ads')}
                  className="hover:text-neutral-950 transition-colors cursor-pointer"
                >
                  Autonomous Creative & Algorithmic Ads
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Analytics & Data')}
                  className="hover:text-neutral-950 transition-colors cursor-pointer"
                >
                  Predictive Churn & Attribution Science
                </button>
              </li>
            </ul>
          </div>

          {/* Editorial Integrity Col */}
          <div className="md:col-span-2 space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 font-mono">
              Integrity
            </h4>
            <ul className="space-y-1.5 text-neutral-600">
              <li>
                <button
                  onClick={onOpenCharter}
                  className="hover:text-neutral-950 transition-colors cursor-pointer"
                >
                  Editorial Charter
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenCharter}
                  className="hover:text-neutral-950 transition-colors cursor-pointer"
                >
                  C2PA Standards
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-500">
          <p>© 2026 Blogs Vert Publishing Group. All editorial and academic rights reserved.</p>
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-700 hover:text-neutral-950 transition-colors cursor-pointer"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
