import express from "express";
import bcrypt from "bcrypt";
import { validateLogin } from "../utils/validateLogin";
import { User } from "../database/models/user";
import createTkn from "../utils/createTkn";
import { verifyToken } from "../middleware/verifyToken";
import { BrdGame } from "../database/models/brdGame";
import { UsersBrdgames } from "../database/models/usersBrdgames";
import { sequelize } from "../database/models/index";
export const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "🗝"
  });
});

router.get("/home/:id", verifyToken, async function(req, res) {
  const querySelect = `select *from public."BrdGames" bg left join public."Users_BrdGames" usrbg on usrbg."brdGameId" = bg."brdGameId" where usrbg."userId" = ${req.params.id};`;

  const result = await sequelize.query(querySelect);

  res.status(200).json({ result: result[0] });
  //`select bg.name from public."BrdGames" bg left join public."Users_BrdGames" usrbg on usrbg."brdGameId" = bg."brdGame_id" where usrbg."userId" = 1;`;
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
