console.log("Top of File");
import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../utils/sequelize";

console.log("Below Imports");
export interface UsersBGAttributes extends Model {
  rating?: number;
  isborrowed?: boolean;
  userId: number;
  brdGameId: number;
}
type UsersBGModel = typeof Model & {
  new (): UsersBGAttributes;
};
console.log("Here!!!");
export const UsersBrdgames = <UsersBGModel>sequelize.define("Users_BrdGames", {
  rating: DataTypes.INTEGER,
  isborrowed: DataTypes.BOOLEAN,
  userId: {
    type: DataTypes.INTEGER,
    // FK relationship(hasMany) with `User`
    references: {
      model: "Users",
      key: "userId"
    }
  },
  brdGameId: {
    type: DataTypes.INTEGER,
    // FK relationship(hasMany) with `User`
    references: {
      model: "BrdGames",
      key: "brdGameId"
    }
  }
});
console.log("USRBG MODEL", UsersBrdgames);
// BrdGame.belongsToMany(User, {
//   through: UsersBrdgames,
//   foreignKey: "brdGameId"
// });
// User.belongsToMany(BrdGame, {
//   through: UsersBrdgames,
//   foreignKey: "userId"
// });
