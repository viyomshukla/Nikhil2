# Movie Platform - React + Tailwind Frontend

A modern React frontend with Tailwind CSS for the Movie Platform.

## Setup Instructions

### 1. Install Dependencies

```bash
cd frontend
npm install
```

This will install:
- React 18
- Vite (fast build tool)
- Tailwind CSS
- PostCSS and Autoprefixer

### 2. Start Development Server

```bash
npm run dev
```

The frontend will open at `http://localhost:5173`

### 3. Build for Production

```bash
npm run build
```

This creates an optimized build in the `dist` folder.

## Features

✅ **Popular Movies** - Browse popular movies
✅ **Trending Movies** - See trending content  
✅ **Search** - Search for any movie by title
✅ **Browse by Genre** - Filter movies by genre
✅ **Movie Details** - Click any movie to see:
  - Full details and overview
  - Cast information
  - Rating and release date
  - Movie poster/backdrop

## Tech Stack

- **React 18** - UI library
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client (via API wrapper)

## Project Structure

```
src/
├── App.jsx                 - Main app component
├── main.jsx               - Entry point
├── index.css              - Tailwind imports
├── api.js                 - API functions
└── components/
    ├── Header.jsx         - Navigation header
    ├── MovieCard.jsx      - Movie display card
    ├── MovieModal.jsx     - Movie detail modal
    ├── PopularSection.jsx - Popular movies section
    ├── TrendingSection.jsx - Trending movies section
    ├── SearchSection.jsx  - Search functionality
    └── GenresSection.jsx  - Genre browsing
```

## API Connection

The frontend connects to the backend at `http://localhost:3080/api`

Make sure your backend is running before starting the frontend:

```bash
cd backened
npm start
```

## Environment Variables (Optional)

Create a `.env` file to customize the API URL:

```
VITE_API_URL=http://localhost:3080/api
```

## Styling with Tailwind

All components use Tailwind CSS classes:
- Dark theme with gray-900 background
- Red-600 accent color for interactive elements
- Responsive grid layouts
- Smooth transitions and hover effects

## Browser Support

- Modern browsers with ES6 support
- Chrome, Firefox, Safari, Edge (latest versions)

## Troubleshooting

**Port 5173 already in use?**
- Change port in `vite.config.js`

**Backend connection error?**
- Ensure backend is running on port 3080
- Check CORS is enabled in backend

**Tailwind styles not loading?**
- Run `npm install` again
- Restart dev server

## Commands Reference

```bash
npm run dev      # Start development server
npm run build    # Create production build
npm run preview  # Preview production build locally
```

Enjoy! 🎬
