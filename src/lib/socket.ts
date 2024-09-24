// src/lib/socket.ts

'use client';

import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const useSocket = (room: string) => {
  const [socketInstance, setSocketInstance] = useState<Socket | null>(null);

  useEffect(() => {
    if (!socket) {
      socket = io(process.env.NEXT_PUBLIC_SOCKET_IO_SERVER_URL || '', {
        transports: ['websocket'],
      });
    }

    if (room) {
      socket.emit('join-room', room);
    }

    setSocketInstance(socket);

    const cleanup = () => {
      if (socket) {
        socket.disconnect();
        socket = null;
      }
    };

    return cleanup;
  }, [room]);

  return { socket: socketInstance };
};
