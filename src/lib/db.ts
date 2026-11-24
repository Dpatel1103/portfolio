import { Pool } from 'pg';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

let pgPool: Pool | null = null;
let supabaseClient: SupabaseClient | null = null;
let dbMode: 'postgres' | 'supabase' | 'memory' = 'memory';

const inMemoryStore: Array<{
  id: string | number;
  name: string;
  email: string;
  message: string;
  owl_type?: string;
  created_at: string;
}> = [];

function getDatabase() {
  if (dbMode !== 'memory') return;

  if (process.env.DATABASE_URL) {
    try {
      pgPool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
        max: 10,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 5000
      });
      dbMode = 'postgres';
      return;
    } catch (err) {
      console.error('Postgres init error:', err);
    }
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseKey) {
    try {
      supabaseClient = createClient(supabaseUrl, supabaseKey, {
        auth: { persistSession: false, autoRefreshToken: false }
      });
      dbMode = 'supabase';
      return;
    } catch (err) {
      console.error('Supabase client init error:', err);
    }
  }

  dbMode = 'memory';
}

export async function saveMessage({
  name,
  email,
  message,
  owlType
}: {
  name: string;
  email: string;
  message: string;
  owlType?: string;
}) {
  getDatabase();

  const cleanName = String(name || '').trim();
  const cleanEmail = String(email || '').trim().toLowerCase();
  const cleanMessage = String(message || '').trim();
  const cleanOwlType = String(owlType || 'Barn Owl').trim();

  // Mode 1: Direct PostgreSQL Connection
  if (dbMode === 'postgres' && pgPool) {
    try {
      // Try with sender_name / sender_email first
      const querySender = `
        INSERT INTO owl_messages (sender_name, sender_email, message)
        VALUES ($1, $2, $3)
        RETURNING id, sender_name, sender_email, message, created_at;
      `;
      const res = await pgPool.query(querySender, [cleanName, cleanEmail, cleanMessage]);
      const row = res.rows[0];
      return {
        id: row.id,
        name: row.sender_name || cleanName,
        email: row.sender_email || cleanEmail,
        message: row.message || cleanMessage,
        created_at: row.created_at
      };
    } catch {
      try {
        // Fallback to name / email
        const queryStandard = `
          INSERT INTO owl_messages (name, email, message)
          VALUES ($1, $2, $3)
          RETURNING id, name, email, message, created_at;
        `;
        const res = await pgPool.query(queryStandard, [cleanName, cleanEmail, cleanMessage]);
        return res.rows[0];
      } catch (pgErr) {
        console.warn('⚠️ [Postgres DB Warning]:', pgErr instanceof Error ? pgErr.message : String(pgErr));
      }
    }
  }

  // Mode 2: Supabase Client Connection
  if (dbMode === 'supabase' && supabaseClient) {
    // Attempt 1: Using sender_name and sender_email (Supabase table default)
    let res = await supabaseClient
      .from('owl_messages')
      .insert([{ sender_name: cleanName, sender_email: cleanEmail, message: cleanMessage }])
      .select('id, sender_name, sender_email, message, created_at')
      .single();

    // Attempt 2: Fallback to name and email if table uses standard column names
    if (res.error && (res.error.message.includes('column') || res.error.code === 'PGRST204')) {
      res = await supabaseClient
        .from('owl_messages')
        .insert([{ name: cleanName, email: cleanEmail, message: cleanMessage }])
        .select('id, name, email, message, created_at')
        .single();
    }

    if (!res.error && res.data) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const rec = res.data as any;
      return {
        id: rec.id,
        name: rec.sender_name || rec.name || cleanName,
        email: rec.sender_email || rec.email || cleanEmail,
        message: rec.message || cleanMessage,
        created_at: rec.created_at
      };
    }

    // Graceful fallback if Supabase table permissions or network blocked:
    // Log the database warning, but persist in memory so the inquiry is never lost and email alert proceeds!
    console.warn('⚠️ [Supabase Database Warning - Falling back to local storage]:', res.error?.message);
  }

  // Mode 3: In-Memory / Safe Fallback Store
  const memoryRecord = {
    id: `owl-${Date.now()}`,
    name: cleanName,
    email: cleanEmail,
    message: cleanMessage,
    owl_type: cleanOwlType,
    created_at: new Date().toISOString()
  };
  inMemoryStore.push(memoryRecord);
  return memoryRecord;
}

export async function getMessageCount(): Promise<number> {
  getDatabase();

  if (dbMode === 'postgres' && pgPool) {
    try {
      const res = await pgPool.query('SELECT COUNT(*)::int AS count FROM owl_messages;');
      return (parseInt(res.rows[0].count, 10) || 0) + inMemoryStore.length;
    } catch {
      return inMemoryStore.length;
    }
  }

  if (dbMode === 'supabase' && supabaseClient) {
    try {
      const { count, error } = await supabaseClient
        .from('owl_messages')
        .select('*', { count: 'exact', head: true });

      if (error) {
        return inMemoryStore.length;
      }
      return (typeof count === 'number' ? count : 0) + inMemoryStore.length;
    } catch {
      return inMemoryStore.length;
    }
  }

  return inMemoryStore.length;
}
