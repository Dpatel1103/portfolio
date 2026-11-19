-- =============================================================================
-- OWL POST DATABASE SCHEMA & PERMISSIONS (PostgreSQL / Supabase)
-- Table: owl_messages
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)
-- =============================================================================

-- 1. Create table with UUID and flexible columns
CREATE TABLE IF NOT EXISTS public.owl_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_name VARCHAR(150),
  sender_email VARCHAR(255),
  name VARCHAR(150),
  email VARCHAR(255),
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Ensure both column conventions exist if table was already created
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'owl_messages' AND column_name = 'sender_name') THEN
    ALTER TABLE public.owl_messages ADD COLUMN sender_name VARCHAR(150);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'owl_messages' AND column_name = 'sender_email') THEN
    ALTER TABLE public.owl_messages ADD COLUMN sender_email VARCHAR(255);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'owl_messages' AND column_name = 'name') THEN
    ALTER TABLE public.owl_messages ADD COLUMN name VARCHAR(150);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'owl_messages' AND column_name = 'email') THEN
    ALTER TABLE public.owl_messages ADD COLUMN email VARCHAR(255);
  END IF;
END $$;

-- 2. Index for sorting by date
CREATE INDEX IF NOT EXISTS idx_owl_messages_created_at ON public.owl_messages (created_at DESC);

-- 3. GRANT Table Permissions to Supabase Roles (Resolves 'permission denied' / 42501)
GRANT ALL ON TABLE public.owl_messages TO postgres, service_role;
GRANT SELECT, INSERT ON TABLE public.owl_messages TO anon, authenticated;

-- 4. Row Level Security (RLS)
ALTER TABLE public.owl_messages ENABLE ROW LEVEL SECURITY;

-- Allow service_role to perform all operations
DROP POLICY IF EXISTS "Service role full access" ON public.owl_messages;
CREATE POLICY "Service role full access" 
  ON public.owl_messages 
  FOR ALL 
  TO service_role 
  USING (true) 
  WITH CHECK (true);

-- Allow public to insert new owl dispatches
DROP POLICY IF EXISTS "Public can insert owl messages" ON public.owl_messages;
CREATE POLICY "Public can insert owl messages" 
  ON public.owl_messages 
  FOR INSERT 
  TO anon, authenticated 
  WITH CHECK (true);

-- Allow public to read count
DROP POLICY IF EXISTS "Public can view count" ON public.owl_messages;
CREATE POLICY "Public can view count" 
  ON public.owl_messages 
  FOR SELECT 
  TO anon, authenticated 
  USING (true);

-- 5. Reload PostgREST schema cache
NOTIFY pgrst, 'reload schema';
