import { 
  Poem, 
  Article, 
  VideoItem, 
  Service, 
  Achievement, 
  SiteSettings, 
  AccessibilitySettings,
  BookingInquiry,
  InquiryStatus,
  NewsletterSubscriber
} from '../types';
import { POEMS, ARTICLES, VIDEOS, SERVICES, ACHIEVEMENTS } from '../data/mockData';

const STORAGE_KEYS = {
  POEMS: 'wanja_cms_poems_v2',
  ARTICLES: 'wanja_cms_articles_v2',
  VIDEOS: 'wanja_cms_videos_v2',
  SERVICES: 'wanja_cms_services_v2',
  ACHIEVEMENTS: 'wanja_cms_achievements_v2',
  INQUIRIES: 'wanja_cms_inquiries_v2',
  SUBSCRIBERS: 'wanja_cms_subscribers_v2',
  SETTINGS: 'wanja_cms_settings_v2',
  ACCESSIBILITY: 'wanja_a11y_settings_v1',
};

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  siteName: 'Wanja Writes',
  siteTagline: 'Poet · Writer · Communications Consultant · Filmmaker',
  heroHeadline: 'Wanja Writes',
  heroSubhead: 'Wanja Writes is the creative practice of a Kenyan poet, culture writer, communications consultant, and filmmaker. Working across words, images, and lived experiences, Wanja explores identity, memory, belonging, and the stories that shape us. Her work bridges artistic expression and cultural documentation, preserving voices and experiences that deserve to be remembered.',
  announcementBanner: '✨ "Are You Home?" Solo show recap live · Short film "Job Hunt" coming soon',
  announcementActive: false,
};

export const DEFAULT_INQUIRIES: BookingInquiry[] = [
  {
    id: 'inq_seed_1',
    referenceCode: 'WW-BOOK-842910',
    type: 'booking',
    status: 'confirmed',
    createdAt: '2026-09-15T10:30:00.000Z',
    fullName: 'Dr. Njeri Kamau',
    email: 'n.kamau@eastafricanlitfest.org',
    phone: '+254 722 109482',
    organization: 'East African Literary & Cultural Festival',
    serviceType: 's2',
    eventDate: '2026-11-14',
    location: 'Kenya National Theatre, Nairobi',
    budgetRange: '$1,000 - $3,000 / KES 100k-300k',
    message: 'We would love to invite Faith Wanja (One-Jar Poetry) to deliver the 30-minute opening night keynote recital on intergenerational memory and oral archives.'
  },
  {
    id: 'inq_seed_2',
    referenceCode: 'WW-MSG-519204',
    type: 'contact',
    status: 'pending',
    createdAt: '2026-09-28T14:15:00.000Z',
    fullName: 'David Ochieng',
    email: 'dochieng@barazamedia.ke',
    inquiryType: 'Media / Interview Request',
    subject: 'Feature Profile on One-Jar Poetry & Kitale Film Week',
    message: 'Hello Faith, we are preparing a cultural dispatch profiling contemporary Kenyan spoken-word documentarians and would love to schedule a 20-minute interview.'
  }
];

export const DEFAULT_A11Y_SETTINGS: AccessibilitySettings = {
  fontSize: 'normal',
  highContrast: false,
  reducedMotion: false,
  lineSpacing: 'normal',
};

// Custom event for cross-component reactive updates
export const CMS_UPDATE_EVENT = 'wanja_cms_updated';
export const A11Y_UPDATE_EVENT = 'wanja_a11y_updated';

function notifyCmsUpdate() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(CMS_UPDATE_EVENT));
  }
}

function notifyA11yUpdate() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(A11Y_UPDATE_EVENT));
  }
}

// Helpers for localStorage
function getItem<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    return JSON.parse(raw) as T;
  } catch (err) {
    console.warn(`Error reading localStorage key ${key}:`, err);
    return fallback;
  }
}

function setItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error writing localStorage key ${key}:`, err);
  }
}

// ---------------- POEMS ----------------
export function getPoems(): Poem[] {
  const poems = getItem<Poem[]>(STORAGE_KEYS.POEMS, POEMS);
  return poems.map(p => ({ ...p, status: p.status || 'published' }));
}

export function savePoem(poem: Poem): Poem[] {
  const existing = getPoems();
  const index = existing.findIndex(p => p.id === poem.id);
  let updated: Poem[];
  if (index >= 0) {
    updated = [...existing];
    updated[index] = { ...poem, status: poem.status || 'published' };
  } else {
    updated = [{ ...poem, status: poem.status || 'published' }, ...existing];
  }
  setItem(STORAGE_KEYS.POEMS, updated);
  notifyCmsUpdate();
  return updated;
}

export function deletePoem(id: string): Poem[] {
  const existing = getPoems();
  const updated = existing.filter(p => p.id !== id);
  setItem(STORAGE_KEYS.POEMS, updated);
  notifyCmsUpdate();
  return updated;
}

// ---------------- ARTICLES ----------------
export function getArticles(): Article[] {
  const articles = getItem<Article[]>(STORAGE_KEYS.ARTICLES, ARTICLES);
  return articles.map(a => ({ ...a, status: a.status || 'published' }));
}

export function saveArticle(article: Article): Article[] {
  const existing = getArticles();
  const index = existing.findIndex(a => a.id === article.id);
  let updated: Article[];
  if (index >= 0) {
    updated = [...existing];
    updated[index] = { ...article, status: article.status || 'published' };
  } else {
    updated = [{ ...article, status: article.status || 'published' }, ...existing];
  }
  setItem(STORAGE_KEYS.ARTICLES, updated);
  notifyCmsUpdate();
  return updated;
}

export function deleteArticle(id: string): Article[] {
  const existing = getArticles();
  const updated = existing.filter(a => a.id !== id);
  setItem(STORAGE_KEYS.ARTICLES, updated);
  notifyCmsUpdate();
  return updated;
}

// ---------------- VIDEOS ----------------
export function getVideos(): VideoItem[] {
  const videos = getItem<VideoItem[]>(STORAGE_KEYS.VIDEOS, VIDEOS);
  // If stored videos contain legacy IDs from initial template, migrate to new channel videos
  const hasLegacy = videos.some(v => v.id === 'v1' || v.id === 'v2');
  if (hasLegacy) {
    const migrated = [...VIDEOS, ...videos.filter(v => v.id !== 'v1' && v.id !== 'v2' && v.id !== 'v3' && v.id !== 'v4')];
    setItem(STORAGE_KEYS.VIDEOS, migrated);
    return migrated.map(v => ({ ...v, status: v.status || 'published' }));
  }
  return videos.map(v => ({ ...v, status: v.status || 'published' }));
}

export function saveVideo(video: VideoItem): VideoItem[] {
  const existing = getVideos();
  const index = existing.findIndex(v => v.id === video.id);
  let updated: VideoItem[];
  if (index >= 0) {
    updated = [...existing];
    updated[index] = { ...video, status: video.status || 'published' };
  } else {
    updated = [{ ...video, status: video.status || 'published' }, ...existing];
  }
  setItem(STORAGE_KEYS.VIDEOS, updated);
  notifyCmsUpdate();
  return updated;
}

export function deleteVideo(id: string): VideoItem[] {
  const existing = getVideos();
  const updated = existing.filter(v => v.id !== id);
  setItem(STORAGE_KEYS.VIDEOS, updated);
  notifyCmsUpdate();
  return updated;
}

// ---------------- SERVICES ----------------
export function getServices(): Service[] {
  const services = getItem<Service[]>(STORAGE_KEYS.SERVICES, SERVICES);
  return services.map(s => ({ ...s, status: s.status || 'published' }));
}

export function saveService(service: Service): Service[] {
  const existing = getServices();
  const index = existing.findIndex(s => s.id === service.id);
  let updated: Service[];
  if (index >= 0) {
    updated = [...existing];
    updated[index] = { ...service, status: service.status || 'published' };
  } else {
    updated = [{ ...service, status: service.status || 'published' }, ...existing];
  }
  setItem(STORAGE_KEYS.SERVICES, updated);
  notifyCmsUpdate();
  return updated;
}

export function deleteService(id: string): Service[] {
  const existing = getServices();
  const updated = existing.filter(s => s.id !== id);
  setItem(STORAGE_KEYS.SERVICES, updated);
  notifyCmsUpdate();
  return updated;
}

// ---------------- ACHIEVEMENTS ----------------
export function getAchievements(): Achievement[] {
  const achs = getItem<Achievement[]>(STORAGE_KEYS.ACHIEVEMENTS, ACHIEVEMENTS);
  return achs.map(a => ({ ...a, status: a.status || 'published' }));
}

export function saveAchievement(achievement: Achievement): Achievement[] {
  const existing = getAchievements();
  const index = existing.findIndex(a => a.id === achievement.id);
  let updated: Achievement[];
  if (index >= 0) {
    updated = [...existing];
    updated[index] = { ...achievement, status: achievement.status || 'published' };
  } else {
    updated = [{ ...achievement, status: achievement.status || 'published' }, ...existing];
  }
  setItem(STORAGE_KEYS.ACHIEVEMENTS, updated);
  notifyCmsUpdate();
  return updated;
}

export function deleteAchievement(id: string): Achievement[] {
  const existing = getAchievements();
  const updated = existing.filter(a => a.id !== id);
  setItem(STORAGE_KEYS.ACHIEVEMENTS, updated);
  notifyCmsUpdate();
  return updated;
}

// ---------------- BOOKINGS & INQUIRIES ----------------
export function getInquiries(): BookingInquiry[] {
  return getItem<BookingInquiry[]>(STORAGE_KEYS.INQUIRIES, DEFAULT_INQUIRIES);
}

export function saveInquiry(
  inquiry: Omit<BookingInquiry, 'id' | 'createdAt' | 'status'> & { id?: string; createdAt?: string; status?: InquiryStatus }
): BookingInquiry {
  const existing = getInquiries();
  const newRecord: BookingInquiry = {
    ...inquiry,
    id: inquiry.id || `inq_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    createdAt: inquiry.createdAt || new Date().toISOString(),
    status: inquiry.status || 'pending',
  };
  const index = existing.findIndex(i => i.id === newRecord.id);
  let updated: BookingInquiry[];
  if (index >= 0) {
    updated = [...existing];
    updated[index] = newRecord;
  } else {
    updated = [newRecord, ...existing];
  }
  setItem(STORAGE_KEYS.INQUIRIES, updated);
  notifyCmsUpdate();
  return newRecord;
}

