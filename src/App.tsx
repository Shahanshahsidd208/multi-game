import React, { useState } from 'react';
import { Flag, Users, Trophy, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instructions } from './components/Instructions';
import { CreateRoom } from './components/CreateRoom';
import { GameMode } from './types/game';
import { useGameStore } from './store/gameStore';

function App() {
  const [showInstructions, setShowInstructions] = useState(false);
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const initializeGame = useGameStore((state) => state.initializeGame);

  const handleCreateRoom = (mode: GameMode) => {
    const roomCode = generateRoomCode();
    initializeGame(mode, roomCode);
    setShowCreateRoom(false);
    // Navigate to game room (to be implemented)
  };

  const generateRoomCode = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    return 'FLG' + Array.from({ length: 3 }, () => 
      chars.charAt(Math.floor(Math.random() * chars.length))
    ).join('');
  };

  return (
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?auto=format&fit=crop&q=80&w=2342')] bg-cover bg-center bg-no-repeat">
      <div className="min-h-screen bg-gradient-to-br from-indigo-900/95 via-purple-900/95 to-pink-900/95 text-white">
        <div className="container mx-auto px-4 py-8">
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center mb-12"
          >
            <h1 className="text-6xl font-bold mb-4 flex items-center justify-center gap-4">
              <Flag className="w-12 h-12" />
              Flagged Up!
            </h1>
            <p className="text-xl text-purple-200">The ultimate social deduction party game</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-8"
            >
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Users className="w-6 h-6" />
                Create Room
              </h2>
              <button 
                onClick={() => setShowCreateRoom(true)}
                className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Start New Game
              </button>
            </motion.div>

            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-8"
            >
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Trophy className="w-6 h-6" />
                Join Room
              </h2>
              <div className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Enter room code (e.g., FLG123)"
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                  Join Game
                </button>
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center mt-12"
          >
            <button
              onClick={() => setShowInstructions(true)}
              className="inline-flex items-center gap-2 text-purple-200 hover:text-purple-100 transition-colors"
            >
              <BookOpen className="w-5 h-5" />
              How to Play
            </button>
            <p className="text-purple-200 mt-4">
              2-14 players • No chat needed • Pure fun and deduction
            </p>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {showInstructions && (
          <Instructions onClose={() => setShowInstructions(false)} />
        )}
        {showCreateRoom && (
          <CreateRoom 
            onClose={() => setShowCreateRoom(false)}
            onCreateRoom={handleCreateRoom}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;