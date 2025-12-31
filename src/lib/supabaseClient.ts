import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database.types';

// NOTE: These should ideally come from process.env.REACT_APP_SUPABASE_URL 
// but for this prototype structure, we assume they are injected via Vite's import.meta.env

const env = (import.meta as any).env || {};
const supabaseUrl = env.VITE_SUPABASE_URL || "https://pqrmlovvkmlidqaxfggj.supabase.co";
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBxcm1sb3Z2a21saWRxYXhmZ2dqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcxNTczNzAsImV4cCI6MjA4MjczMzM3MH0.-aX2Cp2yFU3dhN0WgvAklCtLdvg8bMIq99wOJIdWRBI";

let client = null as ReturnType<typeof createClient<Database>> | null;

try {
	if (typeof supabaseUrl === 'string' && supabaseUrl.startsWith('http')) {
		client = createClient<Database>(supabaseUrl, supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBxcm1sb3Z2a21saWRxYXhmZ2dqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcxNTczNzAsImV4cCI6MjA4MjczMzM3MH0.-aX2Cp2yFU3dhN0WgvAklCtLdvg8bMIq99wOJIdWRBI');
	} else {
		console.warn('Supabase URL not provided or invalid; running without Supabase client.');
	}
} catch (err) {
	console.error('Failed to create Supabase client:', err);
	client = null;
}

export const supabase = client;