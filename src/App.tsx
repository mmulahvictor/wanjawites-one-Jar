import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Poem, VideoItem, Article, Service, Achievement, SiteSettings } from './types';
import { 
  getPoems, 
  getVideos, 
  getArticles, 
  getServices, 
  getAchievements, 
  getSiteSettings, 
  CMS_UPDATE_EVENT 
} from './lib/cmsStore';
import { usePageSeo } from './lib/usePageSeo';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AccessibilityToolbar } from './components/AccessibilityToolbar';
import { HomeSection } from './components/HomeSection';
import { PoetrySection } from './components/PoetrySection';
import { WritingSection } from './components/WritingSection';
import { AboutSection } from './components/AboutSection';
import { WorkWithWanjaSection } from './components/WorkWithWanjaSection';
import { VideosSection } from './components/VideosSection';
import { ContactSection } from './components/ContactSection';
import { StyleGuideSection } from './components/StyleGuideSection';
import { AdminPortalRoute } from './components/AdminPortalRoute';
import { NotFoundSection } from './components/NotFoundSection';
import { PoemDetailModal } from './components/PoemDetailModal';
import { VideoPlayerModal } from './components/VideoPlayerModal';
import { BookingModal } from './components/BookingModal';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  // Dynamic SEO & Search Engine indexing control (noindex for admin routes)
  usePageSeo();

  const [bookingModalOpen, setBookingModalOpen] = useState<boolean>(false);
  const [preselectedServiceId, setPreselectedServiceId] = useState<string | undefined>(undefined);

  // Dynamic CMS state
  const [poems, setPoems] = useState<Poem[]>(getPoems());
  const [videos, setVideos] = useState<VideoItem[]>(getVideos());
  const [articles, setArticles] = useState<Article[]>(getArticles());
  const [services, setServices] = useState<Service[]>(getServices());
  const [achievements, setAchievements] = useState<Achievement[]>(getAchievements());
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(getSiteSettings());

  useEffect(() => {
    const handleCmsUpdate = () => {
      setPoems(getPoems());
      setVideos(getVideos());
      setArticles(getArticles());
      setServices(getServices());
      setAchievements(getAchievements());
      setSiteSettings(getSiteSettings());
    };
    window.addEventListener(CMS_UPDATE_EVENT, handleCmsUpdate);
    return () => window.removeEventListener(CMS_UPDATE_EVENT, handleCmsUpdate);
  }, []);

  // Scroll to top ONLY on top-level section navigation (avoid jumping when opening/closing modal sub-routes)
  const prevPathnameRef = useRef<string>(location.pathname);
  useEffect(() => {
    const prev = prevPathnameRef.current;
    const curr = location.pathname;
    prevPathnameRef.current = curr;

    const getBaseSection = (p: string) => {
      if (p.startsWith('/poetry')) return '/poetry';
      if (p.startsWith('/videos')) return '/videos';
      if (p.startsWith('/writing')) return '/writing';
      return p;
    };

    const isModalDetailRoute = (p: string) =>
      /^\/poetry\/[^/]+$/.test(p) ||
      /^\/videos\/[^/]+$/.test(p) ||
      /^\/writing\/[^/]+$/.test(p);

    // Do not scroll to top if opening a modal detail route or closing back to the same base section
    if (isModalDetailRoute(curr) || (isModalDetailRoute(prev) && getBaseSection(prev) === getBaseSection(curr))) {
      return;
    }

    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [location.pathname]);

  // Handle Poem deep linking via /poetry/:slug
  const poemSlugMatch = location.pathname.match(/^\/poetry\/([^/]+)$/);
  const currentPoemSlug = poemSlugMatch ? poemSlugMatch[1] : null;
  const selectedPoem = currentPoemSlug ? (poems.find((p) => p.slug === currentPoemSlug) || null) : null;

  // Handle Video deep linking via /videos/:videoId
  const videoIdMatch = location.pathname.match(/^\/videos\/([^/]+)$/);
  const currentVideoId = videoIdMatch ? videoIdMatch[1] : null;
  const selectedVideo = currentVideoId ? (videos.find((v) => v.id === currentVideoId) || null) : null;

  const [poemReturnPath, setPoemReturnPath] = useState<string | null>(null);
  const [videoReturnPath, setVideoReturnPath] = useState<string | null>(null);

  const handleOpenBooking = (serviceId?: string) => {
    setPreselectedServiceId(serviceId);
    setBookingModalOpen(true);
  };

  const handleOpenPoem = (poem: Poem) => {
    if (!location.pathname.startsWith('/poetry')) {
      setPoemReturnPath(location.pathname);
    }
    navigate(`/poetry/${poem.slug}`);
  };

  const handleClosePoem = () => {
    if (poemReturnPath) {
      const prev = poemReturnPath;
      setPoemReturnPath(null);
      navigate(prev);
    } else {
      navigate('/poetry');
    }
  };

  const handleOpenVideo = (video: VideoItem) => {
    if (!location.pathname.startsWith('/videos')) {
      setVideoReturnPath(location.pathname);
    }
    navigate(`/videos/${video.id}`);
  };

  const handleCloseVideo = () => {
    if (videoReturnPath) {
      const prev = videoReturnPath;
      setVideoReturnPath(null);
      navigate(prev);
    } else {
      navigate('/videos');
    }
  };

  const handleOpenPoemBySlug = (slug: string) => {
    if (!location.pathname.startsWith('/poetry')) {
      setPoemReturnPath(location.pathname);
    }
    navigate(`/poetry/${slug}`);
  };

  // Helper to find related items for poem detail modal
  const getRelatedVideo = (poem: Poem | null): VideoItem | undefined => {
    if (!poem) return undefined;
    return videos.find((v) => v.poemSlug === poem.slug || v.youtubeId === poem.youtubeId);
  };

  const getRelatedArticle = (poem: Poem | null): Article | undefined => {
    if (!poem) return undefined;
    return articles.find((a) => a.slug === poem.relatedWritingSlug || a.relatedPoemSlug === poem.slug);
  };

  // Adapter for legacy tab callbacks from child sections
  const handleNavigateTab = (tab: string) => {
    if (tab === 'home') navigate('/');
    else if (tab === 'poetry') navigate('/poetry');
    else if (tab === 'writing') navigate('/writing');
    else if (tab === 'about') navigate('/about');
    else if (tab === 'work-with-wanja') navigate('/services');
    else if (tab === 'videos') navigate('/videos');
    else if (tab === 'contact') navigate('/contact');
    else if (tab === 'style-guide') navigate('/style-guide');
    else if (tab === 'cms') navigate('/admin');
  };

  const isPublicRoute = !location.pathname.startsWith('/admin') && !location.pathname.startsWith('/cms') && !location.pathname.startsWith('/studio');

  return (
    <div className="min-h-screen bg-[#FFF6EC] text-[#3A1208] flex flex-col font-sans selection:bg-[#D81B7A]/30 selection:text-[#3A1208]">
      
      {/* Top WCAG Accessibility Bar & Skip Link */}
      <AccessibilityToolbar />

      {/* Dynamic CMS Global Announcement Banner */}
      {isPublicRoute && siteSettings.announcementActive && siteSettings.announcementBanner && (
        <div className="bg-[#D81B7A] text-white text-xs py-2 px-4 border-b border-[#D81B7A]/30 print:hidden">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-200 shrink-0" />
              <span>{siteSettings.announcementBanner}</span>
            </div>
            <button
              onClick={() => handleOpenBooking()}
              className="text-[11px] font-bold underline hover:text-amber-100 flex items-center gap-1 cursor-pointer shrink-0"
            >
              <span>Inquire Now</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* Main Navigation Bar */}
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      {/* Main Content View with React Router */}
      <main id="main-content-region" tabIndex={-1} role="main" className="flex-1 focus:outline-none">
        <Routes>
          {/* 1. Home Route */}
          <Route
            path="/"
            element={
              <HomeSection
                poems={poems}
                videos={videos}
                articles={articles}
                services={services}
                achievements={achievements}
                siteSettings={siteSettings}
                setActiveTab={handleNavigateTab as any}
                onOpenPoem={handleOpenPoem}
                onOpenVideo={handleOpenVideo}
                onOpenBooking={(serviceId) => handleOpenBooking(serviceId)}
                onOpenArticle={(article) => navigate(`/writing/${article.slug}`)}
              />
            }
          />

          {/* 2. Poetry Routes (List and direct poem slug) */}
          <Route
            path="/poetry"
            element={
              <PoetrySection
                poems={poems}
                videos={videos}
                onOpenPoem={handleOpenPoem}
                onOpenVideo={handleOpenVideo}
                onOpenBooking={() => handleOpenBooking()}
              />
            }
          />
          <Route
            path="/poetry/:slug"
            element={
              <PoetrySection
                poems={poems}
                videos={videos}
                onOpenPoem={handleOpenPoem}
                onOpenVideo={handleOpenVideo}
                onOpenBooking={() => handleOpenBooking()}
              />
            }
          />

          {/* 3. Writing / Essays / Reviews Routes */}
          <Route
            path="/writing"
            element={
              <WritingSection
                articles={articles}
                onOpenPoemBySlug={handleOpenPoemBySlug}
                onOpenBooking={() => handleOpenBooking()}
              />
            }
          />
          <Route
            path="/writing/:slug"
            element={
              <WritingSection
                articles={articles}
                onOpenPoemBySlug={handleOpenPoemBySlug}
                onOpenBooking={() => handleOpenBooking()}
              />
            }
          />

          {/* 4. About & EPK Route */}
          <Route
            path="/about"
            element={
              <AboutSection
                achievements={achievements}
                onOpenBooking={() => handleOpenBooking()}
              />
            }
          />
          <Route path="/epk" element={<Navigate to="/about" replace />} />

          {/* 5. Services / Work With Wanja Routes */}
          <Route
            path="/services"
            element={
              <WorkWithWanjaSection
                services={services}
                onOpenBookingWithService={(serviceId) => handleOpenBooking(serviceId)}
              />
            }
          />
          <Route path="/work-with-wanja" element={<Navigate to="/services" replace />} />

          {/* 6. Videos Routes */}
          <Route
            path="/videos"
            element={
              <VideosSection
                videos={videos}
                onOpenVideo={handleOpenVideo}
                onOpenBooking={() => handleOpenBooking()}
              />
            }
          />
          <Route
            path="/videos/:videoId"
            element={
              <VideosSection
                videos={videos}
                onOpenVideo={handleOpenVideo}
                onOpenBooking={() => handleOpenBooking()}
              />
            }
          />

          {/* 7. Contact & Booking Inquiries Route */}
          <Route
            path="/contact"
            element={<ContactSection onOpenBooking={() => handleOpenBooking()} />}
          />

          {/* 8. Design & Brand Style Guide Route */}
          <Route path="/style-guide" element={<StyleGuideSection />} />

          {/* 9. Privileged Administrative Studio (Hidden from guests & search engines) */}
          <Route
            path="/admin"
            element={
              <AdminPortalRoute
                onPreviewPoem={handleOpenPoem}
                onPreviewVideo={handleOpenVideo}
              />
            }
          />
          <Route path="/cms" element={<Navigate to="/admin" replace />} />
          <Route path="/studio" element={<Navigate to="/admin" replace />} />

          {/* 10. 404 Fallback */}
          <Route path="*" element={<NotFoundSection />} />
        </Routes>
      </main>

      {/* Footer (Admin link hidden from guests) */}
      <Footer onOpenBooking={() => handleOpenBooking()} />

      {/* Poem Detail Modal (Driven by /poetry/:slug or state) */}
      <PoemDetailModal
        poem={selectedPoem}
        onClose={handleClosePoem}
        relatedVideo={getRelatedVideo(selectedPoem)}
        relatedArticle={getRelatedArticle(selectedPoem)}
        onNavigateToWriting={(slug) => {
          setPoemReturnPath(null);
          navigate(`/writing/${slug}`);
        }}
        onNavigateToVideo={(videoId) => {
          setPoemReturnPath(null);
          navigate(`/videos/${videoId}`);
        }}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Video Player Modal (Driven by /videos/:videoId or state) */}
      <VideoPlayerModal
        video={selectedVideo}
        onClose={handleCloseVideo}
        onOpenBooking={() => handleOpenBooking()}
        onOpenPoem={(poemSlug) => {
          setVideoReturnPath(null);
          navigate(`/poetry/${poemSlug}`);
        }}
      />

      {/* Booking Request Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        preselectedServiceId={preselectedServiceId}
        services={services}
      />

    </div>
  );
}
