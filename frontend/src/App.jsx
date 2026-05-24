import { useState, useEffect } from 'react'
import Header from './components/Header'
import SearchSection from './components/SearchSection'
import GenresSection from './components/GenresSection'
import PopularSection from './components/PopularSection'
import TrendingSection from './components/TrendingSection'
import MovieModal from './components/MovieModal'

export default function App() {
  const [activeSection, setActiveSection] = useState('popular')
  const [selectedMovie, setSelectedMovie] = useState(null)

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
        {activeSection === 'popular' && <PopularSection onMovieClick={handleMovieClick} />}
        {activeSection === 'trending' && <TrendingSection onMovieClick={handleMovieClick} />}
      </main>

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
    </div>
  )
}
