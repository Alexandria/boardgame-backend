import { User as UserB } from "./user";
import { BrdGame as BrdGameB } from "./brdGame";
import { UsersBrdgames as UsersBrdgamesb } from "./usersBrdgames";

BrdGameB.hasMany(UsersBrdgamesb, {
  as: "UrsBrd",
  foreignKey: "brdGameId"
});

UserB.hasMany(UsersBrdgamesb, {
  as: "UrsBrd",
  foreignKey: "userId"
});

export const User = UserB;
export const BrdGame = BrdGameB;
export const UsersBrdgames = UsersBrdgamesb;
