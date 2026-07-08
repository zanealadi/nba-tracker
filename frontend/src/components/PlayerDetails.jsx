import { useState } from "react"
import { useEffect } from "react"

function PlayerDetails({ player, onBack }) {
    const [stats, setStats] = useState(null)
    const [season, setSeason] = useState(2025)
    
    useEffect(() => {
        async function fetchStats() {
            try {
                const response = await fetch('http://localhost:8080/api/players/stats?playerName=' + player.first_name + '+' + player.last_name + '&season=' + season)
                const data = await response.json()
                setStats(data.data[0] || null)
            } catch (error) {
                console.error('Stats unavailable:', error)
            setStats(null)
            }
        }
        fetchStats()
    }, [player, season])
  return (
    <div className="player-details">
    <h2>{player.first_name} {player.last_name}</h2>
    <select value={season} onChange={(e) => setSeason(Number(e.target.value))}>
        <option value={2025}>2024-25</option>
        <option value={2024}>2023-24</option>
        <option value={2023}>2022-23</option>
        <option value={2022}>2021-22</option>
    </select>
        {stats ? (
            <div>
                <p>Points Per Game: {(stats.points / stats.games).toFixed(1)}</p>
                <p>Assists Per Game: {(stats.assists / stats.games).toFixed(1)}</p>
                <p>Rebounds Per Game: {(stats.totalRb / stats.games).toFixed(1)}</p>
                <p>Steals Per Game: {(stats.steals / stats.games).toFixed(1)}</p>
                <p>Blocks Per Game: {(stats.blocks / stats.games).toFixed(1)}</p>
                <p>Games Played: {stats.games}</p>
            </div>
        ) : (
          <p>Stats currently unavailable — try again later.</p>
        )}
    <button className="back-button" onClick={onBack}>← Back to Results</button>
    </div>
  )
}

export default PlayerDetails