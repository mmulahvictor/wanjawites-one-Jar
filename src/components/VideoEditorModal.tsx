import React, { useState, useEffect } from 'react';
import { VideoItem, Poem, ContentStatus } from '../types';
import { 
  extractYouTubeId, 
  fetchYouTubeVideoInfo, 
  getYouTubeThumbnail 
} from '../lib/videoUtils';
import { 
  X, 
  Youtube, 
  Sparkles, 
  Play, 
  Clock, 
  Calendar, 
  MapPin, 
  BookOpen, 
  Check, 
  ExternalLink, 
  AlertCircle, 
  Eye, 
  FileText, 
  Image as ImageIcon,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';

interface VideoEditorModalProps {
  video: VideoItem | null;
  isOpen: boolean;
  isNew: boolean;
  poems: Poem[];
  onClose: () => void;
  onSave: (video: VideoItem) => void;
}

export const VideoEditorModal: React.FC<VideoEditorModalProps> = ({
  video,
  isOpen,
  isNew,
  poems,
  onClose,
  onSave,
}) => {
  if (!isOpen) return null;

  // Local form state
  const [title, setTitle] = useState(video?.title || '');
  const [urlOrId, setUrlOrId] = useState(video?.youtubeId || '');
  const [event, setEvent] = useState(video?.event || '');
  const [date, setDate] = useState(video?.date || '');
  const [duration, setDuration] = useState(video?.duration || '04:30');
  const [category, setCategory] = useState<VideoItem['category']>(video?.category || 'spoken_word');
  const [status, setStatus] = useState<ContentStatus>(video?.status || 'published');
  const [description, setDescription] = useState(video?.description || '');
  const [transcript, setTranscript] = useState(video?.transcript || '');
  const [poemSlug, setPoemSlug] = useState(video?.poemSlug || '');
  const [customThumbnail, setCustomThumbnail] = useState(video?.thumbnailUrl || '');

  // Preview & Fetch status
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [isFetchingMeta, setIsFetchingMeta] = useState(false);
  const [metaFetchMessage, setMetaFetchMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [previewMode, setPreviewMode] = useState<'player' | 'card'>('player');

  // Computed clean YouTube ID
  const cleanYouTubeId = extractYouTubeId(urlOrId) || '';
  const effectiveThumbnail = customThumbnail.trim() || (cleanYouTubeId ? getYouTubeThumbnail(cleanYouTubeId, 'hq') : '');

  // Duration presets
  const durationPresets = ['03:15', '04:30', '06:00', '08:45', '12:00'];

  // Handle auto-fill from YouTube oEmbed
  const handleAutoFillFromYouTube = async () => {
    if (!cleanYouTubeId) {
      setMetaFetchMessage({
        type: 'error',
        text: 'Please enter a valid YouTube URL or 11-character video ID first.',
      });
      return;
    }

    setIsFetchingMeta(true);
    setMetaFetchMessage(null);

    try {
      const data = await fetchYouTubeVideoInfo(cleanYouTubeId);
      if (data && data.title) {
        setTitle(data.title);
        if (data.authorName && !event) {
          setEvent(data.authorName.includes('One Jar') ? 'One Jar Poetry Recital' : data.authorName);
        }
        if (data.thumbnailUrl && !customThumbnail) {
          setCustomThumbnail(data.thumbnailUrl);
        }
        setMetaFetchMessage({
          type: 'success',
          text: `Retrieved video details for "${data.title.slice(0, 40)}..." from YouTube!`,
        });
      } else {
        setMetaFetchMessage({
          type: 'success',
          text: 'Video ID verified. Thumbnail loaded from YouTube.',
        });
      }
    } catch (err) {
      setMetaFetchMessage({
        type: 'error',
        text: 'Could not fetch remote metadata, but the video ID is valid and ready.',
      });
    } finally {
      setIsFetchingMeta(false);
      setTimeout(() => {
        setMetaFetchMessage(null);
      }, 6000);
    }
  };

  // Submit Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Please enter a video title.');
      return;
    }
    if (!cleanYouTubeId) {
      alert('Please provide a valid YouTube URL or 11-character video ID.');
      return;
    }

    const savedItem: VideoItem = {
      id: video?.id || `vid_${Date.now()}`,
      title: title.trim(),
      youtubeId: cleanYouTubeId,
      event: event.trim() || 'One-Jar Poetry Performance',
      date: date.trim() || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      duration: duration.trim() || '04:00',
      category,
      status,
      description: description.trim() || 'Spoken word performance video by Faith Wanja.',
      transcript: transcript.trim() || undefined,
      poemSlug: poemSlug.trim() || undefined,
      thumbnailUrl: customThumbnail.trim() || undefined,
    };

    onSave(savedItem);
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-[#1A1A1A]/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
    >
      <div 
        className="bg-[#FFFBF5] text-[#1A1A1A] w-full max-w-4xl rounded-2xl shadow-2xl border border-[#E8DFD0] overflow-hidden my-4 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="p-5 sm:p-6 bg-[#1A1A1A] text-[#FFFBF5] flex items-center justify-between border-b border-[#2A2A2A] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#C83C2E]/20 border border-[#C83C2E]/40 text-[#C83C2E] flex items-center justify-center">
              <Youtube className="w-5 h-5 fill-current" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-widest text-[#E88D4D]">
                <Sparkles className="w-3 h-3" />
                <span>One-Jar Video Studio</span>
              </div>
              <h2 id="video-modal-title" className="font-serif text-xl sm:text-2xl font-bold text-[#FFFBF5]">
                {isNew ? 'Add New Performance Video' : `Edit: ${video?.title || 'Video'}`}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Tab switchers on mobile/desktop */}
            <div className="flex bg-[#2A2A2A] p-1 rounded-lg border border-[#3A3A3A] text-xs font-semibold">
              <button
                type="button"
                onClick={() => setActiveTab('editor')}
                className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                  activeTab === 'editor'
                    ? 'bg-[#C83C2E] text-white shadow-xs'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                Editor
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('preview')}
                className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'preview'
                    ? 'bg-[#C83C2E] text-white shadow-xs'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Live Preview</span>
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg text-stone-400 hover:text-white hover:bg-[#2A2A2A] transition-colors cursor-pointer"
              title="Close editor"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body Container */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto flex flex-col">
          {activeTab === 'editor' ? (
            <div className="p-6 sm:p-8 space-y-6 text-xs bg-[#FAF5ED]">
              
              {/* 1. YouTube Source Box with Smart Paste & Auto-Fill */}
              <div className="p-5 rounded-2xl bg-white border border-[#E8DFD0] shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <label htmlFor="yt-url-input" className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
                      YouTube Video Link or ID *
                    </label>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      Paste standard watch links, shortened youtu.be, shorts, embeds, or raw 11-char IDs.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleAutoFillFromYouTube}
                    disabled={!cleanYouTubeId || isFetchingMeta}
                    className="self-start sm:self-auto px-3.5 py-1.5 rounded-lg bg-[#3A6EA5]/15 hover:bg-[#3A6EA5]/25 border border-[#3A6EA5]/30 text-[#3A6EA5] font-bold text-xs flex items-center gap-1.5 transition-all disabled:opacity-50 cursor-pointer"
                    title="Auto-fill video title, thumbnail, and details from YouTube"
                  >
                    {isFetchingMeta ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Sparkles className="w-3.5 h-3.5" />
                    )}
                    <span>{isFetchingMeta ? 'Fetching...' : 'Auto-Fill Details'}</span>
                  </button>
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                    <Youtube className="w-4 h-4 text-[#C83C2E]" />
                  </div>
                  <input
                    id="yt-url-input"
                    type="text"
                    required
                    value={urlOrId}
                    onChange={(e) => setUrlOrId(e.target.value)}
                    placeholder="e.g. https://www.youtube.com/watch?v=s714f3p1W6g or youtu.be/..."
                    className="w-full pl-10 pr-28 py-2.5 rounded-xl border border-[#E8DFD0] bg-[#FAF5ED] focus:bg-white text-[#1A1A1A] font-mono text-xs focus:outline-none focus:ring-2 focus:ring-[#C83C2E] transition-all"
                  />
                  {cleanYouTubeId && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                        <Check className="w-3 h-3" />
                        ID: {cleanYouTubeId}
                      </span>
                    </div>
                  )}
                </div>

                {metaFetchMessage && (
                  <div className={`p-3 rounded-xl border text-xs flex items-center gap-2 animate-fadeIn ${
                    metaFetchMessage.type === 'success'
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                      : 'bg-rose-50 border-rose-200 text-rose-800'
                  }`}>
                    {metaFetchMessage.type === 'success' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    )}
                    <span>{metaFetchMessage.text}</span>
                  </div>
                )}
              </div>

              {/* 2. Core Metadata Grid */}
              <div className="p-5 rounded-2xl bg-white border border-[#E8DFD0] shadow-xs space-y-4">
                <h3 className="font-serif text-base font-bold text-[#1A1A1A] border-b border-[#E8DFD0] pb-2">
                  Performance Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Title */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1">
                      Performance Video Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. I Wear My Mother's Tongue — Live at Kenya National Theatre"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DFD0] bg-[#FAF5ED] focus:bg-white text-[#1A1A1A] text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#C83C2E] transition-all"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1">
                      Performance Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as VideoItem['category'])}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DFD0] bg-[#FAF5ED] focus:bg-white text-[#1A1A1A] font-semibold text-xs focus:outline-none focus:ring-2 focus:ring-[#C83C2E]"
                    >
                      <option value="spoken_word">Spoken Word Live (Stage Recitals)</option>
                      <option value="reading">Outdoor Recitals & Acoustic Readings</option>
                      <option value="reflection">Studio Reflections & Memory Excavations</option>
                      <option value="keynote">Keynotes, Panels & Lectures</option>
                    </select>
                  </div>

                  {/* Publication Status */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1">
                      Publication Visibility
                    </label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setStatus('published')}
                        className={`flex-1 py-2.5 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                          status === 'published'
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                            : 'bg-white text-stone-600 border-[#E8DFD0] hover:bg-stone-50'
                        }`}
                      >
                        ✓ Published (Live)
                      </button>
                      <button
                        type="button"
                        onClick={() => setStatus('draft')}
                        className={`flex-1 py-2.5 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                          status === 'draft'
                            ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                            : 'bg-white text-stone-600 border-[#E8DFD0] hover:bg-stone-50'
                        }`}
                      >
                        ✎ Draft (Private)
                      </button>
                    </div>
                  </div>

                  {/* Event / Venue */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1">
                      Event / Venue / Festival
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                        <MapPin className="w-3.5 h-3.5" />
                      </div>
                      <input
                        type="text"
                        value={event}
                        onChange={(e) => setEvent(e.target.value)}
                        placeholder="e.g. Kenya National Theatre, PAWA254, Kilifi Fest"
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-[#E8DFD0] bg-[#FAF5ED] focus:bg-white text-[#1A1A1A] text-xs focus:outline-none focus:ring-2 focus:ring-[#C83C2E]"
                      />
                    </div>
                  </div>

                  {/* Date */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1">
                      Performance Date / Month
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                        <Calendar className="w-3.5 h-3.5" />
                      </div>
                      <input
                        type="text"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        placeholder="e.g. September 2026 or Oct 14, 2025"
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-[#E8DFD0] bg-[#FAF5ED] focus:bg-white text-[#1A1A1A] text-xs focus:outline-none focus:ring-2 focus:ring-[#C83C2E]"
                      />
                    </div>
                  </div>

                  {/* Duration with quick presets */}
                  <div className="sm:col-span-2">
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
                        Video Duration (MM:SS)
                      </label>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-stone-500">Quick presets:</span>
                        {durationPresets.map((p) => (
                          <button
                            key={p}
                            type="button"
                            onClick={() => setDuration(p)}
                            className="px-1.5 py-0.5 rounded bg-stone-100 hover:bg-stone-200 border border-stone-200 text-[10px] font-mono cursor-pointer"
                          >
                            {p}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                        <Clock className="w-3.5 h-3.5" />
                      </div>
                      <input
                        type="text"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        placeholder="e.g. 05:22"
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-[#E8DFD0] bg-[#FAF5ED] focus:bg-white text-[#1A1A1A] font-mono text-xs focus:outline-none focus:ring-2 focus:ring-[#C83C2E]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. Connection to Written Poems & Custom Thumbnail */}
              <div className="p-5 rounded-2xl bg-white border border-[#E8DFD0] shadow-xs space-y-4">
                <h3 className="font-serif text-base font-bold text-[#1A1A1A] border-b border-[#E8DFD0] pb-2 flex items-center justify-between">
                  <span>Connections & Presentation</span>
                  <span className="text-xs font-normal text-stone-500">Optional</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Connect to Written Poem */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1">
                      Connect to Written Poem
                    </label>
                    <p className="text-[11px] text-stone-500 mb-1.5">
                      Links this video directly to its written stanzas for reader exploration.
                    </p>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                        <BookOpen className="w-3.5 h-3.5 text-[#E88D4D]" />
                      </div>
                      <select
                        value={poemSlug}
                        onChange={(e) => setPoemSlug(e.target.value)}
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-[#E8DFD0] bg-[#FAF5ED] focus:bg-white text-[#1A1A1A] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#C83C2E]"
                      >
                        <option value="">— None (Standalone Performance) —</option>
                        {poems.map((poem) => (
                          <option key={poem.slug} value={poem.slug}>
                            "{poem.title}" ({poem.year})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Custom Thumbnail Override */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1">
                      Thumbnail Cover Override
                    </label>
                    <p className="text-[11px] text-stone-500 mb-1.5">
                      Leave empty to use official YouTube high-res cover image.
                    </p>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                        <ImageIcon className="w-3.5 h-3.5 text-[#3A6EA5]" />
                      </div>
                      <input
                        type="text"
                        value={customThumbnail}
                        onChange={(e) => setCustomThumbnail(e.target.value)}
                        placeholder="https://... or /images/..."
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-[#E8DFD0] bg-[#FAF5ED] focus:bg-white text-[#1A1A1A] text-xs focus:outline-none focus:ring-2 focus:ring-[#C83C2E]"
                      />
                    </div>
                  </div>
                </div>

                {/* Thumbnail Preview strip */}
                {effectiveThumbnail && (
                  <div className="pt-2 flex items-center gap-3">
                    <img
                      src={effectiveThumbnail}
                      alt="Thumbnail Preview"
                      className="w-20 h-12 object-cover rounded-lg border border-[#E8DFD0] shadow-2xs"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/wanja_bw_stage.jpg';
                      }}
                    />
                    <div className="text-[11px] text-stone-600">
                      <span className="font-semibold block text-[#1A1A1A]">Thumbnail source:</span>
                      {customThumbnail ? 'Custom cover image URL' : `YouTube Auto-Thumbnail (${cleanYouTubeId})`}
                    </div>
                  </div>
                )}
              </div>

              {/* 4. Description & Live Spoken Word Transcript */}
              <div className="p-5 rounded-2xl bg-white border border-[#E8DFD0] shadow-xs space-y-4">
                <h3 className="font-serif text-base font-bold text-[#1A1A1A] border-b border-[#E8DFD0] pb-2">
                  Performance Context & Spoken Word Lyrics
                </h3>

                {/* Description */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1">
                    Performance Description & Curation Notes
                  </label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide context regarding the excavation, stage atmosphere, accompaniment, and themes..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DFD0] bg-[#FAF5ED] focus:bg-white text-[#1A1A1A] text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#C83C2E]"
                  />
                </div>

                {/* Transcript */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
                      Spoken Word Transcript / Live Lyrics
                    </label>
                    <span className="text-[11px] text-stone-500 font-mono">
                      {transcript ? `${transcript.trim().split(/\s+/).filter(Boolean).length} words` : 'Optional'}
                    </span>
                  </div>
                  <textarea
                    rows={4}
                    value={transcript}
                    onChange={(e) => setTranscript(e.target.value)}
                    placeholder="Enter the spoken recital stanzas or live lyrics so audience members can read along during playback..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DFD0] bg-[#FAF5ED] focus:bg-white text-[#1A1A1A] text-xs font-serif leading-relaxed italic focus:outline-none focus:ring-2 focus:ring-[#C83C2E]"
                  />
                </div>
              </div>

            </div>
          ) : (
            /* LIVE PREVIEW TAB */
            <div className="p-6 sm:p-8 space-y-6 bg-[#1A1A1A] text-[#FAF5ED] flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#2A2A2A]">
                <div>
                  <span className="text-xs uppercase font-bold tracking-widest text-[#E88D4D]">
                    Real-Time Simulation
                  </span>
                  <h3 className="font-serif text-lg font-bold text-white">
                    Previewing: {title || 'Untitled Performance Video'}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setPreviewMode('player')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      previewMode === 'player'
                        ? 'bg-[#C83C2E] text-white shadow-xs'
                        : 'bg-[#2A2A2A] text-stone-300 hover:text-white'
                    }`}
                  >
                    Embedded Video Player
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewMode('card')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      previewMode === 'card'
                        ? 'bg-[#C83C2E] text-white shadow-xs'
                        : 'bg-[#2A2A2A] text-stone-300 hover:text-white'
                    }`}
                  >
                    Gallery Card View
                  </button>
                </div>
              </div>

              {previewMode === 'player' ? (
                <div className="space-y-4">
                  {cleanYouTubeId ? (
                    <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-xl border border-[#333333]">
                      <iframe
                        className="w-full h-full"
                        src={`https://www.youtube-nocookie.com/embed/${cleanYouTubeId}?rel=0`}
                        title={title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <div className="aspect-video w-full rounded-2xl bg-[#222222] border border-[#333333] flex flex-col items-center justify-center p-6 text-center text-stone-400 space-y-2">
                      <Youtube className="w-10 h-10 text-stone-600" />
                      <p className="text-xs">Enter a valid YouTube URL or ID in the editor to load the player preview.</p>
                    </div>
                  )}

                  <div className="p-4 rounded-xl bg-[#242424] border border-[#333333] flex flex-wrap items-center justify-between gap-4 text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-full bg-[#E88D4D]/20 text-[#E88D4D] text-[10px] font-bold uppercase">
                          {category.replace('_', ' ')}
                        </span>
                        <span className="text-stone-300 font-semibold">{event || 'Stage Event'}</span>
                        <span className="text-stone-500">· {duration}</span>
                      </div>
                      <p className="text-xs text-stone-300 line-clamp-2">
                        {description || 'No description provided.'}
                      </p>
                    </div>

                    {cleanYouTubeId && (
                      <a
                        href={`https://www.youtube.com/watch?v=${cleanYouTubeId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-1.5 rounded-lg bg-[#333333] hover:bg-[#444444] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-[#E88D4D]" />
                        <span>Test on YouTube</span>
                      </a>
                    )}
                  </div>
                </div>
              ) : (
                /* Gallery Card Simulation */
                <div className="max-w-md mx-auto p-5 rounded-2xl bg-white text-[#1A1A1A] border border-[#E8DFD0] shadow-lg space-y-3">
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-black">
                    <img
                      src={effectiveThumbnail || '/images/wanja_bw_stage.jpg'}
                      alt={title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-[#C83C2E] text-white flex items-center justify-center shadow-lg">
                        <Play className="w-5 h-5 ml-0.5 fill-current" />
                      </div>
                    </div>
                    <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/80 text-white rounded text-[10px] font-mono">
                      {duration}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px] text-stone-500">
                      <span className="font-bold uppercase text-[#3A6EA5]">{category.replace('_', ' ')}</span>
                      <span>{date || 'Recent'}</span>
                    </div>
                    <h4 className="font-serif text-base font-bold text-[#1A1A1A] line-clamp-1">
                      {title || 'Sample Performance Title'}
                    </h4>
                    <p className="text-xs text-stone-600 line-clamp-2">
                      {description || 'Sample performance description context...'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Modal Footer Controls */}
          <div className="p-4 sm:p-5 bg-white border-t border-[#E8DFD0] flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-3 shrink-0">
            <div className="text-[11px] text-stone-500">
              {status === 'published' ? (
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
                  Will be visible to public visitors on live site
                </span>
              ) : (
                <span className="text-amber-700 font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-500 inline-block"></span>
                  Saved as draft — only visible in admin studio
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-[#E8DFD0] text-stone-600 font-semibold text-xs hover:bg-stone-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                id="save-video-submit-btn"
                className="px-6 py-2.5 rounded-xl bg-[#C83C2E] hover:bg-[#B03225] text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>{isNew ? 'Save & Add Video' : 'Save Changes'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
