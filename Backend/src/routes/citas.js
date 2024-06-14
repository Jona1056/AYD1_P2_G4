const express = require('express');
const router = express.Router();

const citasController = require('../controllers/citasController');

router.post('/add', citasController.createCita);


module.exports = router;
//routes/citas.js