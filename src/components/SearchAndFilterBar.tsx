import React from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';

interface SearchAndFilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  sortBy: 'latest' | 'popular' | 'quick';
  onSortChange: (sort: 'latest' | 'popular' | 'quick') => void;
  categories: string[];
  totalResults: number;
}

export const SearchAndFilterBar: React.FC<SearchAndFilterBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  sortBy,
  onSortChange,
  categories,
  totalResults,
}) => {
  return (
    <div id="articles-explorer" className="space-y-6 pt-4 pb-2">
      {/* Top Search & Sort Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Search input field */}
        <div className="relative flex-1 max-w-lg">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search all 10 articles, concepts, authors, or tags..."
            className="w-full pl-10 pr-9 py-2.5 text-sm bg-white border border-neutral-200 rounded-lg text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900 transition-all shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 p-0.5 cursor-pointer"
              aria-label="Clear search query"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Sort & Count Controls */}
        <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
          <div className="text-xs text-neutral-500 font-medium">
            <span className="font-mono tabular-nums text-neutral-900 font-semibold">{totalResults}</span> {totalResults === 1 ? 'article' : 'articles'}
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-neutral-100 rounded-lg border border-neutral-200/80">
            <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-500 ml-1.5 hidden sm:block" />
            <button
              onClick={() => onSortChange('latest')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                sortBy === 'latest'
                  ? 'bg-white text-neutral-950 shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-950'
              }`}
            >
              Latest
            </button>
            <button
              onClick={() => onSortChange('popular')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                sortBy === 'popular'
                  ? 'bg-white text-neutral-950 shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-950'
              }`}
            >
              Popular
            </button>
            <button
              onClick={() => onSortChange('quick')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                sortBy === 'quick'
                  ? 'bg-white text-neutral-950 shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-950'
              }`}
            >
              Quick Reads
            </button>
          </div>
        </div>
      </div>

      {/* Category Filter Tabs (horizontal scrollable on mobile) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-neutral-200/80">
        <button
          onClick={() => onSelectCategory('All')}
          className={`px-3.5 py-1.5 text-xs font-medium whitespace-nowrap rounded-md transition-all cursor-pointer ${
            selectedCategory === 'All'
              ? 'bg-neutral-950 text-white shadow-xs'
              : 'bg-white border border-neutral-200 text-neutral-600 hover:border-neutral-300 hover:text-neutral-950'
          }`}
        >
          All Topics (10)
        </button>

        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`px-3.5 py-1.5 text-xs font-medium whitespace-nowrap rounded-md transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-neutral-950 text-white shadow-xs'
                : 'bg-white border border-neutral-200 text-neutral-600 hover:border-neutral-300 hover:text-neutral-950'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};
