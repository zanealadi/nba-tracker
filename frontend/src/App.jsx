import './App.css'
import SearchBar from './components/SearchBar'
import { useState } from 'react'
import PlayerCard from './components/PlayerCard'

function App() {
  const [players, setPlayers] = useState([])

  function handleSearch(term) {
    fetch('http://localhost:8080/api/players/search?name=' + term)
      .then(response => response.json())
      .then(data => setPlayers(data.data))
  }

  return (
    <div className="App">
      <h1>NBA Tracker</h1>
      <SearchBar onSearch={handleSearch} />
      {players.map(player => (
        <PlayerCard key={player.id} player={player} />
      ))}
    </div>
  )
}

export default App