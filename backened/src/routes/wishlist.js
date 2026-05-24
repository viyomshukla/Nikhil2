const express = require('express');
const router = express.Router();
const protectRoute = require('../middleware/protectRoute');
const wishlistController = require('../controllers/wishlistController');

router.get('/', protectRoute, wishlistController.getWishlist);
router.post('/', protectRoute, wishlistController.addToWishlist);
router.delete('/:movieId', protectRoute, wishlistController.removeFromWishlist);

module.exports = router;
