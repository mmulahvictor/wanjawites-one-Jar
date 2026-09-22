/**
 * Video Utilities for WanjaWrites × One-Jar Poetry
 * Handles smart YouTube URL parsing, thumbnail resolution, and oEmbed metadata extraction.
 */

export interface YouTubeMetadata {
  title?: string;
  authorName?: string;
  authorUrl?: string;
  thumbnailUrl?: string;
  html?: string;
}

/**
 * Extracts a clean 11-character YouTube video ID from any format:
 * - https://www.youtube.com/watch?v=s714f3p1W6g
 * - https://youtu.be/s714f3p1W6g
 * - https://www.youtube.com/shorts/s714f3p1W6g
 * - https://www.youtube.com/embed/s714f3p1W6g
 * - https://m.youtube.com/watch?v=s714f3p1W6g&t=45s
 * - Raw 11-char ID: s714f3p1W6g
 */
export function extractYouTubeId(input: string): string | null {
  if (!input) return null;
  const trimmed = input.trim();

  // If already an 11-char ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  // Regex covering standard, short, embed, mobile, and shorts URLs
  const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;
  const match = trimmed.match(regExp);

  if (match && match[1] && match[1].length === 11) {
    return match[1];
  }

  return null;
}

/**
 * Returns thumbnail URLs with resolution fallback
 */
export function getYouTubeThumbnail(youtubeId: string, quality: 'maxres' | 'hq' | 'mq' = 'hq'): string {
  if (!youtubeId) return '/images/wanja_bw_stage.jpg';
  switch (quality) {
    case 'maxres':
      return `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
    case 'mq':
      return `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`;
    case 'hq':
    default:
      return `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
  }
}

/**
 * Attempts to fetch official video title and thumbnail via YouTube oEmbed / noembed
 */
export async function fetchYouTubeVideoInfo(youtubeIdOrUrl: string): Promise<YouTubeMetadata | null> {
  const videoId = extractYouTubeId(youtubeIdOrUrl);
  if (!videoId) return null;

  const standardUrl = `https://www.youtube.com/watch?v=${videoId}`;

  // Strategy 1: noembed.com open CORS endpoint
  try {
    const noembedUrl = `https://noembed.com/embed?url=${encodeURIComponent(standardUrl)}`;
    const res = await fetch(noembedUrl);
    if (res.ok) {
      const data = await res.json();
      if (data && data.title) {
        return {
          title: data.title,
          authorName: data.author_name,
          authorUrl: data.author_url,
          thumbnailUrl: data.thumbnail_url || getYouTubeThumbnail(videoId, 'maxres'),
          html: data.html,
        };
      }
    }
  } catch (err) {
    // Continue to strategy 2
  }

  // Strategy 2: Official YouTube oEmbed
  try {
    const ytOembed = `https://www.youtube.com/oembed?url=${encodeURIComponent(standardUrl)}&format=json`;
    const res = await fetch(ytOembed);
    if (res.ok) {
      const data = await res.json();
      if (data && data.title) {
        return {
          title: data.title,
          authorName: data.author_name,
          authorUrl: data.author_url,
          thumbnailUrl: data.thumbnail_url || getYouTubeThumbnail(videoId, 'hq'),
          html: data.html,
        };
      }
    }
  } catch (err) {
    // Fallback to basic structure
  }

  // Fallback: return default thumbnail
  return {
    thumbnailUrl: getYouTubeThumbnail(videoId, 'hq'),
  };
}
