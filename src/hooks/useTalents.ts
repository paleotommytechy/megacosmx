import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Talent } from '../types';
import { MOCK_TALENTS, FORCE_MOCK_DATA } from '../constants';

export const useTalents = (skillFilter: string | null) => {
  const [talents, setTalents] = useState<Talent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTalents = async () => {
      setLoading(true);
      setError(null);

      const env = (import.meta as any).env || {};
      const supabaseUrl = env.VITE_SUPABASE_URL;

      // Fallback to mock data if env vars are missing/invalid, forced, or supabase client unavailable
      if (
        FORCE_MOCK_DATA ||
        !supabaseUrl ||
        typeof supabaseUrl !== 'string' ||
        !supabaseUrl.startsWith('http') ||
        !supabase
      ) {
        // Simulate network delay
        setTimeout(() => {
          let data = [...MOCK_TALENTS];
          if (skillFilter) {
            data = data.filter(t => t.skills.includes(skillFilter));
          }
          setTalents(data);
          setLoading(false);
        }, 800);
        return;
      }
      try {
        if (!supabase) {
          throw new Error('Supabase client unavailable');
        }

        let query = supabase
          .from('talents')
          .select('*');

        if (skillFilter) {
          query = query.contains('skills', [skillFilter]);
        }

        const { data, error: dbError } = await query;

        if (dbError) throw dbError;

        setTalents(data || []);
      } catch (err: any) {
        console.error('Error fetching talents:', err);
        setError(err.message || 'Failed to load talents');
        // Fallback to mock on error for demonstration purposes
        setTalents(MOCK_TALENTS);
      } finally {
        setLoading(false);
      }
    };

    fetchTalents();
  }, [skillFilter]);

  return { talents, loading, error };
};