const express = require('express');
const router = express.Router()
const auth = require('../middleware/auth');
const { upload, resizeImage } = require('../middleware/multer-config');
const bookCtrl = require('../controllers/book')


router.get('/bestrating', bookCtrl.bestRating);
router.get('/', bookCtrl.library);
router.get('/:id', bookCtrl.oneBook);
router.post('/', auth, upload, resizeImage, bookCtrl.createBook);
router.put('/:id', auth, upload, resizeImage, bookCtrl.updateBook );
router.delete('/:id', auth, bookCtrl.deleteBook);
router.post('/:id/rating', auth, bookCtrl.rateBook);



module.exports = router
