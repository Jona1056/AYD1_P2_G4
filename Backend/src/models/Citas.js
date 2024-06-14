
const db = require('../config/db');

class Citas {
    constructor(id,paicenteID,medicoID,fecha,hora,motivo,estado) {
        this.id = id;
        this.pacienteID = paicenteID;
        this.medicoID = medicoID;
        this.fecha = fecha;
        this.hora = hora;
        this.motivo = motivo;
        this.estado = estado;
    }
    
    static async createCita(pacienteID, medicoID, fecha, hora, motivo, estado,direccionClinica ) {
        try {

            const [rows] = await db.query('SELECT * FROM Citas WHERE MedicoID = ? AND Fecha = ? AND Hora = ?', [medicoID, fecha, hora]);
            if (rows.length > 0) {
                return { success: false, message: 'Esta cita ya está ocupada'};
            }

            await db.query('INSERT INTO Citas(PacienteID, MedicoID, Fecha, Hora, Motivo, Estado,direccionClinica) VALUES(?, ?, ?, ?, ?, ?,?)', [pacienteID, medicoID, fecha, hora, motivo, estado,direccionClinica ]);
            return { success: true, message: 'Cita programada con éxito' };
        } catch (error) {
            return { success: false, message: 'Error al crear la cita', error };
        }
    }

}