import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SeoConfig {
  title?: string;
  description?: string;
  isRestrictedAdmin?: boolean;
}

export function usePageSeo(customConfig?: SeoConfig) {
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname;
    const isRestrictedAdmin =
      customConfig?.isRestrictedAdmin ||
      pathname.startsWith('/admin') ||
      pathname.startsWith('/cms') ||
      pathname.startsWith('/studio');

    // 1. Update or create robots meta tag
    let robotsMeta = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta');
      robotsMeta.setAttribute('name', 'robots');
      document.head.appendChild(robotsMeta);
    }

    let googlebotMeta = document.querySelector('meta[name="googlebot"]') as HTMLMetaElement | null;
    if (!googlebotMeta) {
      googlebotMeta = document.createElement('meta');
      googlebotMeta.setAttribute('name', 'googlebot');
      document.head.appendChild(googlebotMeta);
    }

    if (isRestrictedAdmin) {
      // Strictly prevent Google and all web crawlers from indexing, archiving, or displaying snippets of the admin page
      robotsMeta.setAttribute('content', 'noindex, nofollow, noarchive, nosnippet');
      googlebotMeta.setAttribute('content', 'noindex, nofollow, noarchive, nosnippet');
      document.title = customConfig?.title || 'Administrative Portal | Access Restricted';
    } else {
      // Public indexable content
      robotsMeta.setAttribute('content', 'index, follow, max-snippet:-1, max-image-preview:large');
      googlebotMeta.setAttribute('content', 'index, follow');

      // Canonical link update
      let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', window.location.origin + pathname);

      // Determine public title
      if (customConfig?.title) {
        document.title = customConfig.title;
      } else {
        if (pathname === '/' || pathname === '') {
          document.title = 'WanjaWrites × One-Jar Poetry | Poet, Writer & Storyteller';
        } else if (pathname.startsWith('/poetry')) {
          document.title = 'Poetry & Spoken Word Archive | One-Jar Poetry (Faith Wanja)';
        } else if (pathname.startsWith('/writing')) {
          document.title = 'Culture Writing & Literary Reviews | WanjaWrites';
        } else if (pathname.startsWith('/about')) {
          document.title = 'About Faith Wanja | Biography & Electronic Press Kit';
        } else if (pathname.startsWith('/services') || pathname.startsWith('/work-with-wanja')) {
          document.title = 'Work With Wanja | Performance, Workshops & Strategic Communications';
        } else if (pathname.startsWith('/videos')) {
          document.title = 'Performance Archive & Videos | One-Jar Poetry';
        } else if (pathname.startsWith('/contact')) {
          document.title = 'Contact & Booking Inquiries | WanjaWrites';
        } else if (pathname.startsWith('/style-guide')) {
          document.title = 'Design Style Guide | One-Jar Brand Identity';
        }
      }

      // Update meta description
      if (customConfig?.description) {
        let descMeta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
        if (!descMeta) {
          descMeta = document.createElement('meta');
          descMeta.setAttribute('name', 'description');
          document.head.appendChild(descMeta);
        }
        descMeta.setAttribute('content', customConfig.description);
      }
    }
  }, [location.pathname, customConfig?.title, customConfig?.description, customConfig?.isRestrictedAdmin]);
}
