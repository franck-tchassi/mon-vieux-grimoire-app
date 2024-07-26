const express = require('express');
<<<<<<< HEAD
const router = express.Router();
const { upload, resizeImage } = require('../middleware/multer-config');
const auth = require('../middleware/auth');
const bookCtrl = require('../controllers/book');

// Routes qui affichent les livres
=======
const router = express.Router()
const auth = require('../middleware/auth');
const { upload, resizeImage } = require('../middleware/multer-config');
const bookCtrl = require('../controllers/book')


>>>>>>> 8ae4bc96173989aa7b179a374f19d07eba26d527
router.get('/bestrating', bookCtrl.bestRating);
router.get('/', bookCtrl.library);
router.get('/:id', bookCtrl.oneBook);
router.post('/', auth, upload, resizeImage, bookCtrl.createBook);
<<<<<<< HEAD
router.put('/:id', auth, upload, resizeImage, bookCtrl.updateBook);
router.delete('/:id', auth, bookCtrl.deleteBook);
router.post('/:id/rating', auth, bookCtrl.rateBook);

module.exports = router;
=======
router.put('/:id', auth, upload, resizeImage, bookCtrl.updateBook );
router.delete('/:id', auth, bookCtrl.deleteBook);
router.post('/:id/rating', auth, bookCtrl.rateBook);



module.exports = router
>>>>>>> 8ae4bc96173989aa7b179a374f19d07eba26d527
