import { QueryInterface, DataTypes } from "sequelize";

export = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.createTable("BrdGames", {
      brdGameId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false
      },

      minPlayers: {
        type: DataTypes.STRING,
        allowNull: false
      },
      maxPlayers: {
        type: DataTypes.STRING
      },

      avgPlayTime: {
        type: DataTypes.STRING
      },

      description: {
        type: DataTypes.TEXT,
        allowNull: false
      },

      category: {
        type: DataTypes.STRING
      },

      minAge: {
        type: DataTypes.STRING
      },

      img: {
        type: DataTypes.STRING
      },
      thumbnail: {
        type: DataTypes.STRING
      },
      bgGeekID: { type: DataTypes.STRING, allowNull: false },
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
    return queryInterface.dropTable("BrdGames");
  }
};
