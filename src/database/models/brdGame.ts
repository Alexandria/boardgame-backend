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
import { UsersBrdgames } from "./usersBrdgames";

export interface BrdGameAttributes extends Model {
  brdGameId?: number;
  name: string;
  numOfPlayers: string;
  playTime?: number;
  complexity?: number;
  description: string;
  category?: string;
  artist?: string;
  designer?: string;
  img?: string;

  createdAt: Date;
  updatedAt: Date;
}

type BrdGameModel = typeof Model & {
  new (): BrdGameAttributes;
};

export const BrdGame = <BrdGameModel>sequelize.define("BrdGames", {
  brdGameId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: { type: DataTypes.STRING, allowNull: false },
  minPlayers: { type: DataTypes.STRING, allowNull: false },
  maxPlayers: { type: DataTypes.STRING, allowNull: false },
  avgPlayTime: DataTypes.INTEGER,
  description: { type: DataTypes.STRING, allowNull: false },
  category: DataTypes.STRING,
  minage: DataTypes.STRING,
  img: DataTypes.STRING,
  thumbnail: DataTypes.STRING,
  bgGeekID: DataTypes.INTEGER,
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE
});
