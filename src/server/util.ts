import { Console } from "console";
import * as fs from "fs";

export function getJSONFromFile() {
  try {
    const jsonFileName = "src/server/data.json"; // Start from node_modules folder
    const dataJSONString = fs.readFileSync(jsonFileName).toString();
    const dataJSON = JSON.parse(dataJSONString);
    return dataJSON;
  } catch (e) {
    const errorMessageJSON = { status: "fail", transaction: null };
    return errorMessageJSON;
  }
}
