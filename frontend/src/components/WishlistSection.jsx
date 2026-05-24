import { useWishlist } from '../context/WishlistContext'
import MovieCard from './MovieCard'

export default function WishlistSection({ onMovieClick }) {
  const { wishlist, loading } = useWishlist()

  const movies = wishlist.map((item) => ({
    id: item.movieId,
    title: item.title,
    poster_path: item.poster_path,
    vote_average: item.vote_average,
    release_date: item.release_date,
  }))

  return (
    <section>
      <h2 className="text-3xl font-bold mb-6">My Wishlist</h2>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-400">Loading wishlist...</p>
        </div>
      ) : movies.length === 0 ? (
        <div className="text-center py-12 bg-gray-800 rounded-lg">
          <p className="text-xl text-gray-400 mb-2">Your wishlist is empty</p>
          <p className="text-gray-500 text-sm">
            Browse movies and tap ♡ to save them here
          </p>
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
