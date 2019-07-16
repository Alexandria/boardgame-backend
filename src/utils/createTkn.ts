import * as jwt from "jsonwebtoken";
import { UserAttributes } from "../database/models/user";

export default (queryResult: UserAttributes) => {
  const token = jwt.sign(
    {
      email: queryResult.email,
      userId: queryResult.userId
    },
    "secret",
    {
      expiresIn: "10s"
    }
  );

  return token;
};
