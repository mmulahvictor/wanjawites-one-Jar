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
      <div className="p-8 sm:p-12 rounded-2xl bg-[#1A1A1A] text-white space-y-4 border border-[#2A2A2A] shadow-sm">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#E88D4D]">
          <Feather className="w-4 h-4" />
          <span>WanjaWrites Publications</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#FFFBF5]">
          Essays, Reflections & Reviews
        </h1>
        <p className="text-sm sm:text-base text-stone-300 max-w-2xl leading-relaxed font-sans">
          "WanjaWrites is the umbrella creative brand." Here you will find long-form essays on poetics and oral archives, alongside critical reviews of literature and culture.
        </p>

        {/* Two Distinct Doors Bar */}
        <div className="pt-4 flex flex-wrap items-center gap-4 border-t border-[#333333]">
          <button
            onClick={() => setActiveDoor('blog')}
            className={`px-6 py-3 rounded-lg font-bold text-sm transition-all flex items-center gap-2 cursor-pointer ${
              activeDoor === 'blog'
                ? 'bg-[#3A6EA5] text-white shadow-xs'
                : 'bg-[#2A2A2A] text-stone-300 hover:bg-[#333333]'
            }`}
          >
            <Feather className="w-4 h-4" />
            <span>Door 1: The Blog (Essays & Craft)</span>
          </button>

          <button
            onClick={() => setActiveDoor('reviews')}
            className={`px-6 py-3 rounded-lg font-bold text-sm transition-all flex items-center gap-2 cursor-pointer ${
              activeDoor === 'reviews'
                ? 'bg-[#C83C2E] text-white shadow-xs'
                : 'bg-[#2A2A2A] text-stone-300 hover:bg-[#333333]'
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
          <div className="flex items-center justify-between pb-2 border-b border-[#E8DFD0]">
            <h2 className="font-serif text-2xl font-bold text-[#1A1A1A]">
              Essays, Reflections & Oral History
            </h2>
            <span className="text-xs text-[#1A1A1A]/60 font-medium">
              Showing {blogArticles.length} long-form essays
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => setSelectedArticle(article)}
                className="p-8 rounded-2xl bg-white border border-[#E8DFD0] hover:border-[#3A6EA5] shadow-sm transition-all cursor-pointer flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-[#1A1A1A]/60">
                    <span className="text-[#C83C2E] font-bold">{article.date}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#E88D4D]" />
                      <span>{article.readTime}</span>
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-[#1A1A1A] group-hover:text-[#3A6EA5] transition-colors leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-sm text-[#1A1A1A]/70 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                <div className="space-y-3 pt-4 border-t border-[#E8DFD0]">
                  <div className="flex flex-wrap gap-1">
                    {article.tags.map((tag) => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-[#FAF5ED] border border-[#E8DFD0] text-[#1A1A1A]/70 font-medium">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs font-semibold text-[#3A6EA5] group-hover:text-[#C83C2E]">
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
          <div className="flex items-center justify-between pb-2 border-b border-[#E8DFD0]">
            <h2 className="font-serif text-2xl font-bold text-[#1A1A1A]">
              Critical Reviews & Cultural Commentary
            </h2>
            <span className="text-xs text-[#1A1A1A]/60 font-medium">
              Showing {reviewArticles.length} reviews
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reviewArticles.map((review) => (
              <div
                key={review.id}
                onClick={() => setSelectedArticle(review)}
                className="p-8 rounded-2xl bg-white border border-[#E8DFD0] hover:border-[#C83C2E] shadow-sm transition-all cursor-pointer flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-[#1A1A1A]/60">
                    <span className="px-2.5 py-0.5 rounded bg-[#C83C2E]/10 text-[#C83C2E] font-bold uppercase border border-[#C83C2E]/20">
                      {review.reviewSubjectType} Review
                    </span>
                    <div className="flex items-center text-[#E88D4D]">
                      {[...Array(review.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-[#1A1A1A] group-hover:text-[#C83C2E] transition-colors leading-snug">
                    {review.title}
                  </h3>

                  {review.quoteHighlight && (
                    <div className="p-3 rounded-xl bg-[#FAF5ED] border-l-2 border-[#C83C2E] text-xs font-serif italic text-[#1A1A1A]/85">
                      "{review.quoteHighlight}"
                    </div>
                  )}

                  <p className="text-sm text-[#1A1A1A]/70 leading-relaxed">
                    {review.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E8DFD0] flex items-center justify-between text-xs font-semibold text-[#3A6EA5] group-hover:text-[#C83C2E]">
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
        <div className="fixed inset-0 z-50 overflow-y-auto bg-[#1A1A1A]/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
          <div 
            className="bg-white w-full max-w-3xl rounded-2xl shadow-xl border border-[#E8DFD0] overflow-hidden my-8 max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 bg-[#1A1A1A] text-white border-b border-[#2A2A2A] flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#E88D4D] bg-[#2A2A2A] px-2.5 py-0.5 rounded-full border border-[#3A6EA5]/30">
                  WanjaWrites {selectedArticle.type === 'blog' ? 'Essay' : 'Review'}
                </span>
                <span className="text-xs text-stone-400 ml-2">{selectedArticle.date}</span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#FFFBF5] mt-1">
                  {selectedArticle.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedArticle(null)}
                className="p-2 rounded-full text-stone-400 hover:bg-[#2A2A2A] hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 bg-[#FAF5ED]">
              <div className="flex items-center justify-between text-xs text-[#1A1A1A]/60 pb-4 border-b border-[#E8DFD0]">
                <span>By Wanja · {selectedArticle.readTime}</span>
                <button onClick={handleShare} className="flex items-center gap-1 font-semibold text-[#3A6EA5] hover:text-[#C83C2E] cursor-pointer">
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Link Copied' : 'Share Article'}</span>
                </button>
              </div>

              {selectedArticle.itemReviewed && (
                <div className="p-4 rounded-xl bg-white border border-[#E8DFD0] shadow-xs">
                  <span className="text-xs font-bold text-[#C83C2E] uppercase">Item Under Review</span>
                  <p className="font-serif text-lg font-bold text-[#1A1A1A]">{selectedArticle.itemReviewed}</p>
                </div>
              )}

              <div className="prose max-w-none text-[#1A1A1A]/85 space-y-4 font-sans leading-relaxed text-base">
                {selectedArticle.content.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {/* Related Poem Connection */}
              {selectedArticle.relatedPoemSlug && onOpenPoemBySlug && (
                <div className="p-5 rounded-xl bg-white border border-[#3A6EA5]/30 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#3A6EA5] uppercase">
                    <Sparkles className="w-4 h-4 text-[#E88D4D]" />
                    <span>Content Connection</span>
                  </div>
                  <h4 className="font-serif text-lg font-bold text-[#1A1A1A]">
                    Read the poem referenced in this article
                  </h4>
                  <button
                    onClick={() => {
                      const slug = selectedArticle.relatedPoemSlug!;
                      setSelectedArticle(null);
                      onOpenPoemBySlug(slug);
                    }}
                    className="text-xs font-semibold text-[#C83C2E] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Unseal related poem stanzas</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 bg-white border-t border-[#E8DFD0] flex items-center justify-between text-xs text-[#1A1A1A]/60">
              <span>WanjaWrites Literary Archive</span>
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-4 py-2 rounded-lg bg-[#FAF5ED] text-[#1A1A1A] font-semibold border border-[#E8DFD0] hover:bg-stone-200 transition-colors cursor-pointer"
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
