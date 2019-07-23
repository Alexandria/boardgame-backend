import { User as UserB } from "./user";
import { BrdGame as BrdGameB } from "./brdGame";
import { UsersBrdgames } from "./usersBrdgames";
import { sequelize as sequelizeb } from "../../utils/sequelize";
// const basename = path.basename(__filename);

// interface DB {
//   [key: string]: any;
// }
// const db: DB = {};

console.log("UsersBG", UsersBrdgames);
UserB.belongsToMany(BrdGameB, {
  through: UsersBrdgames,
  as: "Brdgame",
  foreignKey: "userId"
});

BrdGameB.belongsToMany(UserB, {
  through: UsersBrdgames,
  as: "User",
  foreignKey: "brdGameId"
});

export const sequelize = sequelizeb;
export const User = UserB;
export const BrdGame = BrdGameB;

// grabs all the models in your models folder, adds them to the db object

// fs.readdirSync(__dirname)
//   .filter(file => {
//     return (
//       file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
//     );
//   })
//   .forEach(file => {
//     const model = sequelize.import(path.join(__dirname, file));
//     db[model.name] = model;
//   });
// // Important: creates associations based on associations defined in associate function in the model files
// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;
