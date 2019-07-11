import axios from "axios";

export async function fetchGame(name: string) {
  try {
    return await axios.get(
      `http://www.boardgamegeek.com/xmlapi2/search?query=${name}&type=boardgame&exact=1`
    );
  } catch (err) {
    return err;
  }
}
