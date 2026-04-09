import { useState } from 'react';

export default function Home() {
  const [wordLength, setWordLength] = useState(5);
  const [uniqueLetters, setUniqueLetters] = useState(true);
  const [correctWord, setCorrectWord] = useState("");
  const [guessWord, setGuessWord] = useState("");
  const [feedback, setFeedback] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [guesses, setGuesses] = useState([]);

  async function startGame() {
    const response = await fetch(`/api/word?length=${wordLength}&unique=${uniqueLetters}`);
    const data = await response.json();
    setCorrectWord(data.word);
    setGuessWord("");
    setFeedback([]);
    setStartTime(Date.now());
    setGuesses([]);
  }

  async function handleGuess() {

    if(!correctWord) {
      alert("Start a game first");
      return;
    }

    const response = await fetch("/api/guess", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        correctWord,
        guessWord
      })
    });

    const data = await response.json();
    setFeedback(data);

    setGuesses(prev => [...prev, guessWord]);
    
    // Kollar om gissningen är korrekt. Inital för testning. Ska ändras eller tas bort sen.

    if (guessWord === correctWord) {
      const totalTime = Date.now() - startTime;
      alert(`Congratulations! You guessed the word in ${totalTime / 1000} seconds.`);
      console.log(totalTime);
    }
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

      <div>
        <input
          type="text"
          value={guessWord}
          onChange={(e) => setGuessWord(e.target.value)}
          placeholder="write your guess"
        />
        <button onClick={handleGuess}>Guess</button>
      </div>

      <div>
        {feedback.map((item, index) => (
          <p key={index}>
            {item.letter} - {item.result}
          </p>
        ))}
      </div>
    </div>
  );
}