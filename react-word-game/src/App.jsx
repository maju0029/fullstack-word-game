import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main class="app">
    <h1>React Word Game</h1>
    <ul>
      <li>Highscore</li>
      <li>Information about the projekt</li>
    </ul>
    <p>Välkommen till React Word Game! Här kan du spela ett roligt ordspel och utmana dina vänner. Klicka på knappen nedan för att starta spelet och se hur många ord du kan hitta!</p>
    <button class="start-button" onClick={() => setCount(count + 1)}>
      Starta Spelet
    </button>
    <p>Du har startat spelet {count} gånger.</p>
    <p></p>
    <input type="text" placeholder="hur många bokstäver?" class="word-input"
    />
    </main>
  )
}

export default App
