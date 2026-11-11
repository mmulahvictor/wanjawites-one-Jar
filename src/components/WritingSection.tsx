import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Article } from '../types';
import { ARTICLES as DEFAULT_ARTICLES } from '../data/mockData';
import { getArticles } from '../lib/cmsStore';
import { ArrowLeft, Share2, Check, ExternalLink } from 'lucide-react';

interface WritingSectionProps {
  articles?: Article[];
  onOpenPoemBySlug?: (slug: string) => void;
  onOpenBooking: () => void;
}

export const WritingSection: React.FC<WritingSectionProps> = ({
  articles,
  onOpenPoemBySlug
}) => {
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();

  const [activeFilter, setActiveFilter] = useState<'All' | 'Personal' | 'Culture'>('All');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [copied, setCopied] = useState(false);

  const articleList = (articles || getArticles() || DEFAULT_ARTICLES).filter(
    (a) => (a.status || 'published') === 'published'
  );

  // Deep linking resolution from /writing/:slug
  useEffect(() => {
    if (slug) {
      const found = articleList.find((a) => a.slug === slug);
      if (found) {
        setSelectedArticle(found);
      } else {
        setSelectedArticle(null);
      }
    } else {
      setSelectedArticle(null);
    }
  }, [slug, articleList]);

  const handleOpen = (art: Article) => {
    setSelectedArticle(art);
    navigate(`/writing/${art.slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setSelectedArticle(null);
    navigate('/writing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShare = () => {
    if (!selectedArticle) return;
    const url = `${window.location.origin}/writing/${selectedArticle.slug}`;
    navigator.clipboard?.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredArticles = articleList.filter((art) => {
    if (activeFilter === 'All') return true;
    const isCulture = art.tags.includes('Culture') || art.type === 'review';
    if (activeFilter === 'Culture') return isCulture;
    return !isCulture;
  });

  return (
    <div className="w-full">
      
      {/* 1. Header Banner matching sample .pgh with blush background & plum text */}
      <section className="bg-[#FFD9E6] text-[#3A1208] px-6 sm:px-12 md:px-20 py-16 sm:py-20">
        <div className="max-w-4xl space-y-4">
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-normal leading-[1.02] tracking-tight">
            The Journal
          </h1>
          <p className="text-base sm:text-lg text-[#3A1208]/90 max-w-2xl font-sans">
            Two kinds of writing: what I am living, and what we are making as a culture.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <section className="px-6 sm:px-12 md:px-20 py-16 bg-[#FFF6EC] text-[#3A1208]">
        <div className="max-w-7xl mx-auto">
          
          {/* ARTICLE READER VIEW */}
          {selectedArticle ? (
            <div className="max-w-3xl mx-auto space-y-8 animate-fadeIn">
              
              <div className="flex items-center justify-between gap-4 border-b border-[#FFD9E6] pb-4">
                <button
                  onClick={handleBack}
                  className="btn-wanja-alt text-xs py-1.5 px-4 cursor-pointer inline-flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Journal</span>
                </button>

                <button
                  onClick={handleShare}
                  className="p-2 rounded-full hover:bg-[#FFD9E6] transition-colors cursor-pointer text-[#3A1208]"
                  title="Share Article Link"
                  aria-label="Share article"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                </button>
              </div>

              {/* Category pill */}
              <div>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-white ${
                  selectedArticle.tags.includes('Culture') || selectedArticle.type === 'review'
                    ? 'bg-[#3A1208]'
                    : 'bg-[#D81B7A]'
                }`}>
                  {selectedArticle.tags.includes('Culture') || selectedArticle.type === 'review' ? 'Culture' : 'Personal'}
                </span>
                
                <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#3A1208] font-normal mt-4 leading-tight">
                  {selectedArticle.title}
                </h1>

                {selectedArticle.date && (
                  <p className="text-xs text-[#3A1208]/60 mt-2 font-medium">
                    Published {selectedArticle.date} · {selectedArticle.readTime}
                  </p>
                )}
              </div>

              {/* Render content blocks with support for ## subheads and > blockquotes */}
              <div className="space-y-6 text-[#3A1208]/90 font-sans text-base sm:text-lg leading-[1.85]">
                {selectedArticle.content.map((block, idx) => {
                  if (block.startsWith('## ')) {
                    return (
                      <h2 key={idx} className="font-serif text-2xl sm:text-3xl text-[#3A1208] font-normal pt-6 pb-2">
                        {block.slice(3)}
                      </h2>
                    );
                  }
                  if (block.startsWith('> ')) {
                    return (
                      <blockquote key={idx} className="border-l-4 border-[#D81B7A] pl-5 italic font-serif text-xl sm:text-2xl text-[#3A1208] my-6 py-1">
                        {block.slice(2)}
                      </blockquote>
                    );
                  }
                  return (
                    <p key={idx} className="leading-relaxed">
                      {block}
                    </p>
                  );
                })}
              </div>

              {/* Related Poem callout if referenced */}
              {selectedArticle.relatedPoemSlug && onOpenPoemBySlug && (
                <div className="p-6 rounded-2xl bg-white border border-[#FFD9E6] shadow-xs flex items-center justify-between gap-4 mt-8">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#D81B7A]">
                      Related Spoken Word Piece
                    </span>
                    <p className="font-serif text-xl text-[#3A1208]">
                      Listen to or read the accompanying poem
                    </p>
                  </div>
                  <button
                    onClick={() => onOpenPoemBySlug(selectedArticle.relatedPoemSlug!)}
                    className="btn-wanja text-xs py-2 px-4 cursor-pointer inline-flex items-center gap-1 shrink-0"
                  >
                    <span>Open Poem</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              <div className="pt-8 border-t border-[#FFD9E6] flex justify-center">
                <button
                  onClick={handleBack}
                  className="btn-wanja-alt cursor-pointer"
                >
                  Return to Journal Directory
                </button>
              </div>

            </div>
          ) : (
            /* ARTICLES DIRECTORY VIEW */
            <div className="space-y-8">
              
              {/* Filter Tabs matching sample .tabs */}
              <div className="flex gap-3 flex-wrap">
                {(['All', 'Personal', 'Culture'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveFilter(tab)}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                      activeFilter === tab
                        ? 'bg-[#D81B7A] text-white'
                        : 'bg-transparent text-[#3A1208] border-2 border-[#D81B7A] hover:bg-[#D81B7A]/10'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Cards Grid matching sample .cards with .cv gradient headers */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map((article) => {
                  const isCulture = article.tags.includes('Culture') || article.type === 'review';

                  return (
                    <article 
                      key={article.id}
                      className="bg-white rounded-2xl p-6 border border-[#FFD9E6] shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow group"
                    >
                      <div>
                        {/* Gradient Cover Header matching sample .cv */}
                        <div 
                          className={`h-36 rounded-xl mb-4 transition-transform group-hover:scale-[1.02] ${
                            isCulture
                              ? 'bg-gradient-to-br from-[#3A1208] to-[#FFD9E6]'
                              : 'bg-gradient-to-br from-[#D81B7A] to-[#FFD9E6]'
                          }`}
                        />

                        {/* Pill badge matching sample .pill */}
                        <span className={`inline-block px-3 py-0.5 rounded-full text-xs font-semibold text-white mb-2 ${
                          isCulture ? 'bg-[#3A1208]' : 'bg-[#D81B7A]'
                        }`}>
                          {isCulture ? 'Culture' : 'Personal'}
                        </span>

                        <h3 className="font-serif text-2xl text-[#3A1208] font-normal group-hover:text-[#D81B7A] transition-colors leading-snug mb-2">
                          {article.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-[#3A1208]/80 line-clamp-3 leading-relaxed mb-4">
                          {article.excerpt}
                        </p>
                      </div>

                      <button
                        onClick={() => handleOpen(article)}
                        className="btn-wanja-alt text-xs py-1.5 px-4 self-start cursor-pointer"
                      >
                        Read more
                      </button>
                    </article>
                  );
                })}
              </div>

            </div>
          )}

        </div>
      </section>

    </div>
  );
};
