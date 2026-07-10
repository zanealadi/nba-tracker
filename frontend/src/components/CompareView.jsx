import { useState, useEffect } from "react"

function CompareView({ compareList, onBack }) {
  const [stats, setStats] = useState([null, null])

  useEffect(() => {
    async function playerCompare() {
      const player1 = compareList[0]
      const player2 = compareList[1]
      const url1 = 'http://localhost:8080/api/players/stats?playerName=' + player1.first_name + '+' + player1.last_name + '&season=2025'
      const url2 = 'http://localhost:8080/api/players/stats?playerName=' + player2.first_name + '+' + player2.last_name + '&season=2025'
      
      const [data1, data2] = await Promise.all([
        fetch(url1).then(r => r.json()),
        fetch(url2).then(r => r.json())
      ])
      setStats([data1.data[0], data2.data[0]])
    }
    playerCompare()
  }, [])

  return (
    <div className="compare-view">
      <button className="back-button" onClick={onBack}>← Back to Search</button>
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

            <div className="compare-labels">
                <div className="compare-stat"><label>PPG</label></div>
                <div className="compare-stat"><label>APG</label></div>
                <div className="compare-stat"><label>RPG</label></div>
                <div className="compare-stat"><label>SPG</label></div>
                <div className="compare-stat"><label>BPG</label></div>
                <div className="compare-stat"><label>GP</label></div>
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