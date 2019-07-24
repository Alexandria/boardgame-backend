import { QueryInterface } from "sequelize";
import { curDateTime } from "../../utils/dateTime";

module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.bulkInsert(
      "BrdGames",
      [
        {
          name: "Catan",

          minPlayers: "3",
          maxPlayers: "4",

          avgPlayTime: "120",

          description:
            "In Catan (formerly The Settlers of Catan), players try to be the dominant force on the island of Catan by building settlements, cities, and roads. ",

          category: "Negotiation",

          minAge: "10",

          img:
            "https://cf.geekdo-images.com/thumb/img/g8LvJsd2oLAub6AEKN_Xpdoi8Sw=/fit-in/200x150/pic2419375.jpg",
          thumbnail:
            "https://cf.geekdo-images.com/thumb/img/g8LvJsd2oLAub6AEKN_Xpdoi8Sw=/fit-in/200x150/pic2419375.jpg",
          bgGeekID: "13",

          createdAt: curDateTime,

          updatedAt: curDateTime
        },
        {
          name: "Basari",
          minPlayers: "3",
          maxPlayers: "4",

          avgPlayTime: "25",

          description:
            "Basari is a game of gem merchants competing in a marketplace&quot;: racing, collecting, trading, and predicting what the other merchants will do.",

          category: "Negotiation",

          minAge: "10",

          img:
            "https://cf.geekdo-images.com/original/img/xFRII0rLyA7eb2CDF_GT4BS-eLE=/0x0/pic48605.jpg",
          thumbnail:
            "https://cf.geekdo-images.com/thumb/img/hBDymMYGWKQNbiuxDtqSQyYZDvQ=/fit-in/200x150/pic48605.jpg",
          bgGeekID: "14",

          createdAt: curDateTime,

          updatedAt: curDateTime
        }
      ],
      {}
    );
  },

  down: (queryInterface: QueryInterface) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete("BrdGames", {});
  }
};
