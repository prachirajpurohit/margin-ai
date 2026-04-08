# margin.

A distraction-free writing platform with big, bold typography. Built with Next.js + Supabase.

## Stack
- **Next.js 14** (App Router)
- **Supabase** (Postgres database + Google Auth)
- **Tailwind CSS**

## Project Structure
```
margin/
├── app/
│   ├── layout.tsx          # Root layout with Nav
│   ├── page.tsx            # Landing page
│   ├── globals.css
│   ├── writings/
│   │   ├── page.tsx        # All writings grid (filterable by tag)
│   │   └── [slug]/
│   │       └── page.tsx    # Individual writing page
│   └── write/
│       └── page.tsx        # Composer (auth-protected)
├── components/
│   ├── Nav.tsx             # Sticky nav with Google sign-in
│   ├── WritingCard.tsx     # Card used in the grid
│   └── Composer.tsx        # Distraction-free editor
├── lib/
│   ├── supabase.ts         # Supabase browser client
│   └── types.ts            # TypeScript types
└── supabase-schema.sql     # Run this in Supabase SQL editor
```

## Setup

### 1. Clone and install
```bash
git clone https://github.com/yourusername/margin
cd margin
npm install
```

### 2. Set up Supabase
1. Go to [supabase.com](https://supabase.com) and create a new project
2. In the SQL editor, run the contents of `supabase-schema.sql`
3. Go to **Authentication → Providers → Google** and enable it
   - You'll need a Google OAuth client ID & secret from [console.cloud.google.com](https://console.cloud.google.com)
   - Add `https://your-supabase-project.supabase.co/auth/v1/callback` as an authorized redirect URI in Google Console

### 3. Environment variables
```bash
cp .env.local.example .env.local
```
Fill in your values from Supabase → Project Settings → API:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Run locally
```bash
npm run dev
```

### 5. Deploy
Push to GitHub, then deploy on [Vercel](https://vercel.com) — it detects Next.js automatically.
Add your environment variables in the Vercel dashboard.

## How it works
- Anyone can **read** writings at `/writings`
- Only you (signed in via Google) can **write** at `/write`
- Each writing gets a unique URL: `/writings/my-post-title-abc123`
- Tag anything — filter by tag on the writings page
- Row-level security in Supabase ensures only the authenticated user can insert/edit/delete
