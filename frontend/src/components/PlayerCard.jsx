function PlayerCard({ player }) {
  return (
    <div className="player-card">
      <h3>{player.first_name} {player.last_name}</h3>
      <p>Position: {player.position}</p>
      <p>Team: {player.team.full_name}</p>
      <p>Height: {player.height}</p>
      <p>Weight: {player.weight}</p>
      <p>Jersey Number: {player.jersey_number}</p>
    </div>
  )
}

export default PlayerCard