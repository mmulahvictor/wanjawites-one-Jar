import React, { useState, useEffect } from 'react';
import { VideoItem } from '../types';
import { 
  X, 
  Calendar, 
  Clock, 
  BookOpen, 
  Share2, 
  Sparkles, 
  ArrowRight, 
  ExternalLink, 
  Play,
  ChevronDown,
  Info,
  Copy,
  Check,
  FileText,
  Youtube,
  CornerDownRight
} from 'lucide-react';
import { YOUTUBE_CHANNEL_URL, YOUTUBE_CHANNEL_HANDLE } from '../data/mockData';

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
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedLyrics, setCopiedLyrics] = useState(false);

  // Reset expanded information state when switching videos
  useEffect(() => {
    setShowMoreInfo(false);
    setCopiedLink(false);
    setCopiedLyrics(false);
    setUseIframe(true);
  }, [video?.id]);

  // Keyboard shortcut listener: Pressing Esc immediately closes the video player
  useEffect(() => {
    if (!video) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Esc') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Prevent background page scrolling while modal is open
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [video, onClose]);

  if (!video) return null;

  const videoImg = video.thumbnailUrl || '/images/wanja_bw_stage.jpg';
  const ytWatchUrl = video.youtubeId ? `https://www.youtube.com/watch?v=${video.youtubeId}` : YOUTUBE_CHANNEL_URL;

  // Check if there are rich details to show
  const hasExtraDetails = Boolean(video.description || video.transcript || video.poemSlug);

  const handleCopyShareLink = async () => {
    try {
      const url = `${window.location.origin}/videos/${video.id}`;
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
      }
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2400);
    } catch (e) {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2400);
    }
  };

  const handleCopyTranscript = async () => {
    if (!video.transcript) return;
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(video.transcript);
      }
      setCopiedLyrics(true);
      setTimeout(() => setCopiedLyrics(false), 2400);
    } catch (e) {
      setCopiedLyrics(true);
      setTimeout(() => setCopiedLyrics(false), 2400);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn cursor-pointer"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-player-title"
    >
      {/* Floating high-visibility Close Button on viewport corner */}
      <button
        onClick={onClose}
        id="video-floating-close-btn"
        className="fixed top-4 right-4 z-60 px-3.5 py-2 rounded-full bg-black/80 hover:bg-[#C83C2E] text-stone-200 hover:text-white border border-white/20 shadow-2xl backdrop-blur-lg flex items-center gap-2 text-xs font-bold transition-all hover:scale-105 cursor-pointer"
        title="Close video (Esc)"
        aria-label="Close video player"
      >
        <X className="w-4 h-4" />
        <span>Close</span>
        <kbd className="hidden sm:inline-block px-1.5 py-0.2 text-[10px] bg-white/20 rounded font-mono text-stone-300">
          Esc
        </kbd>
      </button>

      {/* Main Video Modal Card */}
      <div 
        className="bg-[#181818] text-[#FAF5ED] w-full max-w-4xl rounded-2xl shadow-2xl border border-[#2E2E2E] overflow-hidden my-6 cursor-default transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-[#141414] border-b border-[#2A2A2A] flex items-center justify-between gap-4">
          <div className="space-y-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold">
              <span className="px-2 py-0.5 rounded-full bg-[#E88D4D]/20 text-[#E88D4D] uppercase tracking-wider">
                {video.category ? video.category.replace('_', ' ') : 'Spoken Word'}
              </span>
              <span className="text-stone-400 font-medium truncate">
                {video.event} · {video.date}
              </span>
            </div>
            <h3 id="video-player-title" className="font-serif text-lg sm:text-2xl font-bold text-[#FFFBF5] truncate">
              {video.title}
            </h3>
          </div>

          {/* Header Close Button */}
          <button
            onClick={onClose}
            id="video-modal-header-close-btn"
            className="px-3.5 py-2 rounded-xl bg-[#242424] hover:bg-[#C83C2E] text-stone-300 hover:text-white border border-[#3A3A3A] transition-all flex items-center gap-1.5 text-xs font-bold cursor-pointer shrink-0 shadow-xs"
            title="Close video player"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">Close</span>
            <kbd className="hidden md:inline-block px-1 py-0.5 text-[9px] bg-black/40 rounded font-mono text-stone-400">
              Esc
            </kbd>
          </button>
        </div>

        {/* 16:9 Video Player Screen */}
        <div className="relative aspect-video bg-black w-full overflow-hidden group">
          {useIframe && video.youtubeId ? (
            <iframe
              className="w-full h-full"
              src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
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
                    Watch Faith Wanja's performance recital directly on the official {YOUTUBE_CHANNEL_HANDLE} channel.
                  </p>
                </div>
                <a
                  href={ytWatchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-lg bg-[#C83C2E] hover:bg-[#B03225] text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Watch on YouTube ({YOUTUBE_CHANNEL_HANDLE})</span>
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Streamlined Performance Controls & "View More Information" Bar */}
        <div className="p-4 sm:p-5 bg-[#1C1C1C] border-b border-[#2A2A2A] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          
          {/* Quick Stats Pill */}
          <div className="flex flex-wrap items-center gap-3 text-stone-400">
            <span className="flex items-center gap-1.5 font-mono text-[11px] text-stone-300 bg-[#252525] px-2.5 py-1 rounded-md border border-[#333333]">
              <Clock className="w-3.5 h-3.5 text-[#E88D4D]" />
              <span>{video.duration || '04:00'}</span>
            </span>
            <span className="text-stone-300 font-semibold truncate max-w-xs sm:max-w-sm">
              {video.event}
            </span>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center gap-2">
            
            {/* The "View More Information" Toggle Button */}
            {hasExtraDetails && (
              <button
                type="button"
                onClick={() => setShowMoreInfo(!showMoreInfo)}
                id="toggle-video-more-info-btn"
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs ${
                  showMoreInfo
                    ? 'bg-[#E88D4D] text-stone-950 font-extrabold ring-2 ring-[#E88D4D]/30'
                    : 'bg-[#292929] hover:bg-[#333333] text-[#FAF5ED] border border-[#3A3A3A] hover:border-[#E88D4D]/40'
                }`}
                title={showMoreInfo ? 'Collapse details' : 'Expand context, lyrics, and notes'}
              >
                <Info className={`w-3.5 h-3.5 ${showMoreInfo ? 'text-stone-950' : 'text-[#E88D4D]'}`} />
                <span>{showMoreInfo ? 'Hide Information' : 'View More Information'}</span>
                {!showMoreInfo && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E88D4D] inline-block animate-pulse" />
                )}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${showMoreInfo ? 'rotate-180' : ''}`} />
              </button>
            )}

            {/* Share Link Button */}
            <button
              type="button"
              onClick={handleCopyShareLink}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#292929] hover:bg-[#333333] border border-[#3A3A3A] text-stone-200 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
              title="Copy shareable link"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-stone-400" />
                  <span>Share</span>
                </>
              )}
            </button>

            {/* YouTube Link */}
            {video.youtubeId && (
              <a
                href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#292929] hover:bg-[#333333] border border-[#3A3A3A] text-stone-200 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
                title="Watch directly on YouTube"
              >
                <Youtube className="w-3.5 h-3.5 text-[#C83C2E]" />
                <span className="hidden md:inline">YouTube</span>
                <ExternalLink className="w-3 h-3 text-stone-400" />
              </a>
            )}

            {/* Bottom Quick Close Button */}
            <button
              type="button"
              onClick={onClose}
              id="video-player-bottom-close-btn"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#292929] hover:bg-[#C83C2E] text-stone-300 hover:text-white border border-[#3A3A3A] text-xs font-semibold transition-colors cursor-pointer"
              title="Close window (Esc)"
            >
              <X className="w-3.5 h-3.5" />
              <span>Close Player</span>
            </button>
          </div>
        </div>

        {/* EXPANDABLE MORE INFORMATION SECTION */}
        {showMoreInfo && (
          <div className="p-6 sm:p-8 space-y-6 bg-[#161616] border-t border-[#2A2A2A] animate-fadeIn">
            
            {/* Context & Excavation Story */}
            {video.description && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-4 bg-[#E88D4D] rounded-full" />
                  <h4 className="text-xs uppercase tracking-wider font-bold text-[#E88D4D]">
                    Performance Context & Curation Notes
                  </h4>
                </div>
                <p className="text-sm text-stone-300 leading-relaxed pl-3.5 border-l border-[#2E2E2E]">
                  {video.description}
                </p>
              </div>
            )}

            {/* Spoken Word Transcript / Live Lyrics (if provided) */}
            {video.transcript && (
              <div className="p-5 rounded-2xl bg-[#202020] border border-[#333333] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#3A6EA5]" />
                    <h5 className="text-xs uppercase tracking-wider font-bold text-stone-300">
                      Spoken Word Live Lyrics & Transcript
                    </h5>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyTranscript}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#2B2B2B] hover:bg-[#383838] border border-[#3F3F3F] text-stone-300 hover:text-white text-[11px] font-semibold transition-colors cursor-pointer"
                    title="Copy lyrics to clipboard"
                  >
                    {copiedLyrics ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-stone-400" />
                        <span>Copy Lyrics</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="max-h-56 overflow-y-auto pr-2 space-y-2 scrollbar-thin">
                  <p className="text-xs text-stone-200 italic font-serif leading-relaxed whitespace-pre-line">
                    "{video.transcript}"
                  </p>
                </div>
              </div>
            )}

            {/* Connection to Written Poem */}
            {video.poemSlug && onOpenPoem && (
              <div className="p-4 rounded-xl bg-[#221F1B] border border-[#E88D4D]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#E88D4D]/20 text-[#E88D4D] flex items-center justify-center shrink-0">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#E88D4D] tracking-wider block">
                      Connected Written Poem
                    </span>
                    <p className="text-xs font-serif font-bold text-[#FFFBF5]">
                      Explore the written stanzas and context for this poem
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenPoem(video.poemSlug!);
                  }}
                  className="px-3.5 py-2 rounded-lg bg-[#E88D4D] hover:bg-[#D97D3C] text-stone-950 font-bold text-xs flex items-center gap-1.5 transition-colors shrink-0 cursor-pointer shadow-xs"
                >
                  <span>Read Written Poem</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Official Channel & Live Booking Invitation */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#2A2A2A]">
              <div className="flex items-center gap-2 text-xs text-stone-400">
                <Youtube className="w-4 h-4 text-[#C83C2E]" />
                <span>
                  Official YouTube: <a href={YOUTUBE_CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="text-[#FAF5ED] font-semibold hover:underline">{YOUTUBE_CHANNEL_HANDLE}</a>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowMoreInfo(false)}
                  className="px-3 py-2 rounded-xl text-stone-400 hover:text-stone-200 text-xs font-semibold cursor-pointer"
                >
                  Collapse Details
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenBooking();
                  }}
                  className="px-4 py-2 rounded-xl bg-[#C83C2E] hover:bg-[#B03225] text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Book Live Performance</span>
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
