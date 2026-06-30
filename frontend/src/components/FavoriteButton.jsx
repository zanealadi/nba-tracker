import { useState } from 'react'

function FavoriteButton({ player }) {
  const [isFavorited, setIsFavorited] = useState(false)
  const [savedId, setSavedId] = useState(null)
  
  async function handleFavorite() {
    if (isFavorited) {
      const response = await fetch('http://localhost:8080/api/players/' + savedId, { method: 'DELETE' })
      setIsFavorited(false)
      setSavedId(null)
    } else {
      const response = await fetch('http://localhost:8080/api/players/favorites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(player)
    })
    const data = await response.json()
    setSavedId(data.id)
    console.log('Saved favorite:', data)
    setIsFavorited(true)
    }
  }

  return (
    <button className="favorite-button" onClick={(e) => {e.stopPropagation(); handleFavorite()}}>
      {isFavorited ? '★' : '☆'}
    </button>
  )
}

export default FavoriteButton