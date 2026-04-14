import express from "express";
import algorithm2 from "./algorithms/algorithm2.js";
import algorithm1 from "./algorithms/algorithm1.js";
import Highscore from "./database/models/highscore.js";
import { engine } from "express-handlebars";

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./server/views");

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

app.post("/api/highscore", async (req, res) => {
  try {
    const { name, timeMs, guesses, wordLength, uniqueLetters } = req.body;

    const newHighscore = await Highscore.create({
      name,
      timeMs,
      guesses,
      wordLength,
      uniqueLetters
    });

    res.status(201).json(newHighscore);

  } catch (error) {
    return res.status(400).json({ error: "Invalid highscore data" });
  }
});

app.get("/highscores", async (req, res) => {
  try {
    const highscores = await Highscore.find().sort({ timeMs: 1 }).limit(10).lean();
    res.render("highscores", { highscores });

  } catch (error) {
    res.status(500).send("Error fetching highscores");
  }
});

export default app;