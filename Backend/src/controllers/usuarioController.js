const Usuario = require('../models/Usuario')

exports.getAllUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.getAll();
    res.json(usuarios)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
};


exports.createUsuario = async (req, res) => {
  const { Nombre, Apellido, Genero, Correo, Contrasena, Rol, Foto, FechaNacimiento, Especialidad, DireccionClinica } = req.body;
  try {
    const nuevoUsuario = await Usuario.createUsuario(Nombre, Apellido, Genero, Correo, Contrasena, Rol, Foto, FechaNacimiento, Especialidad, DireccionClinica);
    res.status(201).json({ message: 'Usuario creado exitosamente' });
  } catch (error) {

    res.status(500).json({ message: error.message })
  }
}

exports.deleteUsuario = async (req, res) => {

  console.log("entro")
  const { id_usuario } = req.params;
  console.log("hola")
  try {
    await Usuario.delete(id_usuario);
    res.json({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.updateUsuario = async (req, res) => {
  const { correo } = req.params;
  const { Nombre, Apellido, Genero, Contrasena, Rol, Foto, FechaNacimiento, Especialidad, DireccionClinica } = req.body;
  
  try {
    const usuarioActualizado = await Usuario.update(Nombre, Apellido, Genero, correo, Contrasena, Rol, Foto, FechaNacimiento, Especialidad, DireccionClinica);
    res.json(usuarioActualizado);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.getDoctorSinCita = async (req, res) => {
  const { id_usuario } = req.params;
  try {
    const doctores = await Usuario.getAllDoctorSinCita(id_usuario);
  
    res.json(doctores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.getMedicoById = async (req, res) => {
  const { id_usuario } = req.params;
  try {
    const medico = await Usuario.getMedicoById(id_usuario);
    return res.status(200).json(medico);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.getUsuarioById = async (req, res) => {
  const { id_usuario } = req.params;
  try {
    const usuario = await Usuario.getUsuarioById(id_usuario);
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.getDoctorSinCitaEspecialidad = async (req, res) => {
  const { id_usuario } = req.params;
  const { especialidades } = req.body;
  try {
    const doctores = await Usuario.getDoctorSinCitaEspecialidad(id_usuario, especialidades);
    res.json(doctores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

