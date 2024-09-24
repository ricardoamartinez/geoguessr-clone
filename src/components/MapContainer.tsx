// src/components/MapContainer.tsx

'use client';

import React from 'react';
import { GoogleMap, Marker, StreetViewPanorama } from '@react-google-maps/api';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../contexts/GameContext';

type LatLngLiteral = google.maps.LatLngLiteral;

type MapContainerProps = {
  isLoaded: boolean;
  currentLocation: LatLngLiteral;
  guessLocation: LatLngLiteral | null;
  handleMapClick: (e: google.maps.MapMouseEvent) => void;
};

const mapContainerStyle = {
  width: '100%',
  height: '60vh',
  minHeight: '400px',
};

const initialCenter: LatLngLiteral = { lat: 0, lng: 0 };

const MapContainer: React.FC<MapContainerProps> = ({
  isLoaded,
  currentLocation,
  guessLocation,
  handleMapClick,
}) => {
  const { gameStarted, darkMode, players, playerId } = useGame();

  if (!isLoaded) {
    return (
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
        <div className="flex items-center justify-center h-96 bg-gray-200 dark:bg-gray-700">
          <p className="text-xl text-blue-500 dark:text-blue-400">Loading Google Maps...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={gameStarted ? guessLocation || initialCenter : currentLocation}
        zoom={gameStarted ? 10 : 2}
        options={{
          disableDefaultUI: true,
          styles: darkMode
            ? [
                { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
                { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
                { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
              ]
            : [],
        }}
        onClick={gameStarted ? handleMapClick : undefined}
      >
        <AnimatePresence>
          {gameStarted && (
            <>
              {guessLocation && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Marker position={guessLocation} label="You" />
                </motion.div>
              )}
              {!guessLocation && (
                <StreetViewPanorama
                  options={{
                    position: currentLocation,
                    disableDefaultUI: true,
                    enableCloseButton: false,
                    visible: true,
                  }}
                />
              )}
              {players.map((player) =>
                player.guess && player.id !== playerId ? (
                  <motion.div
                    key={player.id}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Marker
                      position={player.guess}
                      label={`Player ${player.id.substring(0, 5)}`}
                      icon={{
                        url: '/images/marker-icon.png',
                        scaledSize: new google.maps.Size(30, 30),
                      }}
                    />
                  </motion.div>
                ) : null
              )}
            </>
          )}
        </AnimatePresence>
      </GoogleMap>
    </motion.div>
  );
};

export default React.memo(MapContainer);
