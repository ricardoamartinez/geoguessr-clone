import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const initiateSocket = (room: string) => {
  if (!socket) {
    socket = io(undefined, { path: '/api/socketio' });
    socket.emit('join-room', room);
    console.log('Socket.io client initialized and joined room:', room);
  }
};

export const disconnectSocket = () => {
  if (socket) socket.disconnect();
  socket = null;
};

export const useSocket = (room: string) => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    initiateSocket(room);

    if (socket) {
      socket.on('connect', () => {
        setIsConnected(true);
        console.log('Connected to Socket.io server');
      });

      socket.on('disconnect', () => {
        setIsConnected(false);
        console.log('Disconnected from Socket.io server');
      });
    }

    return () => {
      disconnectSocket();
    };
  }, [room]);

  return { socket, isConnected };
};