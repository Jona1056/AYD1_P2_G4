const db = require('../config/db');
const bcrypt = require('bcrypt');

class Usuario {
  constructor(nombre, apellido, genero, correo, contrasena, rol, foto, fechaNacimiento, especialidad, direccionClinica, id = null) {
    this.ID = id;
    this.Nombre = nombre;
    this.Apellido = apellido;
    this.Genero = genero;
    this.Correo = correo;
    this.Contrasena = contrasena;
    this.Rol = rol;
    this.Foto = foto;
    this.FechaNacimiento = fechaNacimiento;
    this.Especialidad = especialidad;
    this.DireccionClinica = direccionClinica;
  }

  static async getAll() {
    const [rows] = await db.query('SELECT * FROM Usuarios');
    return rows.map(row => new Usuario(row.Nombre, row.Apellido, row.Genero, row.Correo, row.Contrasena, row.Rol, row.Foto, row.FechaNacimiento, row.Especialidad, row.DireccionClinica, row.ID));
  }
  static async createUsuario(nombre, apellido, genero, correo, contrasena, rol, foto, fechaNacimiento, especialidad, direccionClinica) {
    const hashedPassword = await bcrypt.hash(contrasena, 10);
    const [result] = await db.query('INSERT INTO Usuarios (Nombre, Apellido, Genero, Correo, Contrasena, Rol, Foto, FechaNacimiento, Especialidad, DireccionClinica) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [nombre, apellido, genero, correo, hashedPassword, rol, foto, fechaNacimiento, especialidad, direccionClinica]);
    return null;
  }

  static async delete(id_usuario) {
    await db.query('DELETE FROM Usuarios WHERE ID = ?', [id_usuario]);
  }

  static async update(nombre, apellido, genero, correo, contrasena, rol, foto, fechaNacimiento, especialidad, direccionClinica) {
    const hashedPassword = await bcrypt.hash(contrasena, 10);
    await db.query('UPDATE Usuarios SET Nombre = ?, Apellido = ?, Genero = ?, Contrasena = ?, Rol = ?, Foto = ?, FechaNacimiento = ?, Especialidad = ?, DireccionClinica = ? WHERE Correo = ?',
      [nombre, apellido, genero, hashedPassword, rol, foto, fechaNacimiento, especialidad, direccionClinica, correo]);
    return new Usuario(nombre, apellido, genero, correo, contrasena, rol, foto, fechaNacimiento, especialidad, direccionClinica);
  }

  static async findByCorreo(correo) {
    const [rows] = await db.query('SELECT * FROM Usuarios WHERE Correo = ?', [correo]);
    if (rows.length === 0) {
      return null;
    }
    return new Usuario(rows[0].Nombre, rows[0].Apellido, rows[0].Genero, rows[0].Correo, rows[0].Contrasena, rows[0].Rol, rows[0].Foto, rows[0].FechaNacimiento, rows[0].Especialidad, rows[0].DireccionClinica, rows[0].ID);
  }

  static async authUser(correo, contrasena) {
    const usuario = await Usuario.findByCorreo(correo);
    if (usuario === null) {
      return null;
    }
    const hashedPassword = usuario.Contrasena;
    if (usuario && await bcrypt.compare(contrasena, hashedPassword)) {
      return usuario;
    }
    return null;
  }

  static async getAllDoctorSinCita(id_usuario) {
    const medico = await db.query('SELECT U.* FROM Usuarios AS U LEFT JOIN Citas AS C ON U.ID = C.MedicoId AND C.PacienteID = ? WHERE U.Rol = "Medico" AND C.ID IS NULL', [id_usuario]);
    return new Usuario(medico.Nombre, medico.Apellido, medico.Genero, medico.Correo, medico.Contrasena, medico.Rol, medico.Foto, medico.FechaNacimiento, medico.Especialidad, medico.DireccionClinica, medico.ID);
  }

  static async getMedicoById(id_Usuario) {
    console.log(id_Usuario);
    const [rows] = await db.query('SELECT * FROM Usuarios WHERE ID = ? AND Rol = "Medico"', [id_Usuario]);
    return rows.map(row => new Usuario(row.Nombre, row.Apellido, row.Genero, row.Correo, row.Contrasena, row.Rol, row.Foto, row.FechaNacimiento, row.Especialidad, row.DireccionClinica, row.ID));
  }

  static async getUsuarioById(id_Usuario) {
    const [rows] = await db.query('SELECT * FROM Usuarios WHERE ID = ? AND Rol = "Paciente"', [id_Usuario]);
    return rows.map(row => new Usuario(row.Nombre, row.Apellido, row.Genero, row.Correo, row.Contrasena, row.Rol, row.Foto, row.FechaNacimiento, row.Especialidad, row.DireccionClinica, row.ID));
  }

  static async getDoctorSinCitaEspecialidad(id_usuario, especialidad) {
    const [rows] = await db.query('SELECT U.* FROM Usuarios AS U LEFT JOIN Citas AS C ON U.ID = C.MedicoID AND C.PacienteID = ? WHERE U.Rol = "Medico" AND C.ID IS NULL AND U.Especialidad IN (?)', [id_usuario, especialidad]);
    return rows.map(row => new Usuario(row.Nombre, row.Apellido, row.Genero, row.Correo, row.Contrasena, row.Rol, row.Foto, row.FechaNacimiento, row.Especialidad, row.DireccionClinica, row.ID));
  }
}

module.exports = Usuario;
