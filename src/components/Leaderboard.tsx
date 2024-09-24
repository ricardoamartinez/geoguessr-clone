'use client';

import React from 'react';
import { useGame } from '../contexts/GameContext';

const Leaderboard = () => {
  const { players, playerId } = useGame();

  // Sort players by score descending
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  return (
    <div className="mt-8 w-full max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
      <h2 className="text-2xl font-bold text-center p-4">Leaderboard</h2>
      <table className="min-w-full bg-white dark:bg-gray-800">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Rank</th>
            <th className="py-2 px-4 border-b">Player</th>
            <th className="py-2 px-4 border-b">Score</th>
          </tr>
        </thead>
        <tbody>
          {sortedPlayers.map((player, index) => (
            <tr key={player.id} className={player.id === playerId ? 'font-bold bg-gray-200 dark:bg-gray-700' : ''}>
              <td className="py-2 px-4 border-b text-center">{index + 1}</td>
              <td className="py-2 px-4 border-b text-center">
                {player.id === playerId ? 'You' : `Player ${player.id.substring(0, 5)}`}
              </td>
              <td className="py-2 px-4 border-b text-center">{player.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;