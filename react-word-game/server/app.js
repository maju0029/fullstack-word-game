import express from "express";

const app = express();
app.use(express.json());

let words = [];

export function setWords(wordList) {
  words = wordList;
}

app.get("/api/word", (req, res) => {
  const randomWord = words[Math.floor(Math.random() * words.length)];
  res.json({ word: randomWord });
});

export default app;