const express = require('express');
const multer = require("multer");
const addBook = require('../controllers/bookControllers');
const bookRoutes = express.Router()

//optimisation des images
const storage = multer.diskStorage(
    {
        destination: "uploads",
        filename:(req, file, cb)=>{
            return cb(null, `${Date.now()}${file.originalname}`)
        }
    }
)
const upload = multer({storage:storage}) 


bookRoutes.post("/add", upload.single("imageUrl"), addBook)

module.exports = bookRoutes