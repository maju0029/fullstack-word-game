import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main class="app">
    <h1>React Word Game</h1>
    <p>Välkommen till React Word Game! Här kan du spela ett roligt ordspel och utmana dina vänner. Klicka på knappen nedan för att starta spelet och se hur många ord du kan hitta!</p>
    <button class="start-button" onClick={() => setCount(count + 1)}>
      Starta Spelet
    </button>
    <p>Du har startat spelet {count} gånger.</p>
    </main>
  )
}

export default App
