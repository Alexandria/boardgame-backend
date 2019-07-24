import {
  Model,
  DataTypes,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyAddAssociationMixin,
  BelongsToManyHasAssociationMixin,
  BelongsToManyCountAssociationsMixin,
  BelongsToManyCreateAssociationMixin
} from "sequelize";
import { sequelize } from "../../utils/sequelize";
import { BrdGameAttributes } from "./brdGame";

export interface UserAttributes extends Model {
  userId?: number;
  email: string;
  password: string;

  createdAt?: Date;
  updatedAt?: Date;

  getBrdGame: BelongsToManyGetAssociationsMixin<BrdGameAttributes>; // Note the null assertions!
  addBrdGame: BelongsToManyAddAssociationMixin<BrdGameAttributes, number>;
  hasBrdGame: BelongsToManyHasAssociationMixin<BrdGameAttributes, number>;
  countBrdGame: BelongsToManyCountAssociationsMixin;
  createBrdGame: BelongsToManyCreateAssociationMixin<BrdGameAttributes>;
}

type UserType = typeof Model & {
  new (): UserAttributes;
};

export const User = <UserType>sequelize.define("Users", {
  userId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  email: DataTypes.STRING,
  password: DataTypes.STRING
});
