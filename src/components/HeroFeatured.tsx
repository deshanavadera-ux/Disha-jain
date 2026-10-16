import React from 'react';
import { Article } from '../types/blog';
import { ArrowRight, Bookmark, Clock } from 'lucide-react';
import { OptimizedImage, AvatarImage } from './OptimizedImage';

interface HeroFeaturedProps {
  article: Article;
  onReadArticle: (articleId: string) => void;
  isSaved: boolean;
  onToggleSave: (articleId: string) => void;
}

export const HeroFeatured: React.FC<HeroFeaturedProps> = ({
  article,
  onReadArticle,
  isSaved,
  onToggleSave,
}) => {
  return (
    <section className="relative border-b border-neutral-200/80 bg-neutral-50/50 pb-12 pt-8 sm:pt-12 sm:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Subtle section kicker */}
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-neutral-200">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-neutral-500 font-mono">
            <span>Featured Strategic Analysis</span>
            <span aria-hidden="true">·</span>
            <span className="text-neutral-900 font-bold">Vol. IV · Issue 10</span>
          </div>
          <span className="text-xs text-neutral-400 font-mono tabular-nums">UPDATED WEEKLY</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Main Visual Column - Above the fold hero image: eager loading, no delay */}
          <div
            onClick={() => onReadArticle(article.id)}
            className="lg:col-span-7 group cursor-pointer relative overflow-hidden rounded-xl bg-neutral-200 border border-neutral-200/80 shadow-sm aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto min-h-[320px] lg:min-h-[440px]"
          >
            <OptimizedImage
              src={article.image}
              alt={article.imageAlt}
              width={1200}
              height={675}
              priority={true}
              fallbackCategory={article.category}
              fallbackTitle={article.title}
              className="w-full h-full group-hover:scale-[1.02] transition-transform duration-500 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/40 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Editorial Content Column */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Unboxed metadata adhering strictly to zero-pill rule */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-600 font-medium">
                <span className="text-neutral-900 font-semibold">{article.category}</span>
                <span aria-hidden="true" className="text-neutral-400">·</span>
                <span>{article.publishedDate}</span>
                <span aria-hidden="true" className="text-neutral-400">·</span>
                <span className="inline-flex items-center gap-1 text-neutral-500">
                  <Clock className="w-3.5 h-3.5" />
                  {article.readTime}
                </span>
              </div>

              {/* Headline with balanced wrapping */}
              <h1
                onClick={() => onReadArticle(article.id)}
                className="text-2xl sm:text-3xl lg:text-4xl font-serif-editorial font-bold text-neutral-950 leading-[1.18] tracking-tight hover:text-neutral-700 transition-colors cursor-pointer"
                style={{ textWrap: 'balance' }}
              >
                {article.title}
              </h1>

              {/* Subtitle / Excerpt */}
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed line-clamp-3 sm:line-clamp-4 font-normal">
                {article.subtitle}
              </p>

              <div className="text-[11px] text-neutral-500 font-mono">
                <span>Primary Keyword: </span>
                <span className="font-semibold text-neutral-800">{article.primaryKeyword}</span>
              </div>
            </div>

            {/* Author byline and primary actions */}
            <div className="pt-6 border-t border-neutral-200/90 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AvatarImage
                    src={article.author.avatar}
                    name={article.author.name}
                    size={40}
                  />
                  <div>
                    <p className="text-xs font-semibold text-neutral-900 leading-none">
                      {article.author.name}
                    </p>
                    <p className="text-[11px] text-neutral-500 mt-1 leading-tight">
                      {article.author.role}
                    </p>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleSave(article.id);
                  }}
                  className={`p-2.5 rounded-lg border transition-colors cursor-pointer ${
                    isSaved
                      ? 'bg-neutral-900 text-white border-neutral-900'
                      : 'border-neutral-200 text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100'
                  }`}
                  aria-label={isSaved ? `Remove ${article.title} from saved` : `Save ${article.title} for later`}
                  title={isSaved ? 'Saved to Reading List' : 'Save for later'}
                >
                  <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                </button>
              </div>

              <button
                onClick={() => onReadArticle(article.id)}
                aria-label={`Read full analysis on ${article.title}`}
                className="w-full inline-flex items-center justify-between px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-neutral-950 rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer group"
              >
                <span>Read Full Analysis on Generative Engine Optimization</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
