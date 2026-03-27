import app, { setWords } from "./app.js";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const PORT = 5080;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const data = fs.readFileSync(
  path.join(__dirname, "./words_dictionary.json"),
  "utf-8"
);

const wordsData = JSON.parse(data);
const words = Object.keys(wordsData);
setWords(words);

app.use(express.static(path.join(__dirname, "../dist")));

app.get("/{*path}", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});