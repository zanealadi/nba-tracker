import FavoriteButton from "./FavoriteButton"

function FavoriteCard({ player, onSelect, favoritedMap, onFavoriteToggle }) {
  const isFavorited = !favoritedMap || favoritedMap.size === 0 || 
    Array.from(favoritedMap.values()).includes(player.id)

  return (
    <div className="favorite-card" onClick={() => onSelect && onSelect(player)}>
      <h3>{player.firstName} {player.lastName}</h3>
      <p>Position: {player.position}</p>
      <p>Team: {player.teamName}</p>
      <p>Jersey Number: {player.jerseyNumber}</p>
      <FavoriteButton 
        player={player} 
        isFavorited={isFavorited}
        onFavoriteToggle={onFavoriteToggle}
      />
    </div>
  )
}

export default FavoriteCard