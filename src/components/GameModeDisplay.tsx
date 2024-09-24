import React from 'react';
import { useGame } from '../contexts/GameContext';

const GameModeDisplay: React.FC = () => {
  const { gameMode, gameStarted } = useGame();

  if (!gameStarted) return null;

  return (
    <div className="text-center mt-4">
      <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
        {gameMode === 'classic' ? 'Classic Mode (5 rounds)' : 'Quick Play (3 rounds)'}
      </span>
    </div>
  );
};

export default GameModeDisplay;