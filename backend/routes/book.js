const express = require('express');
const router = express.Router()
const bookCtrl = require('../controllers/book')



//route qui affiche tous les livres
router.get("/books", bookCtrl.getAllBook)

router.post("/books", bookCtrl.createBook)



module.exports = router
