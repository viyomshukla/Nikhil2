import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import axiosInstance from '../axios'
import { useAuth } from './AuthContext'

const WishlistContext = createContext()

export function WishlistProvider({ children }) {
  const { user } = useAuth()
  const [wishlist, setWishlist] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchWishlist = useCallback(async () => {
    if (!user) {
      setWishlist([])
      return
    }

    try {
      setLoading(true)
      const response = await axiosInstance.get('/wishlist')
      if (response.data.success) {
        setWishlist(response.data.wishlist)
      }
    } catch {
      setWishlist([])
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    fetchWishlist()
  }, [fetchWishlist])

  const isInWishlist = (movieId) =>
    wishlist.some((item) => item.movieId === Number(movieId))

  const addToWishlist = async (movie) => {
    const response = await axiosInstance.post('/wishlist', {
      id: movie.id,
      title: movie.title || movie.name,
      poster_path: movie.poster_path || movie.posterPath || null,
      vote_average: movie.vote_average ?? movie.voteAverage ?? null,
      release_date: movie.release_date || movie.releaseDate || null,
    })
    if (response.data.success) {
      setWishlist(response.data.wishlist)
      return { success: true }
    }
    return { success: false, message: response.data.message }
  }

  const removeFromWishlist = async (movieId) => {
    const response = await axiosInstance.delete(`/wishlist/${movieId}`)
    if (response.data.success) {
      setWishlist(response.data.wishlist)
      return { success: true }
    }
    return { success: false, message: response.data.message }
  }

  const toggleWishlist = async (movie) => {
    if (isInWishlist(movie.id)) {
      return removeFromWishlist(movie.id)
    }
    return addToWishlist(movie)
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        loading,
        isInWishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        refreshWishlist: fetchWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider')
  }
  return context
}
