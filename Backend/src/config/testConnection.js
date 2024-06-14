const db = require('./db');

async function testConnection() {
  try {
    const [rows] = await db.query('SELECT 1 + 1 AS result');

    return { message: 'Connection successful', result: rows[0].result };

  } catch (error) {
    return { message: 'Connection failed', error: error.message };
  }
}

module.exports = { testConnection };
