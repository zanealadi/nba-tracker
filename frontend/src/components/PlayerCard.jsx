import FavoriteButton from "./FavoriteButton"

function PlayerCard({ player, onSelect, favoritedMap, onFavoriteToggle, compareList, onCompareToggle}) {
  const isFavorited = favoritedMap.has(player.id)
  const isComparing = compareList.some(p => p.id === player.id)

  return (
    <div className="player-card" onClick={() => onSelect(player)}>
      <h3>{player.first_name} {player.last_name}</h3>
      <p>Position: {player.position}</p>
      <p>Team: {player.team.full_name}</p>
      <p>Height: {player.height}</p>
      <p>Weight: {player.weight}</p>
      <p>Jersey Number: {player.jersey_number}</p>
      <FavoriteButton player={player} isFavorited={isFavorited} onFavoriteToggle={onFavoriteToggle}/>
      <button 
        className={`compare-button ${isComparing ? 'comparing' : ''}`}
        onClick={(e) => { e.stopPropagation(); onCompareToggle(player) }}
      >
        {isComparing ? '✕' : '➕'}
      </button>
    </div>
  )
}

export default PlayerCard