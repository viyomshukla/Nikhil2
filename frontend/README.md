# Movie Platform - Frontend

A basic HTML/CSS/JavaScript frontend for the Movie Platform backend API.

## Features

- 🎬 Browse Popular Movies
- 📈 View Trending Movies
- 🎭 Explore Movies by Genre
- 🔍 Search for Movies
- 📺 View Movie Details (title, rating, overview, cast, release date)
- 📱 Responsive Design (works on mobile and desktop)

## Setup

### 1. Start the Backend Server
Make sure your backend is running:
```bash
cd backened
npm install
npm start
```
The backend should run on `http://localhost:3080`

### 2. Open the Frontend
Simply open the `index.html` file in your web browser:
- Right-click on `index.html` → Open with → Your favorite browser
- OR double-click the file to open it

### 3. Using the Frontend

**Navigation:**
- Click "Popular" to see popular movies
- Click "Trending" to see trending movies
- Click "Genres" to browse by genre
- Click "Search" to search for specific movies

**Search:**
- Enter a movie name in the search box and click "Search"

**Movie Details:**
- Click on any movie card to see more details, cast, and ratings

## API Endpoints Used

The frontend connects to these backend endpoints:

- `GET /api/health` - Check backend status
- `GET /api/movies/popular` - Get popular movies
- `GET /api/movies/trending` - Get trending movies
- `GET /api/movies/genres` - Get all genres
- `GET /api/movies/discover?genre_id={id}` - Get movies by genre
- `GET /api/movies/search?query={query}` - Search movies
- `GET /api/movies/{id}` - Get movie details
- `GET /api/movies/{id}/credits` - Get cast information

## Troubleshooting

**"Backend is not running" error:**
- Make sure the backend server is started on port 3080
- Check that your `.env` file has `PORT=3080`
- Check the backend logs for errors

**No movies displayed:**
- Verify your TMDB API token is valid in the backend `.env` file
- Check browser console for errors (F12)

**Images not loading:**
- This is normal if poster paths are unavailable
- The placeholder emoji will be shown instead

## File Structure

```
frontend/
├── index.html    - Main HTML file
├── style.css     - Styling
├── script.js     - JavaScript logic and API calls
└── README.md     - This file
```

## Browser Compatibility

- Chrome/Edge/Firefox (Latest versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Notes

- This is a basic demo frontend with simple styling
- No complex animations or advanced features
- Perfect for testing and development
