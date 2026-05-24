import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import AuthModal from './AuthModal'

export default function Header({ activeSection, onNavClick }) {
  const { user, logout, loading, signInRequested, clearSignInRequest } = useAuth()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  useEffect(() => {
    if (signInRequested) {
      setShowAuthModal(true)
      clearSignInRequest()
    }
  }, [signInRequested, clearSignInRequest])

  const navItems = [
    ...(user ? [
      { id: 'popular', label: 'Popular' },
      { id: 'wishlist', label: 'Wishlist' },
    ] : []),
    { id: 'trending', label: 'Trending' },
    { id: 'genres', label: 'Genres' },
    { id: 'search', label: 'Search' },
  ]

  const handleLogout = () => {
    logout()
    setShowUserMenu(false)
  }

  return (
    <>
      <header className="bg-gray-800 shadow-lg border-b border-gray-700 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold flex items-center gap-2">
              <span className="text-red-500">🎬</span> Movie Platform
            </h1>

            {/* User Section */}
            <div className="relative">
              {loading ? (
                <div className="w-24 h-10 bg-gray-700 rounded-lg animate-pulse" />
              ) : user ? (
                <div>
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors"
                  >
                    <span className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                    <span className="hidden sm:inline">{user.name}</span>
                    <span className="text-xs">▼</span>
                  </button>

                  {/* User Menu Dropdown */}
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-lg shadow-lg border border-gray-600 z-50">
                      <div className="px-4 py-3 border-b border-gray-600">
                        <p className="text-sm font-semibold">{user.name}</p>
                        <p className="text-xs text-gray-400">{user.email}</p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 hover:bg-gray-600 transition-colors text-sm"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex gap-3 flex-wrap">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavClick(item.id)}
                className={`px-6 py-2 rounded-lg font-semibold transition-colors duration-200 ${
                  activeSection === item.id
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  )
}
