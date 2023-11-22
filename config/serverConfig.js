// config/serverConfig.js
const express = require('express');
const https = require('https');
const socketIo = require('socket.io');
const cors = require('cors');
const app = express();
const socketManager = require('./socketManager'); // Ajusta la ruta según la ubicación real de socketManager.js


const credentials = {
  key: fs.readFileSync('ruta/a/tu/clave-privada.pem', 'utf8'),
  cert: fs.readFileSync('ruta/a/tu/certificado.pem', 'utf8'),
  ca: fs.readFileSync('ruta/a/tu/chain.pem', 'utf8')
};
// const server = http.createServer(app);
const server = https.createServer(credentials, app);

const corsOptions = {
  origin: ['*', 'http://localhost:4200'],
  methods: ['GET', 'POST', 'PATCH', 'PUT']
};
app.use(cors(corsOptions));
app.use(express.json());

const io = socketIo(server, {
  cors: {
    origin: ['*', 'http://localhost:4200'],
    methods: ['GET', 'POST', 'PATCH', 'PUT']
  }
});
app.get('/check',(req,res)=>{
  res.status(200).json({message:'server is runnig',
})
})
socketManager.initializeSocket(io); // Pasa la instancia de io y tickets al inicializar los sockets

const serverConfig = {
  app,
  server,
  io
};

module.exports = serverConfig;