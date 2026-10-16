import React, { useState } from 'react';
import { Article } from '../types/blog';
import { Bookmark, Clock, ArrowRight } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  onRead: (articleId: string) => void;
  isSaved: boolean;
  onToggleSave: (articleId: string) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onRead,
  isSaved,
  onToggleSave,
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <article className="group flex flex-col justify-between bg-white rounded-xl border border-neutral-200/90 overflow-hidden hover:border-neutral-400 transition-all duration-300 shadow-xs">
      <div>
        {/* Card Thumbnail with explicit aspect ratio, dimensions, and lazy loading */}
        <div
          onClick={() => onRead(article.id)}
          className="relative aspect-[16/10] overflow-hidden bg-neutral-100 cursor-pointer"
        >
          {!imageError ? (
            <img
              src={article.image}
              alt={article.imageAlt}
              width={640}
              height={400}
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-neutral-900 text-neutral-300 text-center">
              <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 mb-2">
                {article.category}
              </span>
              <p className="text-sm font-serif-editorial font-semibold text-white line-clamp-2">
                {article.title}
              </p>
            </div>
          )}

          {/* Quick save button overlay */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(article.id);
            }}
            className={`absolute top-3 right-3 p-2 rounded-md backdrop-blur-md transition-colors cursor-pointer ${
              isSaved
                ? 'bg-neutral-900 text-white shadow-sm'
                : 'bg-white/90 text-neutral-700 hover:text-neutral-950 hover:bg-white shadow-xs'
            }`}
            aria-label={isSaved ? `Remove ${article.title} from saved` : `Save ${article.title} for later`}
            title={isSaved ? 'Saved to Reading List' : 'Save for later'}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Card Body */}
        <div className="p-5 sm:p-6 space-y-3">
          {/* Zero-Pill Unboxed Metadata */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500 font-medium">
            <span className="text-neutral-900 font-semibold">{article.category}</span>
            <span aria-hidden="true">·</span>
            <span>{article.publishedDate}</span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {article.readTime}
            </span>
          </div>

          {/* Article Title */}
          <h2
            onClick={() => onRead(article.id)}
            className="text-lg sm:text-xl font-serif-editorial font-bold text-neutral-950 leading-snug group-hover:text-neutral-700 transition-colors cursor-pointer line-clamp-2"
          >
            {article.title}
          </h2>

          {/* Subtitle / Excerpt */}
          <p className="text-xs sm:text-sm text-neutral-600 line-clamp-3 leading-relaxed">
            {article.subtitle}
          </p>

          {/* SEO Focus Keyword Tag */}
          <div className="pt-1 text-[11px] text-neutral-400 font-mono">
            <span>Target: </span>
            <span className="text-neutral-600 font-medium">{article.primaryKeyword}</span>
          </div>
        </div>
      </div>

      {/* Card Footer: Author & Descriptive Read CTA */}
      <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-neutral-100 flex items-center justify-between mt-2">
        <div className="flex items-center gap-2.5">
          <img
            src={article.author.avatar}
            alt={`Avatar of ${article.author.name}`}
            width={28}
            height={28}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="w-7 h-7 rounded-full object-cover border border-neutral-200"
          />
          <div className="truncate max-w-[130px] sm:max-w-[150px]">
            <p className="text-xs font-medium text-neutral-900 truncate">
              {article.author.name}
            </p>
            <p className="text-[10px] text-neutral-500 truncate">
              {article.author.role}
            </p>
          </div>
        </div>

        <button
          onClick={() => onRead(article.id)}
          aria-label={`Read full analysis on ${article.title}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-neutral-900 hover:text-neutral-600 transition-colors cursor-pointer whitespace-nowrap"
        >
          <span>Read Analysis</span>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </article>
  );
};
