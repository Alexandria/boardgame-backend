'use strict';

import fs from 'fs'
import path from 'path'
import { Sequelize } from 'sequelize'
import { user } from './user'
import { brdGame } from './brdGame'
import { users_brdGames } from './users_brdgames'

const basename = path.basename(__filename);

interface DB {
  [key: string]: any
}
const db: DB = {};

export const sequelize = new Sequelize('postgres://localhost:5433/bgdata');
//grabs all the models in your models folder, adds them to the db object
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });
//Important: creates associations based on associations defined in associate function in the model files
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

user.hasMany(users_brdGames)
brdGame.hasMany(users_brdGames)

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
