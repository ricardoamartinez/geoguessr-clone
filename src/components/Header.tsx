// src/components/Header.tsx

import React from 'react';
// Ensure no import of useGame or client components that use it

const Header = () => {
  return (
    <header className="w-full bg-gray-800 p-4">
      <h1 className="text-white text-2xl">GeoGuessr Clone</h1>
    </header>
  );
};

export default Header;
