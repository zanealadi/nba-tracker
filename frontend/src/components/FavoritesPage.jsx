import { useState, useEffect } from "react";
import FavoriteCard from "./FavoriteCard"

function FavoritesPage({favoritedMap, onFavoriteToggle, onSelect, savedPlayers}) {
    return (
        <div className="favorites-page"> 
        <h2>My Favorites</h2>
        {savedPlayers.map(player => (
            <FavoriteCard key={player.id} player={player} favoritedMap={favoritedMap} onFavoriteToggle={onFavoriteToggle} onSelect={onSelect}/>
        ))}
        {savedPlayers.length === 0 && <p className="empty-state">No favorites yet! Search for players to add them.</p>}
        </div>
    )
}

export default FavoritesPage