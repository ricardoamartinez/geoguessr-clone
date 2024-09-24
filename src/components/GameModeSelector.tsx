'use client';

import React from 'react';
import { useGame } from '../contexts/GameContext';
import { motion } from 'framer-motion';

const GameModeSelector = () => {
  const { gameMode, setGameMode } = useGame();

  return (
    <div className="mt-4 space-y-2">
      <h3 className="text-lg font-semibold text-center">Select Game Mode:</h3>
      <div className="flex justify-center space-x-4">
        <motion.button
          onClick={() => setGameMode('classic')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition duration-300 ease-in-out ${
            gameMode === 'classic'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Classic (5 rounds)
        </motion.button>
        <motion.button
          onClick={() => setGameMode('quickPlay')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition duration-300 ease-in-out ${
            gameMode === 'quickPlay'
              ? 'bg-green-500 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Quick Play (3 rounds)
        </motion.button>
      </div>
    </div>
  );
};

export default GameModeSelector;