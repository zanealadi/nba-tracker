import FavoriteButton from "./FavoriteButton"

function FavoriteCard({ player, onSelect, favoritedMap, onFavoriteToggle }) {
  const isFavorited = !favoritedMap || favoritedMap.size === 0 || 
    Array.from(favoritedMap.values()).includes(player.id)
  

  function handleSelect() {
    const apiFormatPlayer = {
      first_name: player.firstName,
      last_name: player.lastName,
      position: player.position,
      jersey_number: player.jerseyNumber,
      team: {
        full_name: player.teamName,
        abbreviation: player.teamAbbreviation  
      }
    }
    onSelect(apiFormatPlayer)
  }

  return (
    <div className="favorite-card" onClick={handleSelect}>
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