const express = require('express');
const router = express.Router();
const retenciones = require('./retenciones/retenciones'); // Importa el archivo de funciones
const tickets = require('./tickets/tickets'); // Importa el archivo de funciones

// Ruta para agregar un nuevo registro al archivo
router.post('/agregar', retenciones.agregarNuevoRegistro);
router.get('/datos', retenciones.obtenerDatos);
router.patch('/actualizar/:id', retenciones.actualizarEstado);


//rutas para tickets y notificaciones
// router.post('/token', tickets.agregarNuevoToken);
// router.get('/notifications', tickets.getNotifications);

module.exports = router;