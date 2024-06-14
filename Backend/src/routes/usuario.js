const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.get('/', usuarioController.getAllUsuarios);
router.post('/add', usuarioController.createUsuario);
router.delete('/delete/:id_usuario', usuarioController.deleteUsuario);
router.put('/update/:correo', usuarioController.updateUsuario);

module.exports = router;
