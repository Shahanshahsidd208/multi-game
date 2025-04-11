export type GameMode = 'normal' | 'roast' | 'wholesome' | 'truth-or-dare';

export type PowerUp = 'swap-flag' | 'double-trouble' | 'block-guess';

export type Player = {
  id: string;
  name: string;
  avatar: {
    color: string;
    eyes: 'funny' | 'sleepy' | 'angry' | 'cool';
  };
  score: number;
  powerUp: PowerUp | null;
};

export type Flag = {
  id: string;
  type: 'red' | 'green';
  content: string;
  submittedBy: string;
  guessedBy?: string;
};

export type GameState = {
  roomCode: string;
  mode: GameMode;
  players: Player[];
  currentRound: number;
  targetPlayer: string | null;
  flags: Flag[];
  phase: 'lobby' | 'submission' | 'guessing' | 'results';
};