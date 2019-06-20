import {
    Model,
    DataTypes
} from 'sequelize';
import { sequelize } from './index'
import { user } from './user'

export interface UsersBGAttributes {
    rating?: number
    isborrowed?: boolean;

}

type UsersBGModel = typeof Model & {
    new(): UsersBGAttributes
}


export const users_brdGames = <UsersBGModel>sequelize.define('users_brdGames', {
    rating: DataTypes.INTEGER,
    isborrowed: DataTypes.BOOLEAN
});

