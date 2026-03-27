import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const data = fs.readFileSync(
  path.join (__dirname, "./words_dictionary.json"),
);
const wordsData = JSON.parse(data);
const words = Object.keys(wordsData);

const app = express();
const PORT = 5080;

app.use(express.json());

app.get("/api/word", (req, res) => {
  const randomWord = words [Math.floor(Math.random() * words.length)];
  res.json({ word: randomWord });
});

app.use(express.static(path.join(__dirname, "../dist")));

app.get("/{*path}", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});