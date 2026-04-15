import { useState } from 'react';
import Letter from './components/Letter.jsx';

export default function Home() {
  const [wordLength, setWordLength] = useState(5);
  const [uniqueLetters, setUniqueLetters] = useState(true);
  const [correctWord, setCorrectWord] = useState("");
  const [guessWord, setGuessWord] = useState("");
  const [feedback, setFeedback] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [timeMs, setTimeMs] = useState(null);
  const [guesses, setGuesses] = useState([]);
  const [name, setName] = useState("");
  const [gameWon, setGameWon] = useState(false);

  async function startGame() {
    const response = await fetch(`/api/word?length=${wordLength}&unique=${uniqueLetters}`);
    const data = await response.json();
    setCorrectWord(data.word);
    setGuessWord("");
    setFeedback([]);
    setStartTime(Date.now());
    setGuesses([]);
    setGameWon(false);
    setName("");
    setTimeMs(null);
  }

  async function handleGuess() {

    if(!correctWord) {
      alert("Start a game first");
      return;
    }

    const cleanedGuessWord = guessWord.toLowerCase().trim();

    const response = await fetch("/api/guess", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        correctWord,
        guessWord: cleanedGuessWord
      })
    });

    const data = await response.json();
    setFeedback(data);

    const updatedGuesses = [...guesses, cleanedGuessWord];
    setGuesses(updatedGuesses);

    if (cleanedGuessWord === correctWord) {
      const totalTime = Date.now() - startTime;
      setTimeMs(totalTime);
      setGameWon(true);
      alert("Congratulations!");
    }
    setGuessWord("");
  }

  async function saveHighscore() {
    const response = await fetch("/api/highscore", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify ({
        name,
        timeMs,
        guesses,
        wordLength,
        uniqueLetters
      })
    });
    const data = await response.json();
    console.log(data);
    alert("Highscore saved!");
  }

  return (
    <div>
      <h1>Wordle-game</h1>

      <div>
        <label>Word length: </label>
        <input
          type="number"
          value={wordLength}
          onChange={(e) => setWordLength(Number(e.target.value))}
        />
      </div>

      <div>
        <label>Unique letters: </label>
        <input
          type="checkbox"
          checked={uniqueLetters}
          onChange={(e) => setUniqueLetters(e.target.checked)}
        />
      </div>

      <button onClick={startGame}>Start game</button>
    {correctWord && (
      <div>
        <input
          type="text"
          value={guessWord}
          onChange={(e) => setGuessWord(e.target.value)}
          placeholder="write your guess"
        />
        <button onClick={handleGuess}>Guess</button>
      </div>
      )}

      <div>
        {feedback.map((item, index) => (
          <Letter 
            key={index}
            letter={item.letter}
            result={item.result}
          />
        ))}
      </div>
      {gameWon && (
        <div>
          <h2>You guessed the correct word! Congratulations!</h2>
          <p>Your time: {timeMs} ms</p>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Write your name"
          />
          <button onClick={saveHighscore}>Save highscore</button>
        </div>
      )}
    </div>
  );
}