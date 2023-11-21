// config/serverConfig.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const app = express();
const socketManager = require('./socketManager'); // Ajusta la ruta según la ubicación real de socketManager.js

const server = http.createServer(app);

const corsOptions = {
  origin: ['*', 'https://localhost:4200'],
  methods: ['GET', 'POST', 'PATCH', 'PUT']
};
app.use(cors(corsOptions));
app.use(express.json());

const io = socketIo(server, {
  cors: {
    origin: ['*', 'https://localhost:4200'],
    methods: ['GET', 'POST', 'PATCH', 'PUT']
  }
});
app.get('/check',(req,res)=>{
  res.status(200).json({message:'server is runnig',    sockets: Object.keys(io.sockets.connected).length,
})
})
socketManager.initializeSocket(io); // Pasa la instancia de io y tickets al inicializar los sockets

const serverConfig = {
  app,
  server,
  io
};

module.exports = serverConfig;