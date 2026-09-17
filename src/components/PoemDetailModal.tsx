import React, { useState } from 'react';
import { Poem, VideoItem, Article } from '../types';
import { X, Play, Pause, Volume2, BookOpen, Video, FileText, Share2, Check, Sparkles, ArrowRight } from 'lucide-react';

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
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'poem' | 'context' | 'connected'>('poem');

  if (!poem) return null;

  const handleCopyPoem = () => {
    const textToCopy = `${poem.title}\nBy WanjaWrites (One-Jar Poetry)\n\n${poem.stanzas.join('\n\n')}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleAudio = () => {
    if ('speechSynthesis' in window) {
      if (isPlayingAudio) {
        window.speechSynthesis.cancel();
        setIsPlayingAudio(false);
      } else {
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
      alert("Speech synthesis is not supported in this browser.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#1A1A1A]/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div 
        className="bg-[#FFFBF5] w-full max-w-3xl rounded-2xl shadow-xl border border-[#E8DFD0] overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-[#1A1A1A] text-white border-b border-[#2A2A2A] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#E88D4D] bg-[#2A2A2A] px-2.5 py-0.5 rounded-full border border-[#3A6EA5]/30">
                One-Jar Poem
              </span>
              <span className="text-xs text-stone-400">{poem.year}</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#FFFBF5] mt-1">
              {poem.title}
            </h2>
          </div>

          <button
            id="close-poem-modal"
            onClick={() => {
              if (isPlayingAudio && 'speechSynthesis' in window) {
                window.speechSynthesis.cancel();
              }
              onClose();
            }}
            className="p-2 rounded-full text-stone-400 hover:bg-[#2A2A2A] hover:text-white transition-colors cursor-pointer"
            aria-label="Close poem reader"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Navigation Bar */}
        <div className="flex border-b border-[#E8DFD0] bg-[#FAF5ED] px-6 text-sm font-semibold">
          <button
            onClick={() => setActiveTab('poem')}
            className={`py-3 px-4 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'poem'
                ? 'border-[#C83C2E] text-[#C83C2E] font-bold'
                : 'border-transparent text-stone-600 hover:text-[#1A1A1A]'
            }`}
          >
            Poem & Audio
          </button>
          <button
            onClick={() => setActiveTab('context')}
            className={`py-3 px-4 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'context'
                ? 'border-[#C83C2E] text-[#C83C2E] font-bold'
                : 'border-transparent text-stone-600 hover:text-[#1A1A1A]'
            }`}
          >
            The Excavation (Context)
          </button>
          <button
            onClick={() => setActiveTab('connected')}
            className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'connected'
                ? 'border-[#C83C2E] text-[#C83C2E] font-bold'
                : 'border-transparent text-stone-600 hover:text-[#1A1A1A]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E88D4D]" />
            <span>Connected Archive</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6 bg-[#FAF5ED]">
          {activeTab === 'poem' && (
            <div className="space-y-6">
              {/* Audio Reader Toolbar */}
              <div className="p-4 rounded-xl bg-white border border-[#E8DFD0] shadow-xs flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    id="listen-poem-audio-btn"
                    onClick={toggleAudio}
                    className="w-10 h-10 rounded-full bg-[#C83C2E] text-white flex items-center justify-center hover:bg-[#B03225] transition-transform hover:scale-105 shadow-xs cursor-pointer"
                  >
                    {isPlayingAudio ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5 fill-white" />}
                  </button>
                  <div>
                    <div className="text-sm font-bold text-[#1A1A1A] flex items-center gap-1.5">
                      <Volume2 className="w-4 h-4 text-[#C83C2E]" />
                      <span>{isPlayingAudio ? 'Reading poem aloud...' : 'Listen to Spoken Narration'}</span>
                    </div>
                    <p className="text-xs text-[#1A1A1A]/60">
                      {isPlayingAudio ? 'Speech synthesis active' : 'Click to hear WanjaWrites oral cadence'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleCopyPoem}
                  className="px-3 py-1.5 rounded-lg border border-[#E8DFD0] hover:bg-stone-100 text-xs font-semibold text-[#1A1A1A] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy Text'}</span>
                </button>
              </div>

              {/* Poem Stanzas */}
              <div className="font-poem text-lg sm:text-xl text-[#1A1A1A] leading-relaxed space-y-6 pl-4 border-l-2 border-[#C83C2E]/60">
                {poem.stanzas.map((stanza, idx) => (
                  <div key={idx} className="whitespace-pre-line italic">
                    {stanza}
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div className="pt-4 border-t border-[#E8DFD0] flex flex-wrap gap-2">
                {poem.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2.5 py-1 rounded-md bg-[#3A6EA5]/10 text-[#3A6EA5] font-medium border border-[#3A6EA5]/20">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'context' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white border border-[#E8DFD0]">
                <h4 className="font-serif text-lg font-bold text-[#C83C2E] mb-1">
                  The Excavation Story
                </h4>
                <p className="text-sm text-[#1A1A1A]/70 leading-relaxed">
                  Every poem in One-Jar is an unsealed container holding a memory, a witness, or a prayer.
                </p>
              </div>
              <div className="prose text-[#1A1A1A]/85 text-base leading-relaxed space-y-3 font-sans">
                <p>{poem.context}</p>
                <p className="text-sm italic text-[#1A1A1A]/60 pt-2">
                  "To hold a jar is to hold a witness — terracotta smooth against the calloused thumb."
                </p>
              </div>
            </div>
          )}

          {activeTab === 'connected' && (
            <div className="space-y-6">
              <p className="text-sm text-[#1A1A1A]/70">
                The One-Poem Content Engine links this written work across mediums in Wanja’s archive:
              </p>

              {/* Connected Performance Video */}
              {relatedVideo && (
                <div className="p-4 rounded-xl bg-white border border-[#E8DFD0] shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#3A6EA5] uppercase">
                    <Video className="w-4 h-4" />
                    <span>Live Performance Video</span>
                  </div>
                  <h4 className="font-serif text-lg font-bold text-[#1A1A1A]">{relatedVideo.title}</h4>
                  <p className="text-xs text-[#1A1A1A]/70">{relatedVideo.description}</p>
                  {relatedVideo.youtubeId && onNavigateToVideo && (
                    <button
                      onClick={() => {
                        onClose();
                        onNavigateToVideo(relatedVideo.id);
                      }}
                      className="text-xs font-semibold text-[#C83C2E] hover:underline flex items-center gap-1 pt-1 cursor-pointer"
                    >
                      <span>Watch live performance ({relatedVideo.duration})</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              )}

              {/* Connected Essay */}
              {relatedArticle && (
                <div className="p-4 rounded-xl bg-white border border-[#E8DFD0] shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#3A6EA5] uppercase">
                    <FileText className="w-4 h-4" />
                    <span>Behind-The-Poem Essay</span>
                  </div>
                  <h4 className="font-serif text-lg font-bold text-[#1A1A1A]">{relatedArticle.title}</h4>
                  <p className="text-xs text-[#1A1A1A]/70">{relatedArticle.excerpt}</p>
                  {onNavigateToWriting && (
                    <button
                      onClick={() => {
                        onClose();
                        onNavigateToWriting(relatedArticle.slug);
                      }}
                      className="text-xs font-semibold text-[#C83C2E] hover:underline flex items-center gap-1 pt-1 cursor-pointer"
                    >
                      <span>Read essay reflection ({relatedArticle.readTime})</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              )}

              {/* Connected Booking Callout */}
              <div className="p-5 rounded-xl bg-[#1A1A1A] text-white space-y-3 border border-[#2A2A2A]">
                <h4 className="font-serif text-lg font-bold text-[#FFFBF5]">
                  Commission or Book This Piece
                </h4>
                <p className="text-xs text-stone-300">
                  Incorporate "{poem.title}" or commission a customized spoken-word work for your launch, festival, or publication.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onOpenBooking();
                  }}
                  className="px-4 py-2 rounded-lg bg-[#C83C2E] text-white text-xs font-semibold hover:bg-[#B03225] transition-colors shadow-xs cursor-pointer"
                >
                  Start Booking Enquiry
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-[#E8DFD0] flex items-center justify-between text-xs text-[#1A1A1A]/60">
          <span>WanjaWrites × One-Jar Archive</span>
          <button
            onClick={() => {
              if (isPlayingAudio && 'speechSynthesis' in window) {
                window.speechSynthesis.cancel();
              }
              onClose();
            }}
            className="px-4 py-2 rounded-lg bg-[#FAF5ED] hover:bg-stone-200 border border-[#E8DFD0] text-[#1A1A1A] font-semibold transition-colors cursor-pointer"
          >
            Close Reader
          </button>
        </div>
      </div>
    </div>
  );
};
