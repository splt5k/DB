const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
};

async function executeQuery(query) {
  const connection = await mysql.createConnection(dbConfig);
  try {
    const [results] = await connection.execute(query);
    return results;
  } finally {
    await connection.end();
  }
}

module.exports = { executeQuery };