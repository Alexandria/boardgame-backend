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
  brdGameId: number;
  name: string;
  minPlayer: string;
  maxPlayer?: string;
  avgPlayTime?: number;
  description: string;
  category?: string;
  minAge?: string;
  img?: string;
  thumbnail?: string;
  bgGeekId: string;

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
  maxPlayers: { type: DataTypes.STRING },
  avgPlayTime: DataTypes.INTEGER,
  description: { type: DataTypes.TEXT, allowNull: false },
  category: DataTypes.STRING,
  minAge: DataTypes.STRING,
  img: DataTypes.STRING,
  thumbnail: DataTypes.STRING,
  bgGeekID: { type: DataTypes.STRING, allowNull: false },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE
});
