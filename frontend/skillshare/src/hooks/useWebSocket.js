import { useEffect, useRef } from "react";

export function useWebSocket(roomName, onMessage) {
  const socketRef = useRef(null);

  useEffect(() => {
    const wsUrl = `wss://your-backend-api.com/ws/chat/${roomName}/`; // Replace with your WebSocket endpoint
    socketRef.current = new WebSocket(wsUrl);

    socketRef.current.onmessage = (event) => {
      if (onMessage) {
        onMessage(event.data);
      }
    };

    socketRef.current.onclose = () => {
      console.warn("WebSocket closed");
    };

    return () => {
      socketRef.current.close();
    };
  }, [roomName, onMessage]);

  const send = (data) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(data);
    }
  };

  return {
    send,
    socket: socketRef.current,
  };
}
