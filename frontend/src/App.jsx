import './App.css'
import SearchBar from './components/SearchBar'
import { useState } from 'react'
import PlayerCard from './components/PlayerCard'
import PlayerDetails from './components/PlayerDetails'

function App() {
  const [players, setPlayers] = useState([])
  const [selectedPlayer, setSelectedPlayer] = useState(null)

  function handleSearch(term) {
    fetch('http://localhost:8080/api/players/search?name=' + term)
      .then(response => response.json())
      .then(data => setPlayers(data.data || []))
      .catch(error => {
        console.error('Search failed:', error)
        setPlayers([])
      })
  }

  return (
    <div className="App">
      <h1>NBA Tracker</h1>
      <SearchBar onSearch={handleSearch} />
      {selectedPlayer ? (
        <PlayerDetails player={selectedPlayer} onBack={() => setSelectedPlayer(null)} />
      ) : (
        players.map(player => (
          <PlayerCard key={player.id} player={player} onSelect={setSelectedPlayer}/>
        ))
      )}
    </div>
  )
}

export default App