const Usuario = require('../models/Usuario')

exports.getAllUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.getAll();
    res.json(usuarios)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
};


