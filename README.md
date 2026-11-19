# ✦ Devanshi Patel · Full-Stack Developer Portfolio

An editorial, Wizarding World-inspired developer portfolio architected with **Next.js 15 (App Router)**, **React 19**, **TypeScript**, **Supabase / PostgreSQL**, and **Resend**.

---

## 📜 Table of Contents

- [Features & Aesthetic](#-features--aesthetic)
- [Project Architecture](#-project-architecture)
- [Typography & Themes](#-typography--themes)
- [Interactive Micro-Animations](#-interactive-micro-animations)
- [Built-In API Routes](#-built-in-api-routes)
- [Local Development](#-local-development)
- [Deployment](#-deployment)

---

## ✨ Features & Aesthetic

- **Quiet Editorial Design**: Inspired by classic Hogwarts acceptance letters, ancient illuminated manuscripts, and the Marauder's Map.
- **Dual Themes**:
  - **Parchment (Light / Lumos)**: Warm aged paper texture (`#f4ebd8`), rich dark brown ink (`#2b1d12`), bronze-gold accents (`#9c7838`), and wax-red buttons.
  - **Midnight (Dark / Nox)**: Deep navy starry background (`#0b0e17`), parchment ink (`#ede3cf`), antique gold accents (`#d4af37`), and mouse-following candle glow.
- **System Preference Detection**: Automatically aligns with `prefers-color-scheme: dark` on first visit, switchable via the `✨ Lumos` / `🕯️ Nox` toggle.
- **Strict Reduced-Motion Support**: Disables drifting motes, candle glow, letter tilts, and unroll animations whenever `prefers-reduced-motion: reduce` is detected.

---

## 🏛️ Project Architecture

```
portfolio/
├── public/
│   ├── Devanshi_Patel_Resume.pdf  # Curriculum scroll resume download
│   └── icon.svg                   # Gold 4-point star favicon
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── owl-post/
│   │   │       └── route.ts       # Next.js App Router GET & POST endpoint
│   │   ├── globals.css            # Wizarding World styles, themes & keyframes
│   │   ├── layout.tsx             # Root layout with Google font optimization & anti-FOUC
│   │   └── page.tsx               # Main editorial portfolio page
│   ├── components/
│   │   ├── AmbientMotes.tsx       # Drifting candle embers / sunlit dust particles
│   │   ├── CandleGlow.tsx         # Cursor-following radial light for Midnight theme
│   │   ├── ClassSyllabusModal.tsx # 3D unrolling parchment dialog popup
│   │   ├── Credentials.tsx        # Apprenticeship & education ledger
│   │   ├── Footer.tsx             # Colophon & 'Mischief managed' ink fade button
│   │   ├── Header.tsx             # Nav bar with centered gold underlines & Lumos/Nox toggle
│   │   ├── HeroLetter.tsx         # Acceptance letter with 3D wax seal ('D')
│   │   ├── OwlPostForm.tsx        # Live counter & expandable parchment contact form
│   │   ├── ScrollRevealInit.tsx   # Invisible-ink scroll observer
│   │   ├── Spellbook.tsx          # Grimoire grid with warm gold wand-glow hover
│   │   └── TimetableClasses.tsx   # Responsive class schedule with syllabus triggers
│   ├── data/
│   │   ├── spells.ts              # Grimoire incantations data
│   │   └── syllabus.ts            # Detailed curriculum syllabus data
│   ├── lib/
│   │   ├── db.ts                  # PostgreSQL & Supabase database integration
│   │   └── email.ts               # Resend transactional email notification dispatch
│   └── types/
│       └── index.ts               # TypeScript interfaces & types
├── schema.sql                     # PostgreSQL / Supabase table schema & RLS policies
├── render.yaml                    # Render Blueprint configuration
├── next.config.ts                 # Next.js configuration
├── tsconfig.json                  # TypeScript compiler settings
└── package.json                   # Project scripts and dependencies
```

---

## 🖋️ Typography & Themes

- **Headings**: `IM Fell English` (via `next/font/google`).
- **Body & Editorial Text**: `Crimson Pro` (via `next/font/google`).
- Typography variables `--font-im-fell` and `--font-crimson` are seamlessly linked into `--font-heading` and `--font-body`.

---

## 🦉 Built-In API Routes

### `GET /api/owl-post`
Returns the total count of owls dispatched across the realm:
```json
{
  "success": true,
  "totalOwls": 42
}
```

### `POST /api/owl-post`
Validates dispatch inputs, enforces honeypot spam protection, writes to the PostgreSQL/Supabase `owl_messages` table, and triggers an email alert via Resend:
```json
{
  "name": "Albus Dumbledore",
  "email": "albus@hogwarts.edu",
  "message": "A dispatch concerning technical craftsmanship."
}
```

---

## 🚀 Local Development

```bash
# Install dependencies
npm install

# Start Next.js development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```
