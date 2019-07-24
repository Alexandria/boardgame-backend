import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PGPORT;
const DATABASE = process.env.PGDATABASE;

export const sequelize = new Sequelize(
  `postgres://localhost:${PORT}/${DATABASE}`
);
