import type { InstagramPost } from '@/types/database';
import { FALLBACK_INSTAGRAM_POSTS } from '@/lib/seedData';

interface CachedInstagramState {
  posts: InstagramPost[];
  source: 'graph_api' | 'fallback';
  fetchedAt: number;
  error?: string;
}

const CACHE_TTL_MS = 15 * 60 * 1000;
let memoryCache: CachedInstagramState | null = null;

export async function getInstagramFeed(limit = 6): Promise<{
  posts: InstagramPost[];
  source: 'graph_api' | 'fallback';
  lastUpdated: string;
}> {
  const now = Date.now();
  if (memoryCache && now - memoryCache.fetchedAt < CACHE_TTL_MS) {
    return {
      posts: memoryCache.posts.slice(0, limit),
      source: memoryCache.source,
      lastUpdated: new Date(memoryCache.fetchedAt).toISOString(),
    };
  }

  const token = process.env.INSTAGRAM_ACCESS_TOKEN?.trim();
  const userId = process.env.INSTAGRAM_USER_ID?.trim() || 'me';

  const isDummyToken =
    !token ||
    /^(dummy|placeholder|your_|changeme|test|none|null)/i.test(token);

  if (isDummyToken) {
    return {
      posts: FALLBACK_INSTAGRAM_POSTS.slice(0, limit),
      source: 'fallback',
      lastUpdated: new Date(now).toISOString(),
    };
  }

  try {
    const fields = 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp';
    const url = `https://graph.instagram.com/${encodeURIComponent(userId)}/media?fields=${fields}&limit=${limit}&access_token=${encodeURIComponent(token)}`;
    const response = await fetch(url, { next: { revalidate: 900 } });

    if (!response.ok) {
      const errorText = await response.text();
      console.warn('[Instagram] Graph API returned error:', response.status, errorText);
      const fallbackPosts = memoryCache?.posts?.length
        ? memoryCache.posts
        : FALLBACK_INSTAGRAM_POSTS;
      return {
        posts: fallbackPosts.slice(0, limit),
        source: memoryCache?.source || 'fallback',
        lastUpdated: new Date(memoryCache?.fetchedAt || now).toISOString(),
      };
    }

    const payload = (await response.json()) as { data?: InstagramPost[] };
    const posts = (payload.data || []).filter((item) => item.media_url || item.thumbnail_url);

    if (posts.length === 0) {
      return {
        posts: FALLBACK_INSTAGRAM_POSTS.slice(0, limit),
        source: 'fallback',
        lastUpdated: new Date(now).toISOString(),
      };
    }

    memoryCache = {
      posts,
      source: 'graph_api',
      fetchedAt: now,
    };

    return {
      posts: posts.slice(0, limit),
      source: 'graph_api',
      lastUpdated: new Date(now).toISOString(),
    };
  } catch (err) {
    console.warn('[Instagram] Failed to fetch live feed, using fallback:', err);
    const cachedOrFallback = memoryCache?.posts?.length
      ? memoryCache.posts
      : FALLBACK_INSTAGRAM_POSTS;
    return {
      posts: cachedOrFallback.slice(0, limit),
      source: memoryCache?.source || 'fallback',
      lastUpdated: new Date(memoryCache?.fetchedAt || now).toISOString(),
    };
  }
}
