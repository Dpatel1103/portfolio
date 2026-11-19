# ✦ Deploying Devanshi Patel's Portfolio (Next.js + App Router)

This repository contains Devanshi Patel's complete Harry Potter-inspired full-stack portfolio built with **Next.js 15 (App Router)**, **React 19**, **TypeScript**, **Supabase / PostgreSQL**, and **Resend**.

---

## ⚡ Option A: Deploy on Vercel (Recommended - 1 Click)

Because this is a native Next.js application, Vercel provides the fastest, zero-config deployment:

1. Push your code to GitHub.
2. Sign in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import the `portfolio` repository.
4. Add the following **Environment Variables**:
   - `SUPABASE_URL`: Your Supabase Project URL (`https://your-project.supabase.co`)
   - `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role secret key
   - `RESEND_API_KEY`: Your Resend API key (`re_...`)
   - `NOTIFICATION_EMAIL`: `devanshi1303@gmail.com`
   - `RESEND_FROM_EMAIL`: `Owl Post <onboarding@resend.dev>`
5. Click **Deploy**. Vercel will build and host your portfolio with global edge CDN and automatic API routes!

---

## 🚀 Option B: Deploy on Render (Web Service)

You can also host the application on [Render](https://render.com) using the included `render.yaml` Blueprint or manually:

### 1. Manual Setup on Render
1. Push your repository to GitHub.
2. Go to the [Render Dashboard](https://dashboard.render.com/) and click **New +** → **Web Service**.
3. Connect your repository.
4. Configure the service:
   - **Name**: `devanshi-portfolio`
   - **Region**: Oregon (or your preferred region)
   - **Branch**: `main`
   - **Root Directory**: `.` (or `portfolio` if deploying the root workspace)
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free
5. Under **Environment Variables**, add:
   - `NODE_ENV`: `production`
   - `PORT`: `10000`
   - `SUPABASE_URL`: Your Supabase URL
   - `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key
   - `RESEND_API_KEY`: Your Resend API key
   - `NOTIFICATION_EMAIL`: `devanshi1303@gmail.com`
   - `RESEND_FROM_EMAIL`: `Owl Post <onboarding@resend.dev>`
6. Click **Create Web Service**.

---

## 🗄️ Database Setup (Supabase / PostgreSQL)

1. Open your Supabase Dashboard or PostgreSQL instance.
2. Navigate to the **SQL Editor**.
3. Run the SQL script located in `schema.sql`:
   ```sql
   CREATE TABLE IF NOT EXISTS owl_messages (
     id BIGSERIAL PRIMARY KEY,
     name VARCHAR(150) NOT NULL,
     email VARCHAR(255) NOT NULL,
     message TEXT NOT NULL,
     created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
   );

   CREATE INDEX IF NOT EXISTS idx_owl_messages_created_at ON owl_messages (created_at DESC);
   ALTER TABLE owl_messages ENABLE ROW LEVEL SECURITY;
   ```
4. Verify that Row Level Security (RLS) is enabled and service-role access is granted.

---

## 💻 Local Development

1. Ensure dependencies are installed:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.
