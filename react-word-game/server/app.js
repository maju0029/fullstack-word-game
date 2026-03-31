import express from "express";
import algorithm2 from "./algorithms/algorithm2.js";
import algorithm1 from "./algorithms/algorithm1.js";

const app = express();
app.use(express.json());

let words = [];

export function setWords(wordList) {
  words = wordList;
}

app.get("/api/word", (req, res) => {
  const wordLength = Number(req.query.length);
  const uniqueLetters = req.query.unique === "true";

  const randomWord = algorithm2(words, wordLength, uniqueLetters);
  
  if(!randomWord) {
    return res.status(404).json({error: "No matching word"});
  }
  
  res.json({ word: randomWord });
});

app.post("/api/guess", (req, res) => {
  const { correctWord, guessWord } = req.body;

  if (!correctWord || !guessWord) {
    return res.status(400).json({error: "null"})
  }

  const feedback = algorithm1(correctWord, guessWord);
  res.json(feedback);
});

export default app;