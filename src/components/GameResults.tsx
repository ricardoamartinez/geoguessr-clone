'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../contexts/GameContext';

const GameResults = () => {
  const { players, playerId, gameMode } = useGame(); // Kept 'gameMode'

  // Sort players by score descending
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl w-11/12 max-w-lg"
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Game Results</h2>
        <p className="text-center mb-4">
          Game Mode: {gameMode === 'classic' ? 'Classic' : 'Quick Play'}
        </p>
        <table className="w-full mb-6">
          <thead>
            <tr>
              <th className="py-2">Rank</th>
              <th className="py-2">Player</th>
              <th className="py-2">Score</th>
            </tr>
          </thead>
          <tbody>
            {sortedPlayers.map((player, index) => (
              <tr
                key={player.id}
                className={
                  player.id === playerId ? 'font-bold bg-gray-200 dark:bg-gray-700' : ''
                }
              >
                <td className="py-2 text-center">{index + 1}</td>
                <td className="py-2 text-center">
                  {player.id === playerId ? 'You' : `Player ${player.id.substring(0, 5)}`}
                </td>
                <td className="py-2 text-center">{player.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center">
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Play Again
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default GameResults;
