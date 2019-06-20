import {
    Model,
    DataTypes
} from 'sequelize';
import { sequelize } from './index'
import { users_brdGames } from './users_brdgames';


export interface BrGameAttributes {
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

}

type BrdGameModel = typeof Model & {
    new(): BrGameAttributes
}


export const brdGame = <BrdGameModel>sequelize.define('brdGame', {
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

brdGame.hasMany(users_brdGames)