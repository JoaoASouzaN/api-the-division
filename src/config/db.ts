import knex from 'knex';
import config from './knexfile';

const environment = process.env.NODE_ENV || 'development';
const connection = knex(config[environment]);

// Teste de conexão
connection.raw('SELECT 1')
  .then(() => {
    console.log('Database connection successful');
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
  });

export default connection;