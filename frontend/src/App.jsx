import './App.css'
import SearchBar from './components/SearchBar'

function App() {

  function handleSearch(term) {
    console.log('Searching for:', term)
  }
  return (
    <div className="App">
      <h1>NBA Tracker</h1>
      <SearchBar onSearch={handleSearch} />
    </div>
  )
}

export default App