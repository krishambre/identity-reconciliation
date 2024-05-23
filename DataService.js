const { Pool } = require('pg');

class DataService {
  constructor() {
    this.pool = new Pool({
      user: 'your_username',
      host: process.env.HOST || 'localhost',
      database: 'your_database_name',
      password: 'your_password',
      port: 5432,
    });
  }

  query(sql, params) {
    return this.pool.query(sql, params);
  }
}