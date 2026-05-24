import { useState, useEffect } from 'react'
import { getMovieCredits } from '../api'
import WishlistButton from './WishlistButton'

export default function MovieModal({ movie, onClose }) {
  const [credits, setCredits] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadCredits = async () => {
      try {
        const data = await getMovieCredits(movie.id)
        if (data.success) {
          setCredits(data.data)
        }
      } catch (error) {
        console.error('Error loading credits:', error)
      } finally {
        setLoading(false)
      }
    }

    loadCredits()
  }, [movie.id])

  const backdropPath = movie.backdrop_path || movie.backdropPath
  const posterPath = movie.poster_path || movie.posterPath
  const backdropUrl = backdropPath 
    ? `https://image.tmdb.org/t/p/w780${backdropPath}` 
    : (posterPath ? `https://image.tmdb.org/t/p/w500${posterPath}` : '')

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-red-500 z-60 bg-gray-900 rounded-full w-10 h-10 flex items-center justify-center"
        >
          ✕
        </button>

        <div className="p-6">
          {/* Backdrop Image */}
          {backdropUrl && (
            <img 
              src={backdropUrl} 
              alt={movie.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
          )}

          {/* Title and Rating */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <h2 className="text-3xl font-bold">{movie.title || movie.name}</h2>
            <WishlistButton movie={movie} className="shrink-0 text-xl" />
          </div>
          <div className="bg-yellow-500 text-black px-3 py-1 rounded-lg inline-block font-bold mb-4">
            ⭐ {movie.vote_average || movie.voteAverage || 'N/A'}/10
          </div>

          {/* Details */}
          <div className="space-y-3 mb-6">
            <p><strong>Release Date:</strong> {movie.release_date || movie.releaseDate || 'N/A'}</p>
            <p><strong>Runtime:</strong> {movie.runtime || 'N/A'} minutes</p>
          </div>

          {/* Overview */}
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-2">Overview</h3>
            <p className="text-gray-300 leading-relaxed">{movie.overview || 'No description available'}</p>
          </div>

          {/* Cast */}
          {!loading && credits && credits.cast && credits.cast.length > 0 && (
            <div>
              <h3 className="text-xl font-bold mb-3 text-red-500">Cast</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {credits.cast.slice(0, 6).map((actor) => (
                  <div key={actor.id} className="bg-gray-700 p-3 rounded-lg text-center">
                    <p className="font-semibold text-sm">{actor.name || 'Unknown'}</p>
                    <p className="text-gray-400 text-xs">{actor.character || 'Character'}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
