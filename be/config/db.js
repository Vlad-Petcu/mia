import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
    user: "me",
    host: "localhost",
    database: "api",
    password: "password",
    port: 5432,
  });

export default pool;