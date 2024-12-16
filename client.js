import pkg from 'pg';
const { Pool } = pkg;

// Pool-konfiguraatio
const pool = new Pool({
  user: 'your_user',
  host: 'localhost',
  database: 'your_database',
  password: 'your_password',
  port: 5432,
});

export { pool as client };
