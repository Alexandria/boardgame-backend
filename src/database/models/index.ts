import fs from "fs";
import path from "path";
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

const basename = path.basename(__filename);

interface DB {
  [key: string]: any;
}
const db: DB = {};
dotenv.config();

const PORT = process.env.PGPORT;
const DATABASE = process.env.PGDATABASE;

export const sequelize = new Sequelize(
  `postgres://localhost:${PORT}/${DATABASE}`
);
// grabs all the models in your models folder, adds them to the db object

fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });
// Important: creates associations based on associations defined in associate function in the model files
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
