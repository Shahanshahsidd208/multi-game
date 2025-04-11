import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GameMode } from '../types/game';
import { Sparkles, Heart, Flame, Dice1 as Dice } from 'lucide-react';

interface CreateRoomProps {
  onClose: () => void;
  onCreateRoom: (mode: GameMode) => void;
}

export function CreateRoom({ onClose, onCreateRoom }: CreateRoomProps) {
  const [selectedMode, setSelectedMode] = useState<GameMode>('normal');

  const modes = [
    {
      id: 'normal' as GameMode,
      name: 'Normal Mode',
      description: 'Mix of Red & Green Flags allowed',
      icon: Sparkles,
      color: 'bg-purple-500 hover:bg-purple-600',
    },
    {
      id: 'roast' as GameMode,
      name: 'Roast Mode',
      description: 'Only Red Flags - Get ready to laugh!',
      icon: Flame,
      color: 'bg-red-500 hover:bg-red-600',
    },
    {
      id: 'wholesome' as GameMode,
      name: 'Wholesome Mode',
      description: 'Only Green Flags - Spread positivity',
      icon: Heart,
      color: 'bg-green-500 hover:bg-green-600',
    },
    {
      id: 'truth-or-dare' as GameMode,
      name: 'Truth or Dare',
      description: 'Answer spicy questions or take on dares',
      icon: Dice,
      color: 'bg-pink-500 hover:bg-pink-600',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    >
      <div className="bg-gradient-to-br from-gray-900 to-purple-900 rounded-2xl p-6 max-w-2xl w-full">
        <h2 className="text-3xl font-bold mb-6 text-purple-200">Choose Game Mode</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {modes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => setSelectedMode(mode.id)}
              className={`p-4 rounded-xl transition-all ${
                selectedMode === mode.id
                  ? 'ring-2 ring-purple-400 bg-white/10'
                  : 'bg-white/5 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <mode.icon className="w-5 h-5 text-purple-300" />
                <h3 className="font-semibold text-lg">{mode.name}</h3>
              </div>
              <p className="text-sm text-purple-200">{mode.description}</p>
            </button>
          ))}
        </div>

        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onCreateRoom(selectedMode)}
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Create Room
          </button>
        </div>
      </div>
    </motion.div>
  );
}