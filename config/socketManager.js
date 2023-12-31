const socketIo = require('socket.io');
const tickets = require('../tickets/tickets');

let isSocketInitialized = false;

function initializeSocket(io) {
  if (!isSocketInitialized) {
    const ticket = io.of('/tickets');
    const ticketPortal = io.of('/ticketsPortal');
    const ticketNotificacion = io.of('/notificaciones');

    ticket.on('connection', (socket) => {
      console.log(`Cliente conectado en la ruta /tickets-Gsoft ${socket.handshake.address}`);

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

    ticketPortal.on('connection', (socket) => {
        console.log('Cliente conectado en la ruta /tickets-Portal');
  
        socket.on('nuevoTicketPortal', async (ticketData) => {
            console.log('llego');
          try {
            console.log('Nuevo ticket creado:', ticketData);
            await tickets.agregarNuevoRegistroPortal(ticketData, ticketNotificacion);
          } catch (err) {
            console.error('Error al agregar nuevo registro:', err);
          }
        });
  
        socket.on('disconnect', () => {
          console.log('Cliente desconectado en la ruta /ticketsPortal');
        });
      });

    isSocketInitialized = true;
  }
}

module.exports = { initializeSocket };
