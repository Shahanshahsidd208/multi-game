import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { nanoid } from 'nanoid';
import type { GameState, Player, Flag, GameMode, PowerUp } from '../types/game';

interface GameStore extends GameState {
  initializeGame: (mode: GameMode, roomCode: string) => Promise<void>;
  addPlayer: (name: string, avatarColor: string, avatarEyes: string) => Promise<void>;
  removePlayer: (playerId: string) => Promise<void>;
  submitFlag: (content: string, type: 'red' | 'green') => Promise<void>;
  makeGuess: (flagId: string, playerId: string) => Promise<void>;
  nextRound: () => Promise<void>;
  setPowerUp: (playerId: string, powerUp: PowerUp) => Promise<void>;
  useSwapFlag: (flagId1: string, flagId2: string) => Promise<void>;
  useDoubleTrouble: (contents: [string, string], types: ['red' | 'green', 'red' | 'green']) => Promise<void>;
  useBlockGuess: (targetPlayerId: string) => Promise<void>;
}

export const useGameStore = create<GameStore>((set, get) => ({
  roomCode: '',
  mode: 'normal',
  players: [],
  currentRound: 0,
  targetPlayer: null,
  flags: [],
  phase: 'lobby',
  achievements: [],

  initializeGame: async (mode, roomCode) => {
    const { data: room, error } = await supabase
      .from('rooms')
      .insert([{ code: roomCode, mode, status: 'lobby' }])
      .select()
      .single();

    if (error) throw error;

    set({ 
      mode, 
      roomCode,
      currentRound: 0,
      phase: 'lobby',
      players: [],
      flags: [],
      achievements: []
    });
  },

  addPlayer: async (name, avatarColor, avatarEyes) => {
    const { data: room } = await supabase
      .from('rooms')
      .select()
      .eq('code', get().roomCode)
      .single();

    if (!room) throw new Error('Room not found');

    const { data: player, error } = await supabase
      .from('players')
      .insert([{
        room_id: room.id,
        name,
        avatar_color: avatarColor,
        avatar_eyes: avatarEyes,
        score: 0
      }])
      .select()
      .single();

    if (error) throw error;

    set((state) => ({
      players: [...state.players, player]
    }));
  },

  removePlayer: async (playerId) => {
    const { error } = await supabase
      .from('players')
      .delete()
      .eq('id', playerId);

    if (error) throw error;

    set((state) => ({
      players: state.players.filter(p => p.id !== playerId)
    }));
  },

  submitFlag: async (content, type) => {
    const { data: room } = await supabase
      .from('rooms')
      .select()
      .eq('code', get().roomCode)
      .single();

    if (!room) throw new Error('Room not found');

    const { data: flag, error } = await supabase
      .from('flags')
      .insert([{
        room_id: room.id,
        round: get().currentRound,
        type,
        content,
        submitted_by: get().players[0].id // TODO: Get current player ID
      }])
      .select()
      .single();

    if (error) throw error;

    set((state) => ({
      flags: [...state.flags, flag]
    }));
  },

  makeGuess: async (flagId, playerId) => {
    const { error } = await supabase
      .from('flags')
      .update({ guessed_by: playerId })
      .eq('id', flagId);

    if (error) throw error;

    set((state) => ({
      flags: state.flags.map(f =>
        f.id === flagId ? { ...f, guessed_by: playerId } : f
      )
    }));
  },

  nextRound: async () => {
    const { data: room } = await supabase
      .from('rooms')
      .select()
      .eq('code', get().roomCode)
      .single();

    if (!room) throw new Error('Room not found');

    const { error } = await supabase
      .from('rooms')
      .update({ 
        current_round: room.current_round + 1,
        status: 'submission'
      })
      .eq('id', room.id);

    if (error) throw error;

    set((state) => ({
      currentRound: state.currentRound + 1,
      phase: 'submission',
      flags: []
    }));
  },

  setPowerUp: async (playerId, powerUp) => {
    const { error } = await supabase
      .from('players')
      .update({ power_up: powerUp })
      .eq('id', playerId);

    if (error) throw error;

    set((state) => ({
      players: state.players.map(p =>
        p.id === playerId ? { ...p, powerUp } : p
      )
    }));
  },

  useSwapFlag: async (flagId1, flagId2) => {
    // Implement flag swapping logic
  },

  useDoubleTrouble: async (contents, types) => {
    // Implement double flag submission logic
  },

  useBlockGuess: async (targetPlayerId) => {
    // Implement block guess logic
  }
}));