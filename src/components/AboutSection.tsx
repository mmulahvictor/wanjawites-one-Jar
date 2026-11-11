import React, { useState } from 'react';
import { Achievement } from '../types';
import { EPK_DATA, ACHIEVEMENTS as DEFAULT_ACHIEVEMENTS } from '../data/mockData';
import { getAchievements } from '../lib/cmsStore';
import { Download, Check, ExternalLink, Printer, Eye, FileText } from 'lucide-react';
import { EpkModal, EPK_FILE_PATH, EPK_FILE_NAME } from './EpkModal';

interface AboutSectionProps {
  achievements?: Achievement[];
  onOpenBooking: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ achievements, onOpenBooking }) => {
  const [bioLength, setBioLength] = useState<'short' | 'medium' | 'full'>('medium');
  const [copiedBio, setCopiedBio] = useState(false);
  const [isEpkModalOpen, setIsEpkModalOpen] = useState(false);

  const achievementList = (achievements || getAchievements() || DEFAULT_ACHIEVEMENTS).filter(
    (a) => (a.status || 'published') === 'published'
  );

  const getBioText = () => {
    if (bioLength === 'short') return EPK_DATA.shortBio;
    if (bioLength === 'medium') return EPK_DATA.mediumBio;
    return EPK_DATA.fullBio;
  };

  const handleCopyBio = () => {
    navigator.clipboard.writeText(getBioText());
    setCopiedBio(true);
    setTimeout(() => setCopiedBio(false), 2000);
  };

  return (
    <div className="w-full">
      
      {/* 1. Header Banner */}
      <section className="bg-[#D81B7A] text-white px-6 sm:px-12 md:px-20 py-16 sm:py-20">
        <div className="max-w-4xl space-y-4">
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-normal leading-[1.02] tracking-tight">
            About Faith Wanja
          </h1>
          <p className="text-base sm:text-lg text-white/90 max-w-2xl font-sans">
            Kenyan performance poet, culture writer, communications consultant, and filmmaker.
          </p>
        </div>
      </section>

      {/* 2. Biography Split */}
      <section className="px-6 sm:px-12 md:px-20 py-16 bg-[#FFF6EC] text-[#3A1208]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          
          <div className="md:col-span-5 flex justify-center">
            <img 
              src="/images/bio-wanja.jpg" 
              alt="Faith Wanja Portrait" 
              className="w-full max-w-sm aspect-[4/5] object-cover rounded-t-full rounded-b-3xl shadow-sm border-2 border-[#D81B7A]/20"
            />
          </div>

          <div className="md:col-span-7 space-y-6 text-left">
            <h2 className="font-serif text-3xl sm:text-5xl text-[#3A1208] font-normal">
              One-Jar Poetry & Wanja Writes
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-[#3A1208]/90 font-sans leading-relaxed">
              <p>
                <strong>Faith Wanja</strong> is a Kenyan performance poet, culture writer, communications consultant, and filmmaker. Working across words, images, and lived experiences, Wanja explores identity, memory, belonging, and the stories that shape us.
              </p>
              <p>
                Under her signature artistic identity <strong>One-Jar Poetry</strong>, she interrogates womanhood, social justice, and generational healing. Her solo show <em>“Are You Home?”</em> was completed in October 2026 at Suave Kitchen in Nairobi, bringing together 50 audience members, 15 original poems, and live collaborative accompaniment.
              </p>
              <p>
                Beyond performance, Faith has written the upcoming short film <em>Job Hunt</em> (produced by The Four Frames) and co-authored academic research published in the ACM Digital Library on integrating Scratch coding across classrooms in Western Kenya.
              </p>
            </div>

            {/* Academic Research Paper Highlight */}
            <div className="p-5 rounded-2xl bg-white border border-[#FFD9E6] shadow-xs space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#D81B7A] block">
                Published Academic Research
              </span>
              <p className="font-serif text-lg text-[#3A1208] font-normal">
                "Blended Teacher Professional Development for Integrating Scratch Coding in Classrooms in Western Kenya"
              </p>
              <a 
                href="https://dl.acm.org/doi/10.1145/3769994.3770033" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D81B7A] hover:underline"
              >
                <span>View Paper in ACM Digital Library</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href={EPK_FILE_PATH}
                download={EPK_FILE_NAME}
                className="btn-wanja cursor-pointer inline-flex items-center gap-2"
                title="Download Faith Wanja Official EPK PDF (2.7 MB)"
              >
                <Download className="w-4 h-4" />
                <span>Download Official EPK</span>
              </a>
              <button
                type="button"
                onClick={() => setIsEpkModalOpen(true)}
                className="btn-wanja-alt cursor-pointer inline-flex items-center gap-2"
                title="Preview Electronic Press Kit in browser"
              >
                <Eye className="w-4 h-4" />
                <span>Preview EPK</span>
              </button>
              <button
                onClick={onOpenBooking}
                className="btn-wanja-alt cursor-pointer"
              >
                Book Performance / Keynote
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* 3. Electronic Press Kit (EPK) Hub */}
      <section className="bg-[#3A1208] text-[#FFF6EC] px-6 sm:px-12 md:px-20 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto space-y-10">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-wider font-bold text-[#FFD9E6] bg-[#D81B7A] px-3 py-1 rounded-full inline-block mb-2">
                Press & Presenters
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#FFF6EC] font-normal">
                Electronic Press Kit (EPK)
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={EPK_FILE_PATH}
                download={EPK_FILE_NAME}
                className="btn-wanja text-xs py-2 px-4 inline-flex items-center gap-1.5 cursor-pointer"
                title="Download EPK PDF"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF (2.7 MB)</span>
              </a>
              <button
                type="button"
                onClick={() => setIsEpkModalOpen(true)}
                className="btn-wanja-alt bg-transparent text-white border border-white/30 hover:bg-[#D81B7A] text-xs py-2 px-4 inline-flex items-center gap-1.5 cursor-pointer"
                title="Preview full EPK document"
              >
                <Eye className="w-4 h-4" />
                <span>Preview EPK</span>
              </button>
              <button
                onClick={() => window.print()}
                className="btn-wanja-alt bg-transparent text-white/80 border border-white/20 hover:bg-white/10 text-xs py-2 px-4 inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print EPK Sheet</span>
              </button>
            </div>
          </div>

          {/* Dedicated EPK Document Attachment Showcase */}
          <div className="bg-[#240a04] p-6 sm:p-8 rounded-2xl border-2 border-[#D81B7A]/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#D81B7A] flex items-center justify-center text-white shrink-0 shadow-lg">
                <FileText className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-[#FFD9E6] text-[#3A1208] px-2.5 py-0.5 rounded-full">
                    Attached Document
                  </span>
                  <span className="text-xs text-[#FFD9E6]/75">PDF · 2.7 MB · 5 Pages · 2026 Edition</span>
                </div>
                <h3 className="font-serif text-2xl text-[#FFF6EC] font-normal">
                  One-Jar Poetry — Official Electronic Press Kit
                </h3>
                <p className="text-xs sm:text-sm text-[#FFF6EC]/80 max-w-2xl font-sans leading-relaxed">
                  Complete media and booking kit containing Faith Wanja's verified bio, curated performance timeline (Nuetry, Rafinki, Mizani, PYSK, Poetry Slam Africa, Kitale Film Week 2026), stage photo archives, technical rider requirements, and direct booking contacts.
                </p>
              </div>
            </div>

            <div className="flex sm:flex-row flex-col gap-3 shrink-0 w-full md:w-auto">
              <button
                type="button"
                onClick={() => setIsEpkModalOpen(true)}
                className="btn-wanja text-xs py-2.5 px-5 inline-flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
              >
                <Eye className="w-4 h-4" />
                <span>Open / Preview EPK</span>
              </button>
              <a
                href={EPK_FILE_PATH}
                download={EPK_FILE_NAME}
                className="btn-wanja-alt bg-transparent text-[#FFF6EC] border border-[#FFD9E6]/40 hover:bg-[#D81B7A] text-xs py-2.5 px-5 inline-flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
              >
                <Download className="w-4 h-4" />
                <span>Save PDF</span>
              </a>
            </div>
          </div>

          {/* Bio copy selector */}
          <div className="bg-[#2B0C04] p-6 sm:p-8 rounded-2xl border border-[#FFD9E6]/15 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#FFD9E6]/15 pb-4">
              <div className="flex gap-2">
                {(['short', 'medium', 'full'] as const).map((len) => (
                  <button
                    key={len}
                    onClick={() => setBioLength(len)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold capitalize cursor-pointer transition-all ${
                      bioLength === len
                        ? 'bg-[#D81B7A] text-white'
                        : 'bg-[#3A1208] text-[#FFF6EC]/70 hover:text-white'
                    }`}
                  >
                    {len} Bio
                  </button>
                ))}
              </div>

              <button
                onClick={handleCopyBio}
                className="btn-wanja-alt text-xs py-1.5 px-4 bg-transparent text-[#FFF6EC] border border-[#FFD9E6]/30 hover:bg-[#D81B7A] cursor-pointer inline-flex items-center gap-1.5"
              >
                {copiedBio ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : null}
                <span>{copiedBio ? 'Copied' : 'Copy Bio for Print'}</span>
              </button>
            </div>

            <p className="font-sans text-sm sm:text-base text-[#FFF6EC]/90 leading-relaxed whitespace-pre-line">
              {getBioText()}
            </p>
          </div>

          {/* Tech Rider & Press Quotes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Tech Rider */}
            <div className="bg-[#2B0C04] p-6 sm:p-8 rounded-2xl border border-[#FFD9E6]/15 space-y-4">
              <h3 className="font-serif text-2xl text-[#FFF6EC] font-normal">
                Technical Rider (Stage & Sound)
              </h3>
              <ul className="space-y-3 text-sm text-[#FFF6EC]/85 list-disc pl-5">
                {EPK_DATA.techRider.map((item, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Press Quotes */}
            <div className="bg-[#2B0C04] p-6 sm:p-8 rounded-2xl border border-[#FFD9E6]/15 space-y-4">
              <h3 className="font-serif text-2xl text-[#FFF6EC] font-normal">
                Press & Audience Quotes
              </h3>
              <div className="space-y-4">
                {EPK_DATA.pressQuotes.map((q, idx) => (
                  <blockquote key={idx} className="border-l-4 border-[#D81B7A] pl-4 italic font-serif text-base text-[#FFF6EC]/90">
                    "{q.quote}"
                    <span className="block not-italic text-xs text-[#FFD9E6] font-sans font-semibold mt-1">
                      — {q.source}
                    </span>
                  </blockquote>
                ))}
              </div>
            </div>

          </div>

          {/* Career Milestones Timeline */}
          <div className="bg-[#2B0C04] p-6 sm:p-8 rounded-2xl border border-[#FFD9E6]/15 space-y-6">
            <h3 className="font-serif text-2xl sm:text-3xl text-[#FFF6EC] font-normal">
              Milestones & Recognition
            </h3>
            <div className="space-y-6 border-l-4 border-[#D81B7A] pl-6">
              {achievementList.map((item) => (
                <div key={item.id} className="space-y-1">
                  <span className="text-xs font-bold text-[#D81B7A] bg-[#FFD9E6] px-2 py-0.5 rounded-full inline-block">
                    {item.year} · {item.category}
                  </span>
                  <h4 className="font-serif text-xl sm:text-2xl text-[#FFF6EC] font-normal">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#FFD9E6]/80 font-semibold">
                    {item.organization}
                  </p>
                  <p className="text-xs sm:text-sm text-[#FFF6EC]/80 leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* EPK Modal Viewer */}
      <EpkModal
        isOpen={isEpkModalOpen}
        onClose={() => setIsEpkModalOpen(false)}
      />

    </div>
  );
};
