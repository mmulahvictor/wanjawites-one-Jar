import React, { useState } from 'react';
import { NavigationTab, Poem, VideoItem, Article, Achievement } from '../types';
import { POEMS as DEFAULT_POEMS, VIDEOS as DEFAULT_VIDEOS, ARTICLES as DEFAULT_ARTICLES, ACHIEVEMENTS, SERVICES } from '../data/mockData';
import { getPoems, getVideos, getArticles } from '../lib/cmsStore';
import { Sparkles, ArrowRight, BookOpen, Mic, Play, Feather, Award, CheckCircle, Mail, Volume2, Shield } from 'lucide-react';

interface HomeSectionProps {
  poems?: Poem[];
  videos?: VideoItem[];
  articles?: Article[];
  setActiveTab: (tab: NavigationTab) => void;
  onOpenPoem: (poem: Poem) => void;
  onOpenVideo: (video: VideoItem) => void;
  onOpenBooking: () => void;
  onOpenArticle: (article: Article) => void;
}

export const HomeSection: React.FC<HomeSectionProps> = ({
  poems,
  videos,
  articles,
  setActiveTab,
  onOpenPoem,
  onOpenVideo,
  onOpenBooking,
  onOpenArticle,
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const poemList = (poems || getPoems() || DEFAULT_POEMS).filter(p => (p.status || 'published') === 'published');
  const videoList = (videos || getVideos() || DEFAULT_VIDEOS).filter(v => (v.status || 'published') === 'published');
  const articleList = (articles || getArticles() || DEFAULT_ARTICLES).filter(a => (a.status || 'published') === 'published');

  const featuredPoems = poemList.filter((p) => p.featured).length > 0
    ? poemList.filter((p) => p.featured)
    : poemList.slice(0, 3);
  const featuredVideo = videoList[0] || DEFAULT_VIDEOS[0];
  const featuredArticles = articleList.slice(0, 2);
  const highlightedAchievements = ACHIEVEMENTS.filter((a) => a.highlight);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSuccess(true);
      setTimeout(() => setNewsletterSuccess(false), 4000);
      setNewsletterEmail('');
    }
  };

  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-[#FAF5ED] pt-8 sm:pt-16 pb-16 border-b border-[#E8DFD0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Copy */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E88D4D]/15 border border-[#E88D4D]/30 text-[#C83C2E] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#E88D4D]" />
                <span>WanjaWrites × One-Jar</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-6xl font-extrabold text-[#1A1A1A] leading-[1.1] tracking-tight">
                "My name is Wanja. <br />
                <span className="italic text-[#3A6EA5] font-normal">I fill spaces with poems ONE JAR at a time."</span>
              </h1>

              <p className="text-lg sm:text-xl text-[#1A1A1A]/75 leading-relaxed font-sans max-w-2xl">
                Kenyan poet, cultural documentarian, and communications consultant whose work centres on womanhood, generational healing, identity, and social justice. Driven by one question: <em>Who keeps the record of our becoming?</em>
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  id="hero-explore-poetry-btn"
                  onClick={() => setActiveTab('poetry')}
                  className="px-6 py-3.5 rounded-lg bg-[#C83C2E] text-white font-semibold text-sm hover:bg-[#B03225] transition-all shadow-sm flex items-center gap-2 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-amber-100" />
                  <span>Explore Poetry & Recitals</span>
                </button>

                <button
                  id="hero-work-with-wanja-btn"
                  onClick={onOpenBooking}
                  className="px-6 py-3.5 rounded-lg border-2 border-[#3A6EA5] bg-white text-[#3A6EA5] font-semibold text-sm hover:bg-[#3A6EA5] hover:text-white transition-all flex items-center gap-2 shadow-xs cursor-pointer"
                >
                  <Mic className="w-4 h-4" />
                  <span>Work With Wanja</span>
                </button>

                <button
                  id="hero-read-writing-btn"
                  onClick={() => setActiveTab('writing')}
                  className="px-4 py-3.5 text-sm font-semibold text-[#3A6EA5] hover:text-[#C83C2E] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Culture Writing & Reports</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Quick stats / credibility line */}
              <div className="pt-6 border-t border-[#E8DFD0] grid grid-cols-3 gap-4 text-xs text-[#1A1A1A]/70">
                <div>
                  <span className="block font-bold text-[#1A1A1A] text-base">Poetry Slam Africa</span>
                  <span>Grand Slam Finalist</span>
                </div>
                <div>
                  <span className="block font-bold text-[#1A1A1A] text-base">Kitale Film Week</span>
                  <span>Opening Night Recital</span>
                </div>
                <div>
                  <span className="block font-bold text-[#1A1A1A] text-base">Communications</span>
                  <span>EduTab Africa & Watoto Watch</span>
                </div>
              </div>
            </div>

            {/* Hero Visual Card / Portrait Metaphor */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="absolute -inset-2 rounded-3xl bg-[#E88D4D]/15 blur-xl"></div>
                <div className="relative rounded-2xl overflow-hidden border border-[#E8DFD0] bg-white shadow-sm p-4 space-y-4">
                  <div className="relative aspect-[4/5] rounded-xl overflow-hidden">
                    <img 
                      src="/images/wanja_headshot.jpg" 
                      alt="Faith Wanja (One-Jar Poetry)" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/90 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                      <span className="text-xs uppercase tracking-widest text-[#E88D4D] font-bold">
                        WANJA WRITES
                      </span>
                      <h3 className="font-serif text-2xl font-bold mt-1">
                        Poet · Writer · Storyteller
                      </h3>
                      <p className="text-xs text-stone-300 mt-1 font-sans">
                        "The stage is an excavation site. You bring a microphone as your shovel."
                      </p>
                    </div>
                  </div>

                  {/* Quick Audio / Poem Preview Widget */}
                  <div 
                    onClick={() => onOpenPoem(featuredPoems[0] || poemList[0])}
                    className="p-3.5 rounded-xl bg-[#FAF5ED] border border-[#E8DFD0] hover:border-[#C83C2E] cursor-pointer transition-colors flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#C83C2E] text-white flex items-center justify-center group-hover:bg-[#B03225] transition-colors">
                        <Volume2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#C83C2E] uppercase tracking-wider">Featured Audio Poem</div>
                        <div className="text-sm font-bold text-[#1A1A1A] font-serif">"The Jar We Carry"</div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#3A6EA5] group-hover:text-[#C83C2E] transition-colors">Listen & Read →</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. THE ONE-JAR PHILOSOPHY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-2xl bg-[#1A1A1A] text-white relative overflow-hidden shadow-sm border border-[#2A2A2A]">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#E88D4D]">
              <Feather className="w-4 h-4 text-[#E88D4D]" />
              <span>Emotional & Artistic Foundation</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#FFFBF5] leading-tight">
              The One-Jar Philosophy
            </h2>

            <p className="text-base sm:text-lg text-stone-300 leading-relaxed font-sans">
              Why "One-Jar"? In traditional East African households, terracotta jars were vessels built for water, grain, or honey—vessels buried in dry soil to keep contents cold and untainted by heat.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-[#333333]">
              <div className="space-y-2">
                <h3 className="font-serif text-xl font-bold text-[#E88D4D]">1. Excavation</h3>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Poetry is not invented; it is unearthed from silence, grief, and ancestral memory.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-xl font-bold text-[#E88D4D]">2. Witness</h3>
                <p className="text-xs text-stone-300 leading-relaxed">
                  The spoken word stands as an uncorrupted witness to personal and collective truth.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-xl font-bold text-[#E88D4D]">3. Containers</h3>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Every poem is a container crafted to safely hold emotion across time and performance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED POETRY — FROM THE JAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#C83C2E]">
              Curated Selection
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1A1A] mt-1">
              Featured Poetry — From the Jar
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('poetry')}
            className="text-sm font-semibold text-[#3A6EA5] hover:text-[#C83C2E] flex items-center gap-1.5 cursor-pointer"
          >
            <span>View Full Poetry Archive</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredPoems.map((poem) => (
            <div
              key={poem.id}
              onClick={() => onOpenPoem(poem)}
              className="p-6 rounded-2xl bg-white border border-[#E8DFD0] hover:border-[#C83C2E] shadow-sm transition-all cursor-pointer flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-[#1A1A1A]/60">
                  <span className="px-2.5 py-0.5 rounded bg-[#C83C2E]/10 text-[#C83C2E] font-bold border border-[#C83C2E]/20">
                    {poem.year}
                  </span>
                  <span>{poem.readTimeMinutes} min read</span>
                </div>

                <h3 className="font-serif text-2xl font-bold text-[#1A1A1A] group-hover:text-[#C83C2E] transition-colors">
                  {poem.title}
                </h3>

                <p className="font-poem italic text-[#1A1A1A]/75 text-base line-clamp-3 leading-relaxed">
                  "{poem.stanzas[0]}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#E8DFD0] flex items-center justify-between text-xs">
                <div className="flex items-center gap-1 text-[#3A6EA5] font-semibold group-hover:text-[#C83C2E]">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Unseal Poem & Audio</span>
                </div>
                <span className="text-[#1A1A1A]/40 font-mono">Read →</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. ABOUT WANJA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-2xl bg-white border border-[#E8DFD0] shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5">
            <img 
              src="/images/wanja_blue_stage.jpg" 
              alt="Faith Wanja on Stage at Kitale Film Week / Baraza Media Lab"
              className="w-full h-80 lg:h-96 object-cover rounded-xl shadow-xs border border-[#E8DFD0]"
            />
          </div>

          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E88D4D]">
              The Storyteller
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1A1A]">
              About Wanja
            </h2>
            <p className="text-base text-[#1A1A1A]/75 leading-relaxed">
              Wanja is a celebrated Kenyan poet, essayist, and performance artist whose work operates at the intersection of oral tradition and modern storytelling. Under WanjaWrites and One-Jar Poetry, she crafts visceral spoken word pieces that examine ancestral memory, urban identity, and emotional witness.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setActiveTab('about')}
                className="px-5 py-2.5 rounded-lg bg-[#C83C2E] text-white text-sm font-semibold hover:bg-[#B03225] transition-colors shadow-xs cursor-pointer"
              >
                Read Full Story & EPK
              </button>
              <button
                onClick={() => setActiveTab('about')}
                className="text-sm font-semibold text-[#3A6EA5] hover:text-[#C83C2E] hover:underline cursor-pointer"
              >
                View Career Timeline & EPK Kit →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WORK WITH WANJA SERVICES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E88D4D]">
            Professional Offerings
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1A1A]">
            Work With Wanja
          </h2>
          <p className="text-sm text-[#1A1A1A]/70">
            Bringing branded poetry, live spoken-word performances, and masterclass workshops to organisations, festivals, and brands.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((s) => (
            <div 
              key={s.id}
              className="p-6 rounded-2xl bg-white border border-[#E8DFD0] hover:border-[#3A6EA5] shadow-sm transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-[#3A6EA5]/10 border border-[#3A6EA5]/25 text-[#3A6EA5] flex items-center justify-center font-bold">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1A1A1A]">
                  {s.title}
                </h3>
                <p className="text-xs text-[#1A1A1A]/70 leading-relaxed">
                  {s.tagline}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E8DFD0]">
                <button
                  onClick={onOpenBooking}
                  className="w-full py-2 rounded-lg bg-[#FAF5ED] hover:bg-[#3A6EA5] border border-[#E8DFD0] hover:border-[#3A6EA5] text-[#1A1A1A] hover:text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  Inquire For Service
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. ACHIEVEMENTS HIGHLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-2xl bg-white border border-[#E8DFD0] shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#E88D4D]">
                Milestones & Accolades
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
                Recent Career Highlights
              </h2>
            </div>
            <button
              onClick={() => setActiveTab('about')}
              className="text-xs font-semibold text-[#3A6EA5] hover:text-[#C83C2E] hover:underline cursor-pointer"
            >
              Full Timeline →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {highlightedAchievements.map((ach) => (
              <div key={ach.id} className="p-4 rounded-xl bg-[#FAF5ED] border border-[#E8DFD0] space-y-2">
                <div className="flex items-center justify-between text-xs text-[#C83C2E] font-bold">
                  <span>{ach.year}</span>
                  <span className="px-2 py-0.5 rounded bg-[#E88D4D]/20 text-[#1A1A1A] border border-[#E88D4D]/30">{ach.category}</span>
                </div>
                <h4 className="font-serif text-base font-bold text-[#1A1A1A]">{ach.title}</h4>
                <p className="text-xs text-[#1A1A1A]/60">{ach.organization}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. WRITING: TWO CLEAR DOORS (BLOG & REVIEWS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#C83C2E]">
              WanjaWrites Publication
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1A1A] mt-1">
              Long-Form Writing & Critical Reviews
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('writing')}
            className="text-sm font-semibold text-[#3A6EA5] hover:text-[#C83C2E] hover:underline cursor-pointer"
          >
            Browse All Articles →
          </button>
        </div>

        {/* Two Doors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Door 1: Blog */}
          <div className="p-8 rounded-2xl bg-white border border-[#E8DFD0] hover:border-[#3A6EA5] shadow-sm transition-all space-y-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#3A6EA5]">
              <Feather className="w-4 h-4" />
              <span>Door One · The Blog</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#1A1A1A]">
              Essays, Reflections & Craft
            </h3>
            <p className="text-sm text-[#1A1A1A]/70">
              Original essays on oral archives, stage ethics, and creative excavation.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setActiveTab('writing')}
                className="px-4 py-2 rounded-lg bg-[#3A6EA5] text-white text-xs font-semibold hover:bg-[#2E5A88] shadow-xs cursor-pointer"
              >
                Enter Essay Archive
              </button>
            </div>
          </div>

          {/* Door 2: Reviews */}
          <div className="p-8 rounded-2xl bg-white border border-[#E8DFD0] hover:border-[#C83C2E] shadow-sm transition-all space-y-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#C83C2E]">
              <BookOpen className="w-4 h-4" />
              <span>Door Two · The Reviews</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#1A1A1A]">
              Books, Poetry, Film & Culture
            </h3>
            <p className="text-sm text-[#1A1A1A]/70">
              Incisive reviews analyzing modern poetry collections, African literature, and media.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setActiveTab('writing')}
                className="px-4 py-2 rounded-lg bg-[#C83C2E] text-white text-xs font-semibold hover:bg-[#B03225] shadow-xs cursor-pointer"
              >
                Enter Review Archive
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 8. FEATURED VIDEO SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-2xl bg-[#1A1A1A] text-stone-100 border border-[#2A2A2A] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-sm">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E88D4D]">
              <Play className="w-3.5 h-3.5" />
              <span>Spoken Word Video Spotlight</span>
            </div>
            <h2 className="font-serif text-3xl font-bold text-[#FFFBF5]">
              {featuredVideo.title}
            </h2>
            <p className="text-sm text-stone-300 leading-relaxed">
              {featuredVideo.description}
            </p>
            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={() => onOpenVideo(featuredVideo)}
                className="px-5 py-2.5 rounded-lg bg-[#3A6EA5] text-white text-sm font-semibold hover:bg-[#2E5A88] transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
              >
                <Play className="w-4 h-4" />
                <span>Watch Live Performance ({featuredVideo.duration})</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative group cursor-pointer" onClick={() => onOpenVideo(featuredVideo)}>
            <div className="relative aspect-video rounded-xl overflow-hidden border border-[#333333] bg-black">
              <img 
                src="/images/wanja_bw_stage.jpg" 
                alt="Faith Wanja Performance Video"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform opacity-90"
              />
              <div className="absolute inset-0 bg-black/35 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-[#C83C2E] text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                  <Play className="w-7 h-7 ml-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. LETTERS FROM THE JAR — NEWSLETTER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-2xl bg-[#3A6EA5] text-white relative overflow-hidden shadow-sm">
          <div className="max-w-2xl space-y-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-amber-200">
              <Mail className="w-4 h-4" />
              <span>Direct Audience Dispatches</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              Letters From The Jar
            </h2>
            <p className="text-sm text-blue-100 leading-relaxed">
              Receive unreleased poems, reflections on craft, event announcements, and behind-the-scenes dispatches directly in your inbox.
            </p>

            {newsletterSuccess ? (
              <div className="p-4 rounded-lg bg-white/20 border border-white/30 text-white font-medium text-sm flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-amber-300" />
                <span>You are subscribed to Letters From The Jar! Check your inbox soon.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 pt-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="px-4 py-3 rounded-lg bg-[#FFFBF5] text-[#1A1A1A] placeholder-stone-400 text-sm focus:outline-none flex-1 border border-transparent focus:border-[#E88D4D]"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-lg bg-[#1A1A1A] text-white text-sm font-semibold hover:bg-[#2B2B2B] transition-colors shadow-xs cursor-pointer"
                >
                  Subscribe
                </button>
              </form>
            )}
            <p className="text-[11px] text-blue-100">
              No spam. Unsubscribe at any time. Social media brings people to the work; newsletter builds direct connection.
            </p>
          </div>
        </div>
      </section>

      {/* 10. FINAL CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 pt-6">
        <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#1A1A1A]">
          Bring One-Jar Poetry to Your Stage or Campaign
        </h2>
        <p className="text-base text-[#1A1A1A]/70 max-w-xl mx-auto">
          Whether you are organizing a festival, launching a cultural initiative, or seeking a poetry masterclass for your community.
        </p>
        <div>
          <button
            onClick={onOpenBooking}
            className="px-8 py-4 rounded-lg bg-[#C83C2E] text-white text-base font-bold hover:bg-[#B03225] transition-all shadow-sm inline-flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-amber-200" />
            <span>Start Booking Request</span>
          </button>
        </div>
      </section>

    </div>
  );
};
