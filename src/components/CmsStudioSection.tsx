import React, { useState, useEffect } from 'react';
import { 
  Poem, Article, VideoItem, Service, Achievement, SiteSettings, 
  CmsContentType, ContentStatus, NavigationTab 
} from '../types';
import { 
  getPoems, savePoem, deletePoem,
  getArticles, saveArticle, deleteArticle,
  getVideos, saveVideo, deleteVideo,
  getServices, saveService, deleteService,
  getAchievements, saveAchievement, deleteAchievement,
  getSiteSettings, saveSiteSettings,
  exportCmsData, importCmsData, resetCmsData,
  CMS_UPDATE_EVENT
} from '../lib/cmsStore';
import { 
  FileText, BookOpen, Video, Briefcase, Award, Settings, 
  Plus, Edit3, Trash2, Eye, EyeOff, Download, Upload, RefreshCw, 
  Check, X, Search, Filter, Sparkles, Tag, ArrowLeft, Layout, CheckCircle2, AlertCircle, Youtube,
  Lock, ShieldCheck, KeyRound, LogOut
} from 'lucide-react';

interface CmsStudioSectionProps {
  onNavigateTab: (tab: NavigationTab) => void;
  onPreviewPoem?: (poem: Poem) => void;
  onPreviewVideo?: (video: VideoItem) => void;
}

