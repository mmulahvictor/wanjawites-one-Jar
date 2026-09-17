import React, { useState } from 'react';
import { Poem, VideoItem, GalleryItem } from '../types';
import { POEMS as DEFAULT_POEMS, VIDEOS as DEFAULT_VIDEOS, GALLERY } from '../data/mockData';
import { getPoems, getVideos } from '../lib/cmsStore';
import { Search, Filter, BookOpen, Play, Volume2, Image as ImageIcon, Sparkles, Tag, ArrowRight } from 'lucide-react';

interface PoetrySectionProps {
  poems?: Poem[];
  videos?: VideoItem[];
  onOpenPoem: (poem: Poem) => void;
  onOpenVideo: (video: VideoItem) => void;
  onOpenBooking: () => void;
}

export const PoetrySection: React.FC<PoetrySectionProps> = ({
  poems,
  videos,
  onOpenPoem,
  onOpenVideo,
  onOpenBooking
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'all-poems' | 'performances' | 'gallery'>('all-poems');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [selectedGalleryCategory, setSelectedGalleryCategory] = useState<string>('All');

  // Use dynamic poems from props or store, filtered for published status
  const poemList = poems || getPoems() || DEFAULT_POEMS;
  const publishedPoems = poemList.filter((p) => (p.status || 'published') === 'published');

  const videoList = videos || getVideos() || DEFAULT_VIDEOS;
  const publishedVideos = videoList.filter((v) => (v.status || 'published') === 'published');

  const allTags = ['All', ...Array.from(new Set(publishedPoems.flatMap((p) => p.tags)))];

  const filteredPoems = publishedPoems.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.stanzas.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          (p.context && p.context.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesTag = selectedTag === 'All' || p.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const filteredGallery = GALLERY.filter((g) => {
    return selectedGalleryCategory === 'All' || g.category === selectedGalleryCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pb-16">
      
      {/* Header Banner */}
      <div className="p-8 sm:p-12 rounded-2xl bg-[#1A1A1A] text-white space-y-4 border border-[#2A2A2A] shadow-sm">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#E88D4D]">
          <BookOpen className="w-4 h-4" />
          <span>One-Jar Poetry Archive</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#FFFBF5]">
          The Poetry & Performance Identity
        </h1>
        <p className="text-sm sm:text-base text-stone-300 max-w-2xl leading-relaxed">
          "What Wanja's poetry sounds, feels, and looks like." An archive of unsealed written stanzas, spoken-word videos, and live performance documentation.
        </p>

        {/* Sub-navigation tabs */}
        <div className="pt-4 flex flex-wrap gap-2 text-xs font-semibold">
          <button
            onClick={() => setActiveSubTab('all-poems')}
            className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
              activeSubTab === 'all-poems'
                ? 'bg-[#C83C2E] text-white font-bold'
                : 'bg-[#2A2A2A] text-stone-300 hover:bg-[#333333]'
            }`}
          >
            Poems Collection ({publishedPoems.length})
          </button>
          <button
            onClick={() => setActiveSubTab('performances')}
            className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
              activeSubTab === 'performances'
                ? 'bg-[#C83C2E] text-white font-bold'
                : 'bg-[#2A2A2A] text-stone-300 hover:bg-[#333333]'
            }`}
          >
            Spoken-Word Performances ({publishedVideos.length})
          </button>
          <button
            onClick={() => setActiveSubTab('gallery')}
            className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
              activeSubTab === 'gallery'
                ? 'bg-[#C83C2E] text-white font-bold'
                : 'bg-[#2A2A2A] text-stone-300 hover:bg-[#333333]'
            }`}
          >
            Performance Gallery ({GALLERY.length})
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: ALL POEMS */}
      {activeSubTab === 'all-poems' && (
        <div className="space-y-8">
          
          {/* Controls: Search & Tags */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-white border border-[#E8DFD0] shadow-xs">
            
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search poems by title or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#FAF5ED] border border-[#E8DFD0] text-xs text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#3A6EA5]"
              />
            </div>

            {/* Tag Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
              <span className="text-xs text-[#1A1A1A]/70 font-semibold mr-1 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-[#E88D4D]" />
                <span>Theme:</span>
              </span>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    selectedTag === tag
                      ? 'bg-[#3A6EA5] text-white'
                      : 'bg-[#FAF5ED] border border-[#E8DFD0] text-[#1A1A1A]/80 hover:border-[#3A6EA5]'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Poems Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPoems.map((poem) => (
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

                  <p className="font-poem italic text-[#1A1A1A]/75 text-base leading-relaxed line-clamp-4 pl-3 border-l-2 border-[#C83C2E]/40">
                    "{poem.stanzas[0]}"
                  </p>

                  <p className="text-xs text-[#1A1A1A]/65 line-clamp-2">
                    {poem.excerpt}
                  </p>
                </div>

                <div className="space-y-3 pt-4 border-t border-[#E8DFD0]">
                  <div className="flex flex-wrap gap-1">
                    {poem.tags.map((t) => (
                      <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-[#FAF5ED] border border-[#E8DFD0] text-[#1A1A1A]/70 font-medium">
                        #{t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs font-semibold text-[#3A6EA5] group-hover:text-[#C83C2E]">
                    <span className="flex items-center gap-1">
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Read & Listen to Poem</span>
                    </span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredPoems.length === 0 && (
            <div className="p-12 text-center text-[#1A1A1A]/60 bg-white border border-[#E8DFD0] rounded-2xl">
              No poems found matching your search query. Try resetting your theme filter.
            </div>
          )}
        </div>
      )}

      {/* SUB-TAB 2: PERFORMANCES */}
      {activeSubTab === 'performances' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {publishedVideos.map((video) => (
              <div
                key={video.id}
                onClick={() => onOpenVideo(video)}
                className="p-6 rounded-2xl bg-white border border-[#E8DFD0] hover:border-[#3A6EA5] shadow-sm transition-all cursor-pointer space-y-4 group"
              >
                <div className="relative aspect-video rounded-xl overflow-hidden bg-black">
                  <img
                    src={video.thumbnailUrl || "/images/wanja_navy_stage.jpg"}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[#C83C2E] text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                      <Play className="w-6 h-6 ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/80 text-white text-[10px] rounded font-mono">
                    {video.duration}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-bold text-[#E88D4D] uppercase tracking-wider">
                    {video.event} · {video.date}
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#1A1A1A] group-hover:text-[#3A6EA5] transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-xs text-[#1A1A1A]/70 leading-relaxed">
                    {video.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: GALLERY */}
      {activeSubTab === 'gallery' && (
        <div className="space-y-6">
          {/* Gallery Category Filter */}
          <div className="flex items-center gap-2">
            {['All', 'Performance', 'Portrait', 'Behind The Scenes', 'Collaboration'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedGalleryCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                  selectedGalleryCategory === cat
                    ? 'bg-[#3A6EA5] text-white'
                    : 'bg-white border border-[#E8DFD0] text-[#1A1A1A]/70 hover:bg-[#FAF5ED]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredGallery.map((g) => (
              <div key={g.id} className="rounded-2xl overflow-hidden bg-white border border-[#E8DFD0] shadow-xs space-y-3 p-3">
                <div className="aspect-square rounded-xl overflow-hidden bg-stone-100">
                  <img src={g.imageUrl} alt={g.title} className="w-full h-full object-cover hover:scale-105 transition-transform" />
                </div>
                <div className="px-1 space-y-1">
                  <div className="text-[10px] uppercase font-bold text-[#E88D4D]">{g.category} · {g.location}</div>
                  <h4 className="font-serif text-sm font-bold text-[#1A1A1A]">{g.title}</h4>
                  <p className="text-xs text-[#1A1A1A]/60">{g.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Booking Prompt Banner */}
      <div className="p-8 rounded-2xl bg-white border border-[#E8DFD0] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="font-serif text-2xl font-bold text-[#1A1A1A]">
            Commission an Original Spoken Word Piece
          </h3>
          <p className="text-xs text-[#1A1A1A]/70 mt-1">
            Wanja collaborates with cultural institutions, campaigns, and festivals for live recitals & commissions.
          </p>
        </div>
        <button
          onClick={onOpenBooking}
          className="px-6 py-3 rounded-lg bg-[#C83C2E] text-white text-xs font-semibold hover:bg-[#B03225] whitespace-nowrap shadow-xs cursor-pointer"
        >
          Request Spoken Word Booking
        </button>
      </div>

    </div>
  );
};
