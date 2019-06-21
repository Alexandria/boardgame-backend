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
        return queryInterface.bulkInsert('users', [{
                email: 'admin@gmail.com',
                password: 'password',
                createdAt: dateTime_1.curDateTime,
                updatedAt: dateTime_1.curDateTime
            }], {});
    },
    down: function (queryInterface) {
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.
    
          Example:
          return queryInterface.bulkDelete('Person', null, {});
        */
        return queryInterface.bulkDelete('users', {});
    }
};
