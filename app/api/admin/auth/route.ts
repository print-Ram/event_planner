import { NextResponse } from 'next/server';
import {
  ADMIN_COOKIE_NAME,
  checkRateLimit,
  createAdminSessionToken,
  getClientIp,
  isAdminAuthenticatedFromCookies,
} from '@/lib/security/rateLimit';
import { verifyServerAdminPasscode } from '@/lib/data/repository';

export async function GET() {
  return NextResponse.json({ authenticated: isAdminAuthenticatedFromCookies() });
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (!checkRateLimit(`admin-login:${ip}`, 10, 60_000)) {
    return NextResponse.json(
      { error: 'Too many login attempts. Please wait a minute.' },
      { status: 429 }
    );
  }

  try {
    const body = (await request.json()) as { passcode?: string };
    const passcode = String(body.passcode || '');

    const valid = await verifyServerAdminPasscode(passcode);
    if (!valid) {
      return NextResponse.json({ error: 'Invalid admin passcode.' }, { status: 401 });
    }

    const token = createAdminSessionToken();
    const res = NextResponse.json({ ok: true, authenticated: true });
    res.cookies.set(ADMIN_COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 7 * 24 * 60 * 60,
    });
    return res;
  } catch {
    return NextResponse.json({ error: 'Authentication failed.' }, { status: 400 });
  }
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true, authenticated: false });
  res.cookies.delete(ADMIN_COOKIE_NAME);
  return res;
}
