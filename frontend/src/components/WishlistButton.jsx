import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useWishlist } from '../context/WishlistContext'

export default function WishlistButton({ movie, className = '' }) {
  const { user, requestSignIn } = useAuth()
  const { isInWishlist, toggleWishlist } = useWishlist()
  const [busy, setBusy] = useState(false)

  const inWishlist = isInWishlist(movie.id)

  const handleClick = async (e) => {
    e.stopPropagation()

    if (!user) {
      requestSignIn()
      return
    }

    setBusy(true)
    try {
      await toggleWishlist(movie)
    } catch (err) {
      console.error('Wishlist error:', err)
    } finally {
      setBusy(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={busy}
      title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
      className={`p-2 rounded-full transition-colors disabled:opacity-50 ${
        inWishlist
          ? 'bg-red-600 text-white hover:bg-red-700'
          : 'bg-gray-900/80 text-gray-200 hover:bg-red-600 hover:text-white'
      } ${className}`}
    >
      {inWishlist ? '♥' : '♡'}
    </button>
  )
}
