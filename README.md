# Sri Ram Events — Luxury Event Planning & Management Platform

A production-ready event planning, luxury styling, cost estimation, and booking management platform built with **Next.js App Router**, **React**, **TypeScript**, **Tailwind CSS**, **Zod**, **React Hook Form**, **Framer Motion**, **Firebase Realtime Database**, **Supabase PostgreSQL**, **Resend**, and **Instagram Graph API**.

---

## Key Features

- **Luxury Editorial Design System**: Ivory (`#F6F1E9`), Cream (`#F4EFE7`), Beige (`#E5D7C7`), Mocha (`#79604D`), and Espresso (`#332821`) palette with Cormorant Garamond headings and DM Sans body typography.
- **Public Pages**:
  - `/` — Editorial homepage (Announcement bar, Navigation, Hero, About intro, Event categories, Featured services, Filterable portfolio, Why Choose Us, Instagram live feed, Client reviews, Booking CTA, Footer).
  - `/about` — Studio story, philosophy, workflow, and collaborators.
  - `/services` & `/services/[slug]` — 12 configurable event service categories with inclusions, optional add-ons, and quote requests.
  - `/portfolio` & `/portfolio/[slug]` — Filterable editorial project showcase and detail galleries.
  - `/estimate` — 8-step interactive event cost estimator with live breakdown and enquiry submission.
  - `/book` — Manual-approval booking request workflow with live calendar date availability checks.
  - `/reviews` — Verified client testimonials (no fabricated reviews).
  - `/contact` — Validated enquiry form with honeypot spam trap, WhatsApp, and Instagram links.
  - `/privacy` & `/terms` — Admin-editable privacy and booking/cancellation policies.
- **Protected Admin Dashboard (`/admin`)**:
  - Overview metrics, Enquiries search/filter/status/notes, Booking approval/rejection + calendar availability blocking, Services & Packages & Pricing editor, Portfolio manager, Reviews manager, and Business/Instagram/Tax settings.
- **Dual-Capable Backend**:
  - Works **out of the box** with your existing `NEXT_PUBLIC_FIREBASE_API_KEY` and Firebase Realtime Database (`srevents-mpl`).
  - Automatically switches to **Supabase PostgreSQL** when `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are configured.

---

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env.local` and configure your credentials:
   - Existing Firebase setup requires `NEXT_PUBLIC_FIREBASE_API_KEY`.
   - Optional Supabase, Resend, and Instagram Graph API variables can be added at any time.
3. Start the dev server:
   ```bash
   npm run dev
   ```
4. Type-check and build for production:
   ```bash
   npx tsc --noEmit
   npm run build
   ```

---

## Deployment & External Setup

### 1. Supabase Setup (PostgreSQL + RLS)
1. Create a new Supabase project.
2. Open the **SQL Editor** and run [`supabase/migrations/001_initial_schema.sql`](supabase/migrations/001_initial_schema.sql).
3. Optionally run [`supabase/seed.sql`](supabase/seed.sql) for initial settings and package tiers.
4. Copy `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY` into your environment variables (never expose `SUPABASE_SERVICE_ROLE_KEY` to the client).

### 2. Vercel Deployment
1. Push your repository to GitHub and import it in [Vercel](https://vercel.com).
2. Add environment variables from `.env.example` in **Project Settings → Environment Variables**.
3. Deploy and attach your custom domain under **Domains**.

### 3. Transactional Email (Resend)
1. Create an API key in [Resend](https://resend.com) and verify your sending domain.
2. Set `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, and `BUSINESS_NOTIFICATION_EMAIL`.

### 4. Instagram Graph API
1. Connect your professional Instagram account to a Meta App and generate a long-lived `INSTAGRAM_ACCESS_TOKEN` and `INSTAGRAM_USER_ID`.
2. Add them to server-side environment variables. Until configured, `/api/instagram` serves a graceful fallback linked to your Instagram profile.

### 5. Admin Access
- Navigate to `/admin` (or triple-click the footer copyright notice).
- Sign in using your configured `ADMIN_PASSCODE` environment variable or Firebase `admin_config/passcode`, and change the passcode anytime under `/admin/settings`.
