import { Resend } from 'resend';
import type { BusinessSettings } from '@/types/database';
import type { BookingRecord, EnquiryRecord } from '@/types/booking';

const sentIdempotencyKeys = new Set<string>();

function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  return new Resend(apiKey);
}

function wrapEmailLayout(
  settings: BusinessSettings,
  title: string,
  preheader: string,
  bodyHtml: string
): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background-color:#F6F1E9;color:#332821;font-family:'Helvetica Neue',Arial,sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;">${preheader}</div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#F6F1E9;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;background-color:#FFFFFF;border:1px solid #E5D7C7;border-radius:12px;overflow:hidden;">
          <tr>
            <td style="padding:28px 32px;background-color:#332821;color:#F6F1E9;text-align:center;">
              <p style="margin:0;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#C4AE98;">EVENT PLANNING &amp; DESIGN</p>
              <h1 style="margin:8px 0 0;font-family:Georgia,serif;font-size:26px;font-weight:500;color:#F6F1E9;">${settings.business_name}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;line-height:1.65;font-size:15px;color:#332821;">
              ${bodyHtml}
            </td>
          </tr>
          <tr>
            <td style="padding:20px 32px;background-color:#F4EFE7;border-top:1px solid #E5D7C7;font-size:12px;color:#82776D;text-align:center;">
              <p style="margin:0 0 6px;">${settings.business_name} · ${settings.location}</p>
              <p style="margin:0;">${settings.phone} · ${settings.email}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

async function sendEmailSafe(params: {
  idempotencyKey: string;
  to: string;
  subject: string;
  html: string;
}): Promise<{ sent: boolean; error?: string }> {
  if (sentIdempotencyKeys.has(params.idempotencyKey)) {
    return { sent: true };
  }

  const resend = getResendClient();
  if (!resend) {
    return { sent: false, error: 'RESEND_API_KEY not configured' };
  }

  const from =
    process.env.RESEND_FROM_EMAIL || 'Sri Ram Events <onboarding@resend.dev>';

  try {
    const { error } = await resend.emails.send({
      from,
      to: params.to,
      subject: params.subject,
      html: params.html,
    });
    if (error) {
      console.error('[Resend] Email delivery error:', error.message);
      return { sent: false, error: error.message };
    }
    sentIdempotencyKeys.add(params.idempotencyKey);
    return { sent: true };
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown email error';
    console.error('[Resend] Unexpected failure:', msg);
    return { sent: false, error: msg };
  }
}

