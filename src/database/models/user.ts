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
import { BrdGameAttributes, BrdGame } from "./brdGame";
import { UsersBrdgames } from "./usersBrdgames";

export interface UserAttributes extends Model {
  userId: number;
  email: string;
  password: string;

  createdAt: Date;
  updatedAt: Date;
}

export type UserModel = typeof Model & {
  new (): UserAttributes;
};

export const User = <UserModel>sequelize.define("Users", {
  userId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  email: DataTypes.STRING,
  password: DataTypes.STRING
});
