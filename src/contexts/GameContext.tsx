// src/contexts/GameContext.tsx

'use client';

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from 'react';
import { useLoadScript } from '@react-google-maps/api';
import { useSocket } from '../lib/socket';

type LatLngLiteral = google.maps.LatLngLiteral;

type Player = {
  id: string;
  score: number;
  guess: LatLngLiteral | null;
};

type GameMode = 'classic' | 'quickPlay';

type GameContextType = {
  score: number;
  round: number;
  gameStarted: boolean;
  darkMode: boolean;
  toggleDarkMode: () => void;
  guessLocation: LatLngLiteral | null;
  setGuessLocation: React.Dispatch<React.SetStateAction<LatLngLiteral | null>>;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  setRound: React.Dispatch<React.SetStateAction<number>>;
  setGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
  currentLocation: LatLngLiteral;
  setCurrentLocation: React.Dispatch<React.SetStateAction<LatLngLiteral>>;
  generateNewLocation: () => void;
  calculateScore: () => void;
  startGame: () => void;
  players: Player[];
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
  gameMode: GameMode;
  setGameMode: React.Dispatch<React.SetStateAction<GameMode>>;
  playerId: string;
  cooldown: boolean;
  setCooldown: React.Dispatch<React.SetStateAction<boolean>>;
  isLoaded: boolean;
  loadError: Error | undefined;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<LatLngLiteral>({
    lat: 0,
    lng: 0,
  });
  const [guessLocation, setGuessLocation] = useState<LatLngLiteral | null>(
    null
  );
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const [gameMode, setGameMode] = useState<GameMode>('classic');
  const [playerId, setPlayerId] = useState<string>('');
  const [cooldown, setCooldown] = useState<boolean>(false);

  const { socket } = useSocket('default-room'); // Ensure useSocket is correctly implemented

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries: ['places', 'geometry'],
  });

  useEffect(() => {
    if (socket) {
      // Listen for server events
      socket.on('your-id', (id: string) => {
        setPlayerId(id);
        // Add yourself to the players list
        setPlayers((prev) => [...prev, { id, score: 0, guess: null }]);
      });

      socket.on('player-joined', (id: string) => {
        if (id !== playerId) {
          setPlayers((prev) => [...prev, { id, score: 0, guess: null }]);
        }
      });

      socket.on('player-disconnected', (id: string) => {
        setPlayers((prev) => prev.filter((player) => player.id !== id));
      });

      socket.on(
        'player-guess',
        (data: { playerId: string; guess: LatLngLiteral }) => {
          setPlayers((prev) =>
            prev.map((player) =>
              player.id === data.playerId
                ? { ...player, guess: data.guess }
                : player
            )
          );
        }
      );

      // Request unique ID
      socket.emit('request-id');

      // Clean up on unmount
      return () => {
        socket.off('your-id');
        socket.off('player-joined');
        socket.off('player-disconnected');
        socket.off('player-guess');
      };
    }
  }, [socket, playerId]);

  const generateNewLocation = useCallback(() => {
    const newLocation: LatLngLiteral = {
      lat: Math.random() * 170 - 85, // Latitude between -85 and +85
      lng: Math.random() * 360 - 180, // Longitude between -180 and +180
    };
    setCurrentLocation(newLocation);
    setGuessLocation(null);
    // Reset all players' guesses
    setPlayers((prev) => prev.map((player) => ({ ...player, guess: null })));
  }, []);

  const startGame = useCallback(() => {
    if (!isLoaded) return;
    setGameStarted(true);
    setRound(1);
    setScore(0);
    setPlayers((prev) =>
      prev.map((player) => ({
        ...player,
        score: 0,
        guess: null,
      }))
    );
    generateNewLocation();
    // Notify other players
    if (socket) {
      socket.emit('start-game', { room: 'default-room', gameMode });
    }
  }, [isLoaded, generateNewLocation, socket, gameMode]);

  const calculateScore = useCallback(() => {
    if (!guessLocation) return;

    const distance = google.maps.geometry.spherical.computeDistanceBetween(
      new google.maps.LatLng(currentLocation),
      new google.maps.LatLng(guessLocation)
    );

    const maxDistance = 20000000; // Half the Earth's circumference in meters
    const roundScore = Math.round(5000 * (1 - distance / maxDistance));

    // Update player's score
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) =>
        player.id === playerId
          ? { ...player, score: player.score + roundScore }
          : player
      )
    );

    setScore((prevScore) => prevScore + roundScore);

    // Notify other players of the guess
    if (socket && guessLocation) {
      socket.emit('player-guess', { room: 'default-room', guess: guessLocation });
    }

    const maxRounds = gameMode === 'classic' ? 5 : 3;

    if (round < maxRounds) {
      setCooldown(true);
      setTimeout(() => {
        setRound((prevRound) => prevRound + 1);
        generateNewLocation();
        setCooldown(false);
      }, 3000); // 3-second cooldown
    } else {
      setGameStarted(false);
      // Optionally, emit game end event
      socket?.emit('end-game', { room: 'default-room' });
    }
  }, [
    currentLocation,
    guessLocation,
    round,
    generateNewLocation,
    playerId,
    socket,
    gameMode,
  ]);

  const toggleDarkMode = useCallback(() => setDarkMode((prev) => !prev), []);

  const value = useMemo(
    () => ({
      score,
      round,
      gameStarted,
      darkMode,
      toggleDarkMode,
      guessLocation,
      setGuessLocation,
      setScore,
      setRound,
      setGameStarted,
      currentLocation,
      setCurrentLocation,
      generateNewLocation,
      calculateScore,
      startGame,
      players,
      setPlayers,
      gameMode,
      setGameMode,
      playerId,
      cooldown,
      setCooldown,
      isLoaded,
      loadError,
    }),
    [
      score,
      round,
      gameStarted,
      darkMode,
      toggleDarkMode,
      guessLocation,
      setGuessLocation,
      setScore,
      setRound,
      setGameStarted,
      currentLocation,
      setCurrentLocation,
      generateNewLocation,
      calculateScore,
      startGame,
      players,
      setPlayers,
      gameMode,
      setGameMode,
      playerId,
      cooldown,
      setCooldown,
      isLoaded,
      loadError,
    ]
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
