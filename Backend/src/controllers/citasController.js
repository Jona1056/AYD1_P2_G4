const Cita = require('../models/Citas');
const fs = require('fs');
const path = require('path');
const sendGridApi = require('@sendgrid/mail');

exports.createCita = async (req, res) => {
  const { pacienteID, medicoID, fecha, hora, motivo, estado, direccionClinica } = req.body;

  try {
    const result = await Cita.createCita(
      pacienteID,
      medicoID,
      fecha,
      hora,
      motivo,
      estado,
      direccionClinica
    );
    if (!result.success) {
      return res.status(400).json({ message: '[ERROR] ' + result.message });
    }
    res.status(201).json({ message: result.message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

exports.obtenerCitasProgramadas = async (req, res) => {
  const { idUsuario } = req.body;

  try {
    const result = await Cita.obtenerCitasProgramadas(idUsuario);
    if (!result) {
      return res.status(400).json({ message: '[ERROR] No se encontraron citas programadas' });
    }
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

exports.obtenerCitasProgramadasHistorial = async (req, res) => {
  const { idUsuario } = req.params;
  try {
    const result = await Cita.obtenerCitasHistorial(idUsuario);
    if (!result) {
      return res.status(400).json({ message: '[ERROR] No se encontraron citas programadas' });
    }
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

exports.obtenerCitasProgramadasHistorialMedico = async (req, res) => {
  const { idUsuario } = req.params;
  try {
    const result = await Cita.obtenerCitasProramadasPorMedicoHistorial(idUsuario);
    if (!result) {
      return res.status(400).json({ message: '[ERROR] No se encontraron citas programadas' });
    }
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error });
  }
}



exports.obtenerCitasPorMedico = async (req, res) => {
  const { idUsuario } = req.body;

  try {
    const result = await Cita.obtenerCitasProramadasPorMedico(idUsuario);
    if (!result) {
      return res.status(400).json({ message: '[ERROR] No se encontraron citas programadas' });
    }
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

const cargarPlantillaEmail = (datos, mensaje) => {
  try {
    const filePath = path.join(__dirname, '../templates/emailTemplate.html');
    const data = fs.readFileSync(filePath, 'utf8');
    const plantillaHtml = data
      .replace('{{Nombre}}', datos.Nombre)
      .replace('{{Apellido}}', datos.Apellido)
      .replace('{{Fecha}}', datos.Fecha)
      .replace('{{Hora}}', datos.Hora)
      .replace('{{mensaje}}', mensaje)
    return plantillaHtml;
  } catch (error) {
    console.error(error);
    return `<p>${error}</p>`
  }
}

exports.actualizarEstadoCita = async (req, res) => {
  const { idCita, estado, text } = req.body;
  try {
    console.error(req.body)
    const result = await Cita.actualizarEstadoCita(idCita, estado);

    if (!result) {
      return res.status(400).json({ message: '[ERROR] No se pudo actualizar el estado de la cita' });
    }

    if (estado === 'Cancelada por Medico') {
      const datosPaciente = await Cita.obtenerDatosPacienteIdCita(idCita);
      const { fechaFormateada, horaFormateada } = convertirFechaHora(datosPaciente.Fecha, datosPaciente.Hora);
      datosPaciente.Fecha = fechaFormateada;
      datosPaciente.Hora = horaFormateada;

      sendGridApi.setApiKey(process.env.SENDGRID_API_KEY);
      console.error(datosPaciente)

      const htmlDiseno = cargarPlantillaEmail(datosPaciente, text);
      const msg = {
        to: datosPaciente.Correo,
        from: process.env.SG_EMAIL,
        subject: 'Cancelacion de cita',
        html: htmlDiseno
      }
      await sendGridApi.send(msg);
    }

    res.status(201).json({ message: 'Estado de la cita actualizado con éxito' });
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error });
  }
}

exports.obtenerCita = async (req, res) => {
  const { pacienteID, fecha, hora, motivo, direccionClinica } = req.body;
  try {
    const result = await Cita.obtenerCita(
      pacienteID,
      fecha,
      hora,
      motivo,
      direccionClinica
    );
    if (!result.success) {
      return res.status(400).json({ message: '[ERROR] ' + result.message });
    }
    res.status(201).json({ message: result.message });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};


function convertirFechaHora(fecha, hora) {
  const fechaObj = new Date(fecha);
  const dia = fechaObj.getDate();
  const mes = fechaObj.getMonth() + 1;
  const año = fechaObj.getFullYear();

  let horas = hora.split(':')[0];
  let minutos = hora.split(':')[1];

  const fechaFormateada = `${dia}/${mes}/${año}`;

  const horaFormateada = `${horas}:${minutos}`;

  return { fechaFormateada, horaFormateada };
}
