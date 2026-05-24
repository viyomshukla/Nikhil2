import { useState, useEffect } from 'react'
import { getPopularMovies } from '../api'
import MovieCard from './MovieCard'

export default function PopularSection({ onMovieClick }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true)
        const data = await getPopularMovies()
        if (data.success) {
          const moviesArray = data.data.results || data.data
          setMovies(Array.isArray(moviesArray) ? moviesArray : [])
        } else {
          setError('Failed to load popular movies')
        }
      } catch (err) {
        setError(`Error loading movies: ${err.message}`)
      } finally {
        setLoading(false)
      }
    }

    loadMovies()
  }, [])

  return (
    <section>
      <h2 className="text-3xl font-bold mb-6">Popular Movies</h2>
      
      {error && (
        <div className="bg-red-900 text-red-100 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-400">Loading popular movies...</p>
        </div>
      ) : movies.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-400">No movies found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onMovieClick={onMovieClick}
            />
          ))}
        </div>
      )}
    </section>
  )
}