export async function sendEnquiryEmails(
  enquiry: EnquiryRecord,
  settings: BusinessSettings,
  isEstimate = false
): Promise<void> {
  const adminEmail =
    process.env.BUSINESS_NOTIFICATION_EMAIL || settings.email;

  const customerHtml = wrapEmailLayout(
    settings,
    `Thank you for your enquiry — ${settings.business_name}`,
    `We have received your ${enquiry.event_type} enquiry.`,
    `<h2 style="margin-top:0;font-family:Georgia,serif;color:#332821;">Warm Greetings, ${enquiry.customer_name}</h2>
     <p>Thank you for reaching out to <strong>${settings.business_name}</strong>. Our planning studio has received your ${isEstimate ? 'event estimate and enquiry' : 'enquiry'} for <strong>${enquiry.event_type}</strong>.</p>
     <div style="background:#F4EFE7;border:1px solid #E5D7C7;border-radius:8px;padding:16px;margin:20px 0;">
       <p style="margin:4px 0;"><strong>Event Category:</strong> ${enquiry.event_type}</p>
       ${enquiry.event_date ? `<p style="margin:4px 0;"><strong>Preferred Date:</strong> ${enquiry.event_date}</p>` : ''}
       ${enquiry.location ? `<p style="margin:4px 0;"><strong>Location:</strong> ${enquiry.location}</p>` : ''}
       ${enquiry.estimate_summary ? `<p style="margin:4px 0;"><strong>Indicative Estimate:</strong> ${enquiry.estimate_summary}</p>` : ''}
     </div>
     <p>A dedicated event specialist will review your notes and respond shortly. For immediate assistance, you may also message us on WhatsApp at ${settings.phone}.</p>`
  );

  const businessHtml = wrapEmailLayout(
    settings,
    `New ${isEstimate ? 'Estimate' : 'Enquiry'}: ${enquiry.customer_name}`,
    `New enquiry from ${enquiry.customer_name}`,
    `<h2 style="margin-top:0;font-family:Georgia,serif;color:#332821;">New ${isEstimate ? 'Estimate Submission' : 'Customer Enquiry'}</h2>
     <p><strong>Name:</strong> ${enquiry.customer_name}</p>
     <p><strong>Phone:</strong> ${enquiry.phone}</p>
     <p><strong>Email:</strong> ${enquiry.email}</p>
     <p><strong>Event Type:</strong> ${enquiry.event_type}</p>
     ${enquiry.event_date ? `<p><strong>Date:</strong> ${enquiry.event_date}</p>` : ''}
     ${enquiry.location ? `<p><strong>Location:</strong> ${enquiry.location}</p>` : ''}
     ${enquiry.guest_count ? `<p><strong>Guests:</strong> ${enquiry.guest_count}</p>` : ''}
     ${enquiry.estimate_summary ? `<p><strong>Estimate:</strong> ${enquiry.estimate_summary}</p>` : ''}
     ${enquiry.message ? `<p><strong>Notes:</strong> ${enquiry.message}</p>` : ''}`
  );

  await Promise.all([
    sendEmailSafe({
      idempotencyKey: `enq-cust-${enquiry.id}`,
      to: enquiry.email,
      subject: `We received your enquiry — ${settings.business_name}`,
      html: customerHtml,
    }),
    sendEmailSafe({
      idempotencyKey: `enq-biz-${enquiry.id}`,
      to: adminEmail,
      subject: `New ${isEstimate ? 'Estimate' : 'Enquiry'}: ${enquiry.customer_name} (${enquiry.event_type})`,
      html: businessHtml,
    }),
  ]);
}

export async function sendBookingRequestEmails(
  booking: BookingRecord,
  settings: BusinessSettings
): Promise<void> {
  const adminEmail =
    process.env.BUSINESS_NOTIFICATION_EMAIL || settings.email;

  const customerHtml = wrapEmailLayout(
    settings,
    `Booking Request Received (${booking.booking_reference})`,
    `Your booking request ${booking.booking_reference} is pending studio review.`,
    `<h2 style="margin-top:0;font-family:Georgia,serif;color:#332821;">Booking Request Received</h2>
     <p>Dear ${booking.customer_name},</p>
     <p>Thank you for requesting <strong>${settings.business_name}</strong> for your upcoming <strong>${booking.event_type}</strong>. Please note that event dates require manual studio review and are not automatically confirmed until approved by our team.</p>
     <div style="background:#F4EFE7;border:1px solid #E5D7C7;border-radius:8px;padding:16px;margin:20px 0;">
       <p style="margin:4px 0;"><strong>Booking Reference:</strong> ${booking.booking_reference}</p>
       <p style="margin:4px 0;"><strong>Status:</strong> ${booking.status}</p>
       <p style="margin:4px 0;"><strong>Preferred Date:</strong> ${booking.event_date}</p>
       ${booking.alternative_date ? `<p style="margin:4px 0;"><strong>Alternative Date:</strong> ${booking.alternative_date}</p>` : ''}
       <p style="margin:4px 0;"><strong>Location:</strong> ${booking.location}</p>
       <p style="margin:4px 0;"><strong>Package:</strong> ${booking.package_name}</p>
     </div>
     <p>We will verify availability and respond with your next steps shortly.</p>`
  );

  const businessHtml = wrapEmailLayout(
    settings,
    `New Booking Request: ${booking.booking_reference}`,
    `Review booking request for ${booking.event_date}`,
    `<h2 style="margin-top:0;font-family:Georgia,serif;color:#332821;">New Booking Request (${booking.booking_reference})</h2>
     <p><strong>Customer:</strong> ${booking.customer_name} (${booking.phone} · ${booking.email})</p>
     <p><strong>Event:</strong> ${booking.event_type} on <strong>${booking.event_date}</strong></p>
     <p><strong>Location:</strong> ${booking.location} · <strong>Guests:</strong> ${booking.guest_count}</p>
     <p><strong>Package:</strong> ${booking.package_name}</p>
     <p><strong>Services:</strong> ${booking.selected_services.join(', ')}</p>
     ${booking.notes ? `<p><strong>Notes:</strong> ${booking.notes}</p>` : ''}
     <p>Log into the admin dashboard at <strong>/admin/bookings</strong> to approve or update this booking.</p>`
  );

  await Promise.all([
    sendEmailSafe({
      idempotencyKey: `book-cust-${booking.id}`,
      to: booking.email,
      subject: `Booking Request Received (${booking.booking_reference}) — ${settings.business_name}`,
      html: customerHtml,
    }),
    sendEmailSafe({
      idempotencyKey: `book-biz-${booking.id}`,
      to: adminEmail,
      subject: `New Booking Request ${booking.booking_reference} — ${booking.event_date}`,
      html: businessHtml,
    }),
  ]);
}

