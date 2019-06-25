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
    return queryInterface.bulkInsert('Users', [{
      email: 'admin@gmail.com',
      password: 'password',
      createdAt: curDateTime,
      updatedAt: curDateTime

    }, {
      email: 'sammy@gmail.com',
      password: 'password',
      createdAt: curDateTime,
      updatedAt: curDateTime
    },
    {
      email: 'Tatiana@gmail.com',
      password: 'password',
      createdAt: curDateTime,
      updatedAt: curDateTime
    },
    {
      email: 'Mikey@gmail.com',
      password: 'password',
      createdAt: curDateTime,
      updatedAt: curDateTime
    },
    {
      email: 'chardea@gmail.com',
      password: 'password',
      createdAt: curDateTime,
      updatedAt: curDateTime
    },
    {
      email: 'lily@gmail.com',
      password: 'password',
      createdAt: curDateTime,
      updatedAt: curDateTime
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
    return queryInterface.bulkDelete('Users', {})
  }
};
