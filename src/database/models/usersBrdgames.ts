import {
  Model,
  DataTypes,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyAddAssociationMixin,
  BelongsToManyHasAssociationMixin,
  BelongsToManyCountAssociationsMixin,
  BelongsToManyCreateAssociationMixin
} from "sequelize";
import { sequelize } from "./index";
import { UserAttributes, User } from "./user";
import { BrdGameAttributes, BrdGame } from "./brdGame";

export interface UsersBGAttributes extends Model {
  rating?: number;
  isborrowed?: boolean;
  userId?: number;
  brdGameId?: number;

  getUser: BelongsToManyGetAssociationsMixin<UserAttributes>; // Note the null assertions!
  addUser: BelongsToManyAddAssociationMixin<UserAttributes, number>;
  hasUser: BelongsToManyHasAssociationMixin<UserAttributes, number>;
  countUser: BelongsToManyCountAssociationsMixin;
  createUser: BelongsToManyCreateAssociationMixin<UserAttributes>;

  getBg: BelongsToManyGetAssociationsMixin<BrdGameAttributes>; // Note the null assertions!
  addBg: BelongsToManyAddAssociationMixin<BrdGameAttributes, number>;
  hasBg: BelongsToManyHasAssociationMixin<BrdGameAttributes, number>;
  countBg: BelongsToManyCountAssociationsMixin;
  createBg: BelongsToManyCreateAssociationMixin<BrdGameAttributes>;
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
User.belongsToMany(BrdGame, { through: UsersBrdgames });
BrdGame.belongsToMany(User, { through: UsersBrdgames });
