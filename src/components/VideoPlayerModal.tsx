import React, { useState, useEffect } from 'react';
import { VideoItem } from '../types';
import { 
  X, 
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
  Youtube
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

  useEffect(() => {
    setShowMoreInfo(false);
    setCopiedLink(false);
    setCopiedLyrics(false);
    setUseIframe(true);
  }, [video?.id]);

  // Keyboard listener: Esc closes the modal
  useEffect(() => {
    if (!video) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Esc') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [video, onClose]);

  if (!video) return null;

  const videoImg = video.thumbnailUrl || '/images/gal-8-bw-performance.jpg';
  const ytWatchUrl = video.youtubeId ? `https://www.youtube.com/watch?v=${video.youtubeId}` : YOUTUBE_CHANNEL_URL;
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
      {/* Floating Close Button */}
      <button
        onClick={onClose}
        id="video-floating-close-btn"
        className="fixed top-4 right-4 z-60 px-4 py-2 rounded-full bg-[#3A1208] hover:bg-[#D81B7A] text-white border border-[#FFD9E6]/30 shadow-2xl flex items-center gap-2 text-xs font-bold transition-all hover:scale-105 cursor-pointer"
        title="Close video (Esc)"
        aria-label="Close video player"
      >
        <X className="w-4 h-4" />
        <span>Close</span>
        <kbd className="hidden sm:inline-block px-1.5 py-0.2 text-[10px] bg-white/20 rounded font-mono text-white">
          Esc
        </kbd>
      </button>

      {/* Main Video Card */}
      <div 
        className="bg-[#3A1208] text-[#FFF6EC] w-full max-w-4xl rounded-2xl shadow-2xl border border-[#FFD9E6]/25 overflow-hidden my-6 cursor-default transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-[#2B0C04] border-b border-[#FFD9E6]/15 flex items-center justify-between gap-4">
          <div className="space-y-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold">
              <span className="px-2.5 py-0.5 rounded-full bg-[#FFD9E6] text-[#D81B7A] uppercase tracking-wider">
                {video.category ? video.category.replace('_', ' ') : 'Spoken Word'}
              </span>
              <span className="text-[#FFF6EC]/70 font-medium truncate">
                {video.event} · {video.date}
              </span>
            </div>
            <h3 id="video-player-title" className="font-serif text-lg sm:text-2xl font-normal text-[#FFF6EC] truncate">
              {video.title}
            </h3>
          </div>

          <button
            onClick={onClose}
            id="video-modal-header-close-btn"
            className="px-3.5 py-2 rounded-full bg-[#3A1208] hover:bg-[#D81B7A] text-[#FFF6EC] border border-[#FFD9E6]/25 transition-all flex items-center gap-1.5 text-xs font-bold cursor-pointer shrink-0"
            title="Close video player"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">Close</span>
          </button>
        </div>

        {/* 16:9 Video Screen */}
        <div className="relative aspect-video bg-black w-full overflow-hidden">
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
                <div className="w-16 h-16 rounded-full bg-[#D81B7A] text-white flex items-center justify-center shadow-lg">
                  <Play className="w-8 h-8 ml-1 fill-white" />
                </div>
                <div className="space-y-1 max-w-md">
                  <p className="text-[#FFF6EC] font-serif font-normal text-xl">{video.title}</p>
                  <p className="text-xs text-[#FFF6EC]/80">
                    Watch Faith Wanja's performance recital directly on the official {YOUTUBE_CHANNEL_HANDLE} channel.
                  </p>
                </div>
                <a
                  href={ytWatchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-wanja text-xs py-2 px-5 cursor-pointer inline-flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Watch on YouTube</span>
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Controls & "View More Information" Bar */}
        <div className="p-4 sm:p-5 bg-[#2B0C04] border-b border-[#FFD9E6]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          
          <div className="flex flex-wrap items-center gap-3 text-[#FFF6EC]/80">
            <span className="flex items-center gap-1.5 font-mono text-[11px] text-[#FFF6EC] bg-[#3A1208] px-2.5 py-1 rounded-md border border-[#FFD9E6]/20">
              <Clock className="w-3.5 h-3.5 text-[#D81B7A]" />
              <span>{video.duration || '04:00'}</span>
            </span>
            <span className="font-medium truncate max-w-xs sm:max-w-sm">
              {video.event}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {hasExtraDetails && (
              <button
                type="button"
                onClick={() => setShowMoreInfo(!showMoreInfo)}
                id="toggle-video-more-info-btn"
                className={`px-3.5 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                  showMoreInfo
                    ? 'bg-[#D81B7A] text-white'
                    : 'bg-[#3A1208] text-[#FFF6EC] border border-[#FFD9E6]/30 hover:border-[#D81B7A]'
                }`}
                title={showMoreInfo ? 'Collapse details' : 'Expand description & stanzas'}
              >
                <Info className="w-3.5 h-3.5 text-white" />
                <span>{showMoreInfo ? 'Hide Information' : 'View More Information'}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${showMoreInfo ? 'rotate-180' : ''}`} />
              </button>
            )}

            <button
              type="button"
              onClick={handleCopyShareLink}
              className="p-2 rounded-full bg-[#3A1208] hover:bg-[#D81B7A] text-[#FFF6EC] border border-[#FFD9E6]/25 transition-colors cursor-pointer"
              title="Copy share link"
              aria-label="Share video"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-300" /> : <Share2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Collapsible More Info Drawer */}
        {showMoreInfo && hasExtraDetails && (
          <div className="p-6 bg-[#3A1208] space-y-6 border-b border-[#FFD9E6]/15 animate-fadeIn">
            {video.description && (
              <div className="space-y-2">
                <span className="text-[11px] uppercase tracking-wider font-bold text-[#D81B7A] block">
                  Synopsis & Context
                </span>
                <p className="text-sm leading-relaxed text-[#FFF6EC]/90 font-sans">
                  {video.description}
                </p>
              </div>
            )}

            {video.transcript && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-wider font-bold text-[#D81B7A] flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" />
                    <span>Spoken Word Stanzas</span>
                  </span>
                  <button
                    onClick={handleCopyTranscript}
                    className="text-xs text-[#FFF6EC]/70 hover:text-white flex items-center gap-1"
                  >
                    {copiedLyrics ? <Check className="w-3 h-3 text-emerald-300" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedLyrics ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <div className="font-poem text-base text-[#FFF6EC]/95 bg-[#2B0C04] p-4 rounded-xl whitespace-pre-line leading-relaxed">
                  {video.transcript}
                </div>
              </div>
            )}

            {video.poemSlug && onOpenPoem && (
              <div className="p-4 rounded-xl bg-[#2B0C04] border border-[#FFD9E6]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#D81B7A] text-white flex items-center justify-center shrink-0">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#D81B7A] tracking-wider block">
                      Connected Written Poem
                    </span>
                    <p className="text-xs font-serif font-normal text-[#FFF6EC]">
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
                  className="btn-wanja text-xs py-1.5 px-4 inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Read Written Poem</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#FFD9E6]/15">
              <div className="flex items-center gap-2 text-xs text-[#FFF6EC]/80">
                <Youtube className="w-4 h-4 text-[#D81B7A]" />
                <span>
                  Official YouTube: <a href={YOUTUBE_CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="text-white font-semibold underline">{YOUTUBE_CHANNEL_HANDLE}</a>
                </span>
              </div>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenBooking();
                }}
                className="btn-wanja text-xs py-1.5 px-5 cursor-pointer inline-flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                <span>Book Live Performance</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
