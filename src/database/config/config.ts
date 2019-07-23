import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PGPORT;
const DATABASE = process.env.PGDATABASE;

console.log(PORT, " ", DATABASE);
module.exports = {
  development: {
    url: `postgres://localhost:${PORT}/${DATABASE}`,
    dialect: "postgres",
    password: null
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "postgres"
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "postgres"
  }
};
