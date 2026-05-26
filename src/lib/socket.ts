import SockJS from "sockjs-client";

import { Client }
from "@stomp/stompjs";

let stompClient: Client;

export const connectSocket =
(
  onMessage: (
    message: string
  ) => void
) => {

  // prevent duplicate connections
  if (
    stompClient &&
    stompClient.active
  ) {
    return;
  }

  const socket =
    new SockJS(
      "http://localhost:8080/ws"
    );

  stompClient = new Client({

    webSocketFactory:
      () => socket,

    reconnectDelay: 5000,

    debug: (str) => {
      console.log(
        "STOMP:",
        str
      );
    },

    onConnect: () => {

      console.log(
        "✅ Connected to WebSocket"
      );

      // =========================
      // ORDER EVENTS
      // =========================

      stompClient.subscribe(
        "/topic/orders",
        (message) => {

          const parsedMessage =
            message.body;

          console.log(
            "📦 Order Event:",
            parsedMessage
          );

          onMessage(
            parsedMessage
          );
        }
      );
    },

    onStompError: (
      frame
    ) => {

      console.error(
        "❌ Broker Error:",
        frame.headers["message"]
      );

      console.error(
        frame.body
      );
    },

    onWebSocketError: (
      error
    ) => {

      console.error(
        "❌ WebSocket Error:",
        error
      );
    },

    onDisconnect: () => {

      console.log(
        "🔌 WebSocket Disconnected"
      );
    },
  });

  stompClient.activate();
};

export const disconnectSocket =
() => {

  if (stompClient) {

    stompClient.deactivate();

    console.log(
      "🔌 Socket disconnected"
    );
  }
};