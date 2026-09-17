import React, { useState } from 'react';
import { VideoItem } from '../types';
import { X, Calendar, Clock, BookOpen, Share2, Sparkles, ArrowRight, ExternalLink, Play } from 'lucide-react';
import { YOUTUBE_CHANNEL_URL } from '../data/mockData';

interface VideoPlayerModalProps {
  video: VideoItem | null;
  onClose: () => void;
  onOpenBooking: () => void;
  onOpenPoem?: (poemSlug: string) => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  video,
  onClose,
  onOpenBooking,
  onOpenPoem
}) => {
  const [useIframe, setUseIframe] = useState(true);

  if (!video) return null;

  const videoImg = video.thumbnailUrl || '/images/wanja_bw_stage.jpg';
  const ytWatchUrl = video.youtubeId ? `https://www.youtube.com/watch?v=${video.youtubeId}` : YOUTUBE_CHANNEL_URL;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#1A1A1A]/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div 
        className="bg-[#1A1A1A] text-[#FAF5ED] w-full max-w-4xl rounded-2xl shadow-xl border border-[#2A2A2A] overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 bg-[#1A1A1A] border-b border-[#2A2A2A] flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#E88D4D]">
              {video.event} · {video.date}
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#FFFBF5] mt-0.5">
              {video.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-stone-400 hover:text-white hover:bg-[#2A2A2A] transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Video Player or Stage Photo Preview */}
        <div className="relative aspect-video bg-black w-full overflow-hidden group">
          {useIframe ? (
            <iframe
              className="w-full h-full"
              src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onError={() => setUseIframe(false)}
            />
          ) : (
            <div className="relative w-full h-full">
              <img 
                src={videoImg} 
                alt={video.title} 
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#C83C2E] text-white flex items-center justify-center shadow-lg">
                  <Play className="w-8 h-8 ml-1 fill-white" />
                </div>
                <div className="space-y-1 max-w-md">
                  <p className="text-[#FFFBF5] font-serif font-bold text-lg">{video.title}</p>
                  <p className="text-xs text-stone-300">
                    Watch Faith Wanja's performance recital directly on the official @one_jar_poetry channel.
                  </p>
                </div>
                <a
                  href={ytWatchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-lg bg-[#C83C2E] hover:bg-[#B03225] text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Watch on YouTube (@one_jar_poetry)</span>
                </a>
              </div>
            </div>
          )}
        </div>

        {/* YouTube Channel Banner */}
        <div className="bg-[#141414] px-6 py-3 border-b border-[#2A2A2A] flex flex-wrap items-center justify-between gap-3 text-xs text-stone-300">
          <span className="flex items-center gap-2 font-medium">
            <span className="w-2 h-2 rounded-full bg-[#C83C2E] animate-pulse"></span>
            <span>Official Channel: <strong className="text-[#FAF5ED]">@one_jar_poetry</strong></span>
          </span>
          <a
            href={YOUTUBE_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#FAF5ED] hover:text-white font-bold flex items-center gap-1 hover:underline"
          >
            <span>Visit @one_jar_poetry on YouTube</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Video Info & Content Connections */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-stone-400 pb-4 border-b border-[#2A2A2A]">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#E88D4D]" />
                <span>Duration: {video.duration}</span>
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#3A6EA5]" />
                <span>{video.event}</span>
              </span>
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert("Performance link copied!");
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2A2A2A] hover:bg-[#333333] border border-[#333333] text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Video</span>
            </button>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-[#E88D4D] mb-2">
              Performance Context
            </h4>
            <p className="text-sm text-stone-300 leading-relaxed">
              {video.description}
            </p>
          </div>

          {video.transcript && (
            <div className="p-4 rounded-xl bg-[#222222] border border-[#333333] space-y-1">
              <h5 className="text-xs uppercase tracking-wider font-bold text-stone-400">
                Performance Transcript / Excerpt
              </h5>
              <p className="text-xs text-stone-200 italic font-serif leading-relaxed">
                "{video.transcript}"
              </p>
            </div>
          )}

          {/* Connection to Poem or Booking */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#2A2A2A]">
            {video.poemSlug && onOpenPoem ? (
              <button
                onClick={() => {
                  onClose();
                  onOpenPoem(video.poemSlug!);
                }}
                className="text-xs text-[#FAF5ED] hover:underline flex items-center gap-1.5 font-bold cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-[#E88D4D]" />
                <span>Read written stanzas for this poem</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#FAF5ED]" />
              </button>
            ) : <div />}

            <button
              onClick={() => {
                onClose();
                onOpenBooking();
              }}
              className="px-4 py-2.5 rounded-lg bg-[#C83C2E] text-white text-xs font-bold hover:bg-[#B03225] transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Book Wanja for Live Performance</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
