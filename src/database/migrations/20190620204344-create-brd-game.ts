import {
    QueryInterface,
    DataTypes
} from 'sequelize';

export = {
    up: (queryInterface: QueryInterface) => {
        return queryInterface.createTable('BrdGames', {
            brdGame_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },

            name: {
                type: DataTypes.STRING,
                allowNull: false
            },

            numOfPlayers: {
                type: DataTypes.STRING,
                allowNull: false

            },

            playTime: {
                type: DataTypes.INTEGER
            },

            complexity: {
                type: DataTypes.INTEGER
            },

            description: {
                type: DataTypes.STRING,
                allowNull: false
            },

            category: {
                type: DataTypes.STRING
            },

            artist: {
                type: DataTypes.STRING
            },

            designer: {
                type: DataTypes.STRING
            },

            img: {
                type: DataTypes.STRING
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
        return queryInterface.dropTable('BrdGames');
    }
};
