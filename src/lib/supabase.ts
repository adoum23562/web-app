import { createClient } from '@supabase/supabase-js';

let publicClient: ReturnType<typeof createClient> | null = null;
let adminClient: ReturnType<typeof createClient> | null = null;

function getSupabaseConfig() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    // Return placeholder values during static build (CI without secrets).
    // All Supabase calls will fail gracefully at runtime when real env vars are missing.
    return {
      supabaseUrl: supabaseUrl || 'https://placeholder.supabase.co',
      supabaseAnonKey: supabaseAnonKey || 'placeholder-anon-key',
    };
  }

  return { supabaseUrl, supabaseAnonKey };
}

export function getSupabase() {
  if (!publicClient) {
    const { supabaseUrl, supabaseAnonKey } = getSupabaseConfig();
    publicClient = createClient(supabaseUrl, supabaseAnonKey);
  }

  return publicClient;
}

export function getSupabaseAdmin() {
  if (!adminClient) {
    const { supabaseUrl } = getSupabaseConfig();
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!serviceRoleKey) {
      throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY environment variable');
    }

    adminClient = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }

  return adminClient;
}
