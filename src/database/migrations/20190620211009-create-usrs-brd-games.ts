import { QueryInterface, DataTypes } from "sequelize";

export = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.createTable("Users_BrdGames", {
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
        type: DataTypes.STRING,
        // FK relationship(hasMany) with `User`
        references: {
          model: "Users",
          key: "userId"
        }
      },
      brdGameId: {
        type: DataTypes.STRING,
        // FK relationship(hasMany) with `User`
        references: {
          model: "BrdGames",
          key: "brdGameId"
        }
      }
    });
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.dropTable("Users_BrdGames");
  }
};
