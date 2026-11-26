import { NextResponse } from 'next/server';
import { getBusinessSettings } from '@/lib/data/repository';
import { getInstagramFeed } from '@/lib/instagram/service';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const settings = await getBusinessSettings();
    if (!settings.instagram_enabled) {
      return NextResponse.json({
        enabled: false,
        handle: settings.instagram_handle,
        profileUrl: settings.instagram_url,
        columns: settings.instagram_columns || 3,
        posts: [],
      });
    }

    const feed = await getInstagramFeed(6);
    return NextResponse.json({
      enabled: true,
      handle: settings.instagram_handle,
      profileUrl: settings.instagram_url,
      columns: settings.instagram_columns || 3,
      source: feed.source,
      lastUpdated: feed.lastUpdated,
      posts: feed.posts,
    });
  } catch (err) {
    console.error('[API /instagram] Failed:', err);
    return NextResponse.json({
      enabled: true,
      posts: [],
      source: 'fallback',
    });
  }
}
