import express from "express";
import bcrypt from "bcrypt";
import { validateLogin } from "../utils/validateLogin";
import { User } from "../database/models/user";
import createTkn from "../utils/createTkn";

export const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "🗝"
  });
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
    bcrypt
      .compare(req.body.password, queryResult.password)
      .then(isPassword => {
        if (isPassword) {
          const token = createTkn(queryResult);
          res.status(200).json({
            message: "You are logged in ✅",
            token
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
