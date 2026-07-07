import './App.css'
import SearchBar from './components/SearchBar'
import { useState } from 'react'
import PlayerCard from './components/PlayerCard'
import PlayerDetails from './components/PlayerDetails'
import FavoritesPage from './components/FavoritesPage'

function App() {
  const [players, setPlayers] = useState([])
  const [selectedPlayer, setSelectedPlayer] = useState(null)
  const [currentPage, setCurrentPage] = useState('search')
  const [favoritedMap, setFavoritedMap] = useState(new Map())

  function handleSearch(term) {
    fetch('http://localhost:8080/api/players/search?name=' + term)
      .then(response => response.json())
      .then(data => setPlayers(data.data || []))
      .catch(error => {
        console.error('Search failed:', error)
        setPlayers([])
      })
  }

  async function handleFavoriteToggle(player) {
    if (favoritedMap.has(player.id)) {
      const dbId = favoritedMap.get(player.id)
      await fetch('http://localhost:8080/api/players/' + dbId, { method: 'DELETE' })
      setFavoritedMap(prev => {
        const next = new Map(prev)
        next.delete(player.id)
        return next
      })
    // check if it already is a data base player
    } else if ([...favoritedMap.values()].includes(player.id)) {
      await fetch('http://localhost:8080/api/players/' + player.id, { method: 'DELETE' })
      setFavoritedMap(prev => {
        const next = new Map(prev)
        for (const [key, val] of next) {
          if (val === player.id) {
            next.delete(key)
            break
          }
        }
        return next
      })
    } else {
      // isnt already favorited so save
      const response = await fetch('http://localhost:8080/api/players/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(player)
      })
      const data = await response.json()
      setFavoritedMap(prev => {
        const next = new Map(prev)
        next.set(player.id, data.id)
        return next
      })
    }
  }

  return (
    <div className="App">
      <h1>NBA Tracker</h1>
      <nav>
        <button onClick={() => setCurrentPage('search')}>Search</button>
        <button onClick={() => setCurrentPage('favorites')}>
          Favorites ({favoritedMap.size})
        </button>
      </nav>
      {currentPage === 'search' ? (
        <div>
          <SearchBar onSearch={handleSearch} />
          {selectedPlayer ? (
            <PlayerDetails player={selectedPlayer} onBack={() => setSelectedPlayer(null)} />
          ) : (
            players.map(player => (
              <PlayerCard 
                key={player.id} 
                player={player} 
                onSelect={setSelectedPlayer}
                favoritedMap={favoritedMap}
                onFavoriteToggle={handleFavoriteToggle}
              />
            ))
          )}
        </div>
      ) : (
      <FavoritesPage 
        favoritedMap={favoritedMap}
        onFavoriteToggle={handleFavoriteToggle}
      />
      )}
      
    </div>
  )
}

export default App