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
      <div className="p-8 sm:p-12 rounded-2xl bg-slate-900 text-white space-y-6 border border-slate-800 shadow-sm">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-indigo-400">
          <Feather className="w-4 h-4" />
          <span>About Wanja & Press Kit</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white">
          Poet, Writer & Storyteller
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
          WanjaWrites is the umbrella creative home; One-Jar Poetry is the voice. Explore Wanja's story, career timeline, and media kit.
        </p>

        {/* Section Tabs */}
        <div className="flex flex-wrap gap-3 border-t border-slate-800 pt-4">
          <button
            onClick={() => setActiveTab('story')}
            className={`px-5 py-2.5 rounded-lg font-bold text-sm transition-all ${
              activeTab === 'story'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            My Story & Philosophy
          </button>
          <button
            onClick={() => setActiveTab('timeline')}
            className={`px-5 py-2.5 rounded-lg font-bold text-sm transition-all ${
              activeTab === 'timeline'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Milestones & Achievements Timeline
          </button>
          <button
            onClick={() => setActiveTab('epk')}
            className={`px-5 py-2.5 rounded-lg font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'epk'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Electronic Press Kit (EPK)</span>
          </button>
        </div>
      </div>

      {/* TAB 1: MY STORY */}
      {activeTab === 'story' && (
        <div className="space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-md">
                <img
                  src="/images/wanja_headshot.jpg"
                  alt="Faith Wanja Portrait"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <h2 className="font-serif text-3xl font-bold text-slate-900">
                Faith Wanja (One-Jar Poetry)
              </h2>
              <div className="prose prose-slate text-slate-700 space-y-4 font-sans text-base leading-relaxed">
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
              <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-100 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-indigo-700 uppercase tracking-wider">
                  <BookOpen className="w-4 h-4" />
                  <span>Published Academic Research Paper</span>
                </div>
                <p className="text-sm font-bold text-slate-900">
                  "Blended Teacher Professional Development for Integrating Scratch Coding in Classrooms in Western Kenya"
                </p>
                <a 
                  href="https://dl.acm.org/doi/10.1145/3769994.3770033" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 underline"
                >
                  <span>View Paper in ACM Digital Library</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenBooking}
                  className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 shadow-xs"
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
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <h2 className="font-serif text-2xl font-bold text-slate-900">
              Career Milestones & Awards
            </h2>
            <span className="text-xs text-slate-500 font-medium">Visual Timeline</span>
          </div>

          <div className="relative border-l-2 border-indigo-600 ml-4 sm:ml-8 pl-6 sm:pl-8 space-y-8">
            {ACHIEVEMENTS.map((ach) => (
              <div key={ach.id} className="relative group">
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-indigo-600 border-4 border-slate-50"></div>
                <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-indigo-500 shadow-xs transition-all space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-indigo-600">{ach.year}</span>
                    <span className="px-2.5 py-0.5 rounded bg-indigo-50 text-indigo-700 uppercase border border-indigo-100">
                      {ach.category}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-slate-900">
                    {ach.title}
                  </h3>
                  <p className="text-xs font-semibold text-slate-500">
                    {ach.organization}
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed">
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
          <div className="p-8 sm:p-12 rounded-2xl bg-slate-900 text-white space-y-6 border border-slate-800 shadow-sm print:bg-white print:text-black">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">
                  Official Media Kit
                </span>
                <h2 className="font-serif text-3xl font-bold text-white mt-0.5">
                  Electronic Press Kit (EPK)
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrintEPK}
                  className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <Download className="w-4 h-4" />
                  <span>Download / Print EPK PDF</span>
                </button>
              </div>
            </div>

            {/* Bio Length Switcher */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase text-indigo-400">
                  Select Bio Length for Press / Event Programs:
                </label>
                <button
                  onClick={handleCopyBio}
                  className="text-xs text-slate-300 hover:text-white flex items-center gap-1 font-semibold"
                >
                  {copiedBio ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <FileText className="w-3.5 h-3.5" />}
                  <span>{copiedBio ? 'Copied to Clipboard' : 'Copy Selected Bio'}</span>
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setBioLength('short')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    bioLength === 'short' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  Short Bio (50 Words)
                </button>
                <button
                  onClick={() => setBioLength('medium')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    bioLength === 'medium' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  Medium Bio (150 Words)
                </button>
                <button
                  onClick={() => setBioLength('full')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    bioLength === 'full' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  Full Comprehensive Bio
                </button>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-300 leading-relaxed whitespace-pre-line font-sans">
                {getBioText()}
              </div>
            </div>

            {/* Press Quotes & Accolades */}
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <h3 className="font-serif text-xl font-bold text-white">Press Quotes & Accolades</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {EPK_DATA.pressQuotes.map((q, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <p className="text-xs italic text-slate-300">"{q.quote}"</p>
                    <p className="text-[10px] font-bold text-indigo-400 uppercase">— {q.source}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Stage Requirements / Tech Rider */}
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
                <Mic className="w-5 h-5 text-indigo-400" />
                <span>Technical Rider & Stage Requirements</span>
              </h3>
              <ul className="space-y-2 text-xs text-slate-300">
                {EPK_DATA.techRider.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
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
