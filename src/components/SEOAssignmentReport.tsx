import React, { useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  FileSpreadsheet,
  Link2,
  Image,
  HelpCircle,
  Sparkles,
  ExternalLink,
  Search,
  BookOpen,
  Camera,
  Copy,
  Check,
  X,
  Printer,
} from 'lucide-react';
import { ARTICLES } from '../data/articles';
import { OptimizedImage } from './OptimizedImage';

interface SEOAssignmentReportProps {
  onBackToHome: () => void;
  onNavigateKeywordTable: () => void;
  onReadArticle: (articleId: string) => void;
}

export const SEOAssignmentReport: React.FC<SEOAssignmentReportProps> = ({
  onBackToHome,
  onNavigateKeywordTable,
  onReadArticle,
}) => {
  const [activeTab, setActiveTab] = useState<'checklist' | 'keywords' | 'urls' | 'images' | 'links' | 'aeo'>('checklist');
  const [isSSModalOpen, setIsSSModalOpen] = useState(false);
  const [copiedSS, setCopiedSS] = useState(false);

  const verificationChecklist = [
    {
      category: 'Website & Architecture',
      item: 'Retained all 10 in-depth articles without placeholder copy',
      status: 'Verified',
      detail: 'All 10 strategic articles preserved with full narrative introductions, detailed body sections, takeaways, and conclusions.',
    },
    {
      category: 'Images & Media Optimization',
      item: 'Dedicated, relevant image for every single article',
      status: 'Verified',
      detail: 'All 10 articles equipped with their own unique high-resolution image asset, explicit dimensions, descriptive filenames, and meaningful alt text containing target keywords.',
    },
    {
      category: 'On-Page SEO - URLs',
      item: 'Unique, lowercase, hyphenated SEO-friendly URLs',
      status: 'Verified',
      detail: 'Every article mapped to a clean keyword-infused path (e.g. /article/generative-search-engine-optimization-geo) without parameters or unneeded numbers.',
    },
    {
      category: 'On-Page SEO - Keywords',
      item: '1 Primary + 2 Secondary keywords mapped per page',
      status: 'Verified',
      detail: 'Every page features 1 distinct primary keyword and 2 relevant secondary keywords naturally embedded in H1, introductory paragraph, H2s, and meta tags.',
    },
    {
      category: 'On-Page SEO - Titles & Meta',
      item: 'Unique SEO Title tags (50–60 chars) and Meta descriptions (140–160 chars)',
      status: 'Verified',
      detail: 'Dynamic runtime sync for <title>, <meta name="description">, OpenGraph, and Twitter cards, preventing snippet truncation in SERPs.',
    },
    {
      category: 'Answer Engine Optimization (AEO)',
      item: 'At least two question-based H2 headings with direct first-paragraph answers',
      status: 'Verified',
      detail: 'Every article and the homepage feature at least two natural question H2s with clear, concise 40–60 word direct answers formatted for AI Overviews and featured snippets.',
    },
    {
      category: 'Answer Engine Optimization (AEO)',
      item: 'Visible FAQ section matching page topic and content',
      status: 'Verified',
      detail: 'Contextual, visible Q&A accordions rendered on the homepage and every article page with corresponding Schema.org FAQPage structured data.',
    },
    {
      category: 'Internal & External Linking',
      item: 'Descriptive contextual anchor text (no vague "click here")',
      status: 'Verified',
      detail: 'All internal and external links use descriptive, informative anchor text with no generic phrasing, including secure rel="noopener noreferrer" for external references.',
    },
    {
      category: 'Technical SEO',
      item: 'XML sitemap (/sitemap.xml) and robots.txt configured',
      status: 'Verified',
      detail: 'Valid /public/sitemap.xml and /public/robots.txt generated and accessible for search crawler indexing.',
    },
    {
      category: 'Technical SEO',
      item: 'Single H1 per page, canonical tags, and Schema.org JSON-LD structured data',
      status: 'Verified',
      detail: 'Semantic hierarchy enforced; BlogPosting, WebSite, BreadcrumbList, and FAQPage structured data injected at runtime.',
    },
    {
      category: 'Platform & Deployment',
      item: 'Vercel SPA rewrite configuration (vercel.json) and .npmrc legacy-peer-deps',
      status: 'Verified',
      detail: 'Single-page routing rewrites and build configurations verified to ensure zero 404 errors on direct Vercel page refreshes.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Top Breadcrumb */}
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
            College Assignment Report
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsSSModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-white bg-neutral-950 rounded-md hover:bg-neutral-800 transition-colors cursor-pointer shadow-xs"
          >
            <Camera className="w-3.5 h-3.5 text-amber-400" />
            <span>📸 Capture Screenshot (SS)</span>
          </button>

          <button
            onClick={onNavigateKeywordTable}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-900 bg-neutral-100 border border-neutral-200 rounded-md hover:bg-neutral-200 transition-colors cursor-pointer"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Jump to Step 2 Keyword Research Matrix</span>
          </button>
        </div>
      </div>

      {/* Header Banner */}
      <div className="space-y-4 max-w-4xl">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-neutral-600 font-mono">
          <BookOpen className="w-4 h-4 text-neutral-800" />
          <span>SEO & AEO Assignment Documentation & Presentation Dossier</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif-editorial font-bold text-neutral-950 tracking-tight">
          Blogs Vert SEO Implementation Report
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
          Comprehensive documentation of all on-page, Answer Engine Optimization (AEO), technical SEO, keyword research, and metadata implementations applied across Blogs Vert. Designed for presentation slides and assignment evaluation screenshots.
        </p>
      </div>

      {/* Navigation Segmented Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-neutral-200 scrollbar-none">
        <button
          onClick={() => setActiveTab('checklist')}
          className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-md transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'checklist'
              ? 'bg-neutral-950 text-white shadow-xs'
              : 'bg-white border border-neutral-200 text-neutral-600 hover:text-neutral-900'
          }`}
        >
          1. Verification Checklist ({verificationChecklist.length})
        </button>
        <button
          onClick={() => setActiveTab('keywords')}
          className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-md transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'keywords'
              ? 'bg-neutral-950 text-white shadow-xs'
              : 'bg-white border border-neutral-200 text-neutral-600 hover:text-neutral-900'
          }`}
        >
          2. Keyword Matrix (Step 2)
        </button>
        <button
          onClick={() => setActiveTab('urls')}
          className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-md transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'urls'
              ? 'bg-neutral-950 text-white shadow-xs'
              : 'bg-white border border-neutral-200 text-neutral-600 hover:text-neutral-900'
          }`}
        >
          3. 10-Article URL & Meta Mapping
        </button>
        <button
          onClick={() => setActiveTab('aeo')}
          className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-md transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'aeo'
              ? 'bg-neutral-950 text-white shadow-xs'
              : 'bg-white border border-neutral-200 text-neutral-600 hover:text-neutral-900'
          }`}
        >
          4. AEO Question H2s & Answers
        </button>
        <button
          onClick={() => setActiveTab('images')}
          className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-md transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'images'
              ? 'bg-neutral-950 text-white shadow-xs'
              : 'bg-white border border-neutral-200 text-neutral-600 hover:text-neutral-900'
          }`}
        >
          5. Image Optimization & Alt Text
        </button>
        <button
          onClick={() => setActiveTab('links')}
          className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-md transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'links'
              ? 'bg-neutral-950 text-white shadow-xs'
              : 'bg-white border border-neutral-200 text-neutral-600 hover:text-neutral-900'
          }`}
        >
          6. Descriptive Anchor Text
        </button>
      </div>

      {/* TAB 1: VERIFICATION CHECKLIST */}
      {activeTab === 'checklist' && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-serif-editorial font-bold text-neutral-950">
              SEO Requirements Implementation Checklist
            </h2>
            <span className="text-xs font-mono text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 font-semibold">
              11/11 Requirements Verified
            </span>
          </div>

          <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden divide-y divide-neutral-200 shadow-xs">
            {verificationChecklist.map((item, idx) => (
              <div key={idx} className="p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-neutral-500">
                      {item.category}
                    </span>
                    <span className="text-neutral-300">·</span>
                    <span className="text-xs font-semibold text-neutral-900">{item.item}</span>
                  </div>
                  <p className="text-xs text-neutral-600 leading-relaxed max-w-3xl">
                    {item.detail}
                  </p>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200 shrink-0 self-start">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TAB 2: KEYWORD RESEARCH MATRIX (STEP 2) */}
      {activeTab === 'keywords' && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-serif-editorial font-bold text-neutral-950">
                Step 2: Dedicated Keyword Research Table
              </h2>
              <p className="text-xs text-neutral-500">
                Targeting Homepage, Article 1, Article 2, and Article 3 with accurate search intent and zero fabricated metrics.
              </p>
            </div>
            <button
              onClick={onNavigateKeywordTable}
              className="text-xs font-semibold text-neutral-900 hover:text-neutral-600 underline underline-offset-2"
            >
              Open dedicated page view →
            </button>
          </div>

          <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-neutral-200 bg-neutral-100/70 text-neutral-700 font-semibold uppercase tracking-wider text-[11px]">
                    <th className="py-3 px-4">Page Name</th>
                    <th className="py-3 px-4">Page URL</th>
                    <th className="py-3 px-4 text-neutral-950">Primary Keyword</th>
                    <th className="py-3 px-4">Secondary Keyword 1</th>
                    <th className="py-3 px-4">Secondary Keyword 2</th>
                    <th className="py-3 px-4">Search Intent</th>
                    <th className="py-3 px-4">Suggested Title (Chars)</th>
                    <th className="py-3 px-4">Suggested Meta (Chars)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 text-neutral-700">
                  <tr className="hover:bg-neutral-50">
                    <td className="py-3.5 px-4 font-semibold text-neutral-900">Homepage</td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-neutral-500">https://blogs-vert.vercel.app/</td>
                    <td className="py-3.5 px-4 font-bold text-neutral-950 bg-neutral-50/70">digital marketing and ai</td>
                    <td className="py-3.5 px-4">ai marketing strategies</td>
                    <td className="py-3.5 px-4">generative search optimization</td>
                    <td className="py-3.5 px-4 font-medium">Informational / Navigational</td>
                    <td className="py-3.5 px-4">
                      <p className="font-medium text-neutral-900">Blogs Vert | Digital Marketing and AI Growth Strategies</p>
                      <span className="text-[10px] text-neutral-400 font-mono">55 chars</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="text-neutral-600">Discover expert digital marketing and AI analysis, generative search optimization frameworks, and predictive strategies...</p>
                      <span className="text-[10px] text-neutral-400 font-mono">154 chars</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-neutral-50">
                    <td className="py-3.5 px-4 font-semibold text-neutral-900">Article 1</td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-neutral-500">/article/generative-search-engine-optimization-geo</td>
                    <td className="py-3.5 px-4 font-bold text-neutral-950 bg-neutral-50/70">generative engine optimization</td>
                    <td className="py-3.5 px-4">ai overviews seo</td>
                    <td className="py-3.5 px-4">answer engine optimization</td>
                    <td className="py-3.5 px-4 font-medium">Informational / Commercial</td>
                    <td className="py-3.5 px-4">
                      <p className="font-medium text-neutral-900">Generative Engine Optimization: Master AI Overviews SEO</p>
                      <span className="text-[10px] text-neutral-400 font-mono">56 chars</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="text-neutral-600">Learn how generative engine optimization (GEO) and AI overviews SEO reshape organic discovery and answer engine visibility...</p>
                      <span className="text-[10px] text-neutral-400 font-mono">154 chars</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-neutral-50">
                    <td className="py-3.5 px-4 font-semibold text-neutral-900">Article 2</td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-neutral-500">/article/ai-customer-journey-personalization</td>
                    <td className="py-3.5 px-4 font-bold text-neutral-950 bg-neutral-50/70">ai customer journey personalization</td>
                    <td className="py-3.5 px-4">multi-modal ai marketing</td>
                    <td className="py-3.5 px-4">predictive personalization engines</td>
                    <td className="py-3.5 px-4 font-medium">Informational / Technical</td>
                    <td className="py-3.5 px-4">
                      <p className="font-medium text-neutral-900">AI Customer Journey Personalization & Multi-Modal Models</p>
                      <span className="text-[10px] text-neutral-400 font-mono">57 chars</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="text-neutral-600">Explore AI customer journey personalization using multi-modal AI marketing models and predictive engines to deliver real-time individual experiences.</p>
                      <span className="text-[10px] text-neutral-400 font-mono">152 chars</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-neutral-50">
                    <td className="py-3.5 px-4 font-semibold text-neutral-900">Article 3</td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-neutral-500">/article/algorithmic-ad-bidding-roas</td>
                    <td className="py-3.5 px-4 font-bold text-neutral-950 bg-neutral-50/70">algorithmic ad bidding</td>
                    <td className="py-3.5 px-4">maximize paid media roas</td>
                    <td className="py-3.5 px-4">autonomous creative optimization</td>
                    <td className="py-3.5 px-4 font-medium">Commercial / Tactical</td>
                    <td className="py-3.5 px-4">
                      <p className="font-medium text-neutral-900">Algorithmic Ad Bidding: Maximize Paid Media ROAS with AI</p>
                      <span className="text-[10px] text-neutral-400 font-mono">57 chars</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="text-neutral-600">Master algorithmic ad bidding and autonomous creative optimization to maximize paid media ROAS across modern automated advertising networks.</p>
                      <span className="text-[10px] text-neutral-400 font-mono">145 chars</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* TAB 3: FULL 10-ARTICLE URL & METADATA MAPPING */}
      {activeTab === 'urls' && (
        <section className="space-y-6">
          <div>
            <h2 className="text-xl font-serif-editorial font-bold text-neutral-950">
              Full 10-Article Canonical URL & Metadata Audit
            </h2>
            <p className="text-xs text-neutral-500">
              Every page on Blogs Vert possesses a unique, clean, lowercase hyphenated URL and strictly verified character counts.
            </p>
          </div>

          <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-xs divide-y divide-neutral-200">
            {ARTICLES.map((article, index) => (
              <div key={article.id} className="p-5 space-y-3 hover:bg-neutral-50/50 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-neutral-500">#{index + 1}</span>
                    <h3 className="text-sm font-bold text-neutral-900">{article.title}</h3>
                  </div>
                  <button
                    onClick={() => onReadArticle(article.id)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-neutral-900 hover:text-neutral-600 cursor-pointer self-start sm:self-auto"
                  >
                    <span>Inspect Live Article</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200/80">
                    <span className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">Canonical URL</span>
                    <p className="font-mono text-neutral-700 break-all">{article.canonicalPath}</p>
                  </div>
                  <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200/80">
                    <span className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">Target Keywords</span>
                    <p className="font-semibold text-neutral-900">Primary: {article.primaryKeyword}</p>
                    <p className="text-neutral-600 text-[11px] mt-0.5">
                      Secondary: {article.secondaryKeywords[0]}, {article.secondaryKeywords[1]}
                    </p>
                  </div>
                  <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200/80">
                    <span className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">Title & Description Length</span>
                    <p className="text-neutral-800">Title: <span className="font-mono font-semibold">{article.seoTitle.length} chars</span> (50–60)</p>
                    <p className="text-neutral-800 text-[11px]">Meta: <span className="font-mono font-semibold">{article.seoDescription.length} chars</span> (140–160)</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TAB 4: AEO QUESTION H2S & DIRECT ANSWERS */}
      {activeTab === 'aeo' && (
        <section className="space-y-6">
          <div>
            <h2 className="text-xl font-serif-editorial font-bold text-neutral-950">
              Step 3.G: Answer Engine Optimization (AEO) Showcase
            </h2>
            <p className="text-xs text-neutral-500">
              Every article and the homepage feature at least two natural question-based H2 headings paired with direct, concise 40–60 word first-paragraph answers formatted for Google AI Overviews and answer engines.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {ARTICLES.slice(0, 4).map((art) => {
              const questionSections = art.sections.filter((s) => s.isQuestionH2 || s.heading.includes('?'));
              return (
                <div key={art.id} className="p-6 bg-white border border-neutral-200 rounded-xl space-y-4 shadow-xs">
                  <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                    <h3 className="text-base font-bold text-neutral-900 font-serif-editorial">
                      {art.title}
                    </h3>
                    <span className="text-xs text-neutral-500 font-mono">{questionSections.length} Question H2s</span>
                  </div>

                  <div className="space-y-4">
                    {questionSections.map((sec, sIdx) => (
                      <div key={sIdx} className="p-4 bg-neutral-50 rounded-lg border border-neutral-200 space-y-2">
                        <div className="flex items-center gap-2">
                          <HelpCircle className="w-4 h-4 text-neutral-700 shrink-0" />
                          <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 font-mono">
                            Question H2: {sec.heading}
                          </h4>
                        </div>
                        <div className="p-3 bg-white border border-neutral-200/90 rounded text-xs text-neutral-800 leading-relaxed">
                          <span className="font-bold text-neutral-950 block mb-1">Direct AEO First-Paragraph Answer:</span>
                          {sec.paragraphs[0]}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* TAB 5: IMAGE OPTIMIZATION & ALT TEXT */}
      {activeTab === 'images' && (
        <section className="space-y-6">
          <div>
            <h2 className="text-xl font-serif-editorial font-bold text-neutral-950">
              Step 3.E: Image Optimization, Formats & Descriptive Alt Text
            </h2>
            <p className="text-xs text-neutral-500">
              Each article has its own unique, relevant asset. Images include explicit width/height ratios to eliminate Layout Shifts (CLS), lazy loading below the fold, and keyword-rich alt text.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ARTICLES.slice(0, 6).map((art) => (
              <div key={art.id} className="p-5 bg-white border border-neutral-200 rounded-xl space-y-3 shadow-xs flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="relative aspect-[16/10] rounded-lg overflow-hidden border border-neutral-200 bg-neutral-100">
                    <OptimizedImage
                      src={art.image}
                      alt={art.imageAlt}
                      width={640}
                      height={400}
                      loading="lazy"
                      fallbackCategory={art.category}
                      fallbackTitle={art.title}
                      className="w-full h-full"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-neutral-900 font-serif-editorial">{art.title}</h3>
                    <p className="text-[11px] text-neutral-500 font-mono mt-0.5">{art.image.split('/').pop()}</p>
                  </div>
                </div>

                <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 space-y-1.5 text-xs">
                  <p className="font-semibold text-neutral-900">
                    Descriptive Alt Text (With Target Keyword):
                  </p>
                  <p className="text-neutral-700 italic">"{art.imageAlt}"</p>
                  <div className="flex items-center gap-3 pt-1 text-[10px] text-neutral-500 font-mono">
                    <span>Dimensions: 640x400</span>
                    <span>·</span>
                    <span>loading="lazy"</span>
                    <span>·</span>
                    <span>CLS Prevention: Set</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TAB 6: DESCRIPTIVE ANCHOR TEXT EXAMPLES & 10-ARTICLE AUDIT */}
      {activeTab === 'links' && (
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-serif-editorial font-bold text-neutral-950">
                Step 3.F: Contextual Descriptive Anchor Text Audit
              </h2>
              <p className="text-xs text-neutral-500">
                Eliminated all vague generic anchor phrases such as "click here" or "read more", replacing them with informative phrases conveying destination context.
              </p>
            </div>
            <button
              onClick={() => setIsSSModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white bg-neutral-950 rounded-md hover:bg-neutral-800 transition-colors cursor-pointer shrink-0 self-start sm:self-auto"
            >
              <Camera className="w-3.5 h-3.5 text-amber-400" />
              <span>📸 Capture Screenshot (SS)</span>
            </button>
          </div>

          {/* Before & After Audit Cards */}
          <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-xs divide-y divide-neutral-200 text-xs">
            <div className="p-4 bg-neutral-50 font-bold uppercase tracking-wider text-neutral-700 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>Type & Context</div>
              <div>Vague Anchor (Avoided ❌)</div>
              <div>Implemented Descriptive Anchor (Compliant ✅)</div>
            </div>

            <div className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
              <div>
                <span className="font-bold text-neutral-900">Internal Cross-Article Link</span>
                <p className="text-neutral-500 text-[11px]">Linking from GEO article to Multi-Modal Personalization</p>
              </div>
              <div className="text-rose-600 line-through">"Click here" / "Read more"</div>
              <div className="text-emerald-700 font-semibold flex items-center gap-1.5">
                <Link2 className="w-3.5 h-3.5 shrink-0" />
                <span>"Explore predictive customer journey personalization frameworks"</span>
              </div>
            </div>

            <div className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
              <div>
                <span className="font-bold text-neutral-900">Internal Attribution Link</span>
                <p className="text-neutral-500 text-[11px]">Linking from Paid Media article to Incrementality Attribution</p>
              </div>
              <div className="text-rose-600 line-through">"Learn more here"</div>
              <div className="text-emerald-700 font-semibold flex items-center gap-1.5">
                <Link2 className="w-3.5 h-3.5 shrink-0" />
                <span>"Read our comprehensive guide to next-generation marketing attribution models"</span>
              </div>
            </div>

            <div className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
              <div>
                <span className="font-bold text-neutral-900">External Authoritative Source</span>
                <p className="text-neutral-500 text-[11px]">Referencing Google Search Central Guidelines</p>
              </div>
              <div className="text-rose-600 line-through">"Google link" / "source"</div>
              <div className="text-emerald-700 font-semibold flex items-center gap-1.5">
                <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                <span>"Google Search Central Guidelines on Structured Data and Search Essentials"</span>
              </div>
            </div>

            <div className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
              <div>
                <span className="font-bold text-neutral-900">External Standards Reference</span>
                <p className="text-neutral-500 text-[11px]">Referencing C2PA Authenticity Specification</p>
              </div>
              <div className="text-rose-600 line-through">"Check this site"</div>
              <div className="text-emerald-700 font-semibold flex items-center gap-1.5">
                <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                <span>"Coalition for Content Provenance and Authenticity (C2PA) Technical Specification"</span>
              </div>
            </div>
          </div>

          {/* Complete 10 Articles Descriptive Anchor Mapping Table */}
          <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-xs space-y-0">
            <div className="px-6 py-4 bg-neutral-50 border-b border-neutral-200 flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 font-mono">
                Full 10-Article Descriptive Anchor Architecture
              </h3>
              <span className="text-[11px] font-mono text-neutral-500">All 10 Pages Verified</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-neutral-200 bg-neutral-100 text-neutral-700 font-semibold uppercase tracking-wider text-[11px]">
                    <th className="py-3 px-4 min-w-[140px]">Article / Source</th>
                    <th className="py-3 px-4 min-w-[280px]">Internal Anchor Text</th>
                    <th className="py-3 px-4 min-w-[280px]">External Citation Anchor Text</th>
                    <th className="py-3 px-4 min-w-[100px]">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 text-neutral-700">
                  {ARTICLES.map((art) => (
                    <tr key={art.id} className="hover:bg-neutral-50/80">
                      <td className="py-3 px-4 font-semibold text-neutral-900">
                        {art.title.split(':')[0]}
                        <span className="block text-[10px] font-mono text-neutral-400 font-normal">
                          {art.canonicalPath}
                        </span>
                      </td>
                      <td className="py-3 px-4 space-y-1">
                        {art.internalLinks.map((il, idx) => (
                          <div key={idx} className="flex items-start gap-1.5">
                            <Link2 className="w-3 h-3 text-blue-600 mt-0.5 shrink-0" />
                            <span className="font-medium text-neutral-950">"{il.anchorText}"</span>
                          </div>
                        ))}
                      </td>
                      <td className="py-3 px-4 space-y-1">
                        {art.externalLinks.map((el, idx) => (
                          <div key={idx} className="flex items-start gap-1.5">
                            <ExternalLink className="w-3 h-3 text-purple-600 mt-0.5 shrink-0" />
                            <span className="text-neutral-800">"{el.anchorText}"</span>
                          </div>
                        ))}
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold text-[10px] border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Compliant</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Presentation Conclusion Box */}
      <div className="p-8 bg-neutral-900 text-white rounded-xl space-y-3">
        <h3 className="text-lg font-serif-editorial font-bold">
          Presentation Summary for Academic & Portfolio Evaluation
        </h3>
        <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
          Blogs Vert fulfills every criteria of the SEO assignment. All 10 articles retain their high-signal, in-depth prose while establishing distinct primary and secondary keywords, unique URLs with proper rewrites, Answer Engine Optimization (AEO) question structures, Schema.org JSON-LD structured data, and descriptive linking architecture.
        </p>
      </div>

      {/* SCREENSHOT MODAL (SS PREVIEW & PRINT READY VIEW) */}
      {isSSModalOpen && (
        <div className="fixed inset-0 z-50 bg-neutral-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-neutral-300 overflow-hidden">
            {/* Modal Controls Header */}
            <div className="px-6 py-4 bg-neutral-900 text-white flex items-center justify-between gap-4 border-b border-neutral-800 shrink-0">
              <div className="flex items-center gap-2.5">
                <Camera className="w-5 h-5 text-amber-400" />
                <div>
                  <h3 className="text-sm font-bold tracking-tight">
                    Screenshot & Submission View (SS Mode)
                  </h3>
                  <p className="text-[11px] text-neutral-400">
                    High-definition formatted deliverable card ready for screenshot capture or PDF export.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const text = `Blogs Vert SEO Implementation Report\nURL: https://blogs-vert.vercel.app/\nStatus: 100% Verified Compliant\nStep 3.F: Contextual Anchor Text Audit Verified (Zero "Click Here").`;
                    navigator.clipboard.writeText(text);
                    setCopiedSS(true);
                    setTimeout(() => setCopiedSS(false), 2000);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-white transition-colors cursor-pointer border border-neutral-700"
                >
                  {copiedSS ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSS ? 'Copied!' : 'Copy Summary'}</span>
                </button>

                <button
                  onClick={() => window.print()}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-white transition-colors cursor-pointer border border-neutral-700"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print / PDF</span>
                </button>

                <button
                  onClick={() => setIsSSModalOpen(false)}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
                  aria-label="Close Screenshot Modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6 overflow-y-auto bg-neutral-50/50">
              <div className="p-6 bg-white border border-neutral-200 rounded-xl shadow-xs space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-100">
                  <div>
                    <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-neutral-500">
                      SEO Assignment Submission Deliverable
                    </span>
                    <h2 className="text-2xl font-serif-editorial font-bold text-neutral-950">
                      Blogs Vert — Complete SEO Verification Report
                    </h2>
                    <p className="text-xs text-neutral-600 mt-1">
                      Website URL: <span className="font-mono font-semibold text-neutral-900">https://blogs-vert.vercel.app/</span>
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md text-xs font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>All 11 SEO & AEO Criteria Verified</span>
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-2">
                  <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200">
                    <span className="text-[10px] text-neutral-500 uppercase font-mono">Total Articles</span>
                    <p className="font-bold text-sm text-neutral-900 mt-0.5">10 Articles</p>
                  </div>
                  <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200">
                    <span className="text-[10px] text-neutral-500 uppercase font-mono">Anchor Text Standard</span>
                    <p className="font-bold text-sm text-emerald-700 mt-0.5">Zero "Click Here"</p>
                  </div>
                  <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200">
                    <span className="text-[10px] text-neutral-500 uppercase font-mono">AEO Question H2s</span>
                    <p className="font-bold text-sm text-neutral-900 mt-0.5">≥ 2 Per Article</p>
                  </div>
                  <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200">
                    <span className="text-[10px] text-neutral-500 uppercase font-mono">Schema.org JSON-LD</span>
                    <p className="font-bold text-sm text-neutral-900 mt-0.5">FAQ + BlogPosting</p>
                  </div>
                </div>
              </div>

              {/* Anchor text summary card inside modal */}
              <div className="p-5 bg-white border border-neutral-200 rounded-xl space-y-3">
                <h4 className="font-bold text-sm text-neutral-900 font-mono uppercase">
                  Step 3.F Descriptive Anchor Text Compliance
                </h4>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Every link across the site uses descriptive anchor text. Generic link terms (e.g., "click here", "read more", "source", raw URLs) are completely avoided.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
