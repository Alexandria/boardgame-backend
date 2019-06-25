'use strict';
import { QueryInterface } from 'sequelize'
import { curDateTime } from '../../utils/dateTime'
module.exports = {
  up: (queryInterface: QueryInterface) => {

    return queryInterface.bulkInsert('BrdGames', [
      {
        name: "Catan",

        numOfPlayers: "3-4",

        playTime: 120,

        complexity: 4,

        description: "In Catan (formerly The Settlers of Catan), players try to be the dominant force on the island of Catan by building settlements, cities, and roads. ",

        category: "Strat",

        artist: "Volkan Baga",

        designer: "Klaus Teuber",

        img: "https://cf.geekdo-images.com/original/img/A-0yDJkve0avEicYQ4HoNO-HkK8=/0x0/pic2419375.jpg",

        createdAt: curDateTime,

        updatedAt: curDateTime

      },
      {
        name: "Basari",

        numOfPlayers: "3-4",

        playTime: 25,

        complexity: 4,

        description: "Basari is a game of gem merchants competing in a marketplace&quot;: racing, collecting, trading, and predicting what the other merchants will do.",

        category: "Strat",

        artist: "Volkan Baga",

        designer: "Klaus Teuber",

        img: "https://cf.geekdo-images.com/original/img/xFRII0rLyA7eb2CDF_GT4BS-eLE=/0x0/pic48605.jpg",

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
    return queryInterface.bulkDelete('BrdGames', {})
  }
};
