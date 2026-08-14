import './App.css'
import SearchBar from './components/SearchBar'
import { useState, useEffect } from 'react'
import PlayerCard from './components/PlayerCard'
import PlayerDetails from './components/PlayerDetails'
import FavoritesPage from './components/FavoritesPage'
import CompareView from './components/CompareView'
import TeamSearch from './components/TeamSearch'
import StatsCard from './components/StatsCard'

function App() {
  const [players, setPlayers] = useState([])
  const [selectedPlayer, setSelectedPlayer] = useState(null)
  const [currentPage, setCurrentPage] = useState('search')
  const [favoritedMap, setFavoritedMap] = useState(() => {
    const saved = localStorage.getItem('favoritedMap')
    return saved ? new Map(JSON.parse(saved)) : new Map()
  })
  const [compareList, setCompareList] = useState([])
  const [teamMode, setTeamMode] = useState(false)
  const [savedPlayers, setSavedPlayers] = useState(() => {
    const saved = localStorage.getItem('savedPlayers')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('savedPlayers', JSON.stringify(savedPlayers))
  }, [savedPlayers])

  useEffect(() => {
    localStorage.setItem('favoritedMap', JSON.stringify([...favoritedMap]))
  }, [favoritedMap])

  function clearSearch() {
    setPlayers([])
    setSelectedPlayer(null)
    setTeamMode(false)
  }

  function handleSearch(term) {
    setTeamMode(false)
    const trimmed = term.trim()
    const searchWord = trimmed.split(' ').pop()
  
  fetch('https://nba-tracker-production-a639.up.railway.app/api/players/search?name=' + searchWord)
    .then(response => response.json())
    .then(data => {
      let results = data.data || []
      
      if (trimmed.split(' ').length > 1) {
        const fullName = trimmed.toLowerCase()
        results = results.filter(p => 
          (p.first_name + ' ' + p.last_name).toLowerCase().includes(fullName)
        )
      }
      
      setPlayers(results)
    })
    .catch(error => {
      console.error('Search failed:', error)
      setPlayers([])
    })
  }

  async function handleFavoriteToggle(player) {
    if (favoritedMap.has(player.id)) {
      const dbId = favoritedMap.get(player.id)
      await fetch('https://nba-tracker-production-a639.up.railway.app/api/players/' + dbId, { method: 'DELETE' })
      setFavoritedMap(prev => {
        const next = new Map(prev)
        next.delete(player.id)
        return next
      })
      setSavedPlayers(prev => prev.filter(p => p.id !== player.id))

    // check if it already is a data base player
    } else if ([...favoritedMap.values()].includes(player.id)) {
      await fetch('https://nba-tracker-production-a639.up.railway.app/api/players/' + player.id, { method: 'DELETE' })
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
      setSavedPlayers(prev => prev.filter(p => p.id !== player.id))

    } else {
      // isnt already favorited so save
      const response = await fetch('https://nba-tracker-production-a639.up.railway.app/api/players/favorites', {
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
      setSavedPlayers(prev => [...prev, {
        id: data.id,
        firstName: player.first_name,
        lastName: player.last_name,
        teamName: player.team?.full_name || player.teamName,
        teamAbbreviation: player.team?.abbreviation || player.teamAbbreviation,
        position: player.position,
        jerseyNumber: player.jersey_number || player.jerseyNumber
      }])
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

  function handleFavoriteSelect(player) {
    setSelectedPlayer(player)
    setCurrentPage('search')
  }

  function handleTeamSelect(team) {
    if (!team) {
      setPlayers([])
      return
    }
    fetch('https://nba-tracker-production-a639.up.railway.app/api/players/team-stats?team=' + team.abbreviation)
      .then(response => response.json())
      .then(data => {
        setPlayers(data.data || [])
        setSelectedPlayer(null)
        setTeamMode(true)
      })
      .catch(error => {
        console.error('Team fetch failed:', error)
        setPlayers([])
      })
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
          <TeamSearch onTeamSelect={handleTeamSelect}/>
          {selectedPlayer ? (
            <PlayerDetails player={selectedPlayer} onBack={() => setSelectedPlayer(null)} />
          ) : teamMode ? (
            players.map((stat, index) => (
              <StatsCard key={index} stat={stat} />
            ))
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
          {players.length === 0 && !selectedPlayer && <p className="empty-state">No players found. Try searching for a name!</p>}
        </div>
      ) :  currentPage === 'favorites'  ? (
      <FavoritesPage 
        favoritedMap={favoritedMap}
        onFavoriteToggle={handleFavoriteToggle}
        onSelect={handleFavoriteSelect}
        savedPlayers={savedPlayers}
      />
      ) : (
        <CompareView 
          compareList={compareList} 
          onBack={() => setCurrentPage('search')} 
        />
      )}
    </div>
  )
}

export default App