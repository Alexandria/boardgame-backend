import { fetchGameById } from "../utils/fetchGameById";
import { fetchGameByName } from "./fetchGameByName";
import xml from "xml-js";
import { curDateTime } from "./dateTime";

export async function createNewGame(bggId: string) {
  const gameInfo = await fetchGameById(bggId);

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
  const createdAt = curDateTime;
  const updatedAt = curDateTime;

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
  return newBoardGame;
}
