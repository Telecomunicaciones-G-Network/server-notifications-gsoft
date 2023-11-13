const socketIo = require('socket.io');
const tickets = require('../tickets/tickets');

function initializeSocket(io) {

  const ticket = io.of('/tickets');
  const ticketNotificacion = io.of('/notificaciones');

  ticket.on('connection', (socket) => {
    console.log('Cliente conectado en la ruta /tickets');

    socket.on('nuevoTicket', async (ticketData) => {
      try {
        console.log('Nuevo ticket creado:', ticketData);
        await tickets.agregarNuevoRegistro(ticketData, ticketNotificacion);
      } catch (err) {
        console.error('Error al agregar nuevo registro:', err);
      }
    });

    socket.on('disconnect', () => {
      console.log('Cliente desconectado en la ruta /tickets');
    });
  });
}

module.exports = { initializeSocket };