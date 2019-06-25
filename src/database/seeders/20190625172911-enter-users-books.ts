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
    return queryInterface.bulkInsert('Users_BrdGames', [
      {
        rating: 4,
        isborrowed: false,
        createdAt: curDateTime,
        updatedAt: curDateTime,
        userId: 1,
        brdGameId: 1

      },
      {
        rating: 2,
        isborrowed: false,
        createdAt: curDateTime,
        updatedAt: curDateTime,
        userId: 3,
        brdGameId: 1

      },
      {
        rating: 1,
        isborrowed: false,
        createdAt: curDateTime,
        updatedAt: curDateTime,
        userId: 1,
        brdGameId: 2

      },
      {
        rating: 2,
        isborrowed: false,
        createdAt: curDateTime,
        updatedAt: curDateTime,
        userId: 4,
        brdGameId: 1

      },
      {
        rating: 4,
        isborrowed: false,
        createdAt: curDateTime,
        updatedAt: curDateTime,
        userId: 2,
        brdGameId: 1

      },
      {
        rating: 5,
        isborrowed: false,
        createdAt: curDateTime,
        updatedAt: curDateTime,
        userId: 6,
        brdGameId: 2

      },
    ], {})
  },

  down: (queryInterface: QueryInterface) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Users_BrdGames', {})
  }
};
