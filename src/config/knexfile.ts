import { Knex } from 'knex';
import dotenv from 'dotenv';

dotenv.config();

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'mysql',
    connection: {
      server: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      options: {
        encrypt: false, // Defina como true se precisar de criptografia
        enableArithAbort: true,
      },
    },
  },
  production: {
    client: 'mssql',
    connection: {
      server: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      options: {
        encrypt: false,
        enableArithAbort: true,
      },
    },
  },
};

export default config;