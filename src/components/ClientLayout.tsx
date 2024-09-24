// src/components/ClientLayout.tsx

'use client';

import React from 'react';
import { GameProvider } from '../contexts/GameContext';

type ClientLayoutProps = {
  children: React.ReactNode;
};

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  return <GameProvider>{children}</GameProvider>;
};

export default ClientLayout;
