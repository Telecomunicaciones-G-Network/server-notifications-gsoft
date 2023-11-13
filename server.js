const serverConfig = require('./config/serverConfig');
const socketManager = require('./config/socketManager');

const { app, server, io } = serverConfig;

// Resto de tu configuración...



// socketManager.initializeSocket(io);

const port = process.env.PORT || 80;

server.listen(port, () => {
    console.log('conectado');
});