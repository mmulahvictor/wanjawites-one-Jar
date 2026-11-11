import React, { useState, useEffect } from 'react';
import { Poem, VideoItem, Article } from '../types';
import { X, Play, Pause, Volume2, Video, FileText, Share2, Check, Sparkles, ArrowRight, AlertCircle } from 'lucide-react';

interface PoemDetailModalProps {
  poem: Poem | null;
  onClose: () => void;
  relatedVideo?: VideoItem;
  relatedArticle?: Article;
  onNavigateToWriting?: (slug: string) => void;
  onNavigateToVideo?: (videoId: string) => void;
  onOpenBooking: () => void;
}

export const PoemDetailModal: React.FC<PoemDetailModalProps> = ({
  poem,
  onClose,
  relatedVideo,
  relatedArticle,
  onNavigateToWriting,
  onNavigateToVideo,
  onOpenBooking
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioNotice, setAudioNotice] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'poem' | 'context' | 'connected'>('poem');

  useEffect(() => {
    setActiveTab('poem');
    setCopied(false);
    setAudioNotice(null);
    setIsPlayingAudio(false);

    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [poem?.id]);

  useEffect(() => {
    if (!poem) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Esc') {
        if ('speechSynthesis' in window) {
          window.speechSynthesis.cancel();
        }
        setIsPlayingAudio(false);
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
  }, [poem, onClose]);

  if (!poem) return null;

  const stopSpeechAndClose = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingAudio(false);
    onClose();
  };

  const handleCopyPoem = () => {
    const textToCopy = `${poem.title}\nBy Wanja Writes (One-Jar Poetry)\n\n${poem.stanzas.join('\n\n')}`;
    navigator.clipboard?.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleAudio = () => {
    setAudioNotice(null);
    if ('speechSynthesis' in window) {
      if (isPlayingAudio) {
        window.speechSynthesis.cancel();
        setIsPlayingAudio(false);
      } else {
        window.speechSynthesis.cancel();
        const fullText = poem.stanzas.join(' ... ');
        const utterance = new SpeechSynthesisUtterance(`${poem.title}. ${fullText}`);
        utterance.rate = 0.85;
        utterance.pitch = 0.95;
        utterance.onend = () => setIsPlayingAudio(false);
        utterance.onerror = () => setIsPlayingAudio(false);
        window.speechSynthesis.speak(utterance);
        setIsPlayingAudio(true);
      }
    } else {
      setAudioNotice('Speech synthesis narration is not supported in this browser.');
    }
  };

  return (
    <div 
      onClick={stopSpeechAndClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="poem-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn cursor-pointer"
    >
      <div 
        className="bg-[#FFF6EC] w-full max-w-3xl rounded-2xl shadow-2xl border-2 border-[#D81B7A]/30 overflow-hidden my-8 max-h-[90vh] flex flex-col cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-[#3A1208] text-[#FFF6EC] border-b border-[#FFD9E6]/15 flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#D81B7A] bg-[#FFD9E6] px-2.5 py-0.5 rounded-full">
                One-Jar Poem
              </span>
              <span className="text-xs text-[#FFF6EC]/70">{poem.year}</span>
            </div>
            <h2 id="poem-modal-title" className="font-serif text-2xl sm:text-4xl font-normal text-[#FFF6EC] mt-1">
              {poem.title}
            </h2>
          </div>

          <button
            id="close-poem-modal"
            onClick={stopSpeechAndClose}
            className="p-2 rounded-full text-[#FFF6EC]/70 hover:bg-[#D81B7A] hover:text-white transition-colors cursor-pointer shrink-0"
            aria-label="Close poem reader"
            title="Close poem reader (Esc)"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center justify-between px-6 py-3 bg-[#FFD9E6]/40 border-b border-[#FFD9E6] text-xs font-semibold">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('poem')}
              className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                activeTab === 'poem'
                  ? 'bg-[#D81B7A] text-white'
                  : 'text-[#3A1208] hover:bg-white/60'
              }`}
            >
              Stanzas
            </button>
            <button
              onClick={() => setActiveTab('context')}
              className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                activeTab === 'context'
                  ? 'bg-[#D81B7A] text-white'
                  : 'text-[#3A1208] hover:bg-white/60'
              }`}
            >
              The Story & Context
            </button>
            {(relatedVideo || relatedArticle) && (
              <button
                onClick={() => setActiveTab('connected')}
                className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                  activeTab === 'connected'
                    ? 'bg-[#D81B7A] text-white'
                    : 'text-[#3A1208] hover:bg-white/60'
                }`}
              >
                Media & Articles
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleAudio}
              className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-colors cursor-pointer ${
                isPlayingAudio 
                  ? 'bg-[#D81B7A] text-white' 
                  : 'bg-white text-[#3A1208] border border-[#FFD9E6] hover:border-[#D81B7A]'
              }`}
              title="Listen to synthesized recitation"
            >
              {isPlayingAudio ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              <span className="hidden sm:inline">{isPlayingAudio ? 'Pause Narration' : 'Recite'}</span>
            </button>

            <button
              onClick={handleCopyPoem}
              className="p-1.5 rounded-full bg-white text-[#3A1208] border border-[#FFD9E6] hover:bg-[#FFD9E6] transition-colors cursor-pointer"
              title="Copy Poem Text"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Audio notice message */}
        {audioNotice && (
          <div className="mx-6 mt-3 p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{audioNotice}</span>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 sm:p-10 overflow-y-auto flex-1 text-[#3A1208] space-y-8">
          
          {/* TAB 1: POEM STANZAS */}
          {activeTab === 'poem' && (
            <div className="space-y-6">
              {poem.stanzas.map((stanza, idx) => (
                <div 
                  key={idx} 
                  className="p-6 rounded-2xl bg-white border border-[#FFD9E6] shadow-xs"
                >
                  <p className="font-poem text-lg sm:text-xl text-[#3A1208] leading-[2.1] whitespace-pre-line">
                    {stanza}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: CONTEXT */}
          {activeTab === 'context' && (
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-white border border-[#FFD9E6] space-y-4">
                <span className="text-xs uppercase font-bold text-[#D81B7A] tracking-wider block">
                  The Background Story
                </span>
                <p className="font-sans text-base leading-relaxed text-[#3A1208]/90">
                  {poem.context || 'This piece was crafted as part of One-Jar Poetry, exploring the intersection of memory, womanhood, and healing.'}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#FFD9E6]/50 border border-[#FFD9E6] space-y-2">
                <span className="text-xs uppercase font-bold text-[#3A1208] tracking-wider block">
                  Tags & Themes
                </span>
                <div className="flex flex-wrap gap-2">
                  {poem.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-semibold bg-white text-[#D81B7A] border border-[#FFD9E6]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CONNECTED MEDIA */}
          {activeTab === 'connected' && (
            <div className="space-y-6">
              {relatedVideo && (
                <div className="p-6 rounded-2xl bg-white border border-[#FFD9E6] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#D81B7A] text-white flex items-center justify-center shrink-0">
                      <Video className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#D81B7A]">
                        Live Spoken Word Performance
                      </span>
                      <h4 className="font-serif text-xl text-[#3A1208]">
                        {relatedVideo.title}
                      </h4>
                      <p className="text-xs text-[#3A1208]/70">
                        {relatedVideo.event} · {relatedVideo.duration}
                      </p>
                    </div>
                  </div>

                  {onNavigateToVideo && (
                    <button
                      onClick={() => {
                        stopSpeechAndClose();
                        onNavigateToVideo(relatedVideo.id);
                      }}
                      className="btn-wanja text-xs py-2 px-4 cursor-pointer inline-flex items-center gap-1.5 shrink-0"
                    >
                      <span>Watch Video</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              )}

              {relatedArticle && (
                <div className="p-6 rounded-2xl bg-white border border-[#FFD9E6] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#3A1208] text-white flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#3A1208]">
                        Companion Cultural Essay
                      </span>
                      <h4 className="font-serif text-xl text-[#3A1208]">
                        {relatedArticle.title}
                      </h4>
                      <p className="text-xs text-[#3A1208]/70">
                        {relatedArticle.readTime}
                      </p>
                    </div>
                  </div>

                  {onNavigateToWriting && (
                    <button
                      onClick={() => {
                        stopSpeechAndClose();
                        onNavigateToWriting(relatedArticle.slug);
                      }}
                      className="btn-wanja-alt text-xs py-2 px-4 cursor-pointer inline-flex items-center gap-1.5 shrink-0"
                    >
                      <span>Read Essay</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-white border-t border-[#FFD9E6] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <p className="text-[#3A1208]/70">
            Interested in staging this poem or booking Faith Wanja for a recital?
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                stopSpeechAndClose();
                onOpenBooking();
              }}
              className="btn-wanja text-xs py-2 px-5 cursor-pointer inline-flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              <span>Book Recital</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
