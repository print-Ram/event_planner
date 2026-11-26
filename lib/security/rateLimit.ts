import crypto from 'crypto';
import { cookies } from 'next/headers';

const requestLog = new Map<string, number[]>();

export function checkRateLimit(key: string, maxRequests = 10, windowMs = 60_000): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(key) || []).filter((ts) => now - ts < windowMs);
  if (timestamps.length >= maxRequests) {
    requestLog.set(key, timestamps);
    return false;
  }
  timestamps.push(now);
  requestLog.set(key, timestamps);
  return true;
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return request.headers.get('x-real-ip') || 'anonymous';
}

const ADMIN_COOKIE_NAME = 'sre_admin_token';

function getSigningSecret(): string {
  return (
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.ADMIN_PASSCODE ||
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
    'sre-local-studio-signing-key'
  );
}

export function createAdminSessionToken(): string {
  const payload = `${Date.now()}.${crypto.randomBytes(16).toString('hex')}`;
  const sig = crypto
    .createHmac('sha256', getSigningSecret())
    .update(payload)
    .digest('hex');
  return `${payload}.${sig}`;
}

export function verifyAdminSessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const parts = token.split('.');
  if (parts.length !== 3) return false;
  const [ts, nonce, sig] = parts;
  const payload = `${ts}.${nonce}`;
  const expected = crypto
    .createHmac('sha256', getSigningSecret())
    .update(payload)
    .digest('hex');
  try {
    const validSig = crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
    if (!validSig) return false;
    const ageMs = Date.now() - Number(ts);
    return ageMs >= 0 && ageMs < 7 * 24 * 60 * 60 * 1000;
  } catch {
    return false;
  }
}

export async function isAdminAuthenticatedFromCookies(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  return verifyAdminSessionToken(token);
}

export { ADMIN_COOKIE_NAME };
