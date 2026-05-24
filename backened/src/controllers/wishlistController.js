const User = require('../models/User');

const formatWishlistItem = (item) => ({
  movieId: item.movieId,
  title: item.title,
  poster_path: item.poster_path,
  vote_average: item.vote_average,
  release_date: item.release_date,
});

exports.getWishlist = async (req, res, next) => {
  try {
    const user = await User.findById(req.session.userId).select('wishlist');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    return res.json({
      success: true,
      wishlist: user.wishlist.map(formatWishlistItem),
    });
  } catch (error) {
    next(error);
  }
};

exports.addToWishlist = async (req, res, next) => {
  try {
    const { id, title, poster_path, vote_average, release_date } = req.body;

    if (!id || !title) {
      return res.status(400).json({
        success: false,
        message: 'Movie id and title are required',
      });
    }

    const user = await User.findById(req.session.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const movieId = Number(id);
    const exists = user.wishlist.some((item) => item.movieId === movieId);
    if (exists) {
      return res.status(400).json({
        success: false,
        message: 'Movie already in wishlist',
      });
    }

    user.wishlist.push({
      movieId,
      title,
      poster_path: poster_path || null,
      vote_average: vote_average ?? null,
      release_date: release_date || null,
    });

    await user.save();

    return res.status(201).json({
      success: true,
      wishlist: user.wishlist.map(formatWishlistItem),
    });
  } catch (error) {
    next(error);
  }
};

exports.removeFromWishlist = async (req, res, next) => {
  try {
    const movieId = Number(req.params.movieId);

    const user = await User.findById(req.session.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const initialLength = user.wishlist.length;
    user.wishlist = user.wishlist.filter((item) => item.movieId !== movieId);

    if (user.wishlist.length === initialLength) {
      return res.status(404).json({
        success: false,
        message: 'Movie not in wishlist',
      });
    }

    await user.save();

    return res.json({
      success: true,
      wishlist: user.wishlist.map(formatWishlistItem),
    });
  } catch (error) {
    next(error);
  }
};