export async function sendBookingStatusEmail(
  booking: BookingRecord,
  settings: BusinessSettings
): Promise<void> {
  if (!['Approved', 'Confirmed', 'Rejected', 'Completed'].includes(booking.status)) {
    return;
  }

  let headline = `Booking Update (${booking.booking_reference})`;
  let intro = `Your booking request status has been updated to <strong>${booking.status}</strong>.`;

  if (booking.status === 'Approved' || booking.status === 'Confirmed') {
    headline = `Your Event Date is ${booking.status}!`;
    intro = `We are delighted to confirm that your <strong>${booking.event_type}</strong> on <strong>${booking.event_date}</strong> has been marked <strong>${booking.status}</strong> by ${settings.business_name}.`;
  } else if (booking.status === 'Rejected') {
    headline = `Update Regarding Your Booking Request`;
    intro = `Thank you for considering ${settings.business_name}. Unfortunately, we are unable to accommodate your requested date (${booking.event_date}) due to prior commitments. Please reach out on WhatsApp if you would like to explore alternative dates.`;
  } else if (booking.status === 'Completed') {
    headline = `Thank You for Celebrating With Us`;
    intro = `It was an honour to bring your <strong>${booking.event_type}</strong> to life. If you would like to share a few words about your experience, we would be grateful for your feedback.`;
  }

  const html = wrapEmailLayout(
    settings,
    headline,
    headline,
    `<h2 style="margin-top:0;font-family:Georgia,serif;color:#332821;">${headline}</h2>
     <p>Dear ${booking.customer_name},</p>
     <p>${intro}</p>
     <div style="background:#F4EFE7;border:1px solid #E5D7C7;border-radius:8px;padding:16px;margin:20px 0;">
       <p style="margin:4px 0;"><strong>Reference:</strong> ${booking.booking_reference}</p>
       <p style="margin:4px 0;"><strong>Event Date:</strong> ${booking.event_date}</p>
       <p style="margin:4px 0;"><strong>Status:</strong> ${booking.status}</p>
       ${booking.quoted_amount ? `<p style="margin:4px 0;"><strong>Quotation Total:</strong> ${settings.currency_symbol}${booking.quoted_amount.toLocaleString('en-IN')}</p>` : ''}
     </div>`
  );

  await sendEmailSafe({
    idempotencyKey: `book-status-${booking.id}-${booking.status}-${booking.updated_at}`,
    to: booking.email,
    subject: `${headline} — ${settings.business_name}`,
    html,
  });
}
