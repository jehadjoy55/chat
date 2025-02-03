// Backend (Express + Socket.io)
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  }
});

// Handle incoming messages
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('message', (data) => {
    console.log('Received message:', data.message);
    // Emit the message to all clients
    io.emit('message', { sender: data.sender, message: data.message });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Serve static HTML files (you may need to upload this HTML to your server or host)
app.use(express.static('public'));

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
