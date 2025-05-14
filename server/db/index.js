
const { Pool } = require('pg');
const config = require('../config');

const pool = new Pool({
  connectionString: config.databaseUrl,
  ssl: config.env === 'production' ? { rejectUnauthorized: false } : false
});

// Testar conexão
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conexão com o banco de dados estabelecida com sucesso');
  }
});

// Função para conectar ao banco de dados
async function connectToDatabase() {
  try {
    const client = await pool.connect();
    console.log('Conectado ao PostgreSQL');
    client.release();
    return true;
  } catch (error) {
    console.error('Erro ao conectar ao PostgreSQL:', error);
    throw error;
  }
}

module.exports = {
  query: (text, params) => pool.query(text, params),
  connectToDatabase,
  pool
};
