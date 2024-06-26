const db = require('../config/db');

class Horario {
  constructor(diaSemana, horaInicio, horaFin, medicoId) {
    this.MedicoID = medicoId;
    this.DiaSemana = diaSemana;
    this.HoraInicio = horaInicio;
    this.HoraFin = horaFin;
  }

  static async getAllHorariosDoctor(medicoId) {
    const [rows] = await db.query('SELECT * FROM  HorariosMedicos WHERE MedicoID = ? ', [medicoId]);
    return rows.map(row => new Horario(row.DiaSemana, row.HoraInicio, row.HoraFin, row.MedicoID));
  }

  static async getHorarioDoctorDia(medicoId, diaSemana) {
    const [rows] = await db.query('SELECT * FROM HorariosMedicos WHERE MedicoID = ? AND DiaSemana = ?', [medicoId, diaSemana]);
    return rows.map(row => new Horario(row.DiaSemana, row.HoraInicio, row.HoraFin, row.MedicoID));
  }
  

  static async createHorario(medicoId, horaInicio, horaFin, dia) {
    try {
      console.log(medicoId, dia);
      const [rows] = await db.query('SELECT * FROM HorariosMedicos WHERE MedicoID = ? AND DiaSemana = ? AND HoraInicio = ? AND HoraFin = ?', [medicoId, dia, horaInicio, horaFin]);
      if (rows.length > 0) {
        return { success: false, message: 'Horario ya registrado' };
      }

      await db.query('INSERT INTO HorariosMedicos(DiaSemana, HoraInicio, HoraFin, MedicoID) VALUES(?, ?, ?, ?)', [dia, horaInicio, horaFin, medicoId]);
      return { success: true, message: 'Horario creado con éxito' };
    } catch (error) {
      console.log(error)
      return { success: false, message: 'Error al crear el horario', error };
    }
  }

  static async getHorarioPorDia(diaSemana) {

    const [rows] = await db.query('SELECT * FROM HorariosMedicos WHERE DiaSemana = ? ', [diaSemana, medicoId]);
    return rows.map(row => new Horario(row.DiaSemana, row.HoraInicio, row.HoraFin, row.MedicoID));
  }

  static async deleteHorario(diaSemana, medicoId) {
    try {
      console.log(diaSemana, medicoId);
      await db.query('DELETE FROM HorariosMedicos WHERE DiaSemana = ? AND MedicoID = ?', [diaSemana, medicoId]);
      return true;
    } catch (error) {
      return false;
    }
  }

  static async updateHorario(medicoID, DiaSemana, HoraInicio, HoraFin, diaN, horaInicioN, horaFinN) {
    try {
      // console.log('UPDATE HorariosMedicos SET HoraInicio = ?, HoraFin = ?, DiaSemana = ? WHERE MedicoID = ?, HoraInicio = ?, HoraFin = ? AND DiaSemana = ? ', [horaInicioN, horaFinN, diaN, medicoID, HoraInicio, HoraFin, DiaSemana])
      const result = await db.query('UPDATE HorariosMedicos SET HoraInicio = ?, HoraFin = ?, DiaSemana = ? WHERE MedicoID = ? AND HoraInicio = ? AND HoraFin = ? AND DiaSemana = ? ', [horaInicioN, horaFinN, diaN, medicoID, HoraInicio, HoraFin, DiaSemana]);
      return true;
    } catch (error) {
      return false;
    }
  }
}


module.exports = Horario;

