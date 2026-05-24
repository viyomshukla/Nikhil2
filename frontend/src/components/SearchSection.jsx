import { useState } from 'react'
import { searchMovies } from '../api'
import MovieCard from './MovieCard'

export default function SearchSection({ onMovieClick }) {
  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searched, setSearched] = useState(false)

  const handleSearch = async (e) => {
    e.preventDefault()
    
    if (!query.trim()) {
      setError('Please enter a search term')
      return
    }

    try {
      setLoading(true)
      setError(null)
      setSearched(true)
      
      const data = await searchMovies(query)
      if (data.success) {
        const moviesArray = data.data.results || data.data
        setMovies(Array.isArray(moviesArray) ? moviesArray : [])
      } else {
        setError('Failed to search movies')
        setMovies([])
      }
    } catch (err) {
      setError(`Error searching movies: ${err.message}`)
      setMovies([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <section>
      <h2 className="text-3xl font-bold mb-6">Search Movies</h2>
      
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for movies..."
            className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-red-600 transition-colors"
          />
          <button
            type="submit"
            className="px-8 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
          >
            Search
          </button>
        </div>
      </form>

      {error && (
        <div className="bg-red-900 text-red-100 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-400">Searching for movies...</p>
        </div>
      ) : searched && movies.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-400">No movies found for "{query}"</p>
        </div>
      ) : movies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onMovieClick={onMovieClick}
            />
          ))}
        </div>
      ) : null}
    </section>
  )
}
