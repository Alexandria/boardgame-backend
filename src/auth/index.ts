import express from "express";
import bcrypt from "bcrypt";
import { User, BrdGame, UsersBrdgames } from "../database/models/index";
import {
  fetchGameByName,
  curDateTime,
  addNewGame,
  validateLogin,
  createTkn
} from "../utils/index";
import { where } from "sequelize/types";

export const router = express.Router();
router.get("/", (req, res) => {
  res.json({
    message: "🗝"
  });
});

router.get("/home/:id", async function(req, res) {
  // const querySelect = `select *from public."BrdGames" bg left join public."Users_BrdGames" usrbg on usrbg."brdGameId" = bg."brdGameId" where usrbg."userId" = ${req.params.id};`;

  const result = await BrdGame.findAll({
    attributes: { exclude: ["bgGeekID"] },
    include: [
      {
        attributes: ["rating", "isborrowed"],
        model: UsersBrdgames,
        as: "UrsBrd",
        where: {
          userId: req.params.id
        }
      }
    ]
  }).catch(err => res.status(500).json({ err }));

  res.json({ result });
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
  });

  if (queryResult[0]) {
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      queryResult[0].password
    );
    if (isPasswordValid) {
      res.status(200).json({
        message: "You are logged in ✅",
        token: createTkn(queryResult[0]),
        userId: queryResult[0].userId
      });
    } else {
      res.status(401).json({
        message: "Auth failed ⛔️"
      });
    }
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
router.get("/search/addgame", async function(req, res) {
  const result = await fetchGameByName(req.body.name);
  console.log("Result Length", result.items.length);
  const game = result.items.item
    ? result.items.item
    : `No game found with the name ${req.body.name}`;
  res.status(200).json({
    game,
    userId: req.params.id
  });
});

router.post("/addgame", async function(req, res) {
  const bgGeekID: string = req.body.bgGeekID;
  const userId: string = req.body.userId;
  const results = await BrdGame.findAll({
    where: {
      bgGeekID
    }
  });

  if (results.length > 0) {
    // check if this game is appart of the users collection
    const collection = await UsersBrdgames.findAll({
      where: {
        userId,
        brdGameId: results[0].brdGameId
      }
    });

    if (collection[0]) {
      res.send("Game is already in your collection! ");
    } else {
      //if not add to users collection
      await UsersBrdgames.create({
        userId,
        brdGameId: results[0].brdGameId,
        createdAt: curDateTime,
        updatedAt: curDateTime
      });
      res.send(
        `Game ${results[0].name} was added to the collection of user ${userId}`
      );
    }
  } else {
    const newGameID = await addNewGame(bgGeekID);
    console.log("NEW Game !!! ", newGameID);
    await UsersBrdgames.create({
      userId,
      brdGameId: newGameID,
      createdAt: curDateTime,
      updatedAt: curDateTime
    });
    res.send(`A new game was added to the collection of user ${userId}`);
  }

  res.send("check log");
});
