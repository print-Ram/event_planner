import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { enquirySchema } from '@/lib/validation/schemas';
import { createEnquiry, getBusinessSettings } from '@/lib/data/repository';
import { sendEnquiryEmails } from '@/lib/email/resend';
import { checkRateLimit, getClientIp } from '@/lib/security/rateLimit';
import type { EnquiryRecord } from '@/types/booking';

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    if (!checkRateLimit(`enquiry:${ip}`, 8, 60_000)) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a moment before trying again.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parsed = enquirySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: parsed.error.issues[0]?.message || 'Invalid enquiry details.',
          issues: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    // Silently accept & discard if honeypot was filled
    if (parsed.data.website_url) {
      return NextResponse.json({ ok: true, id: 'submitted' });
    }

    const enquiry: EnquiryRecord = {
      id: crypto.randomUUID(),
      customer_name: parsed.data.customer_name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      event_type: parsed.data.event_type,
      event_date: parsed.data.event_date || '',
      location: parsed.data.location || '',
      guest_count: parsed.data.guest_count,
      budget: parsed.data.budget || '',
      message: parsed.data.message || '',
      estimate_id: parsed.data.estimate_id,
      estimate_summary: parsed.data.estimate_summary,
      status: 'New',
      admin_notes: '',
      created_at: new Date().toISOString(),
    };

    await createEnquiry(enquiry);
    const settings = await getBusinessSettings();
    await sendEnquiryEmails(enquiry, settings, Boolean(enquiry.estimate_id));

    return NextResponse.json({ ok: true, enquiry }, { status: 201 });
  } catch (err) {
    console.error('[API /enquiries] Failed:', err);
    return NextResponse.json(
      { error: 'Unable to submit enquiry right now. Please try WhatsApp or phone.' },
      { status: 500 }
    );
  }
}
