import {
    Model,
    DataTypes,
    BelongsToManyGetAssociationsMixin,
    BelongsToManyAddAssociationMixin,
    BelongsToManyHasAssociationMixin,
    BelongsToManyCountAssociationsMixin,
    BelongsToManyCreateAssociationMixin
} from 'sequelize';
import { sequelize } from './index'
import { UserAttributes, User } from './user'
import { Users_BrdGames } from './users_brdgames';


export interface BrdGameAttributes extends Model {
    brd_game_id?: number
    name: string;
    numOfPlayers: string;
    playTime?: number;
    complexity?: number;
    description: string;
    category?: string;
    artist?: string;
    designer?: string;
    img?: string;

    createdAt: Date
    updatedAt: Date

    getUser: BelongsToManyGetAssociationsMixin<UserAttributes>; // Note the null assertions!
    addUser: BelongsToManyAddAssociationMixin<UserAttributes, number>;
    hasUser: BelongsToManyHasAssociationMixin<UserAttributes, number>;
    countUser: BelongsToManyCountAssociationsMixin;
    createUser: BelongsToManyCreateAssociationMixin<UserAttributes>;


}

type BrdGameModel = typeof Model & {
    new(): BrdGameAttributes
}


export const BrdGame = <BrdGameModel>sequelize.define('BrdGames', {
    brdGame_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: { type: DataTypes.STRING, allowNull: false },
    numOfPlayers: { type: DataTypes.STRING, allowNull: false },
    playTime: DataTypes.INTEGER,
    complexity: DataTypes.INTEGER,
    description: { type: DataTypes.STRING, allowNull: false },
    category: DataTypes.STRING,
    artist: DataTypes.STRING,
    designer: DataTypes.STRING,
    img: DataTypes.STRING
});

//BrdGame.belongsToMany(User, { through: Users_BrdGames })