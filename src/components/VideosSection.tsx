import React, { useState } from 'react';
import { VideoItem } from '../types';
import { VIDEOS as DEFAULT_VIDEOS } from '../data/mockData';
import { getVideos } from '../lib/cmsStore';
import { 
  YOUTUBE_CHANNEL_URL, 
  YOUTUBE_CHANNEL_HANDLE, 
  getYouTubeThumbnailUrl, 
  getYouTubeWatchUrl, 
  syncYouTubeChannelVideos 
} from '../lib/youtubeChannelService';
import { Play, Youtube, Clock, Filter, ExternalLink, RefreshCw, CheckCircle, Sparkles } from 'lucide-react';

interface VideosSectionProps {
  videos?: VideoItem[];
  onOpenVideo: (video: VideoItem) => void;
  onOpenBooking: () => void;
}

export const VideosSection: React.FC<VideosSectionProps> = ({ videos, onOpenVideo, onOpenBooking }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncStatus, setSyncStatus] = useState<string | null>(null);

  const categories = ['All', 'spoken_word', 'keynote', 'reflection', 'reading'];

  const videoList = (videos || getVideos() || DEFAULT_VIDEOS).filter(v => (v.status || 'published') === 'published');

  const filteredVideos = videoList.filter((v) => {
    return selectedCategory === 'All' || v.category === selectedCategory;
  });

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'spoken_word': return 'Spoken Word Live';
      case 'keynote': return 'Keynote & Panels';
      case 'reflection': return 'Studio Reflections';
      case 'reading': return 'Outdoor Recitals';
      default: return 'All Videos';
    }
  };

  const handleSyncChannel = async () => {
    setIsSyncing(true);
    setSyncStatus(null);
    try {
      const result = await syncYouTubeChannelVideos();
      setSyncStatus(result.message);
      setTimeout(() => setSyncStatus(null), 5000);
    } catch (err) {
      setSyncStatus('Could not check for new videos at this time.');
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pb-16">
      
      {/* YouTube Channel Header Banner */}
      <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 text-white space-y-6 border border-slate-800 shadow-lg relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-950/80 border border-red-800/60 rounded-full text-xs font-bold text-red-400">
              <Youtube className="w-4 h-4 text-red-500 fill-red-500" />
              <span>Official YouTube Channel ({YOUTUBE_CHANNEL_HANDLE})</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              One Jar Poetry Videos
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              Explore spoken word recitals, keynotes, and memory excavation studio sessions from the official YouTube channel <strong className="text-white font-semibold">@one_jar_poetry</strong>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={YOUTUBE_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-md transition-colors flex items-center gap-2"
            >
              <Youtube className="w-4 h-4 fill-current" />
              <span>Subscribe on YouTube</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>

            <button
              onClick={handleSyncChannel}
              disabled={isSyncing}
              className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold transition-colors flex items-center gap-2 disabled:opacity-60"
              title="Check @one_jar_poetry channel for new video releases"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-indigo-400 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Checking Channel...' : 'Sync New Videos'}</span>
            </button>
          </div>
        </div>

        {/* Sync Status Banner */}
        {syncStatus && (
          <div className="p-3.5 rounded-xl bg-indigo-900/80 border border-indigo-700 text-indigo-100 text-xs font-semibold flex items-center gap-2 animate-fade-in">
            <CheckCircle className="w-4 h-4 text-indigo-300 shrink-0" />
            <span>{syncStatus}</span>
          </div>
        )}

        {/* Category Filters */}
        <div className="pt-4 flex flex-wrap gap-2 text-xs font-semibold border-t border-slate-800/80">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white font-bold shadow-xs'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {getCategoryLabel(cat)}
            </button>
          ))}
        </div>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredVideos.map((video) => {
          const thumbnailUrl = video.thumbnailUrl || getYouTubeThumbnailUrl(video.youtubeId);
          const watchUrl = getYouTubeWatchUrl(video.youtubeId);

          return (
            <div
              key={video.id}
              className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-indigo-500 shadow-sm hover:shadow-md transition-all space-y-4 group flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Video Thumbnail Container */}
                <div 
                  onClick={() => onOpenVideo(video)}
                  className="relative aspect-video rounded-xl overflow-hidden bg-slate-950 cursor-pointer"
                >
                  <img
                    src={thumbnailUrl}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/wanja_navy_stage.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 flex items-center justify-center transition-colors">
                    <div className="w-14 h-14 rounded-full bg-red-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                      <Play className="w-7 h-7 ml-1 fill-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/85 text-white text-[10px] rounded font-mono font-bold tracking-wider">
                    {video.duration || '04:12'}
                  </div>
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-red-600 text-white text-[10px] font-bold rounded-md flex items-center gap-1 shadow-sm">
                    <Youtube className="w-3 h-3 fill-current" />
                    <span>@one_jar_poetry</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-indigo-600">
                    <span>{video.event}</span>
                    <span className="text-slate-400 font-normal">{video.date}</span>
                  </div>
                  <h3 
                    onClick={() => onOpenVideo(video)}
                    className="font-serif text-2xl font-bold text-slate-900 hover:text-indigo-600 transition-colors cursor-pointer"
                  >
                    {video.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {video.description}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3 text-xs font-semibold">
                <button
                  onClick={() => onOpenVideo(video)}
                  className="px-3.5 py-2 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 transition-colors flex items-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Play Preview</span>
                </button>

                <a
                  href={watchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center gap-1.5"
                >
                  <Youtube className="w-3.5 h-3.5 text-red-600 fill-current" />
                  <span>Watch on YouTube</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Booking & Channel Subscription CTA */}
      <div className="p-8 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs text-red-400 font-bold">
            <Youtube className="w-4 h-4 fill-current" />
            <span>@one_jar_poetry on YouTube</span>
          </div>
          <h3 className="font-serif text-2xl font-bold text-white">
            Invite Wanja to Perform Live at Your Event
          </h3>
          <p className="text-xs text-slate-300 max-w-xl">
            Available for literary festivals, corporate keynotes, cultural galas, and virtual recitals worldwide.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={YOUTUBE_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-lg bg-red-600 text-white text-xs font-bold hover:bg-red-500 transition-colors flex items-center gap-2"
          >
            <Youtube className="w-4 h-4 fill-current" />
            <span>Subscribe @one_jar_poetry</span>
          </a>
          <button
            onClick={onOpenBooking}
            className="px-5 py-3 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-500 whitespace-nowrap shadow-xs transition-colors"
          >
            Book Live Performance
          </button>
        </div>
      </div>

    </div>
  );
};
