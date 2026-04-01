import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  if (process.env.NODE_ENV === 'development') {
    console.warn('Supabase URL or Anon Key is missing. Check your .env file.');
  }
}

// Ensure the build doesn't crash if vars are missing by providing dummy strings
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co', 
  supabaseAnonKey || 'placeholder'
);
