
const db = require('../config/db');

class Citas {
  constructor(id, paicenteID, medicoID, fecha, hora, motivo, estado) {
    this.id = id;
    this.pacienteID = paicenteID;
    this.medicoID = medicoID;
    this.fecha = fecha;
    this.hora = hora;
    this.motivo = motivo;
    this.estado = estado;
  }

  static async createCita(pacienteID, medicoID, fecha, hora, motivo, estado, direccionClinica) {
    try {

      const [rows] = await db.query('SELECT * FROM Citas WHERE MedicoID = ? AND Fecha = ? AND Hora = ? AND Estado = ?', [medicoID, fecha, hora, "Programada"]);
      if (rows.length > 0) {
        console.log(rows)
        return { success: false, message: 'Esta cita ya está ocupada' };
      }

      const direccionClinicaCliente = await db.query('SELECT direccionClinica FROM Usuarios WHERE id = ?', [medicoID]);

      await db.query('INSERT INTO Citas(PacienteID, MedicoID, Fecha, Hora, Motivo, Estado,direccionClinica) VALUES(?, ?, ?, ?, ?, ?,?)', [pacienteID, medicoID, fecha, hora, motivo, estado, direccionClinicaCliente[0][0].direccionClinica]);
      return { success: true, message: 'Cita programada con éxito' };
    } catch (error) {
      console.log(error);
      return { success: false, message: 'Error al crear la cita', error };
    }
  }



  static async obtenerCitasProgramadas(idUsuario) {

    try {
      const query = `
                SELECT 
                    Citas.*, 
                    Pacientes.nombre AS nombre_paciente, 
                    Pacientes.apellido AS apellido_paciente,
                    Medicos.nombre AS nombre_medico, 
                    Medicos.apellido AS apellido_medico
                FROM 
                    Citas
                JOIN 
                    Usuarios AS Pacientes 
                ON 
                    Citas.PacienteID = Pacientes.id
                JOIN 
                    Usuarios AS Medicos 
                ON 
                    Citas.MedicoID = Medicos.id
                WHERE 
                    Citas.PacienteID = ? 
                AND 
                    Citas.Estado = "Programada"
            `;

      const [rows] = await db.query(query, [idUsuario]);

      return rows;
    } catch (error) {
      console.error("Error al obtener las citas programadas:", error);
      return null;
    }
  }

  static async obtenerCitasHistorial(idUsuario) {

    try {
      const query = `
                SELECT 
                    Citas.*, 
                    Pacientes.nombre AS nombre_paciente, 
                    Pacientes.apellido AS apellido_paciente,
                    Medicos.nombre AS nombre_medico, 
                    Medicos.apellido AS apellido_medico
                FROM 
                    Citas
                JOIN 
                    Usuarios AS Pacientes 
                ON 
                    Citas.PacienteID = Pacientes.id
                JOIN 
                    Usuarios AS Medicos 
                ON 
                    Citas.MedicoID = Medicos.id
                WHERE 
                    Citas.PacienteID = ? 
                AND 
                    Citas.Estado != "Programada"
            `;

      const [rows] = await db.query(query, [idUsuario]);

      return rows;
    } catch (error) {
      console.error("Error al obtener las citas no programadas:", error);
      return null;
    }
  }

  static async obtenerCitasProramadasPorMedico(idMedico) {
    try {
      const query = `
                SELECT 
                    Citas.*, 
                    Pacientes.nombre AS nombre_paciente, 
                    Pacientes.apellido AS apellido_paciente,
                    Medicos.nombre AS nombre_medico, 
                    Medicos.apellido AS apellido_medico
                FROM 
                    Citas
                JOIN 
                    Usuarios AS Pacientes 
                ON 
                    Citas.PacienteID = Pacientes.id
                JOIN 
                    Usuarios AS Medicos 
                ON 
                    Citas.MedicoID = Medicos.id
                WHERE 
                    Citas.MedicoID = ? 
                AND 
                    Citas.Estado = "Programada"
            `;

      const [rows] = await db.query(query, [idMedico]);

      return rows;
    } catch (error) {
      console.error("Error al obtener las citas programadas:", error);
      return null;
    }
  }

  static async obtenerCitasProramadasPorMedicoHistorial(idMedico) {
    try {
      const query = `
                SELECT 
                    Citas.*, 
                    Pacientes.nombre AS nombre_paciente, 
                    Pacientes.apellido AS apellido_paciente,
                    Medicos.nombre AS nombre_medico, 
                    Medicos.apellido AS apellido_medico
                FROM 
                    Citas
                JOIN 
                    Usuarios AS Pacientes 
                ON 
                    Citas.PacienteID = Pacientes.id
                JOIN 
                    Usuarios AS Medicos 
                ON 
                    Citas.MedicoID = Medicos.id
                WHERE 
                    Citas.MedicoID = ? 
                AND 
                    Citas.Estado != "Programada"
            `;

      const [rows] = await db.query(query, [idMedico]);

      return rows;
    } catch (error) {
      console.error("Error al obtener las citas programadas:", error);
      return null;
    }
  }

  static async actualizarEstadoCita(idCita, estado) {
    try {
      await db.query('UPDATE Citas SET Estado = ? WHERE id = ?', [estado, idCita]);
      return true;
    } catch (error) {
      return false;
    }
  }

  static async obtenerDatosPacienteIdCita(idCita) {
    try {
      const [rows] = await db.query(`SELECT 
                                            Usuarios.Nombre,
                                            Usuarios.Apellido,
                                            Usuarios.Correo,
                                            Citas.Fecha,
                                            Citas.Hora
                                          From
                                            Citas
                                          INNER JOIN
                                            Usuarios ON Citas.PacienteID = Usuarios.ID
                                          WHERE
                                            Citas.ID = ?`, [idCita]);
      return rows[0];
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async obtenerCita(pacienteID, fecha, hora, motivo, direccionClinica) {
    try {
      const [rows] = await db.query('SELECT * FROM Citas WHERE PacienteID = ? AND Fecha = ? AND Hora = ? AND Motivo = ?  AND direccionClinica = ?', [pacienteID, fecha, hora, motivo, direccionClinica]);
      return rows;
    } catch (error) {
      return null;
    }
  }

}

module.exports = Citas;