export function updateInquiryStatus(id: string, status: InquiryStatus): BookingInquiry[] {
  const existing = getInquiries();
  const updated = existing.map(i => (i.id === id ? { ...i, status } : i));
  setItem(STORAGE_KEYS.INQUIRIES, updated);
  notifyCmsUpdate();
  return updated;
}

export function deleteInquiry(id: string): BookingInquiry[] {
  const existing = getInquiries();
  const updated = existing.filter(i => i.id !== id);
  setItem(STORAGE_KEYS.INQUIRIES, updated);
  notifyCmsUpdate();
  return updated;
}

// ---------------- NEWSLETTER SUBSCRIBERS ----------------
export function getSubscribers(): NewsletterSubscriber[] {
  return getItem<NewsletterSubscriber[]>(STORAGE_KEYS.SUBSCRIBERS, [
    { id: 'sub_1', email: 'curator@nairobigallery.org', subscribedAt: '2026-08-19T09:00:00.000Z' },
    { id: 'sub_2', email: 'poetry@kitalefilmweek.com', subscribedAt: '2026-09-04T16:20:00.000Z' },
  ]);
}

export function addSubscriber(email: string): NewsletterSubscriber[] {
  const clean = email.trim().toLowerCase();
  if (!clean) return getSubscribers();
  const existing = getSubscribers();
  if (existing.some(s => s.email.toLowerCase() === clean)) {
    return existing;
  }
  const updated: NewsletterSubscriber[] = [
    {
      id: `sub_${Date.now()}`,
      email: clean,
      subscribedAt: new Date().toISOString(),
    },
    ...existing,
  ];
  setItem(STORAGE_KEYS.SUBSCRIBERS, updated);
  notifyCmsUpdate();
  return updated;
}

