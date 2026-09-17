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
      <section className="relative overflow-hidden bg-slate-50 pt-8 sm:pt-16 pb-16 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Copy */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>WanjaWrites × One-Jar</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
                "My name is Wanja. <br />
                <span className="italic text-indigo-600 font-normal">I fill spaces with poems ONE JAR at a time."</span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-sans max-w-2xl">
                Kenyan poet, cultural documentarian, and communications consultant whose work centres on womanhood, generational healing, identity, and social justice. Driven by one question: <em>Who keeps the record of our becoming?</em>
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  id="hero-explore-poetry-btn"
                  onClick={() => setActiveTab('poetry')}
                  className="px-6 py-3.5 rounded-lg bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 transition-all shadow-sm flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4 text-indigo-200" />
                  <span>Explore Poetry & Recitals</span>
                </button>

                <button
                  id="hero-work-with-wanja-btn"
                  onClick={onOpenBooking}
                  className="px-6 py-3.5 rounded-lg border border-slate-300 bg-white text-slate-800 font-semibold text-sm hover:border-indigo-600 hover:text-indigo-600 transition-all flex items-center gap-2 shadow-xs"
                >
                  <Mic className="w-4 h-4 text-indigo-600" />
                  <span>Work With Wanja</span>
                </button>

                <button
                  id="hero-read-writing-btn"
                  onClick={() => setActiveTab('writing')}
                  className="px-4 py-3.5 text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors flex items-center gap-1.5"
                >
                  <span>Culture Writing & Reports</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Quick stats / credibility line */}
              <div className="pt-6 border-t border-slate-200 grid grid-cols-3 gap-4 text-xs text-slate-500">
                <div>
                  <span className="block font-bold text-slate-900 text-base">Poetry Slam Africa</span>
                  <span>Grand Slam Finalist</span>
                </div>
                <div>
                  <span className="block font-bold text-slate-900 text-base">Kitale Film Week</span>
                  <span>Opening Night Recital</span>
                </div>
                <div>
                  <span className="block font-bold text-slate-900 text-base">Communications</span>
                  <span>EduTab Africa & Watoto Watch</span>
                </div>
              </div>
            </div>

            {/* Hero Visual Card / Portrait Metaphor */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="absolute -inset-2 rounded-3xl bg-indigo-500/10 blur-xl"></div>
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm p-4 space-y-4">
                  <div className="relative aspect-[4/5] rounded-xl overflow-hidden">
                    <img 
                      src="/images/wanja_headshot.jpg" 
                      alt="Faith Wanja (One-Jar Poetry)" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                      <span className="text-xs uppercase tracking-widest text-indigo-300 font-bold">
                        WANJA WRITES
                      </span>
                      <h3 className="font-serif text-2xl font-bold mt-1">
                        Poet · Writer · Storyteller
                      </h3>
                      <p className="text-xs text-slate-300 mt-1 font-sans">
                        "The stage is an excavation site. You bring a microphone as your shovel."
                      </p>
                    </div>
                  </div>

                  {/* Quick Audio / Poem Preview Widget */}
                  <div 
                    onClick={() => onOpenPoem(featuredPoems[0] || poemList[0])}
                    className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-indigo-500 cursor-pointer transition-colors flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center group-hover:bg-indigo-700 transition-colors">
                        <Volume2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Featured Audio Poem</div>
                        <div className="text-sm font-bold text-slate-900 font-serif">"The Jar We Carry"</div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-indigo-600 group-hover:underline">Listen & Read →</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. THE ONE-JAR PHILOSOPHY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-2xl bg-slate-900 text-white relative overflow-hidden shadow-sm border border-slate-800">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-indigo-400">
              <Feather className="w-4 h-4" />
              <span>Emotional & Artistic Foundation</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white leading-tight">
              The One-Jar Philosophy
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
              Why "One-Jar"? In traditional East African households, terracotta jars were vessels built for water, grain, or honey—vessels buried in dry soil to keep contents cold and untainted by heat.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-slate-800">
              <div className="space-y-2">
                <h3 className="font-serif text-xl font-bold text-indigo-400">1. Excavation</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Poetry is not invented; it is unearthed from silence, grief, and ancestral memory.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-xl font-bold text-indigo-400">2. Witness</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  The spoken word stands as an uncorrupted witness to personal and collective truth.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-xl font-bold text-indigo-400">3. Containers</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
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
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">
              Curated Selection
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 mt-1">
              Featured Poetry — From the Jar
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('poetry')}
            className="text-sm font-semibold text-indigo-600 hover:underline flex items-center gap-1.5"
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
              className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-indigo-500 shadow-sm transition-all cursor-pointer flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="px-2.5 py-0.5 rounded bg-indigo-50 text-indigo-700 font-bold border border-indigo-100">
                    {poem.year}
                  </span>
                  <span>{poem.readTimeMinutes} min read</span>
                </div>

                <h3 className="font-serif text-2xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {poem.title}
                </h3>

                <p className="font-poem italic text-slate-600 text-base line-clamp-3 leading-relaxed">
                  "{poem.stanzas[0]}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1 text-indigo-600 font-semibold">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Unseal Poem & Audio</span>
                </div>
                <span className="text-slate-400 font-mono">Read →</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. ABOUT WANJA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-2xl bg-white border border-slate-200 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5">
            <img 
              src="/images/wanja_blue_stage.jpg" 
              alt="Faith Wanja on Stage at Kitale Film Week / Baraza Media Lab"
              className="w-full h-80 lg:h-96 object-cover rounded-xl shadow-xs border border-slate-200"
            />
          </div>

          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">
              The Storyteller
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
              About Wanja
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Wanja is a celebrated Kenyan poet, essayist, and performance artist whose work operates at the intersection of oral tradition and modern storytelling. Under WanjaWrites and One-Jar Poetry, she crafts visceral spoken word pieces that examine ancestral memory, urban identity, and emotional witness.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setActiveTab('about')}
                className="px-5 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-xs"
              >
                Read Full Story & EPK
              </button>
              <button
                onClick={() => setActiveTab('about')}
                className="text-sm font-semibold text-indigo-600 hover:underline"
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
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">
            Professional Offerings
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
            Work With Wanja
          </h2>
          <p className="text-sm text-slate-600">
            Bringing branded poetry, live spoken-word performances, and masterclass workshops to organisations, festivals, and brands.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((s) => (
            <div 
              key={s.id}
              className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-indigo-500 shadow-sm transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl font-bold text-slate-900">
                  {s.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {s.tagline}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <button
                  onClick={onOpenBooking}
                  className="w-full py-2 rounded-lg bg-slate-50 hover:bg-indigo-600 border border-slate-200 hover:border-indigo-600 text-slate-700 hover:text-white text-xs font-semibold transition-colors"
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
        <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">
                Milestones & Accolades
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
                Recent Career Highlights
              </h2>
            </div>
            <button
              onClick={() => setActiveTab('about')}
              className="text-xs font-semibold text-indigo-600 hover:underline"
            >
              Full Timeline →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {highlightedAchievements.map((ach) => (
              <div key={ach.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs text-indigo-600 font-bold">
                  <span>{ach.year}</span>
                  <span className="px-2 py-0.5 rounded bg-indigo-50 border border-indigo-100">{ach.category}</span>
                </div>
                <h4 className="font-serif text-base font-bold text-slate-900">{ach.title}</h4>
                <p className="text-xs text-slate-500">{ach.organization}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. WRITING: TWO CLEAR DOORS (BLOG & REVIEWS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">
              WanjaWrites Publication
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 mt-1">
              Long-Form Writing & Critical Reviews
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('writing')}
            className="text-sm font-semibold text-indigo-600 hover:underline"
          >
            Browse All Articles →
          </button>
        </div>

        {/* Two Doors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Door 1: Blog */}
          <div className="p-8 rounded-2xl bg-white border border-slate-200 hover:border-indigo-500 shadow-sm transition-all space-y-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-indigo-600">
              <Feather className="w-4 h-4" />
              <span>Door One · The Blog</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-slate-900">
              Essays, Reflections & Craft
            </h3>
            <p className="text-sm text-slate-600">
              Original essays on oral archives, stage ethics, and creative excavation.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setActiveTab('writing')}
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 shadow-xs"
              >
                Enter Essay Archive
              </button>
            </div>
          </div>

          {/* Door 2: Reviews */}
          <div className="p-8 rounded-2xl bg-white border border-slate-200 hover:border-indigo-500 shadow-sm transition-all space-y-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-indigo-600">
              <BookOpen className="w-4 h-4" />
              <span>Door Two · The Reviews</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-slate-900">
              Books, Poetry, Film & Culture
            </h3>
            <p className="text-sm text-slate-600">
              Incisive reviews analyzing modern poetry collections, African literature, and media.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setActiveTab('writing')}
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 shadow-xs"
              >
                Enter Review Archive
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 8. FEATURED VIDEO SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-2xl bg-slate-900 text-slate-100 border border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-sm">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-indigo-400">
              <Play className="w-3.5 h-3.5" />
              <span>Spoken Word Video Spotlight</span>
            </div>
            <h2 className="font-serif text-3xl font-bold text-white">
              {featuredVideo.title}
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              {featuredVideo.description}
            </p>
            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={() => onOpenVideo(featuredVideo)}
                className="px-5 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-xs"
              >
                <Play className="w-4 h-4" />
                <span>Watch Live Performance ({featuredVideo.duration})</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative group cursor-pointer" onClick={() => onOpenVideo(featuredVideo)}>
            <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-800 bg-black">
              <img 
                src="/images/wanja_bw_stage.jpg" 
                alt="Faith Wanja Performance Video"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform opacity-90"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-indigo-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                  <Play className="w-7 h-7 ml-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. LETTERS FROM THE JAR — NEWSLETTER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-2xl bg-indigo-600 text-white relative overflow-hidden shadow-sm">
          <div className="max-w-2xl space-y-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-indigo-200">
              <Mail className="w-4 h-4" />
              <span>Direct Audience Dispatches</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              Letters From The Jar
            </h2>
            <p className="text-sm text-indigo-100 leading-relaxed">
              Receive unreleased poems, reflections on craft, event announcements, and behind-the-scenes dispatches directly in your inbox.
            </p>

            {newsletterSuccess ? (
              <div className="p-4 rounded-lg bg-white/20 border border-white/30 text-white font-medium text-sm flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-300" />
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
                  className="px-4 py-3 rounded-lg bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none flex-1 border border-transparent focus:border-indigo-300"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-lg bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-colors shadow-xs"
                >
                  Subscribe
                </button>
              </form>
            )}
            <p className="text-[11px] text-indigo-200">
              No spam. Unsubscribe at any time. Social media brings people to the work; newsletter builds direct connection.
            </p>
          </div>
        </div>
      </section>

      {/* 10. FINAL CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 pt-6">
        <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-slate-900">
          Bring One-Jar Poetry to Your Stage or Campaign
        </h2>
        <p className="text-base text-slate-600 max-w-xl mx-auto">
          Whether you are organizing a festival, launching a cultural initiative, or seeking a poetry masterclass for your community.
        </p>
        <div>
          <button
            onClick={onOpenBooking}
            className="px-8 py-4 rounded-lg bg-indigo-600 text-white text-base font-bold hover:bg-indigo-700 transition-all shadow-sm inline-flex items-center gap-2"
          >
            <Sparkles className="w-5 h-5 text-indigo-200" />
            <span>Start Booking Request</span>
          </button>
        </div>
      </section>

    </div>
  );
};
