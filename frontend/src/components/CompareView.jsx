import { useState, useEffect } from "react"

function CompareView({ compareList, onBack }) {
  const [stats, setStats] = useState([null, null])
  const [season, setSeason] = useState(2025)

  function normalize(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
  }

  useEffect(() => {
    async function playerCompare() {
      const player1 = compareList[0]
      const player2 = compareList[1]
      const url1 = 'https://nba-tracker-production-a639.up.railway.app/api/players/stats?playerName=' + player1.first_name + '+' + player1.last_name + '&season=' + season + '&team=' + player1.team.abbreviation
      const url2 = 'https://nba-tracker-production-a639.up.railway.app/api/players/stats?playerName=' + player2.first_name + '+' + player2.last_name + '&season=' + season + '&team=' + player2.team.abbreviation
      
      const [data1, data2] = await Promise.all([
        fetch(url1).then(r => r.json()),
        fetch(url2).then(r => r.json()),
      ])
      const match1 = data1.data.find(p => 
        normalize(p.playerName).toLowerCase().includes(normalize(player1.last_name))
      )
      const match2 = data2.data.find(p => 
        normalize(p.playerName).toLowerCase().includes(normalize(player2.last_name))
      )
      setStats([match1 || null, match2 || null])
    }
    playerCompare()
  }, [season])

  return (
    <div className="compare-view">
      <button className="back-button" onClick={onBack}>← Back to Search</button>
      <select value={season} onChange={(e) => setSeason(Number(e.target.value))}>
        <option value={2025}>2024-25</option>
        <option value={2024}>2023-24</option>
        <option value={2023}>2022-23</option>
        <option value={2022}>2021-22</option>
      </select>
      <h2>Player Comparison</h2>
      {stats[0] && stats[1] ? (
        <div className="compare-grid">
            <div className="compare-player">
                <h3>{compareList[0].first_name} {compareList[0].last_name}</h3>
                <p>{compareList[0].team.full_name}</p>
                <div className="compare-stat">
                <span>{(stats[0].points / stats[0].games).toFixed(1)}</span>
                <label>PPG</label>
                </div>
                <div className="compare-stat">
                <span>{(stats[0].assists / stats[0].games).toFixed(1)}</span>
                <label>APG</label>
                </div>
                <div className="compare-stat">
                <span>{(stats[0].totalRb / stats[0].games).toFixed(1)}</span>
                <label>RPG</label>
                </div>
                <div className="compare-stat">
                <span>{(stats[0].steals / stats[0].games).toFixed(1)}</span>
                <label>SPG</label>
                </div>
                <div className="compare-stat">
                <span>{(stats[0].blocks / stats[0].games).toFixed(1)}</span>
                <label>BPG</label>
                </div>
                <div className="compare-stat">
                <span>{stats[0].games}</span>
                <label>GP</label>
                </div>
            </div>

            <div className="compare-player">
                <h3>{compareList[1].first_name} {compareList[1].last_name}</h3>
                <p>{compareList[1].team.full_name}</p>
                <div className="compare-stat">
                <span>{(stats[1].points / stats[1].games).toFixed(1)}</span>
                <label>PPG</label>
                </div>
                <div className="compare-stat">
                <span>{(stats[1].assists / stats[1].games).toFixed(1)}</span>
                <label>APG</label>
                </div>
                <div className="compare-stat">
                <span>{(stats[1].totalRb / stats[1].games).toFixed(1)}</span>
                <label>RPG</label>
                </div>
                <div className="compare-stat">
                <span>{(stats[1].steals / stats[1].games).toFixed(1)}</span>
                <label>SPG</label>
                </div>
                <div className="compare-stat">
                <span>{(stats[1].blocks / stats[1].games).toFixed(1)}</span>
                <label>BPG</label>
                </div>
                <div className="compare-stat">
                <span>{stats[1].games}</span>
                <label>GP</label>
                </div>
            </div>
            </div>
      ) : (
        <p>Loading stats...</p>
      )}
    </div>
  )
}

export default CompareView