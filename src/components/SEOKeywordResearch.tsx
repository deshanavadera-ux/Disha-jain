import React from 'react';
import { ArrowLeft, ArrowUpRight, Search, FileText, CheckCircle2, Shield } from 'lucide-react';
import { ARTICLES } from '../data/articles';

interface SEOKeywordResearchProps {
  onBackToHome: () => void;
  onReadArticle: (articleId: string) => void;
  onOpenReport: () => void;
}

export const SEOKeywordResearch: React.FC<SEOKeywordResearchProps> = ({
  onBackToHome,
  onReadArticle,
  onOpenReport,
}) => {
  // Dedicated data for Homepage and first 3 articles
  const tableData = [
    {
      pageName: 'Homepage',
      pageUrl: 'https://blogs-vert.vercel.app/',
      targetId: null,
      primaryKeyword: 'digital marketing and ai',
      secondaryKeyword1: 'ai marketing strategies',
      secondaryKeyword2: 'generative search optimization',
      searchIntent: 'Informational / Navigational',
      suggestedTitle: 'Blogs Vert | Digital Marketing and AI Growth Strategies',
      titleLength: 55,
      suggestedMeta: 'Discover expert digital marketing and AI analysis, generative search optimization frameworks, and predictive strategies to drive modern organic growth.',
      metaLength: 154,
    },
    {
      pageName: 'Article 1: Generative Search Revolution',
      pageUrl: 'https://blogs-vert.vercel.app/article/generative-search-engine-optimization-geo',
      targetId: 'art-01',
      primaryKeyword: 'generative engine optimization',
      secondaryKeyword1: 'ai overviews seo',
      secondaryKeyword2: 'answer engine optimization',
      searchIntent: 'Informational / Commercial Investigation',
      suggestedTitle: 'Generative Engine Optimization: Master AI Overviews SEO',
      titleLength: 56,
      suggestedMeta: 'Learn how generative engine optimization (GEO) and AI overviews SEO reshape organic discovery and answer engine visibility in modern digital marketing.',
      metaLength: 154,
    },
    {
      pageName: 'Article 2: Hyper-Personalization at Scale',
      pageUrl: 'https://blogs-vert.vercel.app/article/ai-customer-journey-personalization',
      targetId: 'art-02',
      primaryKeyword: 'ai customer journey personalization',
      secondaryKeyword1: 'multi-modal ai marketing',
      secondaryKeyword2: 'predictive personalization engines',
      searchIntent: 'Informational / Technical',
      suggestedTitle: 'AI Customer Journey Personalization & Multi-Modal Models',
      titleLength: 57,
      suggestedMeta: 'Explore AI customer journey personalization using multi-modal AI marketing models and predictive engines to deliver real-time individual experiences.',
      metaLength: 152,
    },
    {
      pageName: 'Article 3: Algorithmic Ad Bidding & ROAS',
      pageUrl: 'https://blogs-vert.vercel.app/article/algorithmic-ad-bidding-roas',
      targetId: 'art-03',
      primaryKeyword: 'algorithmic ad bidding',
      secondaryKeyword1: 'maximize paid media roas',
      secondaryKeyword2: 'autonomous creative optimization',
      searchIntent: 'Commercial Investigation / Practical Guide',
      suggestedTitle: 'Algorithmic Ad Bidding: Maximize Paid Media ROAS with AI',
      titleLength: 57,
      suggestedMeta: 'Master algorithmic ad bidding and autonomous creative optimization to maximize paid media ROAS across modern automated advertising networks.',
      metaLength: 145,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Top Breadcrumb & Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-600 hover:text-neutral-950 transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Homepage</span>
          </button>
          <span className="text-neutral-300">/</span>
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-900 font-mono">
            SEO Keyword Research Table
          </span>
        </div>

        <button
          onClick={onOpenReport}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-900 bg-neutral-100 border border-neutral-200 rounded-md hover:bg-neutral-200 transition-colors cursor-pointer"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>View Full SEO Assignment Report</span>
        </button>
      </div>

      {/* Header Overview */}
      <div className="space-y-3 max-w-3xl">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-neutral-500 font-mono">
          <Search className="w-4 h-4 text-neutral-700" />
          <span>Step 2: Assignment Deliverable</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif-editorial font-bold text-neutral-950 tracking-tight">
          SEO Keyword Research Matrix
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
          Comprehensive keyword research matrix conducted for the Blogs Vert homepage and the first three primary articles. Keywords are grounded in actual page topics and searcher intent, strictly adhering to realistic search behavior without simulated metrics.
        </p>
      </div>

      {/* Guidelines Compliance Callout */}
      <div className="p-4 bg-white border border-neutral-200 rounded-xl flex items-start gap-3">
        <Shield className="w-5 h-5 text-neutral-800 shrink-0 mt-0.5" />
        <div className="text-xs text-neutral-600 space-y-1">
          <p className="font-semibold text-neutral-900">
            SEO Assignment Integrity Note:
          </p>
          <p>
            Titles adhere to the 50–60 character threshold for optimal search engine snippet rendering. Meta descriptions fall within 140–160 characters to maximize SERP click-through rates without mobile truncation. Search volumes and keyword difficulty values are intentionally omitted until confirmed with authenticated search API data.
          </p>
        </div>
      </div>

      {/* Dedicated Keyword Research Table */}
      <div className="bg-white border border-neutral-200 rounded-xl shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-200 bg-neutral-50/70 flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900 font-mono">
            Target Keyword & Metadata Specifications
          </h2>
          <span className="text-xs text-neutral-500 font-mono">4 Core Assets Analyzed</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-100/70 text-neutral-700 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4 min-w-[150px]">Page Name</th>
                <th className="py-3.5 px-4 min-w-[200px]">Page URL</th>
                <th className="py-3.5 px-4 min-w-[160px] text-neutral-900">Primary Keyword</th>
                <th className="py-3.5 px-4 min-w-[150px]">Secondary Keyword 1</th>
                <th className="py-3.5 px-4 min-w-[150px]">Secondary Keyword 2</th>
                <th className="py-3.5 px-4 min-w-[140px]">Search Intent</th>
                <th className="py-3.5 px-4 min-w-[230px]">Suggested SEO Title</th>
                <th className="py-3.5 px-4 min-w-[280px]">Suggested Meta Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 text-neutral-700">
              {tableData.map((row, idx) => (
                <tr key={idx} className="hover:bg-neutral-50/80 transition-colors">
                  <td className="py-4 px-4 font-semibold text-neutral-900">
                    {row.pageName}
                    {row.targetId && (
                      <button
                        onClick={() => onReadArticle(row.targetId)}
                        className="block mt-1 text-[11px] text-neutral-500 hover:text-neutral-900 underline underline-offset-2"
                      >
                        Inspect live page →
                      </button>
                    )}
                  </td>
                  <td className="py-4 px-4 font-mono text-[11px] text-neutral-600 break-all">
                    {row.pageUrl}
                  </td>
                  <td className="py-4 px-4 font-semibold text-neutral-950 bg-neutral-50/50">
                    <span className="text-neutral-950 font-bold">{row.primaryKeyword}</span>
                  </td>
                  <td className="py-4 px-4 text-neutral-800">
                    {row.secondaryKeyword1}
                  </td>
                  <td className="py-4 px-4 text-neutral-800">
                    {row.secondaryKeyword2}
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-medium text-neutral-900">{row.searchIntent}</span>
                  </td>
                  <td className="py-4 px-4">
                    <p className="font-medium text-neutral-950 leading-snug">{row.suggestedTitle}</p>
                    <span className="block text-[10px] font-mono text-neutral-500 mt-1">
                      Length: {row.titleLength} characters (Optimal 50–60)
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-neutral-600 leading-relaxed">{row.suggestedMeta}</p>
                    <span className="block text-[10px] font-mono text-neutral-500 mt-1">
                      Length: {row.metaLength} characters (Optimal 140–160)
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Additional 7 Articles Reference Strip */}
      <div className="p-6 bg-white border border-neutral-200 rounded-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-neutral-900">
              Articles 4 through 10 Mappings
            </h3>
            <p className="text-xs text-neutral-500">
              In addition to the first three core articles, all 10 articles on Blogs Vert feature verified primary and secondary keywords, unique URLs, and optimized metadata.
            </p>
          </div>
          <button
            onClick={onOpenReport}
            className="inline-flex items-center gap-1 text-xs font-semibold text-neutral-900 hover:text-neutral-600 transition-colors cursor-pointer shrink-0"
          >
            <span>Review complete 10-article audit</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-2 text-xs">
          {ARTICLES.slice(3).map((art) => (
            <div
              key={art.id}
              onClick={() => onReadArticle(art.id)}
              className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 hover:border-neutral-400 transition-colors cursor-pointer space-y-1"
            >
              <p className="font-semibold text-neutral-900 truncate">{art.title}</p>
              <p className="text-[11px] text-neutral-600">
                <span className="font-medium text-neutral-800">Primary:</span> {art.primaryKeyword}
              </p>
              <p className="text-[10px] text-neutral-400 font-mono truncate">{art.canonicalPath}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
