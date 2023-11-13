const express = require('express');
const http = require('http');
const https = require('https');
const socketIo = require('socket.io');
const cors = require('cors');
const os = require('os');
const routes = require('./routes'); // Importa el archivo de rutas
const tickets =require('./tickets/tickets')
const fs = require('fs');
const app = express();
// const serviceAccount = require('path/to/serviceAccountKey.json'); // Ruta al archivo de credenciales de servicio

// Configuración para el servidor HTTPS
// const options = {
//   key: fs.readFileSync('key.pem'), // Ruta al archivo de clave privada
//   cert: fs.readFileSync('cert.pem'), // Ruta al archivo de certificado SSL
// };
// const server = https.createServer(options,app);
const server = http.createServer(app);
// Configuración de CORS para el servidor de Express
const corsOptions = {
  origin: ['http://192.168.160.218:4200', 'http://192.168.160.218:4444','http://localhost:4200'],
  methods: ['GET', 'POST', 'PATCH', 'PUT']
};
app.use(cors(corsOptions));
app.use(express.json());

// Creación de instancia de socket.io con configuración de CORS
const io = socketIo(server, {
  cors: {
    origin: ['http://192.168.160.218:4200', 'http://192.168.160.218:4444','http://localhost:4200'],
    methods: ['GET', 'POST', 'PATCH', 'PUT']
  }
});

// Usa las rutas importadas
app.use('/retenciones', routes);
app.use('/tickets', routes);

// Manejo de eventos para la ruta "/tickets"
const ticket = io.of('/tickets');
const ticketNotificacion = io.of('/notificaciones');


// Manejo de eventos para la ruta "/tickets"
ticket.on('connection', (socket) => {
  console.log('Cliente conectado en la ruta /tickets');

  socket.on('nuevoTicket', async (ticketData) => {
    try {
      console.log('Nuevo ticket creado:', ticketData);
      await tickets.agregarNuevoRegistro(ticketData,ticketNotificacion);
    } catch (err) {
      console.error('Error al agregar nuevo registro:', err);
    }
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado en la ruta /tickets');
  });
});



const port = process.env.PORT || 5000;

server.listen(port, () => {
  const networkInterfaces = os.networkInterfaces();
  const addresses = networkInterfaces['Ethernet'] || networkInterfaces['Wi-Fi'];

  addresses.forEach((address) => {
    if (address.family === 'IPv4' && !address.internal) {
      console.log(`Servidor escuchando en la dirección IP ${address.address}:${port}`);
    }
  });
});
