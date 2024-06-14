const express = require('express')
const cors = require('cors')


const usuariosRouter = require('./routes/usuario')
const authRouter = require('./routes/auth')
const horariosRouter = require('./routes/horarios')

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/usuarios', usuariosRouter);
app.use('/api/login', authRouter);
app.use('/api/horarios', horariosRouter);


module.exports = app;
