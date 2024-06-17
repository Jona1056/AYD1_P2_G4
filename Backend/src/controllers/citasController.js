const Cita = require("../models/Citas");

exports.createCita = async (req, res) => {
  const { pacienteID, medicoID, fecha, hora, motivo, estado,direccionClinica } = req.body;
 
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
      return res.status(400).json({ message: "[ERROR] " + result.message });
    }
    res.status(201).json({ message: result.message });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

exports.obtenerCitasProgramadas = async (req, res) => {
  const { idUsuario } = req.body;

  try {
    const result = await Cita.obtenerCitasProgramadas(idUsuario);
    if (!result) {
      return res.status(400).json({ message: "[ERROR] No se encontraron citas programadas" });
    }
    res.status(201).json( result );
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

exports.obtenerCitasPorMedico = async (req, res) => {
  const { idUsuario } = req.body;

  try {
    const result = await Cita.obtenerCitasProramadasPorMedico(idUsuario);
    if (!result) {
      return res.status(400).json({ message: "[ERROR] No se encontraron citas programadas" });
    }
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

exports.actualizarEstadoCita = async (req, res) => {
  const { idCita, estado } = req.body;
  try {
    console.log(req.body)
    const result = await Cita.actualizarEstadoCita(idCita, estado);
    if (!result) {
      return res.status(400).json({ message: "[ERROR] No se pudo actualizar el estado de la cita" });
    }
    res.status(201).json({ message: "Estado de la cita actualizado con éxito" });
  } catch (error) {
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
      return res.status(400).json({ message: "[ERROR] " + result.message });
    }
    res.status(201).json({ message: result.message });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};