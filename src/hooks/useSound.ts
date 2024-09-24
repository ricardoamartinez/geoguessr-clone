import { useCallback, useRef, useEffect } from 'react';

const useSound = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playSound = useCallback((soundPath: string) => {
    const audio = new Audio(soundPath);
    audio.play().catch(error => console.error('Error playing sound:', error));
  }, []);

  const playBackgroundMusic = useCallback((musicPath: string) => {
    if (!audioRef.current) {
      audioRef.current = new Audio(musicPath);
      audioRef.current.loop = true;
    }
    audioRef.current.play().catch(error => console.error('Error playing background music:', error));
  }, []);

  const stopBackgroundMusic = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, []);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return { playSound, playBackgroundMusic, stopBackgroundMusic };
};

export default useSound;