const API_BASE = 'http://localhost:3080/api'

export const apiCall = async (endpoint) => {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`)
    if (!response.ok) throw new Error('API request failed')
    return await response.json()
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}

export const getPopularMovies = () => apiCall('/movies/popular')
export const getTrendingMovies = () => apiCall('/movies/trending')
export const getGenres = () => apiCall('/movies/genres')
export const getMoviesByGenre = (genreId) => apiCall(`/movies/discover?with_genres=${genreId}`)
export const searchMovies = (query) => apiCall(`/movies/search?query=${encodeURIComponent(query)}`)
export const getMovieDetails = (movieId) => apiCall(`/movies/${movieId}`)
export const getMovieCredits = (movieId) => apiCall(`/movies/${movieId}/credits`)