export function deleteSubscriber(id: string): NewsletterSubscriber[] {
  const existing = getSubscribers();
  const updated = existing.filter(s => s.id !== id);
  setItem(STORAGE_KEYS.SUBSCRIBERS, updated);
  notifyCmsUpdate();
  return updated;
}

// ---------------- SITE SETTINGS ----------------
export function getSiteSettings(): SiteSettings {
  return getItem<SiteSettings>(STORAGE_KEYS.SETTINGS, DEFAULT_SITE_SETTINGS);
}

export function saveSiteSettings(settings: SiteSettings): SiteSettings {
  setItem(STORAGE_KEYS.SETTINGS, settings);
  notifyCmsUpdate();
  return settings;
}

// ---------------- ACCESSIBILITY SETTINGS ----------------
export function getAccessibilitySettings(): AccessibilitySettings {
  return getItem<AccessibilitySettings>(STORAGE_KEYS.ACCESSIBILITY, DEFAULT_A11Y_SETTINGS);
}

export function saveAccessibilitySettings(settings: AccessibilitySettings): AccessibilitySettings {
  setItem(STORAGE_KEYS.ACCESSIBILITY, settings);
  notifyA11yUpdate();
  return settings;
}

// ---------------- IMPORT / EXPORT / RESET ----------------
export function exportCmsData() {
  const data = {
    poems: getPoems(),
    articles: getArticles(),
    videos: getVideos(),
    services: getServices(),
    achievements: getAchievements(),
    inquiries: getInquiries(),
    subscribers: getSubscribers(),
    settings: getSiteSettings(),
    exportedAt: new Date().toISOString(),
    version: '1.1',
  };
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `wanjawrites_cms_backup_${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function importCmsData(jsonData: any): boolean {
  try {
    if (jsonData.poems) setItem(STORAGE_KEYS.POEMS, jsonData.poems);
    if (jsonData.articles) setItem(STORAGE_KEYS.ARTICLES, jsonData.articles);
    if (jsonData.videos) setItem(STORAGE_KEYS.VIDEOS, jsonData.videos);
    if (jsonData.services) setItem(STORAGE_KEYS.SERVICES, jsonData.services);
    if (jsonData.achievements) setItem(STORAGE_KEYS.ACHIEVEMENTS, jsonData.achievements);
    if (jsonData.inquiries) setItem(STORAGE_KEYS.INQUIRIES, jsonData.inquiries);
    if (jsonData.subscribers) setItem(STORAGE_KEYS.SUBSCRIBERS, jsonData.subscribers);
    if (jsonData.settings) setItem(STORAGE_KEYS.SETTINGS, jsonData.settings);
    notifyCmsUpdate();
    return true;
  } catch (err) {
    console.error('Import failed:', err);
    return false;
  }
}

export function resetCmsData(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEYS.POEMS);
  localStorage.removeItem(STORAGE_KEYS.ARTICLES);
  localStorage.removeItem(STORAGE_KEYS.VIDEOS);
  localStorage.removeItem(STORAGE_KEYS.SERVICES);
  localStorage.removeItem(STORAGE_KEYS.ACHIEVEMENTS);
  localStorage.removeItem(STORAGE_KEYS.INQUIRIES);
  localStorage.removeItem(STORAGE_KEYS.SUBSCRIBERS);
  localStorage.removeItem(STORAGE_KEYS.SETTINGS);
  
  // Re-seed
  setItem(STORAGE_KEYS.POEMS, POEMS);
  setItem(STORAGE_KEYS.ARTICLES, ARTICLES);
  setItem(STORAGE_KEYS.VIDEOS, VIDEOS);
  setItem(STORAGE_KEYS.SERVICES, SERVICES);
  setItem(STORAGE_KEYS.ACHIEVEMENTS, ACHIEVEMENTS);
  setItem(STORAGE_KEYS.INQUIRIES, DEFAULT_INQUIRIES);
  setItem(STORAGE_KEYS.SETTINGS, DEFAULT_SITE_SETTINGS);
  
  notifyCmsUpdate();
}
