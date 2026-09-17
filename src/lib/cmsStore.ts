import { Poem, Article, VideoItem, Service, Achievement, SiteSettings, AccessibilitySettings } from '../types';
import { POEMS, ARTICLES, VIDEOS, SERVICES, ACHIEVEMENTS } from '../data/mockData';

const STORAGE_KEYS = {
  POEMS: 'wanja_cms_poems_v1',
  ARTICLES: 'wanja_cms_articles_v1',
  VIDEOS: 'wanja_cms_videos_v1',
  SERVICES: 'wanja_cms_services_v1',
  ACHIEVEMENTS: 'wanja_cms_achievements_v1',
  SETTINGS: 'wanja_cms_settings_v1',
  ACCESSIBILITY: 'wanja_a11y_settings_v1',
};

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  siteName: 'WanjaWrites × One-Jar',
  siteTagline: 'Poet · Writer · Storyteller',
  heroHeadline: 'Spoken Word, Poetic Excavation & Oral Archives',
  heroSubhead: 'Unsealing emotional containers, written stanzas, and stage performances by Wanja.',
  announcementBanner: '✨ Book Wanja for 2025 Literary Festivals, Corporate Keynotes & Workshops',
  announcementActive: true,
};

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
    settings: getSiteSettings(),
    exportedAt: new Date().toISOString(),
    version: '1.0',
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
  localStorage.removeItem(STORAGE_KEYS.SETTINGS);
  
  // Re-seed
  setItem(STORAGE_KEYS.POEMS, POEMS);
  setItem(STORAGE_KEYS.ARTICLES, ARTICLES);
  setItem(STORAGE_KEYS.VIDEOS, VIDEOS);
  setItem(STORAGE_KEYS.SERVICES, SERVICES);
  setItem(STORAGE_KEYS.ACHIEVEMENTS, ACHIEVEMENTS);
  setItem(STORAGE_KEYS.SETTINGS, DEFAULT_SITE_SETTINGS);
  
  notifyCmsUpdate();
}
