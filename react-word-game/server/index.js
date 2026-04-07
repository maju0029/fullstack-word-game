import app, { setWords } from "./app.js";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { connectDB } from "./database/db.js";

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

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

async function startServer() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();