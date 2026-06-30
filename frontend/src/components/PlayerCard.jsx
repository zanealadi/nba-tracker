import FavoriteButton from "./FavoriteButton"

function PlayerCard({ player, onSelect }) {

  return (
    <div className="player-card" onClick={() => onSelect(player)}>
      <h3>{player.first_name} {player.last_name}</h3>
      <p>Position: {player.position}</p>
      <p>Team: {player.team.full_name}</p>
      <p>Height: {player.height}</p>
      <p>Weight: {player.weight}</p>
      <p>Jersey Number: {player.jersey_number}</p>
      <FavoriteButton player={player} />
    </div>
  )
}

export default PlayerCard