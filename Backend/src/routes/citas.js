const express = require('express');
const router = express.Router();

const citasController = require('../controllers/citasController');

router.post('/add', citasController.createCita);
router.get('/returnDatesUser', citasController.obtenerCita);
router.post('/returnDates', citasController.obtenerCitasProgramadas);
router.put('/updateState', citasController.actualizarEstadoCita);
router.post('/returndatesdoctor', citasController.obtenerCitasPorMedico);
router.get('/returncitashistorial/:idUsuario',citasController.obtenerCitasProgramadasHistorial)
router.get('/returncitashistorialdoctor/:idUsuario',citasController.obtenerCitasProgramadasHistorialMedico)

module.exports = router;
//routes/citas.js