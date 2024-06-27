const app = require('./app');
const dotenv = require('dotenv');
const db = require('./config/db');

dotenv.config();

const PORT = process.env.PORT || 3000;

db.getConnection()
  .then(() => {
    console.warn('Database connected');
    app.listen(PORT, () => { console.warn(`Server is running on port ${PORT}`) });
  })
  .catch((err) => {
    console.error('Database connection error', err);
  });
