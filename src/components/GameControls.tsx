'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../contexts/GameContext';
import useSound from '../hooks/useSound';
import GameModeDisplay from './GameModeDisplay';

const GameControls = () => {
  const {
    gameStarted,
    score,
    round,
    darkMode,
    toggleDarkMode,
    guessLocation,
    startGame,
    calculateScore,
    cooldown,
    gameMode,
  } = useGame();

  const { playSound } = useSound();

  const handleStartGame = () => {
    startGame();
    playSound('/audio/start-game.mp3');
  };

  const handleSubmitGuess = () => {
    calculateScore();
    playSound('/audio/submit-guess.mp3');
  };

  return (
    <div className="mt-8 space-y-4">
      <GameModeDisplay />
      <AnimatePresence>
        {!gameStarted ? (
          <motion.button
            key="start-game"
            onClick={handleStartGame}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            Start Game
          </motion.button>
        ) : (
          <>
            <motion.p
              key="round"
              className="text-xl font-semibold text-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              Round: {round}/{gameMode === 'classic' ? 5 : 3}
            </motion.p>
            <motion.p
              key="score"
              className="text-xl font-semibold text-center"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              Your Score: {score}
            </motion.p>
            {cooldown ? (
              <motion.p
                key="cooldown"
                className="text-lg font-medium text-center text-yellow-500"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                Next round starting soon...
              </motion.p>
            ) : guessLocation ? (
              <motion.button
                key="submit-guess"
                onClick={handleSubmitGuess}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                Submit Guess
              </motion.button>
            ) : null}
          </>
        )}
      </AnimatePresence>

      <motion.button
        onClick={toggleDarkMode}
        className={`px-4 py-2 rounded-full text-sm font-medium transition duration-300 ease-in-out shadow-md ${
          darkMode
            ? 'bg-yellow-400 text-black hover:bg-yellow-500'
            : 'bg-gray-800 text-white hover:bg-gray-700'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Toggle {darkMode ? 'Light' : 'Dark'} Mode
      </motion.button>
    </div>
  );
};

export default GameControls;