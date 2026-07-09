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
  const [compareList, setCompareList] = useState([])

  function clearSearch() {
    setPlayers([])
    setSelectedPlayer(null)
  }

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

  function handleCompareToggle(player) {
    if (compareList.find(p => p.id === player.id)) {
      // already in list so remove them
      setCompareList(prev => prev.filter(p => p.id !== player.id))
    } else if (compareList.length < 2) {
      // add them
      setCompareList(prev => [...prev, player])
    }
  }

  return (
    <div className="App">
      <h1>NBA Tracker</h1>
      <nav>
        <button 
          className={currentPage === 'search' ? 'active' : ''}
          onClick={() => setCurrentPage('search')}
        >Search</button>
        <button 
          className={currentPage === 'favorites' ? 'active' : ''}
          onClick={() => setCurrentPage('favorites')}>
          Favorites ({favoritedMap.size})
        </button>
      </nav>
      {compareList.length > 0 && (
        <div className="compare-panel">
          <p>Comparing: {compareList.map(p => p.first_name).join(' vs ')}</p>
          {compareList.length === 2 && (
            <button onClick={() => setCurrentPage('compare')}>Compare!</button>
          )}
          <button onClick={() => setCompareList([])}>Clear</button>
        </div>
      )}
      {currentPage === 'search' ? (
        <div>
          <SearchBar onSearch={handleSearch} onClear={clearSearch}/>
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
                compareList={compareList}
                onCompareToggle={handleCompareToggle}
              />
            ))
          )}
          {players.length === 0 && <p className="empty-state">No players found. Try searching for a name!</p>}
        </div>
      ) :  currentPage === 'favorites'  ? (
      <FavoritesPage 
        favoritedMap={favoritedMap}
        onFavoriteToggle={handleFavoriteToggle}
      />
      ) : (
        <p>Compare page coming soon!</p>
      )}
    </div>
  )
}

export default App