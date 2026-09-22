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
  Lock, ShieldCheck, KeyRound, LogOut, Users, Shield, Play, ExternalLink, Calendar, Clock, MapPin
} from 'lucide-react';
import { 
  getCurrentAdmin, hasAdminPrivilege, logoutAdmin, 
  AUTH_CHANGE_EVENT, AdminUser 
} from '../lib/authService';
import { UserManagementView } from './UserManagementView';
import { VideoEditorModal } from './VideoEditorModal';

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

  // Cryptographic RBAC Session State
  const [admin, setAdmin] = useState<AdminUser | null>(getCurrentAdmin());

  useEffect(() => {
    const handleAuth = () => setAdmin(getCurrentAdmin());
    window.addEventListener(AUTH_CHANGE_EVENT, handleAuth);
    return () => window.removeEventListener(AUTH_CHANGE_EVENT, handleAuth);
  }, []);

  const handleLogout = () => {
    logoutAdmin();
    setAdmin(null);
    showToast('Logged out of CMS Studio.');
  };

  // Editor modal state
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState(false);

  // Dedicated Video Editor Modal State
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<VideoItem | null>(null);
  const [isVideoCreatingNew, setIsVideoCreatingNew] = useState(false);

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
    if (!hasAdminPrivilege('canEditContent')) {
      showToast('Permission denied: Your role cannot create content.');
      return;
    }
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
    if (!hasAdminPrivilege('canEditContent')) {
      showToast('Permission denied: Your role cannot edit content.');
      return;
    }
    if (!editingItem.title) return;
    savePoem(editingItem);
    setEditingItem(null);
    setIsCreatingNew(false);
    showToast(`Poem "${editingItem.title}" saved & updated live on the Poetry page!`);
  };

  const handleDeletePoem = (id: string) => {
    if (!hasAdminPrivilege('canDeleteContent')) {
      showToast('Permission denied: Your role cannot delete records.');
      return;
    }
    deletePoem(id);
    setDeleteConfirmId(null);
    showToast('Poem deleted.');
  };

  const handleTogglePoemStatus = (poem: Poem) => {
    if (!hasAdminPrivilege('canPublishContent')) {
      showToast('Permission denied: Your role cannot toggle publish status.');
      return;
    }
    const newStatus: ContentStatus = poem.status === 'published' ? 'draft' : 'published';
    savePoem({ ...poem, status: newStatus });
    showToast(`Poem "${poem.title}" status changed to ${newStatus}.`);
  };

  // ---------------- ARTICLE MUTATIONS ----------------
  const handleCreateArticle = () => {
    if (!hasAdminPrivilege('canEditContent')) {
      showToast('Permission denied: Your role cannot create articles.');
      return;
    }
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
    if (!hasAdminPrivilege('canEditContent')) {
      showToast('Permission denied: Your role cannot edit articles.');
      return;
    }
    if (!editingItem.title) return;
    saveArticle(editingItem);
    setEditingItem(null);
    setIsCreatingNew(false);
    showToast(`Article "${editingItem.title}" saved!`);
  };

  const handleDeleteArticle = (id: string) => {
    if (!hasAdminPrivilege('canDeleteContent')) {
      showToast('Permission denied: Your role cannot delete articles.');
      return;
    }
    deleteArticle(id);
    setDeleteConfirmId(null);
    showToast('Article deleted.');
  };

  const handleToggleArticleStatus = (article: Article) => {
    if (!hasAdminPrivilege('canPublishContent')) {
      showToast('Permission denied: Your role cannot toggle publish status.');
      return;
    }
    const newStatus: ContentStatus = article.status === 'published' ? 'draft' : 'published';
    saveArticle({ ...article, status: newStatus });
    showToast(`Article status changed to ${newStatus}.`);
  };

  // ---------------- VIDEO MUTATIONS ----------------
  const handleCreateVideo = () => {
    if (!hasAdminPrivilege('canEditContent')) {
      showToast('Permission denied: Your role cannot create video entries.');
      return;
    }
    const newVid: VideoItem = {
      id: 'vid_' + Date.now(),
      title: '',
      event: 'One-Jar Poetry Recital',
      date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      youtubeId: '',
      duration: '04:30',
      description: '',
      category: 'spoken_word',
      status: 'published'
    };
    setEditingVideo(newVid);
    setIsVideoCreatingNew(true);
    setVideoModalOpen(true);
  };

  const handleEditVideo = (video: VideoItem) => {
    if (!hasAdminPrivilege('canEditContent')) {
      showToast('Permission denied: Your role cannot edit video entries.');
      return;
    }
    setEditingVideo(video);
    setIsVideoCreatingNew(false);
    setVideoModalOpen(true);
  };

  const handleSaveVideo = (savedVideo: VideoItem) => {
    if (!hasAdminPrivilege('canEditContent')) {
      showToast('Permission denied: Your role cannot edit video entries.');
      return;
    }
    saveVideo(savedVideo);
    setVideos(getVideos());
    setVideoModalOpen(false);
    setEditingVideo(null);
    setIsVideoCreatingNew(false);
    showToast(`Video "${savedVideo.title}" saved successfully!`);
  };

  const handleDeleteVideo = (id: string) => {
    if (!hasAdminPrivilege('canDeleteContent')) {
      showToast('Permission denied: Your role cannot delete video items.');
      return;
    }
    deleteVideo(id);
    setDeleteConfirmId(null);
    setVideos(getVideos());
    showToast('Video item deleted.');
  };

  const handleToggleVideoStatus = (video: VideoItem) => {
    if (!hasAdminPrivilege('canPublishContent')) {
      showToast('Permission denied: Your role cannot change publish status.');
      return;
    }
    const newStatus: ContentStatus = video.status === 'published' ? 'draft' : 'published';
    saveVideo({ ...video, status: newStatus });
    setVideos(getVideos());
    showToast(`Video marked as ${newStatus}.`);
  };

  // ---------------- SERVICE MUTATIONS ----------------
  const handleCreateService = () => {
    if (!hasAdminPrivilege('canEditContent')) {
      showToast('Permission denied: Your role cannot create services.');
      return;
    }
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
    if (!hasAdminPrivilege('canEditContent')) {
      showToast('Permission denied: Your role cannot edit services.');
      return;
    }
    saveService(editingItem);
    setEditingItem(null);
    setIsCreatingNew(false);
    showToast(`Service "${editingItem.title}" updated.`);
  };

  const handleDeleteService = (id: string) => {
    if (!hasAdminPrivilege('canDeleteContent')) {
      showToast('Permission denied: Your role cannot delete services.');
      return;
    }
    deleteService(id);
    setDeleteConfirmId(null);
    showToast('Service deleted.');
  };

  // ---------------- ACHIEVEMENT MUTATIONS ----------------
  const handleCreateAchievement = () => {
    if (!hasAdminPrivilege('canEditContent')) {
      showToast('Permission denied: Your role cannot create honors.');
      return;
    }
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
    if (!hasAdminPrivilege('canEditContent')) {
      showToast('Permission denied: Your role cannot edit honors.');
      return;
    }
    saveAchievement(editingItem);
    setEditingItem(null);
    setIsCreatingNew(false);
    showToast(`Achievement "${editingItem.title}" saved.`);
  };

  const handleDeleteAchievement = (id: string) => {
    if (!hasAdminPrivilege('canDeleteContent')) {
      showToast('Permission denied: Your role cannot delete honors.');
      return;
    }
    deleteAchievement(id);
    setDeleteConfirmId(null);
    showToast('Achievement deleted.');
  };

  // ---------------- SITE SETTINGS SAVE ----------------
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasAdminPrivilege('canManageSiteSettings')) {
      showToast('Permission denied: Site configuration requires administrative privileges.');
      return;
    }
    saveSiteSettings(siteSettings);
    showToast('Global Site Settings updated successfully!');
  };

  const handleExportJson = () => {
    if (!hasAdminPrivilege('canImportExportData')) {
      showToast('Permission denied: You do not have data backup privileges.');
      return;
    }
    exportCmsData();
    showToast('CMS backup data downloaded as JSON.');
  };

  // Import JSON handler
  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!hasAdminPrivilege('canImportExportData')) {
      showToast('Permission denied: You do not have data backup privileges.');
      return;
    }
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
    if (!hasAdminPrivilege('canResetData')) {
      showToast('Permission denied: Only Super Administrators can reset the system.');
      return;
    }
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

  if (!admin) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 bg-[#1A1A1A] border border-[#333333] rounded-2xl text-center text-white space-y-4 animate-fadeIn">
        <div className="w-14 h-14 rounded-2xl bg-[#C83C2E]/20 border border-[#C83C2E]/30 text-[#E88D4D] flex items-center justify-center mx-auto shadow-inner">
          <Lock className="w-7 h-7" />
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2A2A2A] border border-[#E88D4D]/40 text-[#E88D4D] text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Restricted Admin Portal</span>
        </div>
        <h2 className="font-serif text-2xl font-bold text-[#FFFBF5]">Authentication Required</h2>
        <p className="text-xs text-stone-400 leading-relaxed max-w-sm mx-auto">
          You must be logged in with a cryptographically verified administrator account to manage One-Jar content.
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <button
            onClick={() => onNavigateTab('cms')}
            className="px-5 py-2.5 bg-[#C83C2E] hover:bg-[#B03225] rounded-xl text-xs font-bold text-white shadow-md cursor-pointer transition-all"
          >
            Sign In to Portal
          </button>
          <button
            onClick={() => onNavigateTab('home')}
            className="px-4 py-2.5 border border-stone-700 hover:bg-stone-800 rounded-xl text-xs font-semibold text-stone-300 cursor-pointer transition-all"
          >
            Return to Public Site
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pb-20">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1A1A1A] text-white px-5 py-3 rounded-xl shadow-xl border border-[#2A2A2A] flex items-center gap-3 animate-fadeIn text-sm">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* CMS Studio Banner */}
      <div className="p-8 sm:p-10 rounded-2xl bg-[#1A1A1A] text-white space-y-4 border border-[#2A2A2A] shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#E88D4D] bg-[#2A2A2A] px-3 py-1 rounded-full border border-[#3A6EA5]/30 mb-3">
              <Layout className="w-3.5 h-3.5" />
              <span>Interactive CMS Studio · Creator Workspace</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#FFFBF5]">
              Content Management System
            </h1>
            <p className="text-sm sm:text-base text-stone-300 max-w-2xl leading-relaxed mt-1">
              Create, edit, delete, categorize, and publish poems, articles, video archives, and site configurations in real-time. Edits persist locally.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              id="cms-view-poetry-btn"
              onClick={() => onNavigateTab('poetry')}
              className="px-3.5 py-2.5 rounded-lg bg-[#C83C2E] hover:bg-[#B03225] text-xs font-bold text-white shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Navigate directly to public Poetry page to see published stanzas"
            >
              <Eye className="w-4 h-4 text-white" />
              <span>View Live Poetry Page</span>
            </button>

            {hasAdminPrivilege('canImportExportData') && (
              <button
                id="cms-export-btn"
                onClick={handleExportJson}
                className="px-3.5 py-2.5 rounded-lg bg-[#2A2A2A] hover:bg-[#333333] text-xs font-semibold text-stone-200 border border-[#3A3A3A] transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Export all CMS data to JSON backup file"
              >
                <Download className="w-4 h-4 text-[#E88D4D]" />
                <span>Export JSON</span>
              </button>
            )}

            {hasAdminPrivilege('canImportExportData') && (
              <label className="px-3.5 py-2.5 rounded-lg bg-[#2A2A2A] hover:bg-[#333333] text-xs font-semibold text-stone-200 border border-[#3A3A3A] transition-colors cursor-pointer flex items-center gap-1.5">
                <Upload className="w-4 h-4 text-[#3A6EA5]" />
                <span>Import JSON</span>
                <input type="file" accept=".json" onChange={handleImportJson} className="hidden" />
              </label>
            )}

            {hasAdminPrivilege('canResetData') && (
              <button
                id="cms-reset-btn"
                onClick={handleResetData}
                className="px-3.5 py-2.5 rounded-lg bg-[#2A2A2A] hover:bg-[#333333] text-xs font-semibold text-[#E88D4D] border border-[#3A3A3A] transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Reset data back to default seed state"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reset Defaults</span>
              </button>
            )}

            <button
              id="cms-logout-btn"
              onClick={handleLogout}
              className="px-3.5 py-2.5 rounded-lg bg-[#C83C2E]/20 hover:bg-[#C83C2E]/30 text-xs font-bold text-rose-300 border border-[#C83C2E]/40 transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
              title="Lock admin portal and end session"
            >
              <LogOut className="w-4 h-4 text-[#E88D4D]" />
              <span>Lock Portal</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs for CMS Content Types */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E8DFD0] pb-2">
        <div className="flex flex-wrap gap-1 bg-[#FAF5ED] p-1.5 rounded-xl border border-[#E8DFD0]">
          <button
            id="cms-tab-poems"
            onClick={() => { setActiveContentType('poems'); setEditingItem(null); }}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeContentType === 'poems'
                ? 'bg-[#C83C2E] text-white shadow-xs'
                : 'text-stone-700 hover:bg-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Poems ({poems.length})</span>
          </button>

          <button
            id="cms-tab-articles"
            onClick={() => { setActiveContentType('articles'); setEditingItem(null); }}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeContentType === 'articles'
                ? 'bg-[#C83C2E] text-white shadow-xs'
                : 'text-stone-700 hover:bg-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Articles ({articles.length})</span>
          </button>

          <button
            id="cms-tab-videos"
            onClick={() => { setActiveContentType('videos'); setEditingItem(null); }}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeContentType === 'videos'
                ? 'bg-[#C83C2E] text-white shadow-xs'
                : 'text-stone-700 hover:bg-white'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>Videos ({videos.length})</span>
          </button>

          <button
            id="cms-tab-services"
            onClick={() => { setActiveContentType('services'); setEditingItem(null); }}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeContentType === 'services'
                ? 'bg-[#C83C2E] text-white shadow-xs'
                : 'text-stone-700 hover:bg-white'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Services ({services.length})</span>
          </button>

          <button
            id="cms-tab-achievements"
            onClick={() => { setActiveContentType('achievements'); setEditingItem(null); }}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeContentType === 'achievements'
                ? 'bg-[#C83C2E] text-white shadow-xs'
                : 'text-stone-700 hover:bg-white'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Honors ({achievements.length})</span>
          </button>

          <button
            id="cms-tab-settings"
            onClick={() => { setActiveContentType('settings'); setEditingItem(null); }}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeContentType === 'settings'
                ? 'bg-[#C83C2E] text-white shadow-xs'
                : 'text-stone-700 hover:bg-white'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Site Config</span>
          </button>

          {hasAdminPrivilege('canManageUsers') && (
            <button
              id="cms-tab-team"
              onClick={() => { setActiveContentType('team'); setEditingItem(null); }}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeContentType === 'team'
                  ? 'bg-[#C83C2E] text-white shadow-xs'
                  : 'text-stone-700 hover:bg-white'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Team & Privileges</span>
            </button>
          )}
        </div>

        {/* Primary Create Button */}
        {activeContentType !== 'settings' && activeContentType !== 'team' && hasAdminPrivilege('canEditContent') && (
          <button
            id="cms-add-new-btn"
            onClick={() => {
              if (activeContentType === 'poems') handleCreatePoem();
              if (activeContentType === 'articles') handleCreateArticle();
              if (activeContentType === 'videos') handleCreateVideo();
              if (activeContentType === 'services') handleCreateService();
              if (activeContentType === 'achievements') handleCreateAchievement();
            }}
            className="px-4 py-2.5 rounded-lg bg-[#C83C2E] hover:bg-[#B03225] text-white text-xs font-bold shadow-xs flex items-center gap-2 transition-all hover:scale-102 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create New {activeContentType.slice(0, -1).toUpperCase()}</span>
          </button>
        )}
      </div>

      {/* Main Content Workspace */}
      {activeContentType !== 'settings' && activeContentType !== 'team' && (
        <div className="space-y-6">
          
          {/* Search & Filter Toolbar */}
          <div className="p-4 rounded-xl bg-white border border-[#E8DFD0] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder={`Search ${activeContentType}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#FAF5ED] border border-[#E8DFD0] text-xs text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#C83C2E]"
              />
            </div>

            <div className="flex items-center gap-2 text-xs w-full sm:w-auto justify-end">
              <span className="text-stone-500 font-semibold flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Filter Status:
              </span>
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-3 py-1.5 rounded-md font-semibold cursor-pointer transition-colors ${
                  statusFilter === 'all' ? 'bg-[#1A1A1A] text-white' : 'bg-[#FAF5ED] text-stone-600 hover:bg-stone-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setStatusFilter('published')}
                className={`px-3 py-1.5 rounded-md font-semibold cursor-pointer transition-colors ${
                  statusFilter === 'published' ? 'bg-emerald-700 text-white' : 'bg-[#FAF5ED] text-stone-600 hover:bg-stone-200'
                }`}
              >
                Published
              </button>
              <button
                onClick={() => setStatusFilter('draft')}
                className={`px-3 py-1.5 rounded-md font-semibold cursor-pointer transition-colors ${
                  statusFilter === 'draft' ? 'bg-[#E88D4D] text-white' : 'bg-[#FAF5ED] text-stone-600 hover:bg-stone-200'
                }`}
              >
                Drafts
              </button>
            </div>
          </div>

          {/* Table / List View */}
          <div className="bg-white rounded-2xl border border-[#E8DFD0] overflow-hidden shadow-xs">
            
            {/* POEMS LIST */}
            {activeContentType === 'poems' && (
              <div className="divide-y divide-[#E8DFD0]">
                {filteredPoems.length === 0 ? (
                  <div className="p-12 text-center text-stone-500 text-sm">
                    No poems found matching search criteria. Click "Create New POEM" to add one!
                  </div>
                ) : (
                  filteredPoems.map((poem) => (
                    <div key={poem.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#FAF5ED]/80 transition-colors">
                      <div className="space-y-1.5 max-w-2xl">
                        <div className="flex items-center gap-2">
                          <span className={`text-[11px] font-bold uppercase px-2 py-0.5 rounded-full ${
                            (poem.status || 'published') === 'published'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}>
                            {poem.status || 'published'}
                          </span>
                          <span className="text-xs text-stone-400 font-semibold">{poem.year}</span>
                          {poem.featured && (
                            <span className="text-[10px] bg-[#E88D4D]/15 text-[#E88D4D] px-2 py-0.5 rounded font-bold border border-[#E88D4D]/30">
                              Featured
                            </span>
                          )}
                        </div>
                        <h3 className="font-serif text-xl font-bold text-[#1A1A1A]">
                          {poem.title}
                        </h3>
                        <p className="text-xs text-stone-600 line-clamp-1 italic">
                          "{poem.excerpt}"
                        </p>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {poem.tags.map(t => (
                            <span key={t} className="text-[10px] bg-[#FAF5ED] text-stone-600 px-2 py-0.5 rounded font-medium border border-[#E8DFD0]">
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
                            className="p-2 rounded-lg text-stone-600 hover:text-[#C83C2E] hover:bg-[#C83C2E]/10 border border-[#E8DFD0] transition-colors cursor-pointer"
                            title="Preview poem reader modal"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        )}

                        <button
                          onClick={() => handleTogglePoemStatus(poem)}
                          className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
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
                          className="px-3 py-1.5 rounded-lg bg-[#3A6EA5]/10 hover:bg-[#3A6EA5]/20 text-[#3A6EA5] border border-[#3A6EA5]/30 text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>

                        <button
                          onClick={() => setDeleteConfirmId(poem.id)}
                          className="p-2 rounded-lg text-rose-600 hover:bg-rose-50 border border-[#E8DFD0] transition-colors cursor-pointer"
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
              <div className="divide-y divide-[#E8DFD0]">
                {filteredArticles.length === 0 ? (
                  <div className="p-12 text-center text-stone-500 text-sm">
                    No articles found matching search query.
                  </div>
                ) : (
                  filteredArticles.map((article) => (
                    <div key={article.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#FAF5ED]/80 transition-colors">
                      <div className="space-y-1.5 max-w-2xl">
                        <div className="flex items-center gap-2">
                          <span className={`text-[11px] font-bold uppercase px-2 py-0.5 rounded-full ${
                            (article.status || 'published') === 'published'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}>
                            {article.status || 'published'}
                          </span>
                          <span className="text-[10px] uppercase font-bold text-[#3A6EA5] bg-[#3A6EA5]/10 px-2 py-0.5 rounded border border-[#3A6EA5]/20">
                            {article.type}
                          </span>
                          <span className="text-xs text-stone-400 font-semibold">{article.date}</span>
                        </div>
                        <h3 className="font-serif text-xl font-bold text-[#1A1A1A]">
                          {article.title}
                        </h3>
                        <p className="text-xs text-stone-600 line-clamp-1">
                          {article.excerpt}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleToggleArticleStatus(article)}
                          className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                            article.status === 'published'
                              ? 'border-amber-200 text-amber-700 hover:bg-amber-50'
                              : 'border-emerald-200 text-emerald-700 hover:bg-emerald-50'
                          }`}
                        >
                          {article.status === 'published' ? 'Unpublish' : 'Publish'}
                        </button>

                        <button
                          onClick={() => { setEditingItem(article); setIsCreatingNew(false); }}
                          className="px-3 py-1.5 rounded-lg bg-[#3A6EA5]/10 hover:bg-[#3A6EA5]/20 text-[#3A6EA5] border border-[#3A6EA5]/30 text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>

                        <button
                          onClick={() => setDeleteConfirmId(article.id)}
                          className="p-2 rounded-lg text-rose-600 hover:bg-rose-50 border border-[#E8DFD0] transition-colors cursor-pointer"
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
                {/* Channel banner and quick actions */}
                <div className="p-4 rounded-xl bg-[#1A1A1A] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-[#2A2A2A]">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#E88D4D]">
                      <Youtube className="w-4 h-4 text-[#C83C2E] fill-[#C83C2E]" />
                      <span>YouTube Channel Integration (@one_jar_poetry)</span>
                    </div>
                    <p className="text-xs text-stone-300">
                      Sync from <a href="https://www.youtube.com/@one_jar_poetry" target="_blank" rel="noopener noreferrer" className="text-[#FAF5ED] underline font-semibold">@one_jar_poetry</a> or add any live performance link with 1-click metadata detection.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={async () => {
                        const { syncYouTubeChannelVideos } = await import('../lib/youtubeChannelService');
                        const result = await syncYouTubeChannelVideos();
                        setVideos(result.videos);
                        showToast(result.message);
                      }}
                      className="px-3.5 py-2 rounded-lg bg-[#2A2A2A] hover:bg-[#333333] border border-[#3A3A3A] text-stone-200 text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Sync Channel</span>
                    </button>

                    <button
                      onClick={handleCreateVideo}
                      className="px-3.5 py-2 rounded-lg bg-[#C83C2E] hover:bg-[#B03225] text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Video</span>
                    </button>
                  </div>
                </div>

                {filteredVideos.length === 0 ? (
                  <div className="p-12 text-center bg-white rounded-xl border border-[#E8DFD0] space-y-4">
                    <div className="w-12 h-12 rounded-full bg-[#FAF5ED] text-stone-400 mx-auto flex items-center justify-center border border-[#E8DFD0]">
                      <Youtube className="w-6 h-6 text-[#C83C2E]" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-serif text-lg font-bold text-[#1A1A1A]">No performance videos found</h4>
                      <p className="text-xs text-stone-500 max-w-md mx-auto">
                        No videos match your active filter. Add a new stage performance or sync directly from the @one_jar_poetry channel.
                      </p>
                    </div>
                    <button
                      onClick={handleCreateVideo}
                      className="px-4 py-2 rounded-lg bg-[#C83C2E] hover:bg-[#B03225] text-white text-xs font-bold shadow-xs inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add First Video</span>
                    </button>
                  </div>
                ) : (
                  <div className="divide-y divide-[#E8DFD0] bg-white rounded-xl border border-[#E8DFD0] overflow-hidden">
                    {filteredVideos.map((video) => {
                      const linkedPoem = video.poemSlug ? poems.find(p => p.slug === video.poemSlug) : null;
                      const thumbUrl = video.thumbnailUrl || (video.youtubeId ? `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg` : '/images/wanja_bw_stage.jpg');

                      return (
                        <div key={video.id} className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#FAF5ED]/60 transition-colors">
                          <div className="flex flex-col sm:flex-row items-start gap-4">
                            {/* 16:9 Thumbnail with direct watch trigger */}
                            <div 
                              onClick={() => onPreviewVideo && onPreviewVideo(video)}
                              className="relative w-full sm:w-40 sm:h-24 aspect-video sm:aspect-auto rounded-lg overflow-hidden bg-stone-900 border border-[#E8DFD0] shrink-0 group cursor-pointer"
                              title="Click to preview video playback"
                            >
                              <img
                                src={thumbUrl}
                                alt={video.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = '/images/wanja_bw_stage.jpg';
                                }}
                              />
                              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 flex items-center justify-center transition-colors">
                                <div className="w-8 h-8 rounded-full bg-[#C83C2E] text-white flex items-center justify-center shadow-md">
                                  <Play className="w-4 h-4 ml-0.5 fill-current" />
                                </div>
                              </div>
                              <span className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/80 text-white rounded text-[10px] font-mono">
                                {video.duration}
                              </span>
                            </div>

                            {/* Video Details */}
                            <div className="space-y-1.5">
                              <div className="flex flex-wrap items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => handleToggleVideoStatus(video)}
                                  className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full cursor-pointer transition-all ${
                                    (video.status || 'published') === 'published'
                                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                                      : 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100'
                                  }`}
                                  title="Click to toggle between published and draft"
                                >
                                  {(video.status || 'published') === 'published' ? '✓ Published' : '✎ Draft'}
                                </button>
                                
                                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#3A6EA5]/15 text-[#3A6EA5]">
                                  {video.category ? video.category.replace('_', ' ') : 'Spoken Word'}
                                </span>

                                <span className="text-xs text-stone-600 font-semibold flex items-center gap-1">
                                  <MapPin className="w-3 h-3 text-stone-400" />
                                  <span>{video.event}</span>
                                </span>

                                <span className="text-xs text-stone-400">· {video.date}</span>
                              </div>

                              <h3 className="font-serif text-lg font-bold text-[#1A1A1A] hover:text-[#C83C2E] transition-colors cursor-pointer"
                                onClick={() => handleEditVideo(video)}
                              >
                                {video.title}
                              </h3>

                              <p className="text-xs text-stone-600 line-clamp-1 max-w-xl">
                                {video.description}
                              </p>

                              {/* Connections pills */}
                              <div className="flex flex-wrap items-center gap-2 pt-0.5">
                                {linkedPoem && (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#FAF5ED] text-[#E88D4D] border border-[#E8DFD0] text-[10px] font-semibold">
                                    <BookOpen className="w-3 h-3" />
                                    <span>Poem: "{linkedPoem.title}"</span>
                                  </span>
                                )}
                                {video.transcript && (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-stone-100 text-stone-600 text-[10px] font-mono">
                                    <FileText className="w-3 h-3" />
                                    <span>Lyrics Attached</span>
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center gap-2 shrink-0 self-end md:self-center pt-2 md:pt-0">
                            {onPreviewVideo && (
                              <button
                                onClick={() => onPreviewVideo(video)}
                                className="p-2 rounded-lg text-stone-600 hover:text-[#C83C2E] hover:bg-[#C83C2E]/10 border border-[#E8DFD0] transition-colors cursor-pointer"
                                title="Watch performance video"
                              >
                                <Play className="w-4 h-4" />
                              </button>
                            )}

                            {video.youtubeId && (
                              <a
                                href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg text-stone-600 hover:text-red-600 hover:bg-red-50 border border-[#E8DFD0] transition-colors cursor-pointer"
                                title="Open on YouTube"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            )}

                            <button
                              onClick={() => handleEditVideo(video)}
                              className="px-3 py-1.5 rounded-lg bg-[#3A6EA5]/10 hover:bg-[#3A6EA5]/20 text-[#3A6EA5] border border-[#3A6EA5]/30 text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              <span>Edit</span>
                            </button>

                            <button
                              onClick={() => setDeleteConfirmId(video.id)}
                              className="p-2 rounded-lg text-rose-600 hover:bg-rose-50 border border-[#E8DFD0] transition-colors cursor-pointer"
                              title="Delete video"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* SERVICES LIST */}
            {activeContentType === 'services' && (
              <div className="divide-y divide-[#E8DFD0]">
                {services.map((service) => (
                  <div key={service.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#FAF5ED]/80 transition-colors">
                    <div className="space-y-1.5 max-w-2xl">
                      <h3 className="font-serif text-xl font-bold text-[#1A1A1A]">
                        {service.title}
                      </h3>
                      <p className="text-xs text-stone-600">
                        {service.tagline}
                      </p>
                      <div className="text-[11px] text-[#3A6EA5] font-bold">
                        Audience: {service.targetAudience} · Lead Time: {service.typicalLeadTime}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => { setEditingItem(service); setIsCreatingNew(false); }}
                        className="px-3 py-1.5 rounded-lg bg-[#3A6EA5]/10 hover:bg-[#3A6EA5]/20 text-[#3A6EA5] border border-[#3A6EA5]/30 text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => setDeleteConfirmId(service.id)}
                        className="p-2 rounded-lg text-rose-600 hover:bg-rose-50 border border-[#E8DFD0] transition-colors cursor-pointer"
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
              <div className="divide-y divide-[#E8DFD0]">
                {achievements.map((ach) => (
                  <div key={ach.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#FAF5ED]/80 transition-colors">
                    <div className="space-y-1.5 max-w-2xl">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#3A6EA5] bg-[#3A6EA5]/10 px-2 py-0.5 rounded border border-[#3A6EA5]/20">
                          {ach.category}
                        </span>
                        <span className="text-xs text-stone-400 font-bold">{ach.year}</span>
                        {ach.highlight && (
                          <span className="text-[10px] bg-[#E88D4D]/15 text-[#E88D4D] px-2 py-0.5 rounded font-bold border border-[#E88D4D]/30">
                            Highlight
                          </span>
                        )}
                      </div>
                      <h3 className="font-serif text-lg font-bold text-[#1A1A1A]">
                        {ach.title} — <span className="font-sans text-stone-600 font-medium text-sm">{ach.organization}</span>
                      </h3>
                      <p className="text-xs text-stone-600">
                        {ach.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => { setEditingItem(ach); setIsCreatingNew(false); }}
                        className="px-3 py-1.5 rounded-lg bg-[#3A6EA5]/10 hover:bg-[#3A6EA5]/20 text-[#3A6EA5] border border-[#3A6EA5]/30 text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => setDeleteConfirmId(ach.id)}
                        className="p-2 rounded-lg text-rose-600 hover:bg-rose-50 border border-[#E8DFD0] transition-colors cursor-pointer"
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
        <form onSubmit={handleSaveSettings} className="p-8 rounded-2xl bg-white border border-[#E8DFD0] shadow-xs space-y-6">
          <div className="border-b border-[#E8DFD0] pb-4">
            <h2 className="font-serif text-2xl font-bold text-[#1A1A1A]">
              Global Site Configuration
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Modify top bar announcements, website title, and hero section marketing copy.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-2">
                Brand Site Name
              </label>
              <input
                type="text"
                value={siteSettings.siteName}
                onChange={(e) => setSiteSettings({ ...siteSettings, siteName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#FAF5ED] border border-[#E8DFD0] text-xs text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#C83C2E]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-2">
                Brand Tagline
              </label>
              <input
                type="text"
                value={siteSettings.siteTagline}
                onChange={(e) => setSiteSettings({ ...siteSettings, siteTagline: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#FAF5ED] border border-[#E8DFD0] text-xs text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#C83C2E]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-2">
              Homepage Hero Main Headline
            </label>
            <input
              type="text"
              value={siteSettings.heroHeadline}
              onChange={(e) => setSiteSettings({ ...siteSettings, heroHeadline: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#FAF5ED] border border-[#E8DFD0] text-xs text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#C83C2E] font-serif font-bold text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-2">
              Homepage Subhead Paragraph
            </label>
            <textarea
              rows={2}
              value={siteSettings.heroSubhead}
              onChange={(e) => setSiteSettings({ ...siteSettings, heroSubhead: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#FAF5ED] border border-[#E8DFD0] text-xs text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#C83C2E]"
            />
          </div>

          <div className="p-4 rounded-xl bg-[#FAF5ED] border border-[#E8DFD0] space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#1A1A1A] uppercase block">
                  Top Announcement Banner
                </span>
                <span className="text-xs text-stone-500">
                  Highlight tour dates, bookings, or new publication updates.
                </span>
              </div>
              <input
                type="checkbox"
                checked={siteSettings.announcementActive}
                onChange={(e) => setSiteSettings({ ...siteSettings, announcementActive: e.target.checked })}
                className="w-4 h-4 text-[#C83C2E] rounded accent-[#C83C2E]"
              />
            </div>

            {siteSettings.announcementActive && (
              <input
                type="text"
                value={siteSettings.announcementBanner || ''}
                onChange={(e) => setSiteSettings({ ...siteSettings, announcementBanner: e.target.value })}
                className="w-full px-3.5 py-2 rounded-lg bg-white border border-[#E8DFD0] text-xs text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#C83C2E]"
                placeholder="Enter banner text..."
              />
            )}
          </div>

          <div className="flex justify-end pt-4 border-t border-[#E8DFD0]">
            <button
              type="submit"
              className="px-6 py-3 rounded-lg bg-[#C83C2E] hover:bg-[#B03225] text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Save Site Configuration</span>
            </button>
          </div>
        </form>
      )}

      {/* TEAM & RBAC MANAGEMENT WORKSPACE */}
      {activeContentType === 'team' && admin && (
        <UserManagementView currentAdmin={admin} onToast={showToast} />
      )}

      {/* ---------------- EDIT MODAL / DRAWER FOR POEM ---------------- */}
      {editingItem && activeContentType === 'poems' && (
        <div className="fixed inset-0 z-50 bg-[#1A1A1A]/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <form 
            onSubmit={handleSavePoem} 
            className="bg-[#FFFBF5] max-w-3xl w-full rounded-2xl shadow-2xl border border-[#E8DFD0] overflow-hidden my-8 max-h-[90vh] flex flex-col"
          >
            <div className="p-6 bg-[#1A1A1A] text-[#FFFBF5] flex items-center justify-between border-b border-[#2A2A2A]">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#E88D4D]" />
                <h3 className="font-serif text-xl font-bold">
                  {isCreatingNew ? 'Create New One-Jar Poem' : `Edit Poem: ${editingItem.title}`}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="text-stone-400 hover:text-white p-1 rounded-full cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs bg-[#FAF5ED] flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#1A1A1A] mb-1">Poem Title *</label>
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
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#E8DFD0] text-[#1A1A1A] font-serif font-bold text-sm focus:outline-none focus:ring-2 focus:ring-[#C83C2E]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#1A1A1A] mb-1">URL Slug</label>
                  <input
                    type="text"
                    value={editingItem.slug}
                    onChange={(e) => setEditingItem({ ...editingItem, slug: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#E8DFD0] text-[#1A1A1A] font-mono text-xs focus:outline-none focus:ring-2 focus:ring-[#C83C2E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-[#1A1A1A] mb-1">Year</label>
                  <input
                    type="text"
                    value={editingItem.year}
                    onChange={(e) => setEditingItem({ ...editingItem, year: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#E8DFD0] text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#C83C2E]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#1A1A1A] mb-1">Status</label>
                  <select
                    value={editingItem.status || 'published'}
                    onChange={(e) => setEditingItem({ ...editingItem, status: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#E8DFD0] text-[#1A1A1A] font-semibold focus:outline-none focus:ring-2 focus:ring-[#C83C2E]"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#1A1A1A] mb-1">Featured on Homepage?</label>
                  <select
                    value={editingItem.featured ? 'true' : 'false'}
                    onChange={(e) => setEditingItem({ ...editingItem, featured: e.target.value === 'true' })}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#E8DFD0] text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#C83C2E]"
                  >
                    <option value="true">Yes (Featured)</option>
                    <option value="false">No</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#1A1A1A] mb-1">Poem Excerpt (Summary)</label>
                <textarea
                  rows={2}
                  value={editingItem.excerpt}
                  onChange={(e) => setEditingItem({ ...editingItem, excerpt: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#E8DFD0] text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#C83C2E]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#1A1A1A] mb-1">
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
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#E8DFD0] text-[#1A1A1A] font-serif leading-relaxed text-sm focus:outline-none focus:ring-2 focus:ring-[#C83C2E]"
                  placeholder="Stanza 1 line 1...&#10;Stanza 1 line 2...&#10;&#10;Stanza 2 line 1..."
                />
              </div>

              <div>
                <label className="block font-bold text-[#1A1A1A] mb-1">The Excavation Story (Context)</label>
                <textarea
                  rows={3}
                  value={editingItem.context}
                  onChange={(e) => setEditingItem({ ...editingItem, context: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#E8DFD0] text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#C83C2E]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#1A1A1A] mb-1">Tags (Comma separated)</label>
                <input
                  type="text"
                  value={editingItem.tags.join(', ')}
                  onChange={(e) => {
                    const tags = e.target.value.split(',').map(t => t.trim()).filter(Boolean);
                    setEditingItem({ ...editingItem, tags });
                  }}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#E8DFD0] text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#C83C2E]"
                />
              </div>
            </div>

            <div className="p-4 bg-white border-t border-[#E8DFD0] flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="px-4 py-2 rounded-lg border border-[#E8DFD0] text-stone-600 font-semibold cursor-pointer hover:bg-stone-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-lg bg-[#C83C2E] hover:bg-[#B03225] text-white font-bold shadow-xs cursor-pointer"
              >
                Save Poem
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ---------------- EDIT MODAL FOR ARTICLE ---------------- */}
      {editingItem && activeContentType === 'articles' && (
        <div className="fixed inset-0 z-50 bg-[#1A1A1A]/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <form 
            onSubmit={handleSaveArticle} 
            className="bg-[#FFFBF5] max-w-3xl w-full rounded-2xl shadow-2xl border border-[#E8DFD0] overflow-hidden my-8 max-h-[90vh] flex flex-col"
          >
            <div className="p-6 bg-[#1A1A1A] text-[#FFFBF5] flex items-center justify-between border-b border-[#2A2A2A]">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#E88D4D]" />
                <h3 className="font-serif text-xl font-bold">
                  {isCreatingNew ? 'Create New Article' : `Edit Article: ${editingItem.title}`}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="text-stone-400 hover:text-white p-1 rounded-full cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs bg-[#FAF5ED] flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#1A1A1A] mb-1">Article Title *</label>
                  <input
                    type="text"
                    required
                    value={editingItem.title}
                    onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#E8DFD0] text-[#1A1A1A] font-serif font-bold text-sm focus:outline-none focus:ring-2 focus:ring-[#C83C2E]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#1A1A1A] mb-1">Type</label>
                  <select
                    value={editingItem.type}
                    onChange={(e) => setEditingItem({ ...editingItem, type: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#E8DFD0] text-[#1A1A1A] font-semibold focus:outline-none focus:ring-2 focus:ring-[#C83C2E]"
                  >
                    <option value="blog">Essay / Blog Post</option>
                    <option value="review">Literary Review</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#1A1A1A] mb-1">Excerpt</label>
                <textarea
                  rows={2}
                  value={editingItem.excerpt}
                  onChange={(e) => setEditingItem({ ...editingItem, excerpt: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#E8DFD0] text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#C83C2E]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#1A1A1A] mb-1">
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
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#E8DFD0] text-[#1A1A1A] leading-relaxed text-xs focus:outline-none focus:ring-2 focus:ring-[#C83C2E]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#1A1A1A] mb-1">Read Time</label>
                  <input
                    type="text"
                    value={editingItem.readTime}
                    onChange={(e) => setEditingItem({ ...editingItem, readTime: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#E8DFD0] text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#C83C2E]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#1A1A1A] mb-1">Tags (Comma separated)</label>
                  <input
                    type="text"
                    value={editingItem.tags.join(', ')}
                    onChange={(e) => {
                      const tags = e.target.value.split(',').map(t => t.trim()).filter(Boolean);
                      setEditingItem({ ...editingItem, tags });
                    }}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#E8DFD0] text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#C83C2E]"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 bg-white border-t border-[#E8DFD0] flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="px-4 py-2 rounded-lg border border-[#E8DFD0] text-stone-600 font-semibold cursor-pointer hover:bg-stone-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-lg bg-[#C83C2E] hover:bg-[#B03225] text-white font-bold shadow-xs cursor-pointer"
              >
                Save Article
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ---------------- EDIT MODAL FOR SERVICE / ACHIEVEMENT ---------------- */}
      {editingItem && (activeContentType === 'services' || activeContentType === 'achievements') && (
        <div className="fixed inset-0 z-50 bg-[#1A1A1A]/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <form 
            onSubmit={(e) => {
              if (activeContentType === 'services') handleSaveService(e);
              if (activeContentType === 'achievements') handleSaveAchievement(e);
            }} 
            className="bg-[#FFFBF5] max-w-2xl w-full rounded-2xl shadow-2xl border border-[#E8DFD0] overflow-hidden my-8"
          >
            <div className="p-6 bg-[#1A1A1A] text-[#FFFBF5] flex items-center justify-between border-b border-[#2A2A2A]">
              <h3 className="font-serif text-xl font-bold">
                Edit {activeContentType.slice(0, -1).toUpperCase()}
              </h3>
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="text-stone-400 hover:text-white p-1 cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs bg-[#FAF5ED]">
              <div>
                <label className="block font-bold text-[#1A1A1A] mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#E8DFD0] text-[#1A1A1A] font-bold focus:outline-none focus:ring-2 focus:ring-[#C83C2E]"
                />
              </div>

              {activeContentType === 'services' && (
                <>
                  <div>
                    <label className="block font-bold text-[#1A1A1A] mb-1">Tagline</label>
                    <input
                      type="text"
                      value={editingItem.tagline}
                      onChange={(e) => setEditingItem({ ...editingItem, tagline: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-[#E8DFD0] text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#C83C2E]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[#1A1A1A] mb-1">Description</label>
                    <textarea
                      rows={3}
                      value={editingItem.description}
                      onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-[#E8DFD0] text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#C83C2E]"
                    />
                  </div>
                </>
              )}

              {activeContentType === 'achievements' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-[#1A1A1A] mb-1">Organization</label>
                      <input
                        type="text"
                        value={editingItem.organization}
                        onChange={(e) => setEditingItem({ ...editingItem, organization: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-white border border-[#E8DFD0] text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#C83C2E]"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-[#1A1A1A] mb-1">Year</label>
                      <input
                        type="text"
                        value={editingItem.year}
                        onChange={(e) => setEditingItem({ ...editingItem, year: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-white border border-[#E8DFD0] text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#C83C2E]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-bold text-[#1A1A1A] mb-1">Description</label>
                    <textarea
                      rows={3}
                      value={editingItem.description}
                      onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-[#E8DFD0] text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#C83C2E]"
                    />
                  </div>
                </>
              )}
            </div>

            <div className="p-4 bg-white border-t border-[#E8DFD0] flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="px-4 py-2 rounded-lg border border-[#E8DFD0] text-stone-600 font-semibold cursor-pointer hover:bg-stone-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-lg bg-[#C83C2E] hover:bg-[#B03225] text-white font-bold shadow-xs cursor-pointer"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-[#1A1A1A]/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FFFBF5] max-w-md w-full rounded-2xl p-6 shadow-2xl border border-[#E8DFD0] space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#1A1A1A]">
              Confirm Item Deletion
            </h3>
            <p className="text-xs text-stone-600">
              Are you sure you want to delete this item? This action will immediately remove it from the live site view.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-lg border border-[#E8DFD0] text-xs font-semibold text-stone-700 hover:bg-stone-100 cursor-pointer"
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
                className="px-4 py-2 rounded-lg bg-[#C83C2E] hover:bg-[#B03225] text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                Yes, Delete Item
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DEDICATED PERFORMANCE VIDEO EDITOR MODAL */}
      <VideoEditorModal
        video={editingVideo}
        isOpen={videoModalOpen}
        isNew={isVideoCreatingNew}
        poems={poems}
        onClose={() => {
          setVideoModalOpen(false);
          setEditingVideo(null);
        }}
        onSave={handleSaveVideo}
      />

    </div>
  );
};
