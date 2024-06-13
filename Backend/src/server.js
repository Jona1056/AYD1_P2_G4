const app = require('./app');
const dotenv = require('dotenv');
const db = require('./config/db');

dotenv.config();

const PORT = process.env.PORT || 3000;

db.getConnection()
  .then(() => {
    console.log('Database connected');
    app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`) });
  })
  .catch((err) => {
    console.log('Database connection error', err);
  });
