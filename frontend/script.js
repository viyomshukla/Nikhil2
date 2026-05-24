// API Base URL
const API_BASE = 'http://localhost:3080/api';

// DOM Elements
const navButtons = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('.section');
const modal = document.getElementById('movie-modal');
const closeBtn = document.querySelector('.close');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  setupSearch();
  setupModal();
  loadPopularMovies();
  checkBackendHealth();
});

// Check Backend Health
async function checkBackendHealth() {
  try {
    const response = await fetch(`${API_BASE}/health`);
    if (!response.ok) throw new Error('Backend not responding');
    console.log('✓ Backend is connected');
  } catch (error) {
    console.error('✗ Backend connection failed:', error.message);
    showError('Backend is not running. Please start the backend server.');
  }
}

// Navigation Setup
function setupNavigation() {
  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const section = btn.dataset.section;
      showSection(section);
      
      navButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

// Show Section
function showSection(sectionName) {
  sections.forEach(section => section.classList.add('hidden'));
  
  const section = document.getElementById(`${sectionName}-section`);
  if (section) {
    section.classList.remove('hidden');
    
    if (sectionName === 'popular') loadPopularMovies();
    else if (sectionName === 'trending') loadTrendingMovies();
    else if (sectionName === 'genres') loadGenres();
  }
}

// Load Popular Movies
async function loadPopularMovies() {
  const container = document.getElementById('popular-movies');
  container.innerHTML = '<div class="loading">Loading popular movies...</div>';
  
  try {
    const response = await fetch(`${API_BASE}/movies/popular`);
    const data = await response.json();
    
    if (data.success) {
      displayMovies(data.data, 'popular-movies');
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    container.innerHTML = `<div class="error">Error loading movies: ${error.message}</div>`;
  }
}

// Load Trending Movies
async function loadTrendingMovies() {
  const container = document.getElementById('trending-movies');
  container.innerHTML = '<div class="loading">Loading trending movies...</div>';
  
  try {
    const response = await fetch(`${API_BASE}/movies/trending`);
    const data = await response.json();
    
    if (data.success) {
      displayMovies(data.data, 'trending-movies');
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    container.innerHTML = `<div class="error">Error loading movies: ${error.message}</div>`;
  }
}

// Load Genres
async function loadGenres() {
  const container = document.getElementById('genres-list');
  container.innerHTML = '<div class="loading">Loading genres...</div>';
  
  try {
    const response = await fetch(`${API_BASE}/movies/genres`);
    const data = await response.json();
    
    if (data.success && data.data && data.data.genres) {
      displayGenres(data.data.genres);
    } else {
      throw new Error('Failed to load genres');
    }
  } catch (error) {
    container.innerHTML = `<div class="error">Error loading genres: ${error.message}</div>`;
  }
}

// Display Genres
function displayGenres(genres) {
  const container = document.getElementById('genres-list');
  container.innerHTML = '';
  
  genres.forEach(genre => {
    const btn = document.createElement('button');
    btn.className = 'genre-btn';
    btn.textContent = genre.name;
    btn.onclick = () => loadGenreMovies(genre.id, genre.name);
    container.appendChild(btn);
  });
}

// Load Movies by Genre
async function loadGenreMovies(genreId, genreName) {
  const container = document.getElementById('genre-movies');
  container.innerHTML = `<div class="loading">Loading ${genreName} movies...</div>`;
  
  try {
    const response = await fetch(`${API_BASE}/movies/discover?with_genres=${genreId}`);
    const data = await response.json();
    
    if (data.success) {
      displayMovies(data.data, 'genre-movies');
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    container.innerHTML = `<div class="error">Error loading movies: ${error.message}</div>`;
  }
}

// Setup Search
function setupSearch() {
  searchBtn.addEventListener('click', searchMovies);
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchMovies();
  });
}

// Search Movies
async function searchMovies() {
  const query = searchInput.value.trim();
  if (!query) {
    alert('Please enter a search term');
    return;
  }
  
  // Show search section
  showSection('search');
  
  const container = document.getElementById('search-results');
  container.innerHTML = '<div class="loading">Searching for movies...</div>';
  
  try {
    const response = await fetch(`${API_BASE}/movies/search?query=${encodeURIComponent(query)}`);
    const data = await response.json();
    
    if (data.success) {
      // Handle both array and object with results property
      const movies = data.data.results || data.data;
      if (movies && movies.length > 0) {
        displayMovies(data.data, 'search-results');
      } else {
        container.innerHTML = '<div class="error">No movies found</div>';
      }
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    container.innerHTML = `<div class="error">Error searching movies: ${error.message}</div>`;
  }
}

// Display Movies
function displayMovies(movies, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  
  // Handle both array and object with results property
  let moviesArray = movies;
  if (movies && typeof movies === 'object' && movies.results) {
    moviesArray = movies.results;
  }
  
  if (!Array.isArray(moviesArray)) {
    console.error('Invalid data format:', movies);
    container.innerHTML = '<div class="error">Invalid data format</div>';
    return;
  }
  
  if (moviesArray.length === 0) {
    container.innerHTML = '<div class="error">No movies found</div>';
    return;
  }
  
  moviesArray.forEach(movie => {
    const card = document.createElement('div');
    card.className = 'movie-card';
    
    const posterPath = movie.poster_path || movie.posterPath;
    const posterUrl = posterPath 
      ? `https://image.tmdb.org/t/p/w500${posterPath}` 
      : 'No Image';
    
    const title = movie.title || movie.name || 'Unknown Title';
    const rating = movie.vote_average || movie.voteAverage || 'N/A';
    const id = movie.id;
    
    card.innerHTML = `
      <div class="movie-poster">
        ${posterPath ? `<img src="${posterUrl}" alt="${title}">` : '📷'}
      </div>
      <div class="movie-info">
        <h3>${title}</h3>
        <p class="movie-rating">⭐ ${rating}/10</p>
        <p>${movie.release_date || movie.releaseDate || 'N/A'}</p>
      </div>
    `;
    
    card.addEventListener('click', () => loadMovieDetails(id));
    container.appendChild(card);
  });
}

// Load Movie Details
async function loadMovieDetails(movieId) {
  try {
    const response = await fetch(`${API_BASE}/movies/${movieId}`);
    const data = await response.json();
    
    if (data.success) {
      const movie = data.data;
      
      // Load additional details
      const creditsResponse = await fetch(`${API_BASE}/movies/${movieId}/credits`);
      const creditsData = await creditsResponse.json();
      
      const videosResponse = await fetch(`${API_BASE}/movies/${movieId}/videos`);
      const videosData = videosResponse.json();
      
      displayMovieModal(movie, creditsData.success ? creditsData.data : null);
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    showError(`Error loading movie details: ${error.message}`);
  }
}

// Display Movie Modal
function displayMovieModal(movie, credits) {
  const modalBody = document.getElementById('modal-body');
  
  const posterPath = movie.poster_path || movie.posterPath;
  const backdropPath = movie.backdrop_path || movie.backdropPath;
  const posterUrl = backdropPath 
    ? `https://image.tmdb.org/t/p/w780${backdropPath}` 
    : (posterPath ? `https://image.tmdb.org/t/p/w500${posterPath}` : '');
  
  const title = movie.title || movie.name || 'Unknown';
  const overview = movie.overview || 'No description available';
  const rating = movie.vote_average || movie.voteAverage || 'N/A';
  const releaseDate = movie.release_date || movie.releaseDate || 'N/A';
  const runtime = movie.runtime || 'N/A';
  
  let html = `
    <h2>${title}</h2>
    ${posterUrl ? `<img src="${posterUrl}" alt="${title}">` : ''}
    <div class="rating-badge">⭐ ${rating}/10</div>
    <p><strong>Release Date:</strong> ${releaseDate}</p>
    <p><strong>Runtime:</strong> ${runtime} minutes</p>
    <p><strong>Overview:</strong></p>
    <p>${overview}</p>
  `;
  
  if (credits && credits.cast && credits.cast.length > 0) {
    html += `
      <div class="cast-section">
        <h3>Cast</h3>
        <div class="cast-list">
    `;
    
    credits.cast.slice(0, 6).forEach(actor => {
      html += `
        <div class="cast-member">
          <strong>${actor.name || 'Unknown'}</strong>
          <p>${actor.character || 'Character'}</p>
        </div>
      `;
    });
    
    html += `
        </div>
      </div>
    `;
  }
  
  modalBody.innerHTML = html;
  openModal();
}

// Modal Functions
function setupModal() {
  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}

function openModal() {
  modal.classList.remove('hidden');
  modal.classList.add('show');
}

function closeModal() {
  modal.classList.add('hidden');
  modal.classList.remove('show');
}

// Error Handler
function showError(message) {
  const container = document.querySelector('.section:not(.hidden)');
  if (container) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error';
    errorDiv.textContent = message;
    container.prepend(errorDiv);
    
    setTimeout(() => errorDiv.remove(), 5000);
  }
}
