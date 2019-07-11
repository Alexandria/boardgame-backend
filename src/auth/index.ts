import express from "express";
import bcrypt from "bcrypt";
import { validateLogin } from "../utils/validateLogin";
import { User } from "../database/models/user";
import createTkn from "../utils/createTkn";
import { verifyToken } from "../middleware/verifyToken";
import { BrdGame } from "../database/models/brdGame";
import { UsersBrdgames } from "../database/models/usersBrdgames";
import { sequelize } from "../database/models/index";
import { func, element } from "prop-types";
export const router = express.Router();
import { fetchGameByName } from "../utils/fetchGameByName";
import xml from "xml-js";
import { fetchGameById } from "../utils/fetchGameById";
import { QueryInterface } from "sequelize";
import { curDateTime } from "../utils/dateTime";
import { createNewGame } from "../utils/createNewGame";

router.get("/", (req, res) => {
  res.json({
    message: "🗝"
  });
});

router.get("/home/:id", verifyToken, async function(req, res) {
  const querySelect = `select *from public."BrdGames" bg left join public."Users_BrdGames" usrbg on usrbg."brdGameId" = bg."brdGameId" where usrbg."userId" = ${req.params.id};`;
  const result = await sequelize.query(querySelect);

  // const result = await BrdGame.findAll({
  //   include: [
  //     {
  //       model: UsersBrdgames,
  //       through: {
  //         attributes: ["brdGameId"],
  //         where: {
  //           userId: req.params.id
  //         }
  //       }
  //     }
  //   ]
  // });

  res.status(200).json({ result: result[0] });
});

router.post("/login", async function(req, res) {
  await validateLogin(req.body).catch(err => {
    res.status(401).json({
      message: err.message
    });
  });

  const queryResult = await User.findAll({
    where: {
      email: req.body.email
    }
  })
    .then(result => {
      return result[0];
    })
    .catch(err => {
      res.status(404).json({ message: err.message });
      return null;
    });

  if (queryResult) {
    console.log("QR======>", queryResult.password);
    bcrypt
      .compare(req.body.password, queryResult.password)
      .then(isPassword => {
        if (isPassword) {
          const token = createTkn(queryResult);
          res.status(200).json({
            message: "You are logged in ✅",
            token,
            userId: queryResult.userId
          });
        } else {
          res.status(401).json({
            message: "Auth failed ⛔️"
          });
        }
      })
      .catch(err => {
        res.status(404).json({ message: err.message });
      });
  } else {
    res.status(401).json({
      message: "Failed to login"
    });
  }
});

router.post("/signup", async function(req, res) {
  await validateLogin(req.body).catch(() => {
    res.status(401).json({
      message: "Authorization Faild: Invalid information ⛔️"
    });
  });

  User.findAll({
    where: {
      email: req.body.email
    }
  })
    .then(result => {
      if (result.length === 0) {
        bcrypt.hash(req.body.password, 10).then(hash => {
          User.create({
            email: req.body.email,
            password: hash
          })
            .then(() => {
              res.json({
                message: "✅ User was created!",
                password: hash
              });
            })
            .catch(errors => res.status(404).json({ message: errors.message }));
        });
      } else {
        res.status(401).json({
          message: "Email  is already in use."
        });
      }
    })
    .catch(err => {
      res.status(401).json({
        message: err.message
      });
    });
});
//allow the user to search for a game by its name
router.get("/search/addgame/:id", async function(req, res) {
  //first check to see if the BG is already in the database
  //const newBoardGame = await createNewGame(req.body.name);
  const result = await fetchGameByName(req.body.name);

  // const jsObject: any = xml.xml2js(XMLResult.data, options);

  // const length = jsObject.items.item.length;
  // const index = length - 1;
  // const bggId = jsObject.items.item[index]._attributes.id;

  res.status(200).json({
    result: result.items.item,
    userId: req.params.id
  });

  // BrdGame.findAll({
  //   where: {
  //     bgGeekID: newBoardGame.bgGeekID
  //   }
  // }).then(result => {
  //   //check if this bg is added to the boardgame database
  //   if (result[0]) {
  //     // Check to make sure that the user does not already have this game in thier library
  //     UsersBrdgames.create({
  //       userId: req.params.id,
  //       brdGameId: result[0].brdGameId,
  //       createdAt: curDateTime,
  //       updatedAt: curDateTime
  //     })
  //       .then(() => {
  //         res.send(
  //           `Game in db: Game ${newBoardGame.name} was added for user ${req.params.id}`
  //         );
  //       })
  //       .catch(err => res.send(err));
  //     // If this is a new boardgame to the database add this to the BrdGame database
  //   } else {
  //     BrdGame.create({
  //       name: name,
  //       minPlayers: minPlayers,
  //       maxPlayers: maxPlayers,
  //       avgPlayTime: avgPlayTime,
  //       description: description,
  //       category: category,
  //       minAge: minAge,
  //       img: img,
  //       thumbnail: thumbnail,
  //       bgGeekID: bgGeekID,
  //       createdAt: createdAt,
  //       updatedAt: updatedAt
  //     })
  //       .then(() => {
  //         UsersBrdgames.create({
  //           userId: req.params.id,
  //           brdGameId: result[0].brdGameId,
  //           createdAt: curDateTime,
  //           updatedAt: curDateTime
  //         })
  //           .then(() => {
  //             res.send(
  //               `New Boardgame: ${newBoardGame.name} was added to userId ${req.params.id}`
  //             );
  //           })
  //           .catch(err => {
  //             res.send(err);
  //           });
  //       })
  //       .catch(err => res.send(err));
  //   }
  // });
  //res.send(newBoardGame);
});

router.post("/search/addgame/:id", async function(req, res) {
  //perhaps verify if the game is the correct game?

  //check if game is in local database
  const results = await BrdGame.findAll({
    where: {
      bgGeekID: req.body.id
    }
  });

  const {
    name,
    minPlayers,
    maxPlayers,
    avgPlayTime,
    description,
    category,
    minAge,
    img,
    thumbnail,
    bgGeekID,
    createdAt,
    updatedAt
  } = await createNewGame(req.body.name);

  // // if not in bg database add to bgdatabase then add to usersboardgames
  if (results[0]) {
    res.send("Game is in the database");
    //check if this game is appart of the users collection
    // const collection = await UsersBrdgames.findAll({
    //   where: {
    //     userId: req.params.id,
    //     brdGameId: results[0].brdGameId
    //   }
    // });

    // console.log(collection);
  } else {
    const newGame = await BrdGame.create({
      name: name,
      minPlayers: minPlayers,
      maxPlayers: maxPlayers,
      avgPlayTime: avgPlayTime,
      description: description,
      category: category,
      minAge: minAge,
      img: img,
      thumbnail: thumbnail,
      bgGeekID: bgGeekID,
      createdAt: createdAt,
      updatedAt: updatedAt
    });
  }

  console.log(results[0]);

  res.send("check log");
});
