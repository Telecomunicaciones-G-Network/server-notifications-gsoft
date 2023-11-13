const notifications =require('../firebase/sendNotifications')
const axios = require("axios");
const config = require('../config/config')



// Función para agregar un nuevo registro al archivo
function agregarNuevoRegistro(data,ticketNotificacion) {
  const token = data.token;
  const department=data.ticket.office;
  ticketNotificacion.emit('nuevoTicket-portal', data.ticket);
  getTokens(token,department)
}

// function agregarNuevoToken(req, res) {
//   const newData = req.body.token;
//   console.log(req.body);
//   // Leer el archivo o crear uno nuevo si no existe
//   fs.readFile("tokens.json", "utf8", (err, fileData) => {
//     let records = [];

//     if (!err) {
//       records = JSON.parse(fileData);
//     }

//     // Verificar si el token ya existe en los registros
//     const tokenExist = records.some((record) => record === newData);

//     if (!tokenExist) {
//       // Si el token no existe, agregarlo al array
//       records.push(newData);

//       // Escribir los datos en el archivo
//       fs.writeFile("tokens.json", JSON.stringify(records), (err) => {
//         if (err) {
//           console.error("Error al escribir en el archivo:", err);
//         } else {
//           console.log("Nuevo registro agregado al archivo");
//         }
//       });
//       res.send("Token recibido correctamente");
//     } else {
//       // Si el token ya existe, enviar una respuesta indicando que el token ya está en uso
//       res.status(201).send("El token ya existe");
//     }
//   });
// }



// Leer la lista de tokens desde el archivo JSON
function getTokens(token,department) {
  // console.log(token);
  // Configuración de la solicitud con la cabecera Authorization
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







module.exports = {
  agregarNuevoRegistro,
};
