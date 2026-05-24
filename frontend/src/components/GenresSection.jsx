import { useState, useEffect } from 'react'
import { getGenres, getMoviesByGenre } from '../api'
import MovieCard from './MovieCard'

export default function GenresSection({ onMovieClick }) {
  const [genres, setGenres] = useState([])
  const [selectedGenre, setSelectedGenre] = useState(null)
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [moviesLoading, setMoviesLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadGenres = async () => {
      try {
        setLoading(true)
        const data = await getGenres()
        if (data.success && data.data.genres) {
          setGenres(data.data.genres)
        } else {
          setError('Failed to load genres')
        }
      } catch (err) {
        setError(`Error loading genres: ${err.message}`)
      } finally {
        setLoading(false)
      }
    }

    loadGenres()
  }, [])

  const handleGenreClick = async (genre) => {
    setSelectedGenre(genre)
    setMoviesLoading(true)
    setError(null)
    
    try {
      const data = await getMoviesByGenre(genre.id)
      if (data.success) {
        const moviesArray = data.data.results || data.data
        setMovies(Array.isArray(moviesArray) ? moviesArray : [])
      } else {
        setError('Failed to load movies')
        setMovies([])
      }
    } catch (err) {
      setError(`Error loading movies: ${err.message}`)
      setMovies([])
    } finally {
      setMoviesLoading(false)
    }
  }

  return (
    <section>
      <h2 className="text-3xl font-bold mb-6">Browse by Genre</h2>
      
      {error && (
        <div className="bg-red-900 text-red-100 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-400">Loading genres...</p>
        </div>
      ) : (
        <>
          {/* Genres Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-10">
            {genres.map((genre) => (
              <button
                key={genre.id}
                onClick={() => handleGenreClick(genre)}
                className={`p-4 rounded-lg font-semibold transition-all duration-200 ${
                  selectedGenre?.id === genre.id
                    ? 'bg-red-600 text-white scale-105'
                    : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                }`}
              >
                {genre.name}
              </button>
            ))}
          </div>

          {/* Movies Grid */}
          {selectedGenre && (
            <div>
              <h3 className="text-2xl font-bold mb-6">{selectedGenre.name} Movies</h3>
              
              {moviesLoading ? (
                <div className="text-center py-12">
                  <p className="text-xl text-gray-400">Loading movies...</p>
                </div>
              ) : movies.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-xl text-gray-400">No movies found in this genre</p>
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
            </div>
          )}
        </>
      )}
    </section>
  )
}
