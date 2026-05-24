export default function Header({ activeSection, onNavClick }) {
  const navItems = [
    { id: 'popular', label: 'Popular' },
    { id: 'trending', label: 'Trending' },
    { id: 'genres', label: 'Genres' },
    { id: 'search', label: 'Search' },
  ]

  return (
    <header className="bg-gray-800 shadow-lg border-b border-gray-700">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <h1 className="text-4xl font-bold mb-6 flex items-center gap-2">
          <span className="text-red-500">🎬</span> Movie Platform
        </h1>
        
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
  )
}
