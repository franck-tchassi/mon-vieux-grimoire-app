const express = require('express');
const router = express.Router();
const { upload, resizeImage } = require('../middleware/multer-config');
const auth = require('../middleware/auth');
const bookCtrl = require('../controllers/book');

// Routes qui affichent les livres
router.get('/bestrating', bookCtrl.bestRating);
router.get('/', bookCtrl.library);
router.get('/:id', bookCtrl.oneBook);
router.post('/', auth, upload, resizeImage, bookCtrl.createBook);
router.put('/:id', auth, upload, resizeImage, bookCtrl.updateBook);
router.delete('/:id', auth, bookCtrl.deleteBook);
router.post('/:id/rating', auth, bookCtrl.rateBook);

module.exports = router;