const notifications =require('../firebase/sendNotifications')
const axios = require("axios");
const config = require('../config/config')



// Función para agregar un nuevo registro al archivo
function agregarNuevoRegistro(data,ticketNotificacion) {
  const token = data.token;
  const department=data.ticket.office;
  ticketNotificacion.emit('nuevoTicket', data.ticket);

  const axiosConfig = {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json', // Puedes ajustar el tipo de contenido según las necesidades de tu API
    },
  };
  // Realizar la solicitud a la API
  axios.get(`${config.apiUrl}/api/gsoft/notifications/token/?remove_pagination=true&department=${department}`, axiosConfig)
    .then(response => {
      // Manejar la respuesta de la API
      // console.log('Respuesta de la API:', response.data);
      const mensaje = 'Mensaje de notificación de Nuevo Ticket';
      const tokens =response.data;
      // console.log(tokens);
      notifications.enviarNotificacionesPush(tokens, mensaje)
    })
    .catch(error => {
      // Manejar errores de la solicitud
      console.error('Error al hacer la solicitud a la API:', error.message);
    });
}

function agregarNuevoRegistroPortal(data,ticketNotificacion) {
  const token = data.token;
  const department=data.ticket.office;
  ticketNotificacion.emit('nuevoTicket', data.ticket);

  const axiosConfig = {
    headers: {
      'Authorization': `Token-socket ${token}`,
      'Content-Type': 'application/json', // Puedes ajustar el tipo de contenido según las necesidades de tu API
    },
  };
  // Realizar la solicitud a la API
  axios.get(`${config.apiUrl}/api/gsoft/portal/notifications/token/?remove_pagination=true&department=${department}`, axiosConfig)
    .then(response => {
      // Manejar la respuesta de la API
      // console.log('Respuesta de la API:', response.data);
      const mensaje = 'Mensaje de notificación de Nuevo Ticket';
      const tokens =response.data;
      // console.log(tokens);
      notifications.enviarNotificacionesPush(tokens, mensaje)
    })
    .catch(error => {
      // Manejar errores de la solicitud
      console.error('Error al hacer la solicitud a la API:', error.message);
    });
}
// // Leer la lista de tokens desde el archivo JSON
// function getTokens(token,department) {
//   // console.log(token);
//   // Configuración de la solicitud con la cabecera Authorization
// const axiosConfig = {
//   headers: {
//     'Authorization': `Bearer ${token}`,
//     'Content-Type': 'application/json', // Puedes ajustar el tipo de contenido según las necesidades de tu API
//   },
// };
// // Realizar la solicitud a la API
// axios.get(`${config.apiUrl}/api/gsoft/notifications/token/?remove_pagination=true&department=${department}`, axiosConfig)
//   .then(response => {
//     // Manejar la respuesta de la API
//     // console.log('Respuesta de la API:', response.data);
//     const mensaje = 'Mensaje de notificación de Nuevo Ticket';
//     const tokens =response.data;
//     // console.log(tokens);
//     notifications.enviarNotificacionesPush(tokens, mensaje)
//   })
//   .catch(error => {
//     // Manejar errores de la solicitud
//     console.error('Error al hacer la solicitud a la API:', error.message);
//   });
// }







module.exports = {
  agregarNuevoRegistro,
  agregarNuevoRegistroPortal
};
