import { Pool } from 'pg';

const db = new Pool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '16241'),
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
    allowExitOnIdle: false
})

export default db