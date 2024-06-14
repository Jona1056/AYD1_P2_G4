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

  static async createHorario(diaSemana, horaInicio, horaFin, medicoId) {
    try {
      const result = await db.query('INSERT INTO HorariosMedicos(DiaSemana, HoraInicio, HoraFin, MedicoID) VALUES(?, ?, ?, ?)', [diaSemana, horaInicio, horaFin, medicoId]);
      return true;
    } catch (error) {
      return false;
    }
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

  static async updateHorario(diaSemana, horaInicio, horaFin, medicoId) {
    try {
      const result = await db.query('UPDATE HorariosMedicos SET HoraInicio = ?, HoraFin = ? WHERE DiaSemana = ? AND MedicoID = ?', [horaInicio, horaFin, diaSemana, medicoId]);
      return true;
    } catch (error) {
      return false;
    }
  }
}


module.exports = Horario;

