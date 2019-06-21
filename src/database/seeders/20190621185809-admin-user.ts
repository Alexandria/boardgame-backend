'use strict';
import { QueryInterface } from 'sequelize'
import { curDateTime } from '../../utils/dateTime'
module.exports = {
  up: (queryInterface: QueryInterface) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('users', [{
      email: 'admin@gmail.com',
      password: 'password',
      createdAt: curDateTime,
      updatedAt: curDateTime

    }], {})
  },

  down: (queryInterface: QueryInterface) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('users', {})
  }
};
