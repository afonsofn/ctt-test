import { fileURLToPath } from "url";
import fs from "fs";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, "..", "data", "data.json");

export const readData = () => {
  const raw = fs.readFileSync(dataPath, "utf-8");
  return JSON.parse(raw);
};

export const writeData = (data) => {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};
