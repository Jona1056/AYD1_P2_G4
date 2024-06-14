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
    res.status(500).json({ message: error });
  }
};


