import React, { useState } from 'react';
import { Article, Poem } from '../types';
import { ARTICLES as DEFAULT_ARTICLES, POEMS as DEFAULT_POEMS } from '../data/mockData';
import { getArticles } from '../lib/cmsStore';
import { Feather, BookOpen, Clock, Tag, Star, ArrowRight, X, Sparkles, Share2, Check } from 'lucide-react';

interface WritingSectionProps {
  articles?: Article[];
  onOpenPoemBySlug?: (slug: string) => void;
  onOpenBooking: () => void;
}

export const WritingSection: React.FC<WritingSectionProps> = ({ articles, onOpenPoemBySlug, onOpenBooking }) => {
  const [activeDoor, setActiveDoor] = useState<'blog' | 'reviews'>('blog');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [copied, setCopied] = useState(false);

  const articleList = (articles || getArticles() || DEFAULT_ARTICLES).filter(a => (a.status || 'published') === 'published');
  const blogArticles = articleList.filter((a) => a.type === 'blog');
  const reviewArticles = articleList.filter((a) => a.type === 'review');

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pb-16">
      
      {/* Header Banner */}
      <div className="p-8 sm:p-12 rounded-2xl bg-slate-900 text-white space-y-4 border border-slate-800 shadow-sm">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-indigo-400">
          <Feather className="w-4 h-4" />
          <span>WanjaWrites Publications</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white">
          Essays, Reflections & Reviews
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed font-sans">
          "WanjaWrites is the umbrella creative brand." Here you will find long-form essays on poetics and oral archives, alongside critical reviews of literature and culture.
        </p>

        {/* Two Distinct Doors Bar */}
        <div className="pt-4 flex flex-wrap items-center gap-4 border-t border-slate-800">
          <button
            onClick={() => setActiveDoor('blog')}
            className={`px-6 py-3 rounded-lg font-bold text-sm transition-all flex items-center gap-2 ${
              activeDoor === 'blog'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Feather className="w-4 h-4" />
            <span>Door 1: The Blog (Essays & Craft)</span>
          </button>

          <button
            onClick={() => setActiveDoor('reviews')}
            className={`px-6 py-3 rounded-lg font-bold text-sm transition-all flex items-center gap-2 ${
              activeDoor === 'reviews'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Door 2: Reviews (Books & Culture)</span>
          </button>
        </div>
      </div>

      {/* DOOR 1: BLOG / ESSAYS */}
      {activeDoor === 'blog' && (
        <div className="space-y-8">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <h2 className="font-serif text-2xl font-bold text-slate-900">
              Essays, Reflections & Oral History
            </h2>
            <span className="text-xs text-slate-500 font-medium">
              Showing {blogArticles.length} long-form essays
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => setSelectedArticle(article)}
                className="p-8 rounded-2xl bg-white border border-slate-200 hover:border-indigo-500 shadow-sm transition-all cursor-pointer flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="text-indigo-600 font-bold">{article.date}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{article.readTime}</span>
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <div className="flex flex-wrap gap-1">
                    {article.tags.map((tag) => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs font-semibold text-indigo-600">
                    <span>Read Full Essay</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DOOR 2: REVIEWS */}
      {activeDoor === 'reviews' && (
        <div className="space-y-8">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <h2 className="font-serif text-2xl font-bold text-slate-900">
              Critical Reviews & Cultural Commentary
            </h2>
            <span className="text-xs text-slate-500 font-medium">
              Showing {reviewArticles.length} reviews
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reviewArticles.map((review) => (
              <div
                key={review.id}
                onClick={() => setSelectedArticle(review)}
                className="p-8 rounded-2xl bg-white border border-slate-200 hover:border-indigo-500 shadow-sm transition-all cursor-pointer flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="px-2.5 py-0.5 rounded bg-indigo-50 text-indigo-700 font-bold uppercase border border-indigo-100">
                      {review.reviewSubjectType} Review
                    </span>
                    <div className="flex items-center text-amber-500">
                      {[...Array(review.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
                    {review.title}
                  </h3>

                  {review.quoteHighlight && (
                    <div className="p-3 rounded-xl bg-slate-50 border-l-2 border-indigo-600 text-xs font-serif italic text-slate-700">
                      "{review.quoteHighlight}"
                    </div>
                  )}

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {review.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-indigo-600">
                  <span>Read Full Review ({review.readTime})</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FULL ARTICLE READER MODAL */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
          <div 
            className="bg-white w-full max-w-3xl rounded-2xl shadow-xl border border-slate-200 overflow-hidden my-8 max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 bg-slate-900 text-white border-b border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-950 px-2.5 py-0.5 rounded-full border border-indigo-800">
                  WanjaWrites {selectedArticle.type === 'blog' ? 'Essay' : 'Review'}
                </span>
                <span className="text-xs text-slate-400 ml-2">{selectedArticle.date}</span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
                  {selectedArticle.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedArticle(null)}
                className="p-2 rounded-full text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 bg-slate-50">
              <div className="flex items-center justify-between text-xs text-slate-500 pb-4 border-b border-slate-200">
                <span>By Wanja · {selectedArticle.readTime}</span>
                <button onClick={handleShare} className="flex items-center gap-1 font-semibold text-indigo-600 hover:text-indigo-700">
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Link Copied' : 'Share Article'}</span>
                </button>
              </div>

              {selectedArticle.itemReviewed && (
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
                  <span className="text-xs font-bold text-indigo-600 uppercase">Item Under Review</span>
                  <p className="font-serif text-lg font-bold text-slate-900">{selectedArticle.itemReviewed}</p>
                </div>
              )}

              <div className="prose prose-slate max-w-none text-slate-800 space-y-4 font-sans leading-relaxed text-base">
                {selectedArticle.content.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {/* Related Poem Connection */}
              {selectedArticle.relatedPoemSlug && onOpenPoemBySlug && (
                <div className="p-5 rounded-xl bg-indigo-50 border border-indigo-100 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-indigo-700 uppercase">
                    <Sparkles className="w-4 h-4" />
                    <span>Content Connection</span>
                  </div>
                  <h4 className="font-serif text-lg font-bold text-slate-900">
                    Read the poem referenced in this article
                  </h4>
                  <button
                    onClick={() => {
                      const slug = selectedArticle.relatedPoemSlug!;
                      setSelectedArticle(null);
                      onOpenPoemBySlug(slug);
                    }}
                    className="text-xs font-semibold text-indigo-600 hover:underline flex items-center gap-1"
                  >
                    <span>Unseal related poem stanzas</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <span>WanjaWrites Literary Archive</span>
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 transition-colors"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
