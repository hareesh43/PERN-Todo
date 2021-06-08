const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  hostname: "localhost",
  port: 5432,
});

module.exports = pool;
