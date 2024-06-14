const Horario = require('../models/Horarios');

exports.getHorarios = async (req, res) => {
  const { id } = req.params;
  try {
    const horarios = await Horario.getAllHorariosDoctor(id);
    return res.status(200).json(horarios);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error });
  }
}

exports.createHorario = async (req, res) => {
  const { MedicoID, HoraInicio, HoraFin, dia} = req.body;
  try {
      const result = await Horario.createHorario( MedicoID,HoraInicio, HoraFin,dia);
      if (!result.success) {
        return res.status(400).json({ message: '[ERROR] '+result.message});
      }
    res.status(201).json({ message: 'Horario creado con exito' });
  } catch (error) {

    res.status(500).json({ message: error });
  }
}

exports.deleteHorario = async (req, res) => {
  const { MedicoID, DiasSemana } = req.body;
  console.log(DiasSemana);
  try {
    for (const Dias of DiasSemana) {
      console.log(Dias);
      const result = await Horario.deleteHorario(Dias, MedicoID);
      if (!result) {
        return res.status(400).json({ message: 'Error al eliminar el horario' });
      }
    }
    res.status(200).json({ message: 'Horario eliminado con exito' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}
exports.getHorarioDoctorDia = async (req, res) => {
  const { dia, medicoID } = req.params;
  try {
    const horarios = await Horario.getHorarioDoctorDia(medicoID, dia);
    return res.status(200).json(horarios);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
}