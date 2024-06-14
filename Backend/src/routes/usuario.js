const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.get('/', usuarioController.getAllUsuarios);
router.post('/add', usuarioController.createUsuario);
router.delete('/delete/:id_usuario', usuarioController.deleteUsuario);
router.put('/update/:correo', usuarioController.updateUsuario);
router.get('/doctoresSinCita/:id_usuario', usuarioController.getDoctorSinCita);
router.post('/doctoresSinCitaEspecialidad/:id_usuario', usuarioController.getDoctorSinCitaEspecialidad);
/*
Para consultar un medico por especialidad se debe enviar un json con el siguiente formato:
{
  "especialidades": ["especialidad1", "especialidad2", "especialidad3"]
}
*/

module.exports = router;
