import React, { useState } from 'react';
import { EPK_DATA, ACHIEVEMENTS, GALLERY } from '../data/mockData';
import { Award, Download, Check, Sparkles, Feather, FileText, ExternalLink, Calendar, MapPin, Mic, BookOpen } from 'lucide-react';

interface AboutSectionProps {
  onOpenBooking: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenBooking }) => {
  const [activeTab, setActiveTab] = useState<'story' | 'timeline' | 'epk'>('story');
  const [bioLength, setBioLength] = useState<'short' | 'medium' | 'full'>('medium');
  const [copiedBio, setCopiedBio] = useState(false);

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

  const handlePrintEPK = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pb-16">
      
      {/* Navigation Header Tabs */}
      <div className="p-8 sm:p-12 rounded-2xl bg-[#1A1A1A] text-white space-y-6 border border-[#2A2A2A] shadow-sm">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#E88D4D]">
          <Feather className="w-4 h-4 text-[#E88D4D]" />
          <span>About Wanja & Press Kit</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#FFFBF5]">
          Poet, Writer & Storyteller
        </h1>
        <p className="text-sm sm:text-base text-stone-300 max-w-2xl leading-relaxed">
          WanjaWrites is the umbrella creative home; One-Jar Poetry is the voice. Explore Wanja's story, career timeline, and media kit.
        </p>

        {/* Section Tabs */}
        <div className="flex flex-wrap gap-3 border-t border-[#333333] pt-4">
          <button
            onClick={() => setActiveTab('story')}
            className={`px-5 py-2.5 rounded-lg font-bold text-sm transition-all cursor-pointer ${
              activeTab === 'story'
                ? 'bg-[#C83C2E] text-white shadow-xs'
                : 'bg-[#2A2A2A] text-stone-300 hover:bg-[#333333]'
            }`}
          >
            My Story & Philosophy
          </button>
          <button
            onClick={() => setActiveTab('timeline')}
            className={`px-5 py-2.5 rounded-lg font-bold text-sm transition-all cursor-pointer ${
              activeTab === 'timeline'
                ? 'bg-[#C83C2E] text-white shadow-xs'
                : 'bg-[#2A2A2A] text-stone-300 hover:bg-[#333333]'
            }`}
          >
            Milestones & Achievements Timeline
          </button>
          <button
            onClick={() => setActiveTab('epk')}
            className={`px-5 py-2.5 rounded-lg font-bold text-sm transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'epk'
                ? 'bg-[#C83C2E] text-white shadow-xs'
                : 'bg-[#2A2A2A] text-stone-300 hover:bg-[#333333]'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-200" />
            <span>Electronic Press Kit (EPK)</span>
          </button>
        </div>
      </div>

      {/* TAB 1: MY STORY */}
      {activeTab === 'story' && (
        <div className="space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-[#E8DFD0] shadow-md">
                <img
                  src="/images/wanja_headshot.jpg"
                  alt="Faith Wanja Portrait"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <h2 className="font-serif text-3xl font-bold text-[#1A1A1A]">
                Faith Wanja (One-Jar Poetry)
              </h2>
              <div className="text-[#1A1A1A]/80 space-y-4 font-sans text-base leading-relaxed">
                <p>
                  <strong>Faith Wanja</strong> is a Kenyan poet, cultural documentarian, and communications consultant whose work centres on womanhood, generational healing, identity, and social justice.
                </p>
                <p>
                  She fully immersed herself in the poetry scene in 2024, committing to both craft and stage performance. Within a single year, she began featuring across open mics, competitive and curated slam spaces across Kenya—including <em>Rafinki, Nuetry, Mizani, Poets You Should Know (PYSK)</em>, and the <em>Poetry Slam Africa Grand Slam</em>. In 2026, she featured at the <em>Kitale Film Week Soft Launch & Official Opening Night</em>.
                </p>
                <p>
                  Her poetry is marked by emotional honesty and a refusal to conceal discomfort. Whether on stage or in print, she interrogates silence, inherited trauma, resilience, and freedom. She is driven by one question: <strong>"Who keeps the record of our becoming?"</strong>
                </p>
                <p>
                  Beyond performance, Faith holds a strong background in Community Development. She delivers strategic communications, newsletters, and reports for education and social impact initiatives like <em>EduTab Africa</em> and <em>Watoto Watch Network</em>, and has co-authored published academic research on teacher professional development in Western Kenya.
                </p>
              </div>

              {/* Co-authored Academic Paper Highlight */}
              <div className="p-4 rounded-xl bg-[#3A6EA5]/10 border border-[#3A6EA5]/25 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#3A6EA5] uppercase tracking-wider">
                  <BookOpen className="w-4 h-4" />
                  <span>Published Academic Research Paper</span>
                </div>
                <p className="text-sm font-bold text-[#1A1A1A]">
                  "Blended Teacher Professional Development for Integrating Scratch Coding in Classrooms in Western Kenya"
                </p>
                <a 
                  href="https://dl.acm.org/doi/10.1145/3769994.3770033" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#3A6EA5] hover:text-[#C83C2E] underline"
                >
                  <span>View Paper in ACM Digital Library</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenBooking}
                  className="px-6 py-3 rounded-lg bg-[#C83C2E] text-white font-semibold text-sm hover:bg-[#B03225] shadow-xs cursor-pointer"
                >
                  Book Faith Wanja for Recital or Communications Consulting
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ACHIEVEMENTS TIMELINE */}
      {activeTab === 'timeline' && (
        <div className="space-y-8">
          <div className="flex items-center justify-between pb-2 border-b border-[#E8DFD0]">
            <h2 className="font-serif text-2xl font-bold text-[#1A1A1A]">
              Career Milestones & Awards
            </h2>
            <span className="text-xs text-[#1A1A1A]/60 font-medium">Visual Timeline</span>
          </div>

          <div className="relative border-l-2 border-[#C83C2E] ml-4 sm:ml-8 pl-6 sm:pl-8 space-y-8">
            {ACHIEVEMENTS.map((ach) => (
              <div key={ach.id} className="relative group">
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[#C83C2E] border-4 border-[#FFFBF5]"></div>
                <div className="p-6 rounded-2xl bg-white border border-[#E8DFD0] hover:border-[#C83C2E] shadow-xs transition-all space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-[#C83C2E]">{ach.year}</span>
                    <span className="px-2.5 py-0.5 rounded bg-[#E88D4D]/20 text-[#1A1A1A] uppercase border border-[#E88D4D]/30">
                      {ach.category}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#1A1A1A]">
                    {ach.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#1A1A1A]/60">
                    {ach.organization}
                  </p>
                  <p className="text-sm text-[#1A1A1A]/70 leading-relaxed">
                    {ach.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: ELECTRONIC PRESS KIT (EPK) */}
      {activeTab === 'epk' && (
        <div className="space-y-10">
          <div className="p-8 sm:p-12 rounded-2xl bg-[#1A1A1A] text-white space-y-6 border border-[#2A2A2A] shadow-sm print:bg-white print:text-black">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#333333] pb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#E88D4D]">
                  Official Media Kit
                </span>
                <h2 className="font-serif text-3xl font-bold text-[#FFFBF5] mt-0.5">
                  Electronic Press Kit (EPK)
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrintEPK}
                  className="px-4 py-2 rounded-lg bg-[#3A6EA5] text-white text-xs font-semibold hover:bg-[#2E5A88] transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download / Print EPK PDF</span>
                </button>
              </div>
            </div>

            {/* Bio Length Switcher */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase text-[#E88D4D]">
                  Select Bio Length for Press / Event Programs:
                </label>
                <button
                  onClick={handleCopyBio}
                  className="text-xs text-stone-300 hover:text-white flex items-center gap-1 font-semibold cursor-pointer"
                >
                  {copiedBio ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <FileText className="w-3.5 h-3.5" />}
                  <span>{copiedBio ? 'Copied to Clipboard' : 'Copy Selected Bio'}</span>
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setBioLength('short')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    bioLength === 'short' ? 'bg-[#C83C2E] text-white' : 'bg-[#2A2A2A] text-stone-300 hover:bg-[#333333]'
                  }`}
                >
                  Short Bio (50 Words)
                </button>
                <button
                  onClick={() => setBioLength('medium')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    bioLength === 'medium' ? 'bg-[#C83C2E] text-white' : 'bg-[#2A2A2A] text-stone-300 hover:bg-[#333333]'
                  }`}
                >
                  Medium Bio (150 Words)
                </button>
                <button
                  onClick={() => setBioLength('full')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    bioLength === 'full' ? 'bg-[#C83C2E] text-white' : 'bg-[#2A2A2A] text-stone-300 hover:bg-[#333333]'
                  }`}
                >
                  Full Comprehensive Bio
                </button>
              </div>

              <div className="p-4 rounded-xl bg-[#121212] border border-[#2A2A2A] text-sm text-stone-300 leading-relaxed whitespace-pre-line font-sans">
                {getBioText()}
              </div>
            </div>

            {/* Press Quotes & Accolades */}
            <div className="space-y-4 pt-4 border-t border-[#333333]">
              <h3 className="font-serif text-xl font-bold text-[#FFFBF5]">Press Quotes & Accolades</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {EPK_DATA.pressQuotes.map((q, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#121212] border border-[#2A2A2A] space-y-2">
                    <p className="text-xs italic text-stone-300">"{q.quote}"</p>
                    <p className="text-[10px] font-bold text-[#E88D4D] uppercase">— {q.source}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Stage Requirements / Tech Rider */}
            <div className="space-y-4 pt-4 border-t border-[#333333]">
              <h3 className="font-serif text-xl font-bold text-[#FFFBF5] flex items-center gap-2">
                <Mic className="w-5 h-5 text-[#E88D4D]" />
                <span>Technical Rider & Stage Requirements</span>
              </h3>
              <ul className="space-y-2 text-xs text-stone-300">
                {EPK_DATA.techRider.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E88D4D]"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
