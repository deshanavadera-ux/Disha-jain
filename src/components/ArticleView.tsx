import React, { useState, useEffect } from 'react';
import { Article, Comment } from '../types/blog';
import {
  ArrowLeft,
  Bookmark,
  Heart,
  Share2,
  Check,
  Clock,
  MessageSquare,
  Type,
  ChevronRight,
  Send,
  Linkedin,
  Twitter,
} from 'lucide-react';

interface ArticleViewProps {
  article: Article;
  onBack: () => void;
  onSelectArticle: (articleId: string) => void;
  isSaved: boolean;
  onToggleSave: (articleId: string) => void;
  allArticles: Article[];
}

export const ArticleView: React.FC<ArticleViewProps> = ({
  article,
  onBack,
  onSelectArticle,
  isSaved,
  onToggleSave,
  allArticles,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [likes, setLikes] = useState(article.initialLikes);
  const [hasLiked, setHasLiked] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [fontSize, setFontSize] = useState<'standard' | 'large'>('standard');
  const [comments, setComments] = useState<Comment[]>(() => {
    const saved = localStorage.getItem(`comments_${article.id}`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return article.initialComments;
      }
    }
    return article.initialComments;
  });

  const [newAuthor, setNewAuthor] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [commentSuccess, setCommentSuccess] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Scroll to top on article switch
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setLikes(article.initialLikes);
    setHasLiked(false);
  }, [article.id]);

  // Track reading progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLike = () => {
    if (!hasLiked) {
      setLikes((prev) => prev + 1);
      setHasLiked(true);
    } else {
      setLikes((prev) => prev - 1);
      setHasLiked(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newCommentText.trim()) return;

    const newComment: Comment = {
      id: `c_${Date.now()}`,
      author: newAuthor.trim(),
      role: newRole.trim() || 'Digital Marketing Strategist',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      timestamp: 'Just now',
      content: newCommentText.trim(),
      likes: 1,
    };

    const updated = [newComment, ...comments];
    setComments(updated);
    localStorage.setItem(`comments_${article.id}`, JSON.stringify(updated));

    setNewAuthor('');
    setNewRole('');
    setNewCommentText('');
    setCommentSuccess(true);
    setTimeout(() => setCommentSuccess(false), 3000);
  };

  const handleCommentLike = (commentId: string) => {
    const updated = comments.map((c) =>
      c.id === commentId ? { ...c, likes: c.likes + 1 } : c
    );
    setComments(updated);
    localStorage.setItem(`comments_${article.id}`, JSON.stringify(updated));
  };

  // Find 3 related articles (prioritize same category or adjacent)
  const relatedArticles = allArticles
    .filter((a) => a.id !== article.id)
    .sort((a, b) => (a.category === article.category ? -1 : 1))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#fbfbf9] pb-24">
      {/* Top reading progress indicator */}
      <div
        className="fixed top-0 left-0 h-1 bg-neutral-900 z-50 transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Floating Action Utility Rail on Desktop */}
      <div className="hidden xl:flex flex-col gap-3 fixed left-8 top-36 z-30 p-2 bg-white/90 backdrop-blur-md border border-neutral-200 rounded-xl shadow-xs">
        <button
          onClick={handleLike}
          aria-label="Applaud article"
          className={`flex flex-col items-center justify-center p-3 rounded-lg transition-colors cursor-pointer ${
            hasLiked ? 'text-rose-600 bg-rose-50' : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
          }`}
          title="Applaud article"
        >
          <Heart className={`w-5 h-5 ${hasLiked ? 'fill-current' : ''}`} />
          <span className="text-[11px] font-mono tabular-nums mt-1 font-semibold">{likes}</span>
        </button>

        <button
          onClick={() => onToggleSave(article.id)}
          aria-label="Save article"
          className={`p-3 rounded-lg transition-colors cursor-pointer ${
            isSaved ? 'text-neutral-900 bg-neutral-100' : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
          }`}
          title={isSaved ? 'Saved to Reading List' : 'Save for later'}
        >
          <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
        </button>

        <button
          onClick={handleCopyLink}
          aria-label="Copy link"
          className="p-3 rounded-lg text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-colors cursor-pointer"
          title="Copy link to clipboard"
        >
          {isCopied ? <Check className="w-5 h-5 text-emerald-600" /> : <Share2 className="w-5 h-5" />}
        </button>

        <button
          onClick={() => setFontSize(fontSize === 'standard' ? 'large' : 'standard')}
          aria-label="Toggle font size"
          className="p-3 rounded-lg text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-colors cursor-pointer"
          title={`Switch to ${fontSize === 'standard' ? 'larger' : 'standard'} font size`}
        >
          <Type className="w-5 h-5" />
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between pb-6 border-b border-neutral-200">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-600 hover:text-neutral-950 transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to All Articles</span>
          </button>

          <div className="flex items-center gap-2 text-xs text-neutral-500 font-medium">
            <span>{article.category}</span>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
            <span className="text-neutral-800 font-semibold truncate max-w-[200px] sm:max-w-xs">
              {article.title}
            </span>
          </div>
        </div>

        {/* Article Header */}
        <header className="pt-8 sm:pt-12 pb-8 space-y-6">
          {/* Zero-Pill Unboxed Metadata */}
          <div className="flex items-center gap-2 text-xs text-neutral-500 font-medium">
            <span className="text-neutral-900 font-semibold">{article.category}</span>
            <span aria-hidden="true">·</span>
            <span>{article.publishedDate}</span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime}
            </span>
          </div>

          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-serif-editorial font-bold text-neutral-950 leading-[1.16] tracking-tight"
            style={{ textWrap: 'balance' }}
          >
            {article.title}
          </h1>

          <p className="text-lg sm:text-xl text-neutral-600 leading-relaxed font-normal">
            {article.subtitle}
          </p>

          {/* Author Details and Top Action Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 pb-6 border-y border-neutral-200">
            <div className="flex items-center gap-3.5">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                referrerPolicy="no-referrer"
                className="w-12 h-12 rounded-full object-cover border border-neutral-200"
              />
              <div>
                <p className="text-sm font-semibold text-neutral-900 leading-none">
                  {article.author.name}
                </p>
                <p className="text-xs text-neutral-500 mt-1">
                  {article.author.role}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleLike}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                  hasLiked
                    ? 'bg-rose-50 border-rose-200 text-rose-700'
                    : 'border-neutral-200 text-neutral-700 hover:bg-neutral-100'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${hasLiked ? 'fill-current' : ''}`} />
                <span className="tabular-nums font-mono">{likes}</span>
              </button>

              <button
                onClick={() => onToggleSave(article.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                  isSaved
                    ? 'bg-neutral-900 text-white border-neutral-900'
                    : 'border-neutral-200 text-neutral-700 hover:bg-neutral-100'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                <span>{isSaved ? 'Saved' : 'Save'}</span>
              </button>

              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 text-xs font-medium text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
              >
                {isCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-semibold">Link Copied</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setFontSize(fontSize === 'standard' ? 'large' : 'standard')}
                className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-neutral-200 text-xs font-medium text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
                title="Toggle font size"
              >
                <Type className="w-3.5 h-3.5" />
                <span className="font-mono text-[10px]">{fontSize === 'standard' ? '16px' : '18px'}</span>
              </button>
            </div>
          </div>
        </header>

        {/* Featured Image with Caption */}
        <figure className="my-8">
          <div className="relative rounded-xl overflow-hidden border border-neutral-200/90 aspect-[16/9] bg-neutral-100">
            {!imageError ? (
              <img
                src={article.image}
                alt={article.title}
                referrerPolicy="no-referrer"
                onError={() => setImageError(true)}
                className="w-full h-full object-cover object-center"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-900 text-white p-8">
                <p className="text-xl font-serif-editorial font-bold">{article.title}</p>
              </div>
            )}
          </div>
          {article.imageCaption && (
            <figcaption className="text-xs text-neutral-500 font-serif-editorial italic mt-2.5 text-center">
              {article.imageCaption}
            </figcaption>
          )}
        </figure>

        {/* Article Body Content */}
        <div
          className={`space-y-10 text-neutral-800 ${
            fontSize === 'large' ? 'text-lg sm:text-xl leading-[1.8]' : 'text-base sm:text-lg leading-[1.75]'
          }`}
        >
          {/* Introduction with drop cap */}
          <div className="first-letter:text-5xl first-letter:font-serif-editorial first-letter:font-bold first-letter:float-left first-letter:mr-3.5 first-letter:mt-1 first-letter:text-neutral-950 font-normal">
            <p>{article.introduction}</p>
          </div>

          {/* Structured Sections */}
          {article.sections.map((section, idx) => (
            <section key={idx} className="space-y-6 pt-4">
              <h2 className="text-2xl sm:text-3xl font-serif-editorial font-bold text-neutral-950 leading-tight tracking-tight">
                {section.heading}
              </h2>

              {section.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="text-neutral-700">
                  {p}
                </p>
              ))}

              {/* Key Takeaways Box (clean hairline border, NO thick left accent borders per Section 1.C) */}
              {section.keyTakeaways && section.keyTakeaways.length > 0 && (
                <div className="my-8 p-6 bg-white border border-neutral-200 rounded-xl space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 flex items-center gap-2">
                    <span>Key Strategic Takeaways</span>
                  </h3>
                  <ul className="space-y-2.5 text-sm text-neutral-700">
                    {section.keyTakeaways.map((item, kIdx) => (
                      <li key={kIdx} className="flex items-start gap-2.5">
                        <span className="font-mono text-neutral-400 text-xs mt-0.5 font-bold">0{kIdx + 1}.</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Pull quote set in large italic serif with subtle hairline dividers */}
              {section.pullQuote && (
                <blockquote className="my-10 py-6 border-y border-neutral-200 text-center space-y-3">
                  <p className="text-xl sm:text-2xl font-serif-editorial italic text-neutral-900 leading-relaxed max-w-2xl mx-auto">
                    "{section.pullQuote.text}"
                  </p>
                  {section.pullQuote.attribution && (
                    <cite className="block text-xs uppercase tracking-widest text-neutral-500 font-medium not-italic">
                      — {section.pullQuote.attribution}
                    </cite>
                  )}
                </blockquote>
              )}
            </section>
          ))}

          {/* Strategic Conclusion */}
          <section className="pt-8 border-t border-neutral-200 space-y-4">
            <h2 className="text-2xl sm:text-3xl font-serif-editorial font-bold text-neutral-950">
              Strategic Outlook & Conclusion
            </h2>
            <p className="text-neutral-700 italic">
              {article.conclusion}
            </p>
          </section>

          {/* Unboxed Tags Metadata */}
          <div className="pt-6 pb-8 border-b border-neutral-200">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-neutral-500">
              <span className="font-semibold text-neutral-800">Tagged Topics:</span>
              {article.tags.map((tag, tIdx) => (
                <React.Fragment key={tag}>
                  <span className="text-neutral-700 hover:text-neutral-950 transition-colors">
                    #{tag}
                  </span>
                  {tIdx < article.tags.length - 1 && <span aria-hidden="true">·</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Author Bio Card */}
        <div className="my-12 p-6 sm:p-8 bg-white border border-neutral-200 rounded-xl flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <img
            src={article.author.avatar}
            alt={article.author.name}
            referrerPolicy="no-referrer"
            className="w-16 h-16 rounded-full object-cover border border-neutral-200 shrink-0"
          />
          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <h3 className="text-base font-bold text-neutral-900">{article.author.name}</h3>
              <span className="text-xs text-neutral-500">· {article.author.role}</span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              {article.author.bio}
            </p>
          </div>
        </div>

        {/* Interactive Reader Discussion / Comments */}
        <section id="discussion" className="my-14 space-y-8">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-neutral-900" />
              <h2 className="text-xl font-serif-editorial font-bold text-neutral-950">
                Executive Discourse & Commentary
              </h2>
            </div>
            <span className="text-xs font-mono tabular-nums text-neutral-500">
              {comments.length} {comments.length === 1 ? 'response' : 'responses'}
            </span>
          </div>

          {/* Submit Comment Form */}
          <form
            onSubmit={handleAddComment}
            className="p-5 sm:p-6 bg-white border border-neutral-200 rounded-xl space-y-4"
          >
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
              Contribute to the Perspective
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                required
                placeholder="Your full name *"
                value={newAuthor}
                onChange={(e) => setNewAuthor(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
              />
              <input
                type="text"
                placeholder="Professional title & company (optional)"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
              />
            </div>

            <textarea
              required
              rows={3}
              placeholder="Share your practical experience, telemetry data, or strategic reaction..."
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
            />

            <div className="flex items-center justify-between pt-1">
              {commentSuccess ? (
                <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Response recorded. Thank you for contributing.
                </span>
              ) : (
                <span className="text-[11px] text-neutral-400">
                  Moderated under Vektor editorial peer-review standards.
                </span>
              )}

              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-neutral-950 rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                <span>Publish Response</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>

          {/* Comment Thread */}
          <div className="space-y-4">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="p-5 bg-white border border-neutral-200/90 rounded-xl space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={comment.avatar}
                      alt={comment.author}
                      referrerPolicy="no-referrer"
                      className="w-8 h-8 rounded-full object-cover border border-neutral-200"
                    />
                    <div>
                      <p className="text-xs font-bold text-neutral-900">{comment.author}</p>
                      {comment.role && (
                        <p className="text-[11px] text-neutral-500">{comment.role}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[11px] text-neutral-400 font-mono">{comment.timestamp}</span>
                    <button
                      onClick={() => handleCommentLike(comment.id)}
                      className="inline-flex items-center gap-1 text-xs text-neutral-500 hover:text-neutral-900 cursor-pointer"
                      title="Endorse response"
                    >
                      <Heart className="w-3 h-3" />
                      <span className="font-mono tabular-nums">{comment.likes}</span>
                    </button>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                  {comment.content}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Curated Articles */}
        <section className="my-16 pt-12 border-t border-neutral-200">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-serif-editorial font-bold text-neutral-950">
              Related Strategic Reading
            </h2>
            <button
              onClick={onBack}
              className="text-xs font-semibold uppercase tracking-wider text-neutral-600 hover:text-neutral-950 transition-colors cursor-pointer"
            >
              View All (10) →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((rel) => (
              <div
                key={rel.id}
                onClick={() => onSelectArticle(rel.id)}
                className="group flex flex-col justify-between bg-white border border-neutral-200 rounded-xl p-5 hover:border-neutral-400 transition-all cursor-pointer"
              >
                <div className="space-y-2.5">
                  <div className="text-[11px] text-neutral-500 font-medium">
                    <span className="font-semibold text-neutral-900">{rel.category}</span>
                    <span aria-hidden="true" className="mx-1">·</span>
                    <span>{rel.readTime}</span>
                  </div>
                  <h3 className="text-base font-serif-editorial font-bold text-neutral-950 group-hover:text-neutral-700 transition-colors line-clamp-2">
                    {rel.title}
                  </h3>
                  <p className="text-xs text-neutral-600 line-clamp-2">
                    {rel.subtitle}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
                  <span className="font-medium text-neutral-800">{rel.author.name}</span>
                  <span className="font-semibold text-neutral-900 group-hover:translate-x-0.5 transition-transform">
                    Read →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
