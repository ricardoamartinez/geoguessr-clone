// src/app/layout.tsx

import '../styles/globals.css';
import type { ReactNode } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MusicPlayer from '../components/MusicPlayer';
// Removed GameResults from here
// import GameResults from '../components/GameResults';
import { AnimatePresence } from 'framer-motion';

type LayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="flex-grow flex flex-col items-center justify-center p-4">
          {children}
        </main>
        <Footer />
        <MusicPlayer />
        <AnimatePresence>
          {/* Ensure no client components are rendered here */}
        </AnimatePresence>
      </body>
    </html>
  );
}
