const express = require('express');
const router = express.Router();

const horariosController = require('../controllers/horarioController');


router.get('/:id', horariosController.getHorarios);
router.get('/getHorarioDoctorDia/:dia/:medicoID', horariosController.getHorarioDoctorDia);
router.post('/add', horariosController.createHorario);
router.delete('/delete', horariosController.deleteHorario);
router.put('/update/:medicoID', horariosController.updateHorario);

/*
Para agregar un horario la estructura Json es la siguiente:
  {
  "MedicoID": 3,
  "HoraInicio": "08:00:00",
  "HoraFin": "12:00:00",
  "DiasSemana": ["Lunes", "Martes", "Miércoles"]
}
 
 */
/*
Para eliminar un horario la estructura Json es la siguiente:
  {
  "MedicoID": 3,
  "DiasSemana": ["Lunes", "Martes", "Miércoles"]
}
 
 */

module.exports = router;
