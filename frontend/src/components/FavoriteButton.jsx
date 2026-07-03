import { useState } from 'react'

function FavoriteButton({ player, isFavorited, onFavoriteToggle }) {
  return (
    <button 
      className="favorite-button" 
      onClick={(e) => {
        e.stopPropagation()
        onFavoriteToggle(player)
      }}
    >
      {isFavorited ? '★' : '☆'}
    </button>
  )
}

export default FavoriteButton