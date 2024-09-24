// src/app/page.tsx

'use client';

import React from 'react';
import ClientLayout from '../components/ClientLayout';
import dynamic from 'next/dynamic';
import MapContainer from '../components/MapContainer';
import GameControls from '../components/GameControls';
import Leaderboard from '../components/Leaderboard';
import GameModeSelector from '../components/GameModeSelector';
import { useGame } from '../contexts/GameContext';


const GameResults = dynamic(() => import('../components/GameResults'), {
  ssr: false,
});

const HomePage = () => {
  const {
    isLoaded,
    loadError,
    gameStarted,
    currentLocation,
    guessLocation,
    setGuessLocation,
    calculateScore,
  } = useGame();

  if (loadError) {
    return (
      <div className="text-red-500 dark:text-red-400 text-center mt-20">
        Error loading Google Maps. Please check your API key and network connection.
      </div>
    );
  }

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const location: google.maps.LatLngLiteral = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      };
      setGuessLocation(location);
      calculateScore();
    }
  };

  return (
    <ClientLayout>
      {!gameStarted && <GameModeSelector />}
      <MapContainer
        isLoaded={isLoaded}
        currentLocation={currentLocation}
        guessLocation={guessLocation}
        handleMapClick={handleMapClick}
      />
      <GameControls />
      <Leaderboard />
      <GameResults /> {/* Now dynamically loaded client component */}
    </ClientLayout>
  );
};

export default HomePage;
