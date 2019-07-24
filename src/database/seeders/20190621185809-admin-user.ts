import { QueryInterface } from "sequelize";
import { curDateTime } from "../../utils/dateTime";

module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "admin@gmail.com",
          password:
            "$2b$10$6gHAOlOr2Sxw.gvAxqr9x.DWBcV3YvDx2QEvnhq0ZmZKH/hHpdg92",
          createdAt: curDateTime,
          updatedAt: curDateTime
        },
        {
          email: "sammy@gmail.com",
          password:
            "$2b$10$y6AVs4VvnHNE65Ge5dwRbuhoinex7WbcRdjtQ10lZVpAJCQCXzsYK",
          createdAt: curDateTime,
          updatedAt: curDateTime
        },
        {
          email: "tatiana@gmail.com",
          password:
            "$2b$10$h23rDPcx1IxIyDCwnup/ge.YMYlWjLRqHAEnGk48oxP56xf4jPxzW",
          createdAt: curDateTime,
          updatedAt: curDateTime
        },
        {
          email: "mikey@gmail.com",
          password:
            "$2b$10$PD.f9MnJKDHnTCcQp1xD0e5GRF.eBulyHua7UCH9zUMnwv1jdplPe",
          createdAt: curDateTime,
          updatedAt: curDateTime
        },
        {
          email: "chardea@gmail.com",
          password:
            "$2b$10$ZvYJHqL84QP1nxyK1M8ktO6gc.16Iwp0iZjQ1wu7/ejIKsvYcS3su",
          createdAt: curDateTime,
          updatedAt: curDateTime
        },
        {
          email: "lily@gmail.com",
          password:
            "$2b$10$c0LjwBwyIKyakPi.GKPilOcRtlSWVeeX6JEw1l9SolImkZj1MsuTe",
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
    return queryInterface.bulkDelete("Users", {});
  }
};
