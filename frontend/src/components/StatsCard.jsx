function StatsCard({ stat, onSelect }) {
  return (
    <div className="player-card" onClick={() => onSelect && onSelect(stat)}>
      <h3>{stat.playerName}</h3>
      <p>Position: {stat.position}</p>
      <p>Team: {stat.team}</p>
      <p>PPG: {(stat.points / stat.games).toFixed(1)}</p>
      <p>APG: {(stat.assists / stat.games).toFixed(1)}</p>
      <p>RPG: {(stat.totalRb / stat.games).toFixed(1)}</p>
      <p>Games: {stat.games}</p>
    </div>
  )
}

export default StatsCard