// src/components/Footer.tsx

import React from 'react';
// Ensure no import of useGame or client components that use it

const Footer = () => {
  return (
    <footer className="w-full bg-gray-800 p-4">
      <p className="text-white text-center">© 2024 GeoGuessr Clone</p>
    </footer>
  );
};

export default Footer;
