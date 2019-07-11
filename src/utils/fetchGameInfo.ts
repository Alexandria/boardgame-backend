import axios from "axios";

export async function fetchGameInfo(id: string) {
  try {
    return await axios.get(
      `https://www.boardgamegeek.com/xmlapi2/thing?id=${id}`
    );
  } catch (err) {
    console.log("BGG search Error", err);
    return err;
  }
}
