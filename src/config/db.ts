import knex from 'knex';
import config from './knexfile';

const environment = process.env.NODE_ENV || 'development';
const connection = knex(config[environment]);

// Teste de conexão
connection.raw('SELECT 1')
  .then(() => {
    console.log('Sucesso! Conexão com o banco de dados estabelecida.');
  })
  .catch((err) => {
    console.error('Falha ao conectar ao banco de dados:', err);
  });

export default connection;