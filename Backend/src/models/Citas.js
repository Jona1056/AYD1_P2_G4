
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
            const direccionClinicaCliente = await db.query('SELECT direccionClinica FROM Medicos WHERE id = ?', [medicoID]);
        
            await db.query('INSERT INTO Citas(PacienteID, MedicoID, Fecha, Hora, Motivo, Estado,direccionClinica) VALUES(?, ?, ?, ?, ?, ?,?)', [pacienteID, medicoID, fecha, hora, motivo, estado,direccionClinicaCliente ]);
            return { success: true, message: 'Cita programada con éxito' };
        } catch (error) {
            console.log(error);
            return { success: false, message: 'Error al crear la cita', error };
        }
    }



    static async obtenerCitasProgramadas(idUsuario) {
        try{    
            const [rows] = await db.query('SELECT * FROM Citas WHERE PacienteID = ? AND Estado = "Programada"', [idUsuario]);

            return rows;
        }catch(error){
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
