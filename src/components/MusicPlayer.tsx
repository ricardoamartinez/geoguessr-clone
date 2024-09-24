'use client';

import React, { useState, useEffect } from 'react';
import useSound from '../hooks/useSound';

const MusicPlayer = () => {
  const [isMuted, setIsMuted] = useState(false);
  const { playBackgroundMusic, stopBackgroundMusic } = useSound();

  useEffect(() => {
    playBackgroundMusic('/audio/background-music.mp3');
    return () => stopBackgroundMusic();
  }, [playBackgroundMusic, stopBackgroundMusic]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (isMuted) {
      playBackgroundMusic('/audio/background-music.mp3');
    } else {
      stopBackgroundMusic();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 flex items-center space-x-2">
      <button
        onClick={toggleMute}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium transition duration-300 ease-in-out shadow-md"
      >
        {isMuted ? 'Unmute' : 'Mute'} Music
      </button>
    </div>
  );
};

export default MusicPlayer;