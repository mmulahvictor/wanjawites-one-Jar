import React, { useState } from 'react';
import { Poem, VideoItem } from '../types';
import { GALLERY } from '../data/mockData';
import { ChevronLeft, ChevronRight, X, ExternalLink, Download, Youtube, Eye } from 'lucide-react';
import { EpkModal, EPK_FILE_PATH, EPK_FILE_NAME } from './EpkModal';

interface PoetrySectionProps {
  poems?: Poem[];
  videos?: VideoItem[];
  onOpenPoem: (poem: Poem) => void;
  onOpenVideo: (video: VideoItem) => void;
  onOpenBooking: () => void;
}

export const PoetrySection: React.FC<PoetrySectionProps> = ({
  poems = [],
  onOpenPoem,
  onOpenBooking
}) => {
  // EPK Modal state
  const [isEpkModalOpen, setIsEpkModalOpen] = useState(false);

  // Lightbox state for gallery
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Active accordion poem indices
  const [expandedPoemId, setExpandedPoemId] = useState<string | null>(null);

  const togglePoem = (id: string) => {
    setExpandedPoemId(expandedPoemId === id ? null : id);
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const nextLightbox = () => {
    setLightboxIndex((prev) => (prev + 1) % GALLERY.length);
  };

  const prevLightbox = () => {
    setLightboxIndex((prev) => (prev + GALLERY.length - 1) % GALLERY.length);
  };

  return (
    <div className="w-full">
      
      {/* 1. Header Banner matching sample .pgh */}
      <section className="bg-[#D81B7A] text-white px-6 sm:px-12 md:px-20 py-16 sm:py-20">
        <div className="max-w-4xl space-y-4">
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-normal leading-[1.02] tracking-tight">
            One-Jar Poetry
          </h1>
          <p className="text-base sm:text-lg text-white/90 max-w-2xl font-sans">
            Spoken word and written poems on womanhood, grief, love, and healing.
          </p>
        </div>
      </section>

      {/* 2. Biography Split Section matching sample .two with arched portrait */}
      <section className="px-6 sm:px-12 md:px-20 py-16 bg-[#FFF6EC] text-[#3A1208]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          
          {/* Portrait with arched top radius: border-radius: 50% 50% 1.5rem 1.5rem */}
          <div className="md:col-span-5 flex justify-center">
            <img 
              src="/images/bio-wanja.jpg" 
              alt="Portrait of Faith Wanja against a dark background, hand resting at her jaw"
              className="w-full max-w-sm aspect-[4/5] object-cover rounded-t-full rounded-b-3xl shadow-sm border-2 border-[#D81B7A]/20"
            />
          </div>

          {/* Biography text & links */}
          <div className="md:col-span-7 space-y-6 text-left">
            <h2 className="font-serif text-3xl sm:text-5xl text-[#3A1208] font-normal">
              Biography
            </h2>
            <p className="text-base sm:text-lg leading-relaxed text-[#3A1208]/90 font-sans">
              One-Jar Poetry is the artistic identity of Kenyan performance poet Faith Wanja, exploring the intersections of womanhood, identity, belonging, grief, love, social justice, and generational healing. Through spoken word, written poetry, and experiential storytelling, One-Jar Poetry creates spaces for emotional honesty, reflection, and connection.
            </p>
            <p className="text-base sm:text-lg leading-relaxed text-[#3A1208]/90 font-sans">
              The practice embraces poetry as a means of documenting lived experiences, confronting difficult truths, and imagining possibilities for healing and becoming. From intimate reflections to socially conscious performances, One-Jar Poetry invites audiences to sit with discomfort, recognise themselves in shared stories, and discover the many ways words can hold what we carry.
            </p>

            {/* Action Row matching sample */}
            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href={EPK_FILE_PATH}
                download={EPK_FILE_NAME}
                className="btn-wanja cursor-pointer inline-flex items-center gap-2"
                title="Download Official EPK (PDF)"
              >
                <Download className="w-4 h-4" />
                <span>Download EPK</span>
              </a>
              <button
                type="button"
                onClick={() => setIsEpkModalOpen(true)}
                className="btn-wanja-alt cursor-pointer inline-flex items-center gap-2"
                title="Preview Electronic Press Kit"
              >
                <Eye className="w-4 h-4" />
                <span>Preview EPK</span>
              </button>
              <a
                href="https://www.youtube.com/@one_jar_poetry"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-wanja-alt cursor-pointer inline-flex items-center gap-2"
              >
                <Youtube className="w-4 h-4" />
                <span>Watch on YouTube</span>
              </a>
              <a
                href="https://open.spotify.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-wanja-alt cursor-pointer inline-flex items-center gap-2"
              >
                <span>Listen on Spotify</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={onOpenBooking}
                className="btn-wanja-plum cursor-pointer"
              >
                Book Recital
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Recent Milestones Section (.sec.mile: background plum #3A1208, text cream #FFF6EC) */}
      <section className="bg-[#3A1208] text-[#FFF6EC] px-6 sm:px-12 md:px-20 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto space-y-12">
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#FFF6EC]">
            Recent Milestones
          </h2>

          {/* Featured Card matching sample .feat */}
          <div className="bg-white text-[#3A1208] rounded-3xl p-6 sm:p-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center shadow-lg">
            <div className="md:col-span-5">
              <img 
                src="/images/milestone-are-you-home.jpg" 
                alt="Wanja performing at the Are You Home? show, in a red outfit at the microphone" 
                className="w-full aspect-[4/5] object-cover rounded-2xl shadow-sm"
              />
            </div>
            <div className="md:col-span-7 space-y-4">
              <span className="inline-block bg-[#FFD9E6] text-[#D81B7A] font-semibold text-xs px-3.5 py-1 rounded-full">
                Completed show
              </span>
              <h3 className="font-serif text-3xl sm:text-5xl text-[#3A1208] font-normal leading-tight">
                Are You Home?
              </h3>
              <p className="text-sm font-semibold text-[#D81B7A]">
                17 October 2026 · Suave Kitchen and Social Club, Nairobi
              </p>
              <p className="text-base text-[#3A1208]/85 leading-relaxed">
                Sometimes home is a place, the friends we collect along the way, a feeling, and also the courage to return to ourselves.
              </p>

              {/* Stats block */}
              <div className="flex flex-wrap gap-8 py-2">
                <div>
                  <span className="block font-serif text-4xl sm:text-5xl text-[#D81B7A] font-normal leading-none">50</span>
                  <span className="text-xs text-[#3A1208]/75">audience members</span>
                </div>
                <div>
                  <span className="block font-serif text-4xl sm:text-5xl text-[#D81B7A] font-normal leading-none">15</span>
                  <span className="text-xs text-[#3A1208]/75">poems performed</span>
                </div>
                <div>
                  <span className="block font-serif text-4xl sm:text-5xl text-[#D81B7A] font-normal leading-none">2</span>
                  <span className="text-xs text-[#3A1208]/75">collaborators</span>
                </div>
              </div>

              <blockquote className="border-l-4 border-[#D81B7A] pl-4 italic font-serif text-base sm:text-lg text-[#3A1208] my-3">
                “I loved everything about the show, from the venue, the setup, the sound, the performances, the poems👌🏾”
              </blockquote>

              <div className="pt-2">
                <a
                  href="https://www.instagram.com/p/De6jy8bR7mS/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-wanja cursor-pointer inline-flex items-center gap-2"
                >
                  <span>Watch the recap</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Timeline list matching sample .tl */}
          <ul className="border-l-4 border-[#D81B7A] pl-6 space-y-6 max-w-2xl text-left list-none mt-8">
            <li className="space-y-1">
              <span className="font-serif text-xl sm:text-2xl text-[#FFF6EC] font-normal block">
                2026 PYSK Featured Poet
              </span>
              <p className="text-sm text-[#FFF6EC]/80">
                Featured at the Poets You Should Know Katiba Edition 2026.
              </p>
            </li>
            <li className="space-y-1">
              <span className="font-serif text-xl sm:text-2xl text-[#FFF6EC] font-normal block">
                2026 Kitale Film Week Featured Poet
              </span>
              <p className="text-sm text-[#FFF6EC]/80">
                Featured as a poet during the 2026 Kitale Film Week Festival.
              </p>
            </li>
          </ul>

        </div>
      </section>

      {/* 4. Poems Collection (Cards with Accordion Stanzas) */}
      <section className="px-6 sm:px-12 md:px-20 py-16 bg-[#FFF6EC] text-[#3A1208]">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="font-serif text-4xl sm:text-6xl text-[#3A1208] font-normal">
                Poems
              </h2>
              <p className="text-sm text-[#3A1208]/75 mt-1 font-sans">
                Click any poem to open its full stanzas, or view detailed context.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {poems.map((poem) => {
              const isOpen = expandedPoemId === poem.id;
              const hasContentNote = poem.tags.some(t => t.toLowerCase().includes('content note'));

              return (
                <div 
                  key={poem.id} 
                  className="bg-white rounded-2xl p-6 border border-[#FFD9E6] shadow-xs flex flex-col transition-all hover:border-[#D81B7A]"
                >
                  {/* Summary / Header */}
                  <div 
                    onClick={() => togglePoem(poem.id)}
                    className="cursor-pointer group select-none"
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#D81B7A] bg-[#FFD9E6] px-2.5 py-0.5 rounded-full">
                        {poem.year}
                      </span>
                      <span className="text-xs text-[#3A1208]/60 font-semibold group-hover:text-[#D81B7A]">
                        {isOpen ? 'Close [-]' : 'Read [+]'}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl text-[#3A1208] font-normal group-hover:text-[#D81B7A] transition-colors leading-tight">
                      {poem.title}
                    </h3>

                    {hasContentNote && (
                      <p className="text-[11px] text-[#D63A0A] font-semibold mt-1">
                        {poem.tags.find(t => t.toLowerCase().includes('content note'))}
                      </p>
                    )}

                    {!isOpen && (
                      <p className="text-xs text-[#3A1208]/75 line-clamp-3 mt-2 leading-relaxed">
                        {poem.excerpt}
                      </p>
                    )}
                  </div>

                  {/* Expandable Stanzas matching sample .poem */}
                  {isOpen && (
                    <div className="mt-4 pt-4 border-t border-[#FFD9E6] animate-fadeIn space-y-4">
                      <div className="font-poem text-base sm:text-lg text-[#3A1208] leading-relaxed whitespace-pre-line bg-[#FFF6EC]/50 p-4 rounded-xl">
                        {poem.stanzas.join('\n\n')}
                      </div>

                      <div className="flex flex-wrap gap-2 pt-2">
                        <button
                          onClick={() => onOpenPoem(poem)}
                          className="btn-wanja text-xs py-1.5 px-4 cursor-pointer"
                        >
                          Deep Reading View
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Gallery Section: Blush (#FFD9E6) with Multi-Column Masonry Grid */}
      <section className="bg-[#FFD9E6] text-[#3A1208] px-6 sm:px-12 md:px-20 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto space-y-8">
          <div>
            <h2 className="font-serif text-4xl sm:text-6xl font-normal text-[#3A1208]">
              Gallery
            </h2>
            <p className="text-sm text-[#3A1208]/80 mt-1 font-sans">
              Performance moments, stage recitals, and red carpet captures. Click any photo to enlarge.
            </p>
          </div>

          {/* Masonry Columns matching sample .gal */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
            {GALLERY.map((item, index) => (
              <button
                key={item.id}
                onClick={() => openLightbox(index)}
                aria-label={`Open photo: ${item.title}`}
                className="w-full text-left break-inside-avoid block rounded-2xl overflow-hidden group focus:outline-none focus:ring-4 focus:ring-[#D81B7A] cursor-pointer bg-black"
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    loading="lazy"
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end text-white">
                    <p className="font-serif text-lg leading-tight">{item.title}</p>
                    <p className="text-xs text-white/80">{item.caption}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Lightbox Modal Dialog matching sample dialog#lb */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
          onClick={() => setLightboxOpen(false)}
        >
          <div 
            className="bg-[#3A1208] text-[#FFF6EC] rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Icon */}
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 text-white/70 hover:text-white p-1 rounded-full cursor-pointer"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Lightbox Image Preview */}
            <div className="rounded-xl overflow-hidden bg-black max-h-[65vh] flex items-center justify-center">
              <img 
                src={GALLERY[lightboxIndex].imageUrl} 
                alt={GALLERY[lightboxIndex].title}
                className="max-h-[65vh] w-auto max-w-full object-contain mx-auto"
              />
            </div>

            {/* Caption */}
            <div>
              <h4 className="font-serif text-xl sm:text-2xl text-[#FFF6EC] font-normal">
                {GALLERY[lightboxIndex].title}
              </h4>
              <p className="text-xs sm:text-sm text-[#FFF6EC]/80 mt-1">
                {GALLERY[lightboxIndex].caption}
              </p>
            </div>

            {/* Navigation Buttons matching sample */}
            <div className="flex items-center justify-between pt-2 border-t border-[#FFF6EC]/15">
              <div className="flex gap-2">
                <button
                  onClick={prevLightbox}
                  className="btn-wanja-alt text-xs py-1.5 px-4 bg-transparent text-[#FFF6EC] border border-[#FFF6EC]/30 hover:bg-[#D81B7A] cursor-pointer inline-flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
                <button
                  onClick={nextLightbox}
                  className="btn-wanja-alt text-xs py-1.5 px-4 bg-transparent text-[#FFF6EC] border border-[#FFF6EC]/30 hover:bg-[#D81B7A] cursor-pointer inline-flex items-center gap-1"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => setLightboxOpen(false)}
                className="btn-wanja text-xs py-1.5 px-5 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EPK Modal */}
      <EpkModal
        isOpen={isEpkModalOpen}
        onClose={() => setIsEpkModalOpen(false)}
      />

    </div>
  );
};
