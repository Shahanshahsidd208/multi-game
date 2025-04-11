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
      achievements: {
        Row: {
          id: string
          room_id: string
          player_id: string
          type: string
          created_at: string
        }
        Insert: {
          id?: string
          room_id: string
          player_id: string
          type: string
          created_at?: string
        }
        Update: {
          id?: string
          room_id?: string
          player_id?: string
          type?: string
          created_at?: string
        }
      }
      flags: {
        Row: {
          id: string
          room_id: string
          round: number
          type: string
          content: string
          submitted_by: string
          guessed_by?: string
          created_at: string
        }
        Insert: {
          id?: string
          room_id: string
          round: number
          type: string
          content: string
          submitted_by: string
          guessed_by?: string
          created_at?: string
        }
        Update: {
          id?: string
          room_id?: string
          round?: number
          type?: string
          content?: string
          submitted_by?: string
          guessed_by?: string
          created_at?: string
        }
      }
      players: {
        Row: {
          id: string
          room_id: string
          user_id: string
          name: string
          score: number
          avatar_color: string
          avatar_eyes: string
          power_up?: string
          created_at: string
        }
        Insert: {
          id?: string
          room_id: string
          user_id: string
          name: string
          score?: number
          avatar_color: string
          avatar_eyes: string
          power_up?: string
          created_at?: string
        }
        Update: {
          id?: string
          room_id?: string
          user_id?: string
          name?: string
          score?: number
          avatar_color?: string
          avatar_eyes?: string
          power_up?: string
          created_at?: string
        }
      }
      rooms: {
        Row: {
          id: string
          code: string
          mode: string
          status: string
          current_round: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          code: string
          mode: string
          status?: string
          current_round?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          code?: string
          mode?: string
          status?: string
          current_round?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}