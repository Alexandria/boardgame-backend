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
import { fetchGame } from "../utils/fetchGame";
import xml from "xml-js";
import { fetchGameInfo } from "../utils/fetchGameInfo";

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
router.post("/addgame", async function(req, res) {
  const options = {
    compact: true,
    ignoreComment: true,
    alwaysChildren: true,
    ignoreDeclaration: true
  };
  const XMLResult = await fetchGame(req.body.name);

  const jsObject = xml.xml2js(XMLResult.data, options);

  const bggId = jsObject.items.item._attributes.id;

  const gameByID = await fetchGameInfo(bggId);

  const gameInfo = xml.xml2js(gameByID.data, options);

  // //  BoardGame object
  const name = gameInfo.items.item.name[0]._attributes.value;
  const minPlayers = gameInfo.items.item.minplayers._attributes.value;
  const maxPlayers = gameInfo.items.item.maxplayers._attributes.value;
  const avgPlayTime = gameInfo.items.item.playingtime._attributes.value;
  const description = gameInfo.items.item.description._text;
  const category = gameInfo.items.item.link[0]._attributes.value;
  const minAge = gameInfo.items.item.minage._attributes.value;
  const img = gameInfo.items.item.image._text;
  const thumbnail = gameInfo.items.item.thumbnail._text;
  const bgGeekID = bggId;
  const createdAt = "";
  const updatedAt = "";

  const newBoardGame = {
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
  };

  res.send(newBoardGame);
});
