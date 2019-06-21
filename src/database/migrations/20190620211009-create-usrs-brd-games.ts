import {
    QueryInterface,
    DataTypes
} from 'sequelize';
import { User } from '../models/user'

export = {
    up: (queryInterface: QueryInterface) => {
        return queryInterface.createTable('users_brdGames', {
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
            }
        });
    },

    down: (queryInterface: QueryInterface) => {
        return queryInterface.dropTable('users_brdGames');
    }
};
