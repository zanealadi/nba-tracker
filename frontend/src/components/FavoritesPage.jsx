import { useState, useEffect } from "react";
import FavoriteCard from "./FavoriteCard"

function FavoritesPage({favoritedMap, onFavoriteToggle, onSelect}) {
    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        async function fetchFavorites() {
            const response = await fetch('http://localhost:8080/api/players')
            const data = await response.json()
            setFavorites(data)
        }
        fetchFavorites()
    }, [])

    return (
        <div className="favorites-page"> 
        <h2>My Favorites</h2>
        {favorites.map(player => (
            <FavoriteCard key={player.id} player={player} favoritedMap={favoritedMap} onFavoriteToggle={onFavoriteToggle} onSelect={onSelect}/>
        ))}
        {favorites.length === 0 && <p className="empty-state">No favorites yet! Search for players to add them.</p>}
        </div>
    )
}

export default FavoritesPage