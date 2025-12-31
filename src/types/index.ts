import { Database } from './database.types';

export type Talent = Database['public']['Tables']['talents']['Row'];
export type Request = Database['public']['Tables']['requests']['Row'];
export type NewRequest = Database['public']['Tables']['requests']['Insert'];

export interface FilterState {
  skill: string | null;
  search: string;
}

export const SKILL_OPTIONS = [
  "React", 
  "TypeScript", 
  "Node.js", 
  "UI/UX Design", 
  "Python", 
  "DevOps", 
  "Supabase",
  "Flutter",
  "Marketing"
];