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
    <button onClick={onBack}>← Back to Results</button>
    <h2>{player.first_name} {player.last_name}</h2>
    <select value={season} onChange={(e) => setSeason(Number(e.target.value))}>
        <option value={2025}>2024-25</option>
        <option value={2024}>2023-24</option>
        <option value={2023}>2022-23</option>
        <option value={2022}>2021-22</option>
    </select>
        {stats ? (
            <div>
                <p>Points: {stats.points}</p>
                <p>Assists: {stats.assists}</p>
                <p>Rebounds: {stats.totalRb}</p>
                <p>Steals: {stats.steals}</p>
                <p>Blocks: {stats.blocks}</p>
                <p>Games Played: {stats.games}</p>
            </div>
        ) : (
          <p>Stats currently unavailable — try again later.</p>
        )}
    <button onClick={onBack}>← Back to Results</button>
    </div>
  )
}

export default PlayerDetails