import WishlistButton from './WishlistButton'

export default function MovieCard({ movie, onMovieClick }) {
  const posterPath = movie.poster_path || movie.posterPath
  const title = movie.title || movie.name || 'Unknown'
  const rating = movie.vote_average || movie.voteAverage || 'N/A'
  const posterUrl = posterPath
    ? `https://image.tmdb.org/t/p/w500${posterPath}`
    : null

  return (
    <div
      onClick={() => onMovieClick(movie)}
      className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-600/30"
    >
      <div className="relative h-72 bg-gray-700 flex items-center justify-center overflow-hidden">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-4xl">📷</span>
        )}
        <div className="absolute top-2 right-2">
          <WishlistButton movie={movie} />
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold truncate mb-2">{title}</h3>
        <p className="text-yellow-400 font-bold text-sm mb-2">⭐ {rating}/10</p>
        <p className="text-gray-400 text-xs">{movie.release_date || movie.releaseDate || 'N/A'}</p>
      </div>
    </div>
  )
}
