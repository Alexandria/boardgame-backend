import axios from "axios";
import xml from "xml-js";

export async function fetchGameByName(name: string) {
  const options = {
    compact: true,
    ignoreComment: true,
    alwaysChildren: true,
    ignoreDeclaration: true
  };

  try {
    return axios
      .get(
        `http://www.boardgamegeek.com/xmlapi2/search?query=${name}&type=boardgame`
      )
      .then(XMLResult => {
        return xml.xml2js(XMLResult.data, options);
      });
  } catch (err) {
    return err;
  }
}
