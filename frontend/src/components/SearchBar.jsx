import { useState } from 'react'

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className='search-bar'>
        <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    onSearch(searchTerm)
                }
            }}
            placeholder="Search for a player..."
        />
        <button onClick={() => onSearch(searchTerm)}>Search</button>
    </div>
  )
}

export default SearchBar