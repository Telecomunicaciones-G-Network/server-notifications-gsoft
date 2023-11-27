const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // ...otras configuraciones
});

// Función para enviar notificaciones push a una lista de tokens
function enviarNotificacionesPush(tokens, mensaje) {
  tokens.forEach((token) => {
    const message = {
      notification: {
        title: 'Ticket Creado',
        body: mensaje,

      },
      // data: {
      //   url: 'http://localhost:4200/home/tickets/tickets',
      // },
      token: token.browser_token_id,
      webpush: {
        fcm_options: {
          link: 'https://core.gsoft.app/home/tickets/tickets',
        },
        notification: {
          icon: 'https://core.gsoft.app/assets/img/gnet10.png', // Reemplaza con la URL de tu icono
        },
      },
      // webpush: {
      //   notification: {
      //     actions: [
      //       {
      //         action: 'ver_ticket',
      //         title: 'Ver Ticket',
      //         LinkUrl:'http://localhost:4200/home/tickets/tickets'
      //       },
      //     ],
      //   },
      // },
    };

    admin.messaging().send(message)
      .then((response) => {
        console.log('Notificación push enviada con éxito al token:', token.browser_token_id);
        console.log(response);
      })
      .catch((error) => {
        console.error('Error al enviar la notificación push al token:', token.browser_token_id, error);
      });
  });
}

module.exports = {
  enviarNotificacionesPush
};
