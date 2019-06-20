import {
    Model,
    DataTypes
} from 'sequelize';
import { sequelize } from './index'
import { users_brdGames } from './users_brdgames'

export interface UserAttributes extends Model {
    user_id?: number
    email: string;
    password: string;

}

type UserModel = typeof Model & {
    new(): UserAttributes
}

export const user = <UserModel>sequelize.define('user', {
    user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true

    },
    email: DataTypes.STRING,
    password: DataTypes.STRING


});



