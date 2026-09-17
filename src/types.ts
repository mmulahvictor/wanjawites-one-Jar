export type NavigationTab = 
  | 'home' 
  | 'poetry' 
  | 'writing' 
  | 'about' 
  | 'work-with-wanja' 
  | 'videos' 
  | 'contact'
  | 'cms'
  | 'style-guide';

export type WritingCategory = 'blog' | 'review';

export type ContentStatus = 'published' | 'draft';

export interface Poem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  stanzas: string[];
  year: string;
  tags: string[];
  featured: boolean;
  context: string; // The excavation / background story
  status?: ContentStatus;
  audioRecordingText?: string;
  youtubeId?: string;
  relatedWritingSlug?: string;
  relatedGalleryIds?: string[];
  readTimeMinutes?: number;
}

export interface VideoItem {
  id: string;
  title: string;
  event: string;
  date: string;
  youtubeId: string;
  duration: string;
  description: string;
  thumbnailUrl?: string;
  status?: ContentStatus;
  transcript?: string;
  category: 'spoken_word' | 'reading' | 'reflection' | 'keynote';
  poemSlug?: string;
}

export interface Article {
  id: string;
  type: WritingCategory;
  title: string;
  slug: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string[];
  tags: string[];
  status?: ContentStatus;
  // For reviews
  itemReviewed?: string;
  reviewSubjectType?: 'Book' | 'Poetry Collection' | 'Film' | 'Theatre' | 'Culture';
  rating?: number; // out of 5
  quoteHighlight?: string;
  relatedPoemSlug?: string;
}

export interface Achievement {
  id: string;
  year: string;
  title: string;
  organization: string;
  category: 'Award' | 'Performance' | 'Publication' | 'Nomination' | 'Keynote';
  description: string;
  highlight?: boolean;
  status?: ContentStatus;
}

export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  category: 'Performance' | 'Portrait' | 'Behind The Scenes' | 'Collaboration';
  imageUrl: string;
  date: string;
  location: string;
}

export interface Service {
  id: string;
  title: string;
  tagline: string;
  description: string;
  targetAudience: string;
  deliverables: string[];
  iconName: string;
  typicalLeadTime: string;
  status?: ContentStatus;
}

export interface SiteSettings {
  siteName: string;
  siteTagline: string;
  heroHeadline: string;
  heroSubhead: string;
  announcementBanner?: string;
  announcementActive?: boolean;
}

export type CmsContentType = 'poems' | 'articles' | 'videos' | 'services' | 'achievements' | 'settings';

export interface AccessibilitySettings {
  fontSize: 'normal' | 'large' | 'xlarge';
  highContrast: boolean;
  reducedMotion: boolean;
  lineSpacing: 'normal' | 'relaxed' | 'loose';
}

export interface NewsletterLetter {
  id: string;
  issueNumber: number;
  title: string;
  date: string;
  excerpt: string;
  previewText: string;
}

export interface BookingFormData {
  fullName: string;
  email: string;
  phone: string;
  organization: string;
  serviceType: string;
  eventDate: string;
  location: string;
  budgetRange: string;
  projectDescription: string;
}
