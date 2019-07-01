import { QueryInterface, DataTypes } from "sequelize";

export = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.createTable("Users", {
      userId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },

      email: {
        type: DataTypes.STRING
      },

      password: {
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
    return queryInterface.dropTable("Users");
  }
};
