// dependencies

const express = require("express");
const WebSocket = require("ws");
const SocketServer = WebSocket.Server;

const server = express().listen(3000);

const wss = new SocketServer({ server });

wss.on("connection", (ws) => {
  console.log(`[Server] A client was connected`);

  ws.on("close", () => console.log(`[Server] A client was disconnected`));

  ws.on("message", (message) => {
    console.log(`[Server] Received message: ${message}`);

    // Broadcast to all clients
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});

module.exports = wss;
