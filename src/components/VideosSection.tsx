import React, { useState } from 'react';
import { VideoItem } from '../types';
import { VIDEOS as DEFAULT_VIDEOS, YOUTUBE_CHANNEL_URL, YOUTUBE_CHANNEL_HANDLE } from '../data/mockData';
import { getVideos } from '../lib/cmsStore';
import { Play, Youtube, ExternalLink } from 'lucide-react';

interface VideosSectionProps {
  videos?: VideoItem[];
  onOpenVideo: (video: VideoItem) => void;
  onOpenBooking: () => void;
}

export const VideosSection: React.FC<VideosSectionProps> = ({ 
  videos, 
  onOpenVideo, 
  onOpenBooking 
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'spoken_word', 'reading', 'keynote', 'reflection'];

  const videoList = (videos || getVideos() || DEFAULT_VIDEOS).filter(
    (v) => (v.status || 'published') === 'published'
  );

  const filteredVideos = videoList.filter((v) => {
    return selectedCategory === 'All' || v.category === selectedCategory;
  });

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'spoken_word': return 'Spoken Word Live';
      case 'keynote': return 'Keynote & Panels';
      case 'reflection': return 'Studio Reflections';
      case 'reading': return 'Recitals & Short Films';
      default: return 'All Releases';
    }
  };

  return (
    <div className="w-full">
      
      {/* 1. Header Banner matching sample .pgh */}
      <section className="bg-[#D81B7A] text-white px-6 sm:px-12 md:px-20 py-16 sm:py-20">
        <div className="max-w-4xl space-y-4">
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-normal leading-[1.02] tracking-tight">
            Film & Media
          </h1>
          <p className="text-base sm:text-lg text-white/90 max-w-2xl font-sans">
            Short films, spoken word recitals, and visual documentation written and performed by Faith Wanja.
          </p>
        </div>
      </section>

      {/* 2. Job Hunt Short Film Spotlight matching sample .film */}
      <section className="px-6 sm:px-12 md:px-20 py-16 bg-[#FFF6EC] text-[#3A1208] border-b border-[#FFD9E6]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          
          <div className="md:col-span-5 flex justify-center">
            <img 
              src="/images/film-job-hunt.jpg" 
              alt="Poster for the short film Job Hunt, a quiet collapse, written by Faith Wanja and produced by The Four Frames" 
              className="w-full max-w-md rounded-2xl shadow-md border-2 border-[#D81B7A]/20"
            />
          </div>

          <div className="md:col-span-7 space-y-4 text-left">
            <span className="inline-block bg-[#FFD9E6] text-[#D81B7A] font-semibold text-xs px-3.5 py-1 rounded-full">
              Short film
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#3A1208] font-normal leading-tight">
              Job Hunt
            </h2>
            <p className="font-serif text-2xl sm:text-4xl text-[#D81B7A] font-normal">
              Coming to your screens soon.
            </p>
            <p className="text-base sm:text-lg text-[#3A1208]/85 leading-relaxed font-sans pt-2">
              Written by Faith Wanja and produced by The Four Frames. <em>Job Hunt</em> is an intimate, unflinching short film interrogating the quiet collapse of dignity, resilience, and hope experienced by young graduates searching for work in urban Kenya.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={onOpenBooking}
                className="btn-wanja cursor-pointer"
              >
                Inquire for Screenings & Film Labs
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 3. YouTube Archive & Spoken Word Recitals */}
      <section className="px-6 sm:px-12 md:px-20 py-16 bg-[#FFF6EC] text-[#3A1208]">
        <div className="max-w-7xl mx-auto space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#3A1208] font-normal">
                YouTube Archive
              </h2>
              <p className="text-sm text-[#3A1208]/75 mt-1 font-sans">
                Recitals, festival keynotes, and studio recordings from {YOUTUBE_CHANNEL_HANDLE}.
              </p>
            </div>

            <a
              href={YOUTUBE_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-wanja text-xs py-2 px-5 inline-flex items-center gap-2 self-start sm:self-auto cursor-pointer"
            >
              <Youtube className="w-4 h-4" />
              <span>Subscribe on YouTube</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2.5 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#D81B7A] text-white'
                    : 'bg-white text-[#3A1208] border border-[#FFD9E6] hover:border-[#D81B7A]'
                }`}
              >
                {getCategoryLabel(cat)}
              </button>
            ))}
          </div>

          {/* Video Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video) => {
              const thumb = video.thumbnailUrl || '/images/gal-8-bw-performance.jpg';

              return (
                <div 
                  key={video.id}
                  className="bg-white rounded-2xl p-5 border border-[#FFD9E6] shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow group"
                >
                  <div>
                    {/* Video thumbnail with play trigger */}
                    <div 
                      onClick={() => onOpenVideo(video)}
                      className="relative rounded-xl overflow-hidden aspect-video bg-black cursor-pointer mb-4"
                    >
                      <img 
                        src={thumb} 
                        alt={video.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-[#D81B7A] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Play className="w-5 h-5 fill-current ml-0.5" />
                        </div>
                      </div>
                      <span className="absolute bottom-2 right-2 text-[10px] font-bold text-white bg-black/80 px-2 py-0.5 rounded-md">
                        {video.duration}
                      </span>
                    </div>

                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#D81B7A] bg-[#FFD9E6] px-2.5 py-0.5 rounded-full inline-block mb-2">
                      {video.event}
                    </span>

                    <h3 
                      onClick={() => onOpenVideo(video)}
                      className="font-serif text-xl sm:text-2xl text-[#3A1208] font-normal leading-snug cursor-pointer group-hover:text-[#D81B7A] transition-colors mb-2"
                    >
                      {video.title}
                    </h3>

                    <p className="text-xs text-[#3A1208]/75 line-clamp-2 leading-relaxed mb-4">
                      {video.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#FFD9E6]">
                    <span className="text-[11px] text-[#3A1208]/60 font-medium">
                      {video.date}
                    </span>
                    <button
                      onClick={() => onOpenVideo(video)}
                      className="btn-wanja-alt text-xs py-1 px-3 cursor-pointer"
                    >
                      Play Video
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

    </div>
  );
};
