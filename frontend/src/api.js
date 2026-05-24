import axiosInstance from './axios'

export const apiCall = async (endpoint) => {
  try {
    const response = await axiosInstance.get(endpoint)
    return response.data
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
