const Usuario = require('../models/Usuario')

exports.login = async (req, res) => {
  const { correo, contrasena } = req.body;

  try {
    const usuario = await Usuario.authUser(correo, contrasena);
    if (!usuario) {
      return res.status(401).json({ message: 'Correo o contraseña incorrectos' });
    }
   
    res.status(201).json({ message: 'Inicio de sesion exitoso', id_usuario: usuario.ID, rol: usuario.Rol });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesion' });
  }
}
