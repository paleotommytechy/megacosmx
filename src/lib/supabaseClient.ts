import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database.types';

// NOTE: These should ideally come from process.env.REACT_APP_SUPABASE_URL 
// but for this prototype structure, we assume they are injected via Vite's import.meta.env

const env = (import.meta as any).env || {};
const supabaseUrl = env.VITE_SUPABASE_URL;
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY;

let client = null as ReturnType<typeof createClient<Database>> | null;

try {
	if (typeof supabaseUrl === 'string' && supabaseUrl.startsWith('http')) {
		client = createClient<Database>(supabaseUrl, supabaseAnonKey || '');
	} else {
		console.warn('Supabase URL not provided or invalid; running without Supabase client.');
	}
} catch (err) {
	console.error('Failed to create Supabase client:', err);
	client = null;
}

export const supabase = client;