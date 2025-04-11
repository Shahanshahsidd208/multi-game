import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export const subscribeToRoom = (roomId: string, callback: (payload: any) => void) => {
  return supabase
    .channel(`room:${roomId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'rooms',
        filter: `id=eq.${roomId}`,
      },
      callback
    )
    .subscribe();
};

export const subscribeToPlayers = (roomId: string, callback: (payload: any) => void) => {
  return supabase
    .channel(`players:${roomId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'players',
        filter: `room_id=eq.${roomId}`,
      },
      callback
    )
    .subscribe();
};

export const subscribeToFlags = (roomId: string, callback: (payload: any) => void) => {
  return supabase
    .channel(`flags:${roomId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'flags',
        filter: `room_id=eq.${roomId}`,
      },
      callback
    )
    .subscribe();
};