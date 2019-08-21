import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { router } from "./auth";
import { User } from "./database/models/user";
//import { sequelize } from "../src/database/models/index";

dotenv.config();

const app = express();
app.use(cors({ credentials: true }));
app.use(express.json());
app.use("/auth", router);

const PORT = process.env.PORT | 3001;

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});

app.get("/", async function(req, res) {
  User.findAll()
    .then(result => {
      res.status(200).json({
        message: result
      });
    })
    .catch(err => {
      res.json({
        message: err.message
      });
    });
});

app.get("/id", async function(req, res) {
  const queryResult = await User.findAll({
    where: {
      email: req.body.email
    }
  });

  res.json({
    queryResult: queryResult[0].password
  });
});

app.get("/helloworld", (req, res) => {
  return res.send(" Hello World!");
});
