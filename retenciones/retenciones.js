const fs = require('fs');

// Función para agregar un nuevo registro al archivo
function agregarNuevoRegistro(data) {

    const newData = { id: data.id, message: data.message, status: data.status };


// Leer el archivo o crear uno nuevo si no existe
fs.readFile('retenciones.json', 'utf8', (err, fileData) => {
    let records = [];

    if (!err) {
      records = JSON.parse(fileData);
    }

    records.push(newData);

    // Escribir los datos en el archivo
    fs.writeFile('retenciones.json', JSON.stringify(records), (err) => {
      if (err) {
        console.error('Error al escribir en el archivo:', err);
      } else {
        console.log('Nuevo registro agregado al archivo');
      }
    });
  });

}

function obtenerDatos(req, res) {
    fs.readFile('retenciones.json', 'utf8', (err, data) => {
      if (err) {
        console.error('Error al leer el archivo:', err);
        res.status(500).send('Error al leer los datos.');
      } else {
        const records = JSON.parse(data);
        const recordsWithStatus1 = records.filter(record => record.status === 1);
        console.log(recordsWithStatus1);
        res.json(recordsWithStatus1);
      }
    });
  }

  function actualizarEstado(req, res) {
    
    const idToUpdate = parseInt(req.params.id);
    const nuevoEstado = req.body.status;
  
    fs.readFile('retenciones.json', 'utf8', (err, fileData) => {
      if (err) {
        console.error('Error al leer el archivo:', err);
        res.status(500).send('Error al leer los datos.');
      } else {
        const records = JSON.parse(fileData);
        const registroActualizado = records.find(registro => registro.id === idToUpdate);
  
        if (registroActualizado) {
          registroActualizado.status = nuevoEstado;
  
          fs.writeFile('retenciones.json', JSON.stringify(records), (err) => {
            if (err) {
              console.error('Error al escribir en el archivo:', err);
              res.status(500).send('Error al escribir los datos.');
            } else {
              console.log('Estado actualizado correctamente');
              res.status(200).send('Estado actualizado correctamente');
              obtenerDatos()
            }
          });
        } else {
          res.status(404).send('Registro no encontrado');
        }
      }
    });
  }

module.exports = {
  agregarNuevoRegistro,
  obtenerDatos,
  actualizarEstado
};