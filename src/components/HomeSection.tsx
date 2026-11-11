import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Poem, VideoItem, Article, Achievement, Service } from '../types';
import { ArrowRight, ChevronDown } from 'lucide-react';

interface HomeSectionProps {
  poems?: Poem[];
  videos?: VideoItem[];
  articles?: Article[];
  services?: Service[];
  achievements?: Achievement[];
  siteSettings?: any;
  setActiveTab: (tab: any) => void;
  onOpenPoem: (poem: Poem) => void;
  onOpenVideo: (video: VideoItem) => void;
  onOpenBooking: (serviceId?: string) => void;
  onOpenArticle: (article: Article) => void;
}

export const HomeSection: React.FC<HomeSectionProps> = ({
  poems = [],
  onOpenBooking,
}) => {
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full">
      
      {/* Horizontal Anchor Quick Bar matching sample .anchors */}
      <div 
        className="sticky top-[61px] z-30 bg-[#FFF6EC] text-[#3A1208] flex items-center gap-6 px-6 sm:px-12 py-3 overflow-x-auto text-sm font-medium border-b border-[#D81B7A]/20 shadow-xs"
        aria-label="Section Quick Links"
      >
        <button 
          onClick={() => scrollToSection('s1')}
          className="hover:text-[#D81B7A] pb-1 border-b-2 border-transparent hover:border-[#D81B7A] whitespace-nowrap cursor-pointer transition-colors"
        >
          Wanja
        </button>
        <button 
          onClick={() => scrollToSection('s2')}
          className="hover:text-[#D81B7A] pb-1 border-b-2 border-transparent hover:border-[#D81B7A] whitespace-nowrap cursor-pointer transition-colors"
        >
          One-Jar
        </button>
        <button 
          onClick={() => scrollToSection('s3')}
          className="hover:text-[#D81B7A] pb-1 border-b-2 border-transparent hover:border-[#D81B7A] whitespace-nowrap cursor-pointer transition-colors"
        >
          Journal
        </button>
        <button 
          onClick={() => scrollToSection('s4')}
          className="hover:text-[#D81B7A] pb-1 border-b-2 border-transparent hover:border-[#D81B7A] whitespace-nowrap cursor-pointer transition-colors"
        >
          Film
        </button>
        <button 
          onClick={() => scrollToSection('s5')}
          className="hover:text-[#D81B7A] pb-1 border-b-2 border-transparent hover:border-[#D81B7A] whitespace-nowrap cursor-pointer transition-colors"
        >
          Contact
        </button>
      </div>

      {/* S1: HERO - Fuchsia (#D81B7A) with right-aligned blended portrait */}
      <section 
        id="s1"
        className="relative min-h-[85vh] flex flex-col justify-center px-6 sm:px-12 md:px-20 py-16 text-white overflow-hidden"
        style={{
          backgroundColor: '#D81B7A',
          backgroundImage: `linear-gradient(90deg, #D81B7A 0%, #D81B7A 52%, rgba(216, 27, 122, 0.15) 88%), url('/images/hero-wanja.jpg')`,
          backgroundPosition: 'right center',
          backgroundSize: 'auto 100%',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="relative z-10 max-w-2xl space-y-6">
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl leading-[1.02] tracking-tight font-normal">
            Wanja Writes
          </h1>
          <p className="text-base sm:text-lg md:text-xl leading-relaxed text-white/95 font-sans font-normal">
            Wanja Writes is the creative practice of a Kenyan poet, culture writer, communications consultant, and filmmaker. Working across words, images, and lived experiences, Wanja explores identity, memory, belonging, and the stories that shape us. Her work bridges artistic expression and cultural documentation, preserving voices and experiences that deserve to be remembered.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={() => navigate('/poetry')}
              className="btn-wanja-alt bg-[#FFF6EC] text-[#D81B7A] hover:bg-[#3A1208] hover:text-white cursor-pointer"
            >
              Explore One-Jar Poetry
            </button>
          </div>
          <div className="pt-6">
            <button
              onClick={() => scrollToSection('s2')}
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-white/80 hover:text-white cursor-pointer transition-colors"
            >
              <span>Scroll down</span>
              <ChevronDown className="w-4 h-4 animate-bounce" />
            </button>
          </div>
        </div>
      </section>

      {/* S2: ONE-JAR POETRY - Blush (#FFD9E6) with deep plum text and circular jar motif */}
      <section 
        id="s2"
        className="relative min-h-[75vh] flex flex-col justify-center px-6 sm:px-12 md:px-20 py-16 bg-[#FFD9E6] text-[#3A1208] overflow-hidden"
      >
        {/* Floating circular jar motif matching sample .jar.b */}
        <div 
          className="jar-circle bg-[#D81B7A] opacity-90 hidden sm:block"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-2xl space-y-6">
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl leading-[1.05] tracking-tight font-normal">
            One-Jar Poetry
          </h2>
          <p className="text-base sm:text-lg md:text-xl leading-relaxed text-[#3A1208]/90 font-sans">
            Spoken word and written poems on womanhood, grief, love, and healing, including the recently completed show “Are You Home?”
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigate('/poetry')}
              className="btn-wanja cursor-pointer"
            >
              Enter One-Jar
            </button>
            <button
              onClick={() => navigate('/about')}
              className="btn-wanja-alt cursor-pointer"
            >
              Read Biography
            </button>
          </div>
        </div>
      </section>

      {/* S3: THE JOURNAL - Warm Cream (#FFF6EC) with plum text */}
      <section 
        id="s3"
        className="relative min-h-[70vh] flex flex-col justify-center px-6 sm:px-12 md:px-20 py-16 bg-[#FFF6EC] text-[#3A1208] overflow-hidden"
      >
        <div className="relative z-10 max-w-2xl space-y-6">
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl leading-[1.05] tracking-tight font-normal">
            The Journal
          </h2>
          <p className="text-base sm:text-lg md:text-xl leading-relaxed text-[#3A1208]/90 font-sans">
            Personal letters to myself, and essays on the culture we are making and keeping.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigate('/writing')}
              className="btn-wanja cursor-pointer"
            >
              Read the Journal
            </button>
          </div>
        </div>
      </section>

      {/* S4: FILM - Plum (#3A1208) with cream text and circular jar motif */}
      <section 
        id="s4"
        className="relative min-h-[75vh] flex flex-col justify-center px-6 sm:px-12 md:px-20 py-16 bg-[#3A1208] text-[#FFF6EC] overflow-hidden"
      >
        {/* Floating circular jar motif matching sample .jar.c */}
        <div 
          className="jar-circle bg-[#D81B7A] opacity-80 hidden sm:block"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-2xl space-y-6">
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl leading-[1.05] tracking-tight font-normal">
            Film
          </h2>
          <p className="text-base sm:text-lg md:text-xl leading-relaxed text-[#FFF6EC]/90 font-sans">
            <em>Job Hunt</em>, a short film written by Faith Wanja, is coming to your screens soon. Produced by The Four Frames.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => navigate('/videos')}
              className="btn-wanja-alt bg-transparent text-white border-2 border-[#D81B7A] hover:bg-[#D81B7A] cursor-pointer"
            >
              See Job Hunt & Media
            </button>
          </div>
        </div>
      </section>

      {/* S5: SAY HELLO / CONTACT - Fuchsia (#D81B7A) with white text */}
      <section 
        id="s5"
        className="relative min-h-[70vh] flex flex-col justify-center px-6 sm:px-12 md:px-20 py-16 bg-[#D81B7A] text-white overflow-hidden"
      >
        <div className="relative z-10 max-w-2xl space-y-6">
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl leading-[1.05] tracking-tight font-normal">
            Say hello
          </h2>
          <p className="text-base sm:text-lg md:text-xl leading-relaxed text-white/95 font-sans">
            Booking a performance, commissioning writing, or starting a collaboration? Send a note.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => navigate('/contact')}
              className="btn-wanja-alt bg-[#FFF6EC] text-[#D81B7A] hover:bg-[#3A1208] hover:text-white cursor-pointer"
            >
              Get in touch
            </button>
            <button
              onClick={() => onOpenBooking()}
              className="btn-wanja-plum bg-[#3A1208] text-white hover:bg-[#FFF6EC] hover:text-[#3A1208] cursor-pointer"
            >
              Book Wanja Directly
            </button>
          </div>
        </div>
      </section>

      {/* FEATURED WORKS & RECENT HIGHLIGHTS BAR */}
      <section className="bg-[#FFF6EC] px-6 sm:px-12 md:px-20 py-16 border-t border-[#FFD9E6]">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Milestone Banner Card matching sample .feat */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-[#FFD9E6] grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-5 overflow-hidden rounded-2xl">
              <img 
                src="/images/milestone-are-you-home.jpg" 
                alt="Wanja performing at the Are You Home? show, in a red outfit at the microphone" 
                className="w-full aspect-[4/5] object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="md:col-span-7 space-y-4">
              <span className="inline-block bg-[#FFD9E6] text-[#D81B7A] font-semibold text-xs px-3 py-1 rounded-full">
                Completed show
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#3A1208]">
                Are You Home?
              </h3>
              <p className="text-sm font-semibold text-[#D81B7A]">
                17 October 2026 · Suave Kitchen and Social Club, Nairobi
              </p>
              <p className="text-[#3A1208]/85 text-sm sm:text-base leading-relaxed">
                Sometimes home is a place, the friends we collect along the way, a feeling, and also the courage to return to ourselves.
              </p>
              
              {/* Audience stats matching sample .stats */}
              <div className="flex flex-wrap gap-8 py-2">
                <div>
                  <span className="block font-serif text-4xl text-[#D81B7A] font-normal leading-none">50</span>
                  <span className="text-xs text-[#3A1208]/75">audience members</span>
                </div>
                <div>
                  <span className="block font-serif text-4xl text-[#D81B7A] font-normal leading-none">15</span>
                  <span className="text-xs text-[#3A1208]/75">poems performed</span>
                </div>
                <div>
                  <span className="block font-serif text-4xl text-[#D81B7A] font-normal leading-none">2</span>
                  <span className="text-xs text-[#3A1208]/75">collaborators</span>
                </div>
              </div>

              <blockquote className="border-l-4 border-[#D81B7A] pl-4 italic font-serif text-base sm:text-lg text-[#3A1208] my-3">
                “I loved everything about the show, from the venue, the setup, the sound, the performances, the poems👌🏾”
              </blockquote>

              <div className="pt-2 flex flex-wrap gap-3">
                <a 
                  href="https://www.instagram.com/p/De6jy8bR7mS/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-wanja text-xs py-2 px-5 inline-flex items-center gap-1.5"
                >
                  <span>Watch the recap</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
                <button 
                  onClick={() => navigate('/poetry')} 
                  className="btn-wanja-alt text-xs py-2 px-5"
                >
                  Explore All Poems
                </button>
              </div>
            </div>
          </div>

          {/* Quick 3-card signature showcase */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {poems.slice(0, 3).map((poem) => (
              <div 
                key={poem.id}
                className="bg-white rounded-2xl p-6 border border-[#FFD9E6] flex flex-col justify-between hover:shadow-md transition-shadow group"
              >
                <div>
                  <div className="h-28 rounded-xl bg-gradient-to-br from-[#D81B7A] to-[#FFD9E6] mb-4 flex items-end p-3">
                    <span className="text-[11px] font-bold text-white uppercase tracking-wider bg-[#3A1208]/60 px-2 py-0.5 rounded-full backdrop-blur-xs">
                      {poem.year}
                    </span>
                  </div>
                  <h4 className="font-serif text-2xl text-[#3A1208] mb-2 group-hover:text-[#D81B7A] transition-colors">
                    {poem.title}
                  </h4>
                  <p className="text-xs text-[#3A1208]/75 line-clamp-3 leading-relaxed mb-4">
                    {poem.excerpt}
                  </p>
                </div>
                <button
                  onClick={() => navigate(`/poetry/${poem.slug}`)}
                  className="btn-wanja-alt text-xs py-1.5 px-4 self-start cursor-pointer"
                >
                  Read Stanzas
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};
