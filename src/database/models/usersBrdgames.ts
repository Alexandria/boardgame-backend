import { Model, DataTypes } from "sequelize";
import { sequelize } from "./index";

export interface UsersBGAttributes extends Model {
  rating?: number;
  isborrowed?: boolean;
}

type UsersBGModel = typeof Model & {
  new (): UsersBGAttributes;
};

export const UsersBrdGames = <UsersBGModel>sequelize.define("Users_BrdGames", {
  rating: DataTypes.INTEGER,
  isborrowed: DataTypes.BOOLEAN,
  userId: {
    type: DataTypes.INTEGER,
    // FK relationship(hasMany) with `User`
    references: {
      model: "Users",
      key: "user_id"
    }
  },
  brdGameId: {
    type: DataTypes.INTEGER,
    // FK relationship(hasMany) with `User`
    references: {
      model: "BrdGames",
      key: "brdGame_id"
    }
  }
});
