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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div 
        className="bg-slate-900 text-slate-100 w-full max-w-4xl rounded-2xl shadow-xl border border-slate-800 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">
              {video.event} · {video.date}
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mt-0.5">
              {video.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
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
              <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg">
                  <Play className="w-8 h-8 ml-1" />
                </div>
                <div className="space-y-1 max-w-md">
                  <p className="text-white font-serif font-bold text-lg">{video.title}</p>
                  <p className="text-xs text-slate-300">
                    Watch Faith Wanja's performance recital directly on the official @one_jar_poetry channel.
                  </p>
                </div>
                <a
                  href={ytWatchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Watch on YouTube (@one_jar_poetry)</span>
                </a>
              </div>
            </div>
          )}
        </div>

        {/* YouTube Channel Banner */}
        <div className="bg-slate-950 px-6 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300">
          <span className="flex items-center gap-2 font-medium">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            <span>Official Channel: <strong>@one_jar_poetry</strong></span>
          </span>
          <a
            href={YOUTUBE_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-400 hover:text-red-300 font-bold flex items-center gap-1 hover:underline"
          >
            <span>Visit @one_jar_poetry on YouTube</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Video Info & Content Connections */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-indigo-400" />
                <span>Duration: {video.duration}</span>
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                <span>{video.event}</span>
              </span>
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert("Performance link copied!");
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Video</span>
            </button>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-indigo-400 mb-2">
              Performance Context
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              {video.description}
            </p>
          </div>

          {video.transcript && (
            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/60 space-y-1">
              <h5 className="text-xs uppercase tracking-wider font-bold text-slate-400">
                Performance Transcript / Excerpt
              </h5>
              <p className="text-xs text-slate-200 italic font-serif leading-relaxed">
                "{video.transcript}"
              </p>
            </div>
          )}

          {/* Connection to Poem or Booking */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
            {video.poemSlug && onOpenPoem ? (
              <button
                onClick={() => {
                  onClose();
                  onOpenPoem(video.poemSlug!);
                }}
                className="text-xs text-indigo-400 hover:underline flex items-center gap-1.5 font-bold"
              >
                <BookOpen className="w-4 h-4" />
                <span>Read written stanzas for this poem</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : <div />}

            <button
              onClick={() => {
                onClose();
                onOpenBooking();
              }}
              className="px-4 py-2.5 rounded-lg bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-xs"
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