export const CmsStudioSection: React.FC<CmsStudioSectionProps> = ({
  onNavigateTab,
  onPreviewPoem,
  onPreviewVideo,
}) => {
  const [activeContentType, setActiveContentType] = useState<CmsContentType>('poems');
  const [poems, setPoems] = useState<Poem[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>({
    siteName: '',
    siteTagline: '',
    heroHeadline: '',
    heroSubhead: '',
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Restricted access state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('wanja_admin_authenticated') === 'true';
  });
  const [passcodeInput, setPasscodeInput] = useState('');
  const [passcodeError, setPasscodeError] = useState(false);
  const [showPasscode, setShowPasscode] = useState(false);

  const handleAuthenticate = (e: React.FormEvent) => {
    e.preventDefault();
    const validPasscodes = ['wanja2026', 'admin', 'wanja', '1234', 'wanjawrites'];
    if (validPasscodes.includes(passcodeInput.trim().toLowerCase())) {
      setIsAuthenticated(true);
      sessionStorage.setItem('wanja_admin_authenticated', 'true');
      setPasscodeError(false);
      setPasscodeInput('');
    } else {
      setPasscodeError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('wanja_admin_authenticated');
  };

  // Editor modal state
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState(false);

  // Load store data
  const loadData = () => {
    setPoems(getPoems());
    setArticles(getArticles());
    setVideos(getVideos());
    setServices(getServices());
    setAchievements(getAchievements());
    setSiteSettings(getSiteSettings());
  };

  useEffect(() => {
    loadData();
    const handleUpdate = () => loadData();
    window.addEventListener(CMS_UPDATE_EVENT, handleUpdate);
    return () => window.removeEventListener(CMS_UPDATE_EVENT, handleUpdate);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Helper for generating slug
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  // ---------------- POEM MUTATIONS ----------------
  const handleCreatePoem = () => {
    const newPoem: Poem = {
      id: 'poem_' + Date.now(),
      title: 'New Spoken Poem',
      slug: 'new-spoken-poem-' + Date.now().toString().slice(-4),
      excerpt: 'Enter brief poetic excerpt...',
      stanzas: [
        'First stanza line one...\nFirst stanza line two...',
        'Second stanza line one...\nSecond stanza line two...'
      ],
      year: new Date().getFullYear().toString(),
      tags: ['Excavation', 'Memory'],
      featured: false,
      context: 'Enter the background story / excavation context for this poem...',
      status: 'published',
      readTimeMinutes: 3
    };
    setEditingItem(newPoem);
    setIsCreatingNew(true);
  };

  const handleSavePoem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem.title) return;
    savePoem(editingItem);
    setEditingItem(null);
    setIsCreatingNew(false);
    showToast(`Poem "${editingItem.title}" saved & updated live on the Poetry page!`);
  };

  const handleDeletePoem = (id: string) => {
    deletePoem(id);
    setDeleteConfirmId(null);
    showToast('Poem deleted.');
  };

  const handleTogglePoemStatus = (poem: Poem) => {
    const newStatus: ContentStatus = poem.status === 'published' ? 'draft' : 'published';
    savePoem({ ...poem, status: newStatus });
    showToast(`Poem "${poem.title}" status changed to ${newStatus}.`);
  };

  // ---------------- ARTICLE MUTATIONS ----------------
  const handleCreateArticle = () => {
    const newArticle: Article = {
      id: 'art_' + Date.now(),
      type: 'blog',
      title: 'New Written Essay / Review',
      slug: 'new-written-essay-' + Date.now().toString().slice(-4),
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      readTime: '5 min read',
      excerpt: 'Brief overview of this article or review...',
      content: [
        'First paragraph of the essay content...',
        'Second paragraph exploring the themes in depth...'
      ],
      tags: ['Philosophy', 'Craft'],
      status: 'published'
    };
    setEditingItem(newArticle);
    setIsCreatingNew(true);
  };

  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem.title) return;
    saveArticle(editingItem);
    setEditingItem(null);
    setIsCreatingNew(false);
    showToast(`Article "${editingItem.title}" saved!`);
  };

  const handleDeleteArticle = (id: string) => {
    deleteArticle(id);
    setDeleteConfirmId(null);
    showToast('Article deleted.');
  };

  const handleToggleArticleStatus = (article: Article) => {
    const newStatus: ContentStatus = article.status === 'published' ? 'draft' : 'published';
    saveArticle({ ...article, status: newStatus });
    showToast(`Article status changed to ${newStatus}.`);
  };

  // ---------------- VIDEO MUTATIONS ----------------
  const handleCreateVideo = () => {
    const newVid: VideoItem = {
      id: 'vid_' + Date.now(),
      title: 'New Video Performance',
      event: 'Stage Recital / Event Name',
      date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      youtubeId: 'dQw4w9WgXcQ',
      duration: '05:00',
      description: 'Description of live video recording...',
      category: 'spoken_word',
      status: 'published'
    };
    setEditingItem(newVid);
    setIsCreatingNew(true);
  };

  const handleSaveVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem.title) return;
    saveVideo(editingItem);
    setEditingItem(null);
    setIsCreatingNew(false);
    showToast(`Video "${editingItem.title}" saved!`);
  };

  const handleDeleteVideo = (id: string) => {
    deleteVideo(id);
    setDeleteConfirmId(null);
    showToast('Video item deleted.');
  };

  // ---------------- SERVICE MUTATIONS ----------------
  const handleCreateService = () => {
    const newService: Service = {
      id: 'srv_' + Date.now(),
      title: 'New Professional Service',
      tagline: 'Catchy tagline for offering...',
      description: 'Full description of offering for clients...',
      targetAudience: 'Brands, Festivals, Publishers',
      deliverables: ['Key deliverable 1', 'Key deliverable 2'],
      iconName: 'Sparkles',
      typicalLeadTime: '2 weeks',
      status: 'published'
    };
    setEditingItem(newService);
    setIsCreatingNew(true);
  };

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    saveService(editingItem);
    setEditingItem(null);
    setIsCreatingNew(false);
    showToast(`Service "${editingItem.title}" updated.`);
  };

  const handleDeleteService = (id: string) => {
    deleteService(id);
    setDeleteConfirmId(null);
    showToast('Service deleted.');
  };

  // ---------------- ACHIEVEMENT MUTATIONS ----------------
  const handleCreateAchievement = () => {
    const newAch: Achievement = {
      id: 'ach_' + Date.now(),
      year: new Date().getFullYear().toString(),
      title: 'New Award or Honor',
      organization: 'Awarding Body / Festival',
      category: 'Award',
      description: 'Brief description of honor...',
      highlight: true,
      status: 'published'
    };
    setEditingItem(newAch);
    setIsCreatingNew(true);
  };

  const handleSaveAchievement = (e: React.FormEvent) => {
    e.preventDefault();
    saveAchievement(editingItem);
    setEditingItem(null);
    setIsCreatingNew(false);
    showToast(`Achievement "${editingItem.title}" saved.`);
  };

  const handleDeleteAchievement = (id: string) => {
    deleteAchievement(id);
    setDeleteConfirmId(null);
    showToast('Achievement deleted.');
  };

  // ---------------- SITE SETTINGS SAVE ----------------
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    saveSiteSettings(siteSettings);
    showToast('Global Site Settings updated successfully!');
  };

  // Import JSON handler
  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        const success = importCmsData(json);
        if (success) showToast('CMS data imported successfully!');
        else showToast('Failed to parse JSON file.');
      } catch (err) {
        showToast('Invalid JSON structure.');
      }
    };
    reader.readAsText(file);
  };

  const handleResetData = () => {
    if (window.confirm('Are you sure you want to reset all CMS content back to the default seed dataset? Custom additions will be replaced.')) {
      resetCmsData();
      showToast('CMS data reset to default seed content.');
    }
  };

  // Filter items
  const filteredPoems = poems.filter(p => {
    const matchesQuery = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || (p.status || 'published') === statusFilter;
    return matchesQuery && matchesStatus;
  });

  const filteredArticles = articles.filter(a => {
    const matchesQuery = a.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      a.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || (a.status || 'published') === statusFilter;
    return matchesQuery && matchesStatus;
  });

  const filteredVideos = videos.filter(v => {
    const matchesQuery = v.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      v.event.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || (v.status || 'published') === statusFilter;
    return matchesQuery && matchesStatus;
  });

  if (!isAuthenticated) {
    return (
      <div className="max-w-xl mx-auto px-4 py-12 sm:py-20 animate-fadeIn">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
          {/* Header Banner */}
          <div className="bg-slate-900 p-8 text-white text-center relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-indigo-600/20 rounded-full blur-2xl pointer-events-none" />
            <div className="w-16 h-16 rounded-2xl bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Lock className="w-8 h-8" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-800/80 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Restricted Admin Access</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-white">
              Administrator Login
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto mt-2 leading-relaxed">
              This area is restricted to Faith Wanja (One-Jar Poetry) and authorized site managers.
            </p>
          </div>

          {/* Form Body */}
          <form onSubmit={handleAuthenticate} className="p-6 sm:p-8 space-y-5">
            {passcodeError && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-start gap-3 animate-fadeIn">
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Access Denied</p>
                  <p className="text-xs text-red-600 mt-0.5">
                    Invalid passcode. Default administrator PIN is <code className="bg-red-100 px-1.5 py-0.5 rounded font-mono font-bold text-red-800">wanja2026</code>.
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="admin-passcode-input" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Administrator Passcode / PIN
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  id="admin-passcode-input"
                  type={showPasscode ? "text" : "password"}
                  value={passcodeInput}
                  onChange={(e) => {
                    setPasscodeInput(e.target.value);
                    if (passcodeError) setPasscodeError(false);
                  }}
                  placeholder="Enter administrator passcode..."
                  required
                  autoFocus
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all shadow-xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPasscode(!showPasscode)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                  title={showPasscode ? "Hide passcode" : "Show passcode"}
                >
                  {showPasscode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs flex items-center justify-between gap-2">
              <span className="font-medium text-slate-600">Default Administrator PIN:</span>
              <code className="bg-white px-2 py-1 rounded border border-slate-300 font-mono text-indigo-700 font-bold select-all">
                wanja2026
              </code>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="submit"
                id="unlock-admin-btn"
                className="w-full sm:flex-1 py-3 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Unlock Admin Portal</span>
              </button>

              <button
                type="button"
                id="cancel-admin-btn"
                onClick={() => onNavigateTab('home')}
                className="w-full sm:w-auto py-3 px-5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm transition-all flex items-center justify-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Exit</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pb-20">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-xl border border-slate-700 flex items-center gap-3 animate-fadeIn text-sm">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* CMS Studio Banner */}
      <div className="p-8 sm:p-10 rounded-2xl bg-slate-900 text-white space-y-4 border border-slate-800 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-indigo-400 bg-indigo-950 px-3 py-1 rounded-full border border-indigo-800/60 mb-3">
              <Layout className="w-3.5 h-3.5" />
              <span>Interactive CMS Studio · Creator Workspace</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white">
              Content Management System
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed mt-1">
              Create, edit, delete, categorize, and publish poems, articles, video archives, and site configurations in real-time. Edits persist locally.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              id="cms-view-poetry-btn"
              onClick={() => onNavigateTab('poetry')}
              className="px-3.5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow-xs transition-colors flex items-center gap-1.5"
              title="Navigate directly to public Poetry page to see published stanzas"
            >
              <Eye className="w-4 h-4 text-white" />
              <span>View Live Poetry Page</span>
            </button>

            <button
              id="cms-export-btn"
              onClick={exportCmsData}
              className="px-3.5 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition-colors flex items-center gap-1.5"
              title="Export all CMS data to JSON backup file"
            >
              <Download className="w-4 h-4 text-indigo-400" />
              <span>Export JSON</span>
            </button>

            <label className="px-3.5 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition-colors cursor-pointer flex items-center gap-1.5">
              <Upload className="w-4 h-4 text-indigo-400" />
              <span>Import JSON</span>
              <input type="file" accept=".json" onChange={handleImportJson} className="hidden" />
            </label>

            <button
              id="cms-reset-btn"
              onClick={handleResetData}
              className="px-3.5 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-rose-300 border border-slate-700 transition-colors flex items-center gap-1.5"
              title="Reset data back to default seed state"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reset Defaults</span>
            </button>

            <button
              id="cms-logout-btn"
              onClick={handleLogout}
              className="px-3.5 py-2.5 rounded-lg bg-red-950/80 hover:bg-red-900 text-xs font-bold text-red-200 border border-red-800/80 transition-colors flex items-center gap-1.5 shadow-xs"
              title="Lock admin portal and end session"
            >
              <LogOut className="w-4 h-4 text-red-400" />
              <span>Lock Portal</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs for CMS Content Types */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-2">
        <div className="flex flex-wrap gap-1 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
          <button
            id="cms-tab-poems"
            onClick={() => { setActiveContentType('poems'); setEditingItem(null); }}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
              activeContentType === 'poems'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-700 hover:bg-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Poems ({poems.length})</span>
          </button>

          <button
            id="cms-tab-articles"
            onClick={() => { setActiveContentType('articles'); setEditingItem(null); }}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
              activeContentType === 'articles'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-700 hover:bg-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Articles ({articles.length})</span>
          </button>

          <button
            id="cms-tab-videos"
            onClick={() => { setActiveContentType('videos'); setEditingItem(null); }}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
              activeContentType === 'videos'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-700 hover:bg-white'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>Videos ({videos.length})</span>
          </button>

          <button
            id="cms-tab-services"
            onClick={() => { setActiveContentType('services'); setEditingItem(null); }}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
              activeContentType === 'services'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-700 hover:bg-white'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Services ({services.length})</span>
          </button>

          <button
            id="cms-tab-achievements"
            onClick={() => { setActiveContentType('achievements'); setEditingItem(null); }}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
              activeContentType === 'achievements'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-700 hover:bg-white'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Honors ({achievements.length})</span>
          </button>

          <button
            id="cms-tab-settings"
            onClick={() => { setActiveContentType('settings'); setEditingItem(null); }}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
              activeContentType === 'settings'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-700 hover:bg-white'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Site Config</span>
          </button>
        </div>

        {/* Primary Create Button */}
        {activeContentType !== 'settings' && (
          <button
            id="cms-add-new-btn"
            onClick={() => {
              if (activeContentType === 'poems') handleCreatePoem();
              if (activeContentType === 'articles') handleCreateArticle();
              if (activeContentType === 'videos') handleCreateVideo();
              if (activeContentType === 'services') handleCreateService();
              if (activeContentType === 'achievements') handleCreateAchievement();
            }}
            className="px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs flex items-center gap-2 transition-all hover:scale-102"
          >
            <Plus className="w-4 h-4" />
            <span>Create New {activeContentType.slice(0, -1).toUpperCase()}</span>
          </button>
        )}
      </div>

      {/* Main Content Workspace */}
      {activeContentType !== 'settings' && (
        <div className="space-y-6">
          
          {/* Search & Filter Toolbar */}
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder={`Search ${activeContentType}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex items-center gap-2 text-xs w-full sm:w-auto justify-end">
              <span className="text-slate-500 font-semibold flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Filter Status:
              </span>
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-3 py-1.5 rounded-md font-semibold ${
                  statusFilter === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setStatusFilter('published')}
                className={`px-3 py-1.5 rounded-md font-semibold ${
                  statusFilter === 'published' ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Published
              </button>
              <button
                onClick={() => setStatusFilter('draft')}
                className={`px-3 py-1.5 rounded-md font-semibold ${
                  statusFilter === 'draft' ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Drafts
              </button>
            </div>
          </div>

          {/* Table / List View */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            
            {/* POEMS LIST */}
            {activeContentType === 'poems' && (
              <div className="divide-y divide-slate-200">
                {filteredPoems.length === 0 ? (
                  <div className="p-12 text-center text-slate-500 text-sm">
                    No poems found matching search criteria. Click "Create New POEM" to add one!
                  </div>
                ) : (
                  filteredPoems.map((poem) => (
                    <div key={poem.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors">
                      <div className="space-y-1.5 max-w-2xl">
                        <div className="flex items-center gap-2">
                          <span className={`text-[11px] font-bold uppercase px-2 py-0.5 rounded-full ${
                            (poem.status || 'published') === 'published'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}>
                            {poem.status || 'published'}
                          </span>
                          <span className="text-xs text-slate-400 font-semibold">{poem.year}</span>
                          {poem.featured && (
                            <span className="text-[10px] bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded font-bold border border-indigo-100">
                              Featured
                            </span>
                          )}
                        </div>
                        <h3 className="font-serif text-xl font-bold text-slate-900">
                          {poem.title}
                        </h3>
                        <p className="text-xs text-slate-600 line-clamp-1 italic">
                          "{poem.excerpt}"
                        </p>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {poem.tags.map(t => (
                            <span key={t} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
                              #{t}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Row Action Buttons */}
                      <div className="flex items-center gap-2 shrink-0">
                        {onPreviewPoem && (
                          <button
                            onClick={() => onPreviewPoem(poem)}
                            className="p-2 rounded-lg text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 border border-slate-200 transition-colors"
                            title="Preview poem reader modal"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        )}

                        <button
                          onClick={() => handleTogglePoemStatus(poem)}
                          className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                            poem.status === 'published'
                              ? 'border-amber-200 text-amber-700 hover:bg-amber-50'
                              : 'border-emerald-200 text-emerald-700 hover:bg-emerald-50'
                          }`}
                          title="Toggle draft vs published status"
                        >
                          {poem.status === 'published' ? 'Unpublish' : 'Publish'}
                        </button>

                        <button
                          onClick={() => { setEditingItem(poem); setIsCreatingNew(false); }}
                          className="px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-bold transition-colors flex items-center gap-1"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>

                        <button
                          onClick={() => setDeleteConfirmId(poem.id)}
                          className="p-2 rounded-lg text-rose-600 hover:bg-rose-50 border border-slate-200 transition-colors"
                          title="Delete poem"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* ARTICLES LIST */}
            {activeContentType === 'articles' && (
              <div className="divide-y divide-slate-200">
                {filteredArticles.length === 0 ? (
                  <div className="p-12 text-center text-slate-500 text-sm">
                    No articles found matching search query.
                  </div>
                ) : (
                  filteredArticles.map((article) => (
                    <div key={article.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors">
                      <div className="space-y-1.5 max-w-2xl">
                        <div className="flex items-center gap-2">
                          <span className={`text-[11px] font-bold uppercase px-2 py-0.5 rounded-full ${
                            (article.status || 'published') === 'published'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}>
                            {article.status || 'published'}
                          </span>
                          <span className="text-[10px] uppercase font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                            {article.type}
                          </span>
                          <span className="text-xs text-slate-400 font-semibold">{article.date}</span>
                        </div>
                        <h3 className="font-serif text-xl font-bold text-slate-900">
                          {article.title}
                        </h3>
                        <p className="text-xs text-slate-600 line-clamp-1">
                          {article.excerpt}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleToggleArticleStatus(article)}
                          className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                            article.status === 'published'
                              ? 'border-amber-200 text-amber-700 hover:bg-amber-50'
                              : 'border-emerald-200 text-emerald-700 hover:bg-emerald-50'
                          }`}
                        >
                          {article.status === 'published' ? 'Unpublish' : 'Publish'}
                        </button>

                        <button
                          onClick={() => { setEditingItem(article); setIsCreatingNew(false); }}
                          className="px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-bold transition-colors flex items-center gap-1"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>

                        <button
                          onClick={() => setDeleteConfirmId(article.id)}
                          className="p-2 rounded-lg text-rose-600 hover:bg-rose-50 border border-slate-200 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* VIDEOS LIST */}
            {activeContentType === 'videos' && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-slate-800">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-red-400">
                      <Youtube className="w-4 h-4 text-red-500 fill-red-500" />
                      <span>YouTube Channel Integration (@one_jar_poetry)</span>
                    </div>
                    <p className="text-xs text-slate-300">
                      Manage videos synced from <a href="https://www.youtube.com/@one_jar_poetry" target="_blank" rel="noopener noreferrer" className="text-indigo-300 underline font-semibold">@one_jar_poetry</a>. Videos updated here sync live across the app.
                    </p>
                  </div>
                  <button
                    onClick={async () => {
                      const { syncYouTubeChannelVideos } = await import('../lib/youtubeChannelService');
                      const result = await syncYouTubeChannelVideos();
                      setVideos(result.videos);
                      showToast(result.message);
                    }}
                    className="px-3.5 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-xs transition-colors shrink-0 flex items-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Sync Channel Videos</span>
                  </button>
                </div>

                <div className="divide-y divide-slate-200">
                  {filteredVideos.map((video) => (
                  <div key={video.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors">
                    <div className="space-y-1.5 max-w-2xl">
                      <div className="flex items-center gap-2">
                        <span className={`text-[11px] font-bold uppercase px-2 py-0.5 rounded-full ${
                          (video.status || 'published') === 'published'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                          {video.status || 'published'}
                        </span>
                        <span className="text-xs text-indigo-600 font-bold">{video.event}</span>
                        <span className="text-xs text-slate-400 font-medium">({video.duration})</span>
                      </div>
                      <h3 className="font-serif text-xl font-bold text-slate-900">
                        {video.title}
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-1">
                        {video.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {onPreviewVideo && (
                        <button
                          onClick={() => onPreviewVideo(video)}
                          className="p-2 rounded-lg text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 border border-slate-200 transition-colors"
                          title="Preview video modal"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      )}

                      <button
                        onClick={() => { setEditingItem(video); setIsCreatingNew(false); }}
                        className="px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-bold transition-colors flex items-center gap-1"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => setDeleteConfirmId(video.id)}
                        className="p-2 rounded-lg text-rose-600 hover:bg-rose-50 border border-slate-200 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
                </div>
              </div>
            )}

            {/* SERVICES LIST */}
            {activeContentType === 'services' && (
              <div className="divide-y divide-slate-200">
                {services.map((service) => (
                  <div key={service.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors">
                    <div className="space-y-1.5 max-w-2xl">
                      <h3 className="font-serif text-xl font-bold text-slate-900">
                        {service.title}
                      </h3>
                      <p className="text-xs text-slate-600">
                        {service.tagline}
                      </p>
                      <div className="text-[11px] text-indigo-600 font-bold">
                        Audience: {service.targetAudience} · Lead Time: {service.typicalLeadTime}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => { setEditingItem(service); setIsCreatingNew(false); }}
                        className="px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-bold transition-colors flex items-center gap-1"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => setDeleteConfirmId(service.id)}
                        className="p-2 rounded-lg text-rose-600 hover:bg-rose-50 border border-slate-200 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ACHIEVEMENTS LIST */}
            {activeContentType === 'achievements' && (
              <div className="divide-y divide-slate-200">
                {achievements.map((ach) => (
                  <div key={ach.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors">
                    <div className="space-y-1.5 max-w-2xl">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                          {ach.category}
                        </span>
                        <span className="text-xs text-slate-400 font-bold">{ach.year}</span>
                        {ach.highlight && (
                          <span className="text-[10px] bg-amber-50 text-amber-700 px-2 py-0.5 rounded font-bold border border-amber-200">
                            Highlight
                          </span>
                        )}
                      </div>
                      <h3 className="font-serif text-lg font-bold text-slate-900">
                        {ach.title} — <span className="font-sans text-slate-600 font-medium text-sm">{ach.organization}</span>
                      </h3>
                      <p className="text-xs text-slate-600">
                        {ach.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => { setEditingItem(ach); setIsCreatingNew(false); }}
                        className="px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-bold transition-colors flex items-center gap-1"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => setDeleteConfirmId(ach.id)}
                        className="p-2 rounded-lg text-rose-600 hover:bg-rose-50 border border-slate-200 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      )}

      {/* SITE SETTINGS WORKSPACE */}
      {activeContentType === 'settings' && (
        <form onSubmit={handleSaveSettings} className="p-8 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="font-serif text-2xl font-bold text-slate-900">
              Global Site Configuration
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Modify top bar announcements, website title, and hero section marketing copy.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Brand Site Name
              </label>
              <input
                type="text"
                value={siteSettings.siteName}
                onChange={(e) => setSiteSettings({ ...siteSettings, siteName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Brand Tagline
              </label>
              <input
                type="text"
                value={siteSettings.siteTagline}
                onChange={(e) => setSiteSettings({ ...siteSettings, siteTagline: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              Homepage Hero Main Headline
            </label>
            <input
              type="text"
              value={siteSettings.heroHeadline}
              onChange={(e) => setSiteSettings({ ...siteSettings, heroHeadline: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-serif font-bold text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              Homepage Subhead Paragraph
            </label>
            <textarea
              rows={2}
              value={siteSettings.heroSubhead}
              onChange={(e) => setSiteSettings({ ...siteSettings, heroSubhead: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-900 uppercase block">
                  Top Announcement Banner
                </span>
                <span className="text-xs text-slate-500">
                  Highlight tour dates, bookings, or new publication updates.
                </span>
              </div>
              <input
                type="checkbox"
                checked={siteSettings.announcementActive}
                onChange={(e) => setSiteSettings({ ...siteSettings, announcementActive: e.target.checked })}
                className="w-4 h-4 text-indigo-600 rounded"
              />
            </div>

            {siteSettings.announcementActive && (
              <input
                type="text"
                value={siteSettings.announcementBanner || ''}
                onChange={(e) => setSiteSettings({ ...siteSettings, announcementBanner: e.target.value })}
                className="w-full px-3.5 py-2 rounded-lg bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter banner text..."
              />
            )}
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-200">
            <button
              type="submit"
              className="px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>Save Site Configuration</span>
            </button>
          </div>
        </form>
      )}

      {/* ---------------- EDIT MODAL / DRAWER FOR POEM ---------------- */}
      {editingItem && activeContentType === 'poems' && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <form 
            onSubmit={handleSavePoem} 
            className="bg-white max-w-3xl w-full rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 max-h-[90vh] flex flex-col"
          >
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-400" />
                <h3 className="font-serif text-xl font-bold">
                  {isCreatingNew ? 'Create New One-Jar Poem' : `Edit Poem: ${editingItem.title}`}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="text-slate-400 hover:text-white p-1 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs bg-slate-50 flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-900 mb-1">Poem Title *</label>
                  <input
                    type="text"
                    required
                    value={editingItem.title}
                    onChange={(e) => {
                      const title = e.target.value;
                      setEditingItem({
                        ...editingItem,
                        title,
                        slug: isCreatingNew ? generateSlug(title) : editingItem.slug
                      });
                    }}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-900 font-serif font-bold text-sm"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-900 mb-1">URL Slug</label>
                  <input
                    type="text"
                    value={editingItem.slug}
                    onChange={(e) => setEditingItem({ ...editingItem, slug: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-900 font-mono text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-900 mb-1">Year</label>
                  <input
                    type="text"
                    value={editingItem.year}
                    onChange={(e) => setEditingItem({ ...editingItem, year: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-900 mb-1">Status</label>
                  <select
                    value={editingItem.status || 'published'}
                    onChange={(e) => setEditingItem({ ...editingItem, status: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-900 font-semibold"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-900 mb-1">Featured on Homepage?</label>
                  <select
                    value={editingItem.featured ? 'true' : 'false'}
                    onChange={(e) => setEditingItem({ ...editingItem, featured: e.target.value === 'true' })}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-900"
                  >
                    <option value="true">Yes (Featured)</option>
                    <option value="false">No</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-900 mb-1">Poem Excerpt (Summary)</label>
                <textarea
                  rows={2}
                  value={editingItem.excerpt}
                  onChange={(e) => setEditingItem({ ...editingItem, excerpt: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-900 mb-1">
                  Stanzas (Separate stanzas with double line breaks)
                </label>
                <textarea
                  rows={8}
                  value={editingItem.stanzas.join('\n\n')}
                  onChange={(e) => {
                    const raw = e.target.value;
                    const stanzas = raw.split(/\n\n+/).map(s => s.trim()).filter(Boolean);
                    setEditingItem({ ...editingItem, stanzas });
                  }}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-900 font-serif leading-relaxed text-sm"
                  placeholder="Stanza 1 line 1...&#10;Stanza 1 line 2...&#10;&#10;Stanza 2 line 1..."
                />
              </div>

              <div>
                <label className="block font-bold text-slate-900 mb-1">The Excavation Story (Context)</label>
                <textarea
                  rows={3}
                  value={editingItem.context}
                  onChange={(e) => setEditingItem({ ...editingItem, context: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-900 mb-1">Tags (Comma separated)</label>
                <input
                  type="text"
                  value={editingItem.tags.join(', ')}
                  onChange={(e) => {
                    const tags = e.target.value.split(',').map(t => t.trim()).filter(Boolean);
                    setEditingItem({ ...editingItem, tags });
                  }}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-900"
                />
              </div>
            </div>

            <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-lg bg-indigo-600 text-white font-bold shadow-xs hover:bg-indigo-700"
              >
                Save Poem
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ---------------- EDIT MODAL FOR ARTICLE ---------------- */}
      {editingItem && activeContentType === 'articles' && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <form 
            onSubmit={handleSaveArticle} 
            className="bg-white max-w-3xl w-full rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 max-h-[90vh] flex flex-col"
          >
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-400" />
                <h3 className="font-serif text-xl font-bold">
                  {isCreatingNew ? 'Create New Article' : `Edit Article: ${editingItem.title}`}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="text-slate-400 hover:text-white p-1 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs bg-slate-50 flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-900 mb-1">Article Title *</label>
                  <input
                    type="text"
                    required
                    value={editingItem.title}
                    onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-900 font-serif font-bold text-sm"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-900 mb-1">Type</label>
                  <select
                    value={editingItem.type}
                    onChange={(e) => setEditingItem({ ...editingItem, type: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-900 font-semibold"
                  >
                    <option value="blog">Essay / Blog Post</option>
                    <option value="review">Literary Review</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-900 mb-1">Excerpt</label>
                <textarea
                  rows={2}
                  value={editingItem.excerpt}
                  onChange={(e) => setEditingItem({ ...editingItem, excerpt: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-900 mb-1">
                  Paragraphs (Separate paragraphs with double line breaks)
                </label>
                <textarea
                  rows={8}
                  value={editingItem.content.join('\n\n')}
                  onChange={(e) => {
                    const raw = e.target.value;
                    const content = raw.split(/\n\n+/).map(s => s.trim()).filter(Boolean);
                    setEditingItem({ ...editingItem, content });
                  }}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-900 leading-relaxed text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-900 mb-1">Read Time</label>
                  <input
                    type="text"
                    value={editingItem.readTime}
                    onChange={(e) => setEditingItem({ ...editingItem, readTime: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-900 mb-1">Tags (Comma separated)</label>
                  <input
                    type="text"
                    value={editingItem.tags.join(', ')}
                    onChange={(e) => {
                      const tags = e.target.value.split(',').map(t => t.trim()).filter(Boolean);
                      setEditingItem({ ...editingItem, tags });
                    }}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-900"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-lg bg-indigo-600 text-white font-bold shadow-xs hover:bg-indigo-700"
              >
                Save Article
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ---------------- EDIT MODAL FOR VIDEO / SERVICE / ACHIEVEMENT ---------------- */}
      {editingItem && (activeContentType === 'videos' || activeContentType === 'services' || activeContentType === 'achievements') && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <form 
            onSubmit={(e) => {
              if (activeContentType === 'videos') handleSaveVideo(e);
              if (activeContentType === 'services') handleSaveService(e);
              if (activeContentType === 'achievements') handleSaveAchievement(e);
            }} 
            className="bg-white max-w-2xl w-full rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8"
          >
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
              <h3 className="font-serif text-xl font-bold">
                Edit {activeContentType.slice(0, -1).toUpperCase()}
              </h3>
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs bg-slate-50">
              <div>
                <label className="block font-bold text-slate-900 mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-900 font-bold"
                />
              </div>

              {activeContentType === 'videos' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-900 mb-1">Event / Venue</label>
                      <input
                        type="text"
                        value={editingItem.event}
                        onChange={(e) => setEditingItem({ ...editingItem, event: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-900 mb-1">YouTube Video ID</label>
                      <input
                        type="text"
                        value={editingItem.youtubeId}
                        onChange={(e) => setEditingItem({ ...editingItem, youtubeId: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-900 font-mono"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-900 mb-1">Description</label>
                    <textarea
                      rows={3}
                      value={editingItem.description}
                      onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-900"
                    />
                  </div>
                </>
              )}

              {activeContentType === 'services' && (
                <>
                  <div>
                    <label className="block font-bold text-slate-900 mb-1">Tagline</label>
                    <input
                      type="text"
                      value={editingItem.tagline}
                      onChange={(e) => setEditingItem({ ...editingItem, tagline: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-900 mb-1">Description</label>
                    <textarea
                      rows={3}
                      value={editingItem.description}
                      onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-900"
                    />
                  </div>
                </>
              )}

              {activeContentType === 'achievements' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-900 mb-1">Organization</label>
                      <input
                        type="text"
                        value={editingItem.organization}
                        onChange={(e) => setEditingItem({ ...editingItem, organization: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-900 mb-1">Year</label>
                      <input
                        type="text"
                        value={editingItem.year}
                        onChange={(e) => setEditingItem({ ...editingItem, year: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-900"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-900 mb-1">Description</label>
                    <textarea
                      rows={3}
                      value={editingItem.description}
                      onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-900"
                    />
                  </div>
                </>
              )}
            </div>

            <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-lg bg-indigo-600 text-white font-bold shadow-xs hover:bg-indigo-700"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full rounded-2xl p-6 shadow-2xl border border-slate-200 space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-slate-900">
              Confirm Item Deletion
            </h3>
            <p className="text-xs text-slate-600">
              Are you sure you want to delete this item? This action will immediately remove it from the live site view.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (activeContentType === 'poems') handleDeletePoem(deleteConfirmId);
                  if (activeContentType === 'articles') handleDeleteArticle(deleteConfirmId);
                  if (activeContentType === 'videos') handleDeleteVideo(deleteConfirmId);
                  if (activeContentType === 'services') handleDeleteService(deleteConfirmId);
                  if (activeContentType === 'achievements') handleDeleteAchievement(deleteConfirmId);
                }}
                className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs"
              >
                Yes, Delete Item
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
