'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var dateTime_1 = require("../../utils/dateTime");
module.exports = {
    up: function (queryInterface) {
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
                createdAt: dateTime_1.curDateTime,
                updatedAt: dateTime_1.curDateTime
            }, {
                email: 'sammy@gmail.com',
                password: 'password',
                createdAt: dateTime_1.curDateTime,
                updatedAt: dateTime_1.curDateTime
            },
            {
                email: 'Tatiana@gmail.com',
                password: 'password',
                createdAt: dateTime_1.curDateTime,
                updatedAt: dateTime_1.curDateTime
            },
            {
                email: 'Mikey@gmail.com',
                password: 'password',
                createdAt: dateTime_1.curDateTime,
                updatedAt: dateTime_1.curDateTime
            },
            {
                email: 'chardea@gmail.com',
                password: 'password',
                createdAt: dateTime_1.curDateTime,
                updatedAt: dateTime_1.curDateTime
            },
            {
                email: 'lily@gmail.com',
                password: 'password',
                createdAt: dateTime_1.curDateTime,
                updatedAt: dateTime_1.curDateTime
            },
        ], {});
    },
    down: function (queryInterface) {
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.
    
          Example:
          return queryInterface.bulkDelete('Person', null, {});
        */
        return queryInterface.bulkDelete('Users', {});
    }
};
