import {
    Model,
    DataTypes
} from 'sequelize';
import { sequelize } from './index'
import { User } from './user'
import { BrdGame } from './brdGame'

export interface UsersBGAttributes {
    rating?: number
    isborrowed?: boolean;

}

type UsersBGModel = typeof Model & {
    new(): UsersBGAttributes
}


export const users_brdGames = <UsersBGModel>sequelize.define('users_brdGames', {
    rating: DataTypes.INTEGER,
    isborrowed: DataTypes.BOOLEAN,
    users_id: {
        type: DataTypes.INTEGER,
        //FK relationship(hasMany) with `User`
        references: {
            model: User,
            key: 'user_id'
        }
    },
    brdGame_id: {
        type: DataTypes.INTEGER,
        //FK relationship(hasMany) with `BrdGame`
        references: {
            model: BrdGame,
            key: 'brdGame_id'
        }
    }
});

