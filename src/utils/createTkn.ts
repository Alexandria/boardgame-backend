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
      expiresIn: "2min" // 4s, 1hr, 2min
    }
  );

  return token;
};
