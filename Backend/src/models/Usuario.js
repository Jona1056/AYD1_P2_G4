const db = require('../config/db');

class Usuario {
  constructor(id_usuario, nombre, apellido, genero, correo, password, rol) {
    this.id_usuario = id_usuario;
    this.nombre = nombre;
    this.apellido = apellido;
    this.genero = genero;
    this.correo = correo;
    this.password = password;
    this.rol = rol;
  }

  static async getAll() {
    const [rows] = await db.query('SELECT * FROM Usuarios');
    return rows.map(row => new Usuario(row.id_usuario, row.nombre, row.apellido, row.genero, row.correo, row.password, row.rol, row.estado))
  }
}

module.exports = Usuario;
