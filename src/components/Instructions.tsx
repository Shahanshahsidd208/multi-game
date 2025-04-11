import React from 'react';
import { motion } from 'framer-motion';
import { Flag, Target, Award, Zap } from 'lucide-react';

export function Instructions({ onClose }: { onClose: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    >
      <div className="bg-gradient-to-br from-gray-900 to-purple-900 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-3xl font-bold mb-6 text-purple-200">How to Play</h2>
        
        <div className="space-y-6">
          <section>
            <h3 className="text-xl font-semibold mb-2 text-pink-300 flex items-center gap-2">
              <Flag className="w-5 h-5" /> Core Gameplay
            </h3>
            <ul className="list-disc list-inside space-y-2 text-purple-100">
              <li>2-14 players can join a private room</li>
              <li>Each round, one player is randomly selected as the Target</li>
              <li>Other players submit anonymous Red or Green Flags</li>
              <li>Target Player must guess who submitted each flag</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-2 text-pink-300 flex items-center gap-2">
              <Target className="w-5 h-5" /> Flag Types
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-red-500/20 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Red Flags 🚩</h4>
                <p className="text-sm">Funny, embarrassing, or quirky facts about players</p>
              </div>
              <div className="bg-green-500/20 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Green Flags 🌿</h4>
                <p className="text-sm">Wholesome, positive traits about players</p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-2 text-pink-300 flex items-center gap-2">
              <Award className="w-5 h-5" /> Scoring
            </h3>
            <ul className="list-disc list-inside space-y-2 text-purple-100">
              <li>+2 Points for each correct guess</li>
              <li>+1 Point when someone is fooled by your flag</li>
              <li>+3 Bonus points for guessing all flags correctly</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-2 text-pink-300 flex items-center gap-2">
              <Zap className="w-5 h-5" /> Power-Ups
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/10 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Swap Flag</h4>
                <p className="text-sm">Exchange your flag with another player's</p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Double Trouble</h4>
                <p className="text-sm">Submit two flags in one round</p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Block Guess</h4>
                <p className="text-sm">Prevent one person from guessing your flag</p>
              </div>
            </div>
          </section>
        </div>

        <button 
          onClick={onClose}
          className="mt-8 w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          Got it!
        </button>
      </div>
    </motion.div>
  );
}