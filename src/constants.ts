import { Talent } from './types';

// Set this to true to force using mock data instead of Supabase
export const FORCE_MOCK_DATA = false; 

export const MOCK_TALENTS: Talent[] = [
  {
    id: '1',
    created_at: new Date().toISOString(),
    name: 'Paleotommytechy',
    role: 'Senior Frontend Engineer',
    skills: ['React', 'TypeScript', 'Supabase'],
    bio: 'Specializing in high-performance React applications and scalable frontend architectures. 8+ years of experience.',
    photo_url: 'https://picsum.photos/400/400?random=1',
    email: 'elena@example.com',
    whatsapp: '1234567890'
  },
  {
    id: '2',
    created_at: new Date().toISOString(),
    name: 'Toluwani Stephen',
    role: 'Full Stack Developer',
    skills: ['Node.js', 'Python', 'DevOps'],
    bio: 'Building robust backend systems and cloud infrastructure. I turn complex problems into elegant solutions.',
    photo_url: 'https://picsum.photos/400/400?random=2',
    email: 'marcus@example.com',
    whatsapp: '1234567890'
  },
  {
    id: '3',
    created_at: new Date().toISOString(),
    name: 'Precious Akinboss',
    role: 'Product Designer',
    skills: ['UI/UX Design', 'Marketing'],
    bio: 'Crafting intuitive and beautiful user experiences. I bridge the gap between user needs and business goals.',
    photo_url: 'https://picsum.photos/400/400?random=3',
    email: 'sarah@example.com',
    whatsapp: '1234567890'
  },
  {
    id: '4',
    created_at: new Date().toISOString(),
    name: 'Ifeoluwa Olusegun',
    role: 'Mobile Developer',
    skills: ['Flutter', 'React', 'TypeScript'],
    bio: 'Cross-platform mobile development expert. Delivering smooth native-like experiences on iOS and Android.',
    photo_url: 'https://picsum.photos/400/400?random=4',
    email: 'david@example.com',
    whatsapp: '1234567890'
  }
];