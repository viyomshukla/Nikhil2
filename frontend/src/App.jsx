import { useState, useEffect } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import { WishlistProvider } from './context/WishlistContext'
import Header from './components/Header'
import SearchSection from './components/SearchSection'
import GenresSection from './components/GenresSection'
import PopularSection from './components/PopularSection'
import TrendingSection from './components/TrendingSection'
import WishlistSection from './components/WishlistSection'
import MovieModal from './components/MovieModal'

function AppContent() {
  const { user, loading } = useAuth()
  const [activeSection, setActiveSection] = useState('trending')
  const [selectedMovie, setSelectedMovie] = useState(null)

  useEffect(() => {
    if (!loading && !user && ['popular', 'wishlist'].includes(activeSection)) {
      setActiveSection('trending')
    }
  }, [user, loading, activeSection])

  const handleNavClick = (section) => {
    setActiveSection(section)
  }

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie)
  }

  const closeModal = () => {
    setSelectedMovie(null)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header activeSection={activeSection} onNavClick={handleNavClick} />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {activeSection === 'search' && <SearchSection onMovieClick={handleMovieClick} />}
        {activeSection === 'genres' && <GenresSection onMovieClick={handleMovieClick} />}
        {activeSection === 'popular' && user && <PopularSection onMovieClick={handleMovieClick} />}
        {activeSection === 'trending' && <TrendingSection onMovieClick={handleMovieClick} />}
        {activeSection === 'wishlist' && user && <WishlistSection onMovieClick={handleMovieClick} />}
      </main>

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <WishlistProvider>
        <AppContent />
      </WishlistProvider>
    </AuthProvider>
  )
}
