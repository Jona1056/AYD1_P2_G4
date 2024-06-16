const express = require('express');
const router = express.Router();

const citasController = require('../controllers/citasController');

router.post('/add', citasController.createCita);
router.get('/returnDatesUser', citasController.obtenerCita);
router.get('/returnDates', citasController.obtenerCitasProgramadas);
router.put('/updateState', citasController.actualizarEstadoCita);


module.exports = router;
//routes/citas.js