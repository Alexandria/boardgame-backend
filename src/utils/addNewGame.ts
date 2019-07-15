import { fetchGameById } from "./fetchGameById";
import { curDateTime } from "./dateTime";
import { BrdGame } from "../database/models/brdGame";

export async function addNewGame(bggId: string) {
  const gameInfo = await fetchGameById(bggId);

  const newGame = await BrdGame.create({
    name: gameInfo.items.item.name[0]._attributes.value,
    minPlayers: gameInfo.items.item.minplayers._attributes.value,
    maxPlayers: gameInfo.items.item.maxplayers._attributes.value,
    avgPlayTime: gameInfo.items.item.playingtime._attributes.value,
    description: gameInfo.items.item.description._text,
    category: gameInfo.items.item.link[0]._attributes.value,
    minAge: gameInfo.items.item.minage._attributes.value,
    img: gameInfo.items.item.image._text,
    thumbnail: gameInfo.items.item.thumbnail._text,
    bgGeekID: bggId,
    createdAt: curDateTime,
    updatedAt: curDateTime
  });

  return newGame.brdGameId;
}
