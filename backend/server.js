// server.js
const WebSocket = require("ws");
const server = new WebSocket.Server({ port: 8080 });

server.on("connection", (ws) => {
  console.log("New client connected");

  const sendRandomData = () => {
    // Simulate a random value (e.g., sensor reading, stock price)
    const randomValue = (Math.random() * 100).toFixed(2);
    const message = `Random value: ${randomValue}`;

    // Send the message to the client
    ws.send(message);

    // Schedule the next message to be sent after a random interval (500ms to 3s)
    const randomInterval = Math.floor(Math.random() * 2500) + 500;
    setTimeout(sendRandomData, randomInterval);
  };

  sendRandomData();

  ws.on("close", () => console.log("Client disconnected"));
});

console.log("WebSocket server running on ws://localhost:8080");
