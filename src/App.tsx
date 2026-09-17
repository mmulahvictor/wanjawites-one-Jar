import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Poem, VideoItem, Article } from './types';
import { getPoems, getVideos, getArticles, CMS_UPDATE_EVENT } from './lib/cmsStore';
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

  useEffect(() => {
    const handleCmsUpdate = () => {
      setPoems(getPoems());
      setVideos(getVideos());
      setArticles(getArticles());
    };
    window.addEventListener(CMS_UPDATE_EVENT, handleCmsUpdate);
    return () => window.removeEventListener(CMS_UPDATE_EVENT, handleCmsUpdate);
  }, []);

  // Scroll to top on navigation
  useEffect(() => {
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

  const handleOpenBooking = (serviceId?: string) => {
    setPreselectedServiceId(serviceId);
    setBookingModalOpen(true);
  };

  const handleOpenPoem = (poem: Poem) => {
    navigate(`/poetry/${poem.slug}`);
  };

  const handleClosePoem = () => {
    navigate('/poetry');
  };

  const handleOpenVideo = (video: VideoItem) => {
    navigate(`/videos/${video.id}`);
  };

  const handleCloseVideo = () => {
    navigate('/videos');
  };

  const handleOpenPoemBySlug = (slug: string) => {
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

  return (
    <div className="min-h-screen bg-[#FFFBF5] text-[#1A1A1A] flex flex-col font-sans selection:bg-[#E88D4D]/30 selection:text-[#1A1A1A]">
      
      {/* Top WCAG Accessibility Bar & Skip Link */}
      <AccessibilityToolbar />

      {/* Main Navigation Bar */}
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      {/* Main Content View with React Router */}
      <main id="main-content-region" tabIndex={-1} role="main" className="flex-1 pt-6 focus:outline-none">
        <Routes>
          {/* 1. Home Route */}
          <Route
            path="/"
            element={
              <HomeSection
                poems={poems}
                videos={videos}
                articles={articles}
                setActiveTab={handleNavigateTab as any}
                onOpenPoem={handleOpenPoem}
                onOpenVideo={handleOpenVideo}
                onOpenBooking={() => handleOpenBooking()}
                onOpenArticle={() => navigate('/writing')}
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
            element={<AboutSection onOpenBooking={() => handleOpenBooking()} />}
          />

          {/* 5. Services / Work With Wanja Routes */}
          <Route
            path="/services"
            element={
              <WorkWithWanjaSection
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
          navigate(`/writing/${slug}`);
        }}
        onNavigateToVideo={(videoId) => {
          navigate(`/videos/${videoId}`);
        }}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Video Player Modal (Driven by /videos/:videoId or state) */}
      <VideoPlayerModal
        video={selectedVideo}
        onClose={handleCloseVideo}
        onOpenBooking={() => handleOpenBooking()}
        onOpenPoem={(poemSlug) => navigate(`/poetry/${poemSlug}`)}
      />

      {/* Booking Request Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        preselectedServiceId={preselectedServiceId}
      />

    </div>
  );
}
