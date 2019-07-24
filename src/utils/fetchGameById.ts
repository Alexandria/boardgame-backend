import axios from "axios";
import xml from "xml-js";

export async function fetchGameById(id: string) {
  const options = {
    compact: true,
    ignoreComment: true,
    alwaysChildren: true,
    ignoreDeclaration: true
  };

  try {
    return await axios
      .get(`https://www.boardgamegeek.com/xmlapi2/thing?id=${id}`)
      .then(XMLResult => {
        return xml.xml2js(XMLResult.data, options);
      });
  } catch (err) {
    return err;
  }
}
