import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Flag, User, Clock, Award } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import type { Player } from '../types/game';

export function GameRoom() {
  const { players, phase, currentRound, targetPlayer } = useGameStore();
  const [flagContent, setFlagContent] = useState('');

  const renderPhase = () => {
    switch (phase) {
      case 'lobby':
        return <LobbyPhase players={players} />;
      case 'submission':
        return (
          <SubmissionPhase 
            flagContent={flagContent}
            setFlagContent={setFlagContent}
          />
        );
      case 'guessing':
        return <GuessingPhase />;
      case 'results':
        return <ResultsPhase />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Flag className="w-8 h-8 text-purple-300" />
            <div>
              <h1 className="text-2xl font-bold">Round {currentRound}</h1>
              <p className="text-purple-300">Phase: {phase}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Clock className="w-6 h-6" />
            <span className="text-xl font-semibold">2:30</span>
          </div>
        </header>

        {renderPhase()}
      </div>
    </div>
  );
}

function LobbyPhase({ players }: { players: Player[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white/10 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <User className="w-5 h-5" />
          Players ({players.length}/14)
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {players.map((player) => (
            <div 
              key={player.id}
              className="bg-white/5 rounded-lg p-3 flex items-center gap-3"
            >
              <div 
                className="w-10 h-10 rounded-full"
                style={{ backgroundColor: player.avatar.color }}
              />
              <span>{player.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white/10 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Game Settings</h2>
        {/* Game settings content */}
      </div>
    </div>
  );
}

function SubmissionPhase({ 
  flagContent, 
  setFlagContent 
}: { 
  flagContent: string;
  setFlagContent: (content: string) => void;
}) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white/10 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Submit Your Flag</h2>
        <textarea
          value={flagContent}
          onChange={(e) => setFlagContent(e.target.value)}
          className="w-full bg-white/5 rounded-lg p-4 min-h-[100px] text-white"
          placeholder="Enter your flag content..."
        />
        <div className="flex gap-4 mt-4">
          <button className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
            Red Flag
          </button>
          <button className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
            Green Flag
          </button>
        </div>
      </div>
    </div>
  );
}

function GuessingPhase() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white/10 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Submitted Flags</h2>
        {/* Flags list */}
      </div>
      <div className="bg-white/10 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Make Your Guesses</h2>
        {/* Guessing interface */}
      </div>
    </div>
  );
}

function ResultsPhase() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white/10 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Award className="w-5 h-5" />
          Round Results
        </h2>
        {/* Results content */}
      </div>
    </div>
  );
}