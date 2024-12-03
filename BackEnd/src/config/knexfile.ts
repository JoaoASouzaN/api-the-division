import { Knex } from 'knex';
import dotenv from 'dotenv';

dotenv.config();

const config: Knex.Config ={
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'ApiTheDivision',
    },
    migrations: {
      directory: './src/migrations',
    },
    seeds: {
      directory: './src/seeds',
    },
  };
  
  export default config;