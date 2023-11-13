const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json'); // Reemplaza con la ruta de tu archivo de credenciales de servicio


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    // ...otras configuraciones
  });
  
  // Función para enviar notificaciones push a una lista de tokens
  function enviarNotificacionesPush(tokens, mensaje) {
    // console.log(tokens);
    tokens.forEach((token) => {
      const message = {
        notification: {
          title: 'Ticket Creado',
          body: mensaje,
        },
        token: token.browser_token_id,
      };
  
      admin.messaging().send(message)
        .then((response) => {
          console.log('Notificación push enviada con éxito al token:', browser_token_id);
          console.log(response);
        })
        .catch((error) => {
          console.error('Error al enviar la notificación push al token:', browser_token_id, error);
        });
    });
  }

  module.exports = {
    enviarNotificacionesPush
  };

