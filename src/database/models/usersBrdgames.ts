import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../utils/sequelize";

export interface UsersBGAttributes extends Model {
  rating?: number;
  isborrowed?: boolean;
  userId: number;
  brdGameId: number;
}
type UsersBGModel = typeof Model & {
  new (): UsersBGAttributes;
};

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
