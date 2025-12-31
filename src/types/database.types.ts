export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      talents: {
        Row: {
          id: string
          created_at: string
          name: string
          role: string
          skills: string[]
          bio: string
          photo_url: string | null
          email: string | null
          whatsapp: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          role: string
          skills: string[]
          bio: string
          photo_url?: string | null
          email?: string | null
          whatsapp?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          role?: string
          skills?: string[]
          bio?: string
          photo_url?: string | null
          email?: string | null
          whatsapp?: string | null
        }
      }
      requests: {
        Row: {
          id: number
          created_at: string
          talent_id: string
          client_name: string
          message: string
          status: 'pending' | 'accepted' | 'rejected'
        }
        Insert: {
          id?: number
          created_at?: string
          talent_id: string
          client_name: string
          message: string
          status?: 'pending' | 'accepted' | 'rejected'
        }
        Update: {
          id?: number
          created_at?: string
          talent_id?: string
          client_name?: string
          message?: string
          status?: 'pending' | 'accepted' | 'rejected'
        }
      }
    }
  }
}