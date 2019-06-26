import {
    QueryInterface,
    DataTypes
} from 'sequelize';
import { User } from '../models/user'

export = {
    up: (queryInterface: QueryInterface) => {
        return queryInterface.createTable('Users_BrdGames', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            rating: {
                type: DataTypes.INTEGER
            },

            isborrowed: {
                type: DataTypes.BOOLEAN
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE
            },

            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE
            },
            userId: {
                type: DataTypes.INTEGER,
                //FK relationship(hasMany) with `User`
                references: {
                    model: 'Users',
                    key: 'user_id'
                }
            },
            brdGameId: {
                type: DataTypes.INTEGER,
                //FK relationship(hasMany) with `User`
                references: {
                    model: "BrdGames",
                    key: 'brdGame_id'
                }
            }
        });
    },

    down: (queryInterface: QueryInterface) => {
        return queryInterface.dropTable('Users_BrdGames');
    }
};
