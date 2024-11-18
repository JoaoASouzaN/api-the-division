"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    development: {
        client: 'pg',
        connection: {
            host: '127.0.0.1',
            user: 'your_database_user',
            password: 'your_database_password',
            database: 'your_database_name',
        },
    },
    production: {
        client: 'pg',
        connection: {
            host: 'your_production_host',
            user: 'your_production_user',
            password: 'your_production_password',
            database: 'your_production_database',
        },
    },
};
exports.default = config;
