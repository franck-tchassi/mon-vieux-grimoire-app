const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
require('dotenv').config();
const userRoutes = require('./routes/user');
const bookRouter = require('./routes/book')
const bodyParser = require('body-parser');

//config app
const app = express()

//middleware
app.use(express.json())
app.use(cors())

//config dataBase
const mongoURI = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@expressapi.jhhn6o8.mongodb.net/${process.env.dbName}?retryWrites=true&w=majority&appName=ExpressApi`
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=> console.log("connexion db success !"))
.catch((error) => console.error("connexion db failed:", error.message));



//endpoint




app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
}, express.static(path.join(__dirname, 'images')));

// Middleware pour servir les fichiers avec les types MIME corrects
app.use('/images', express.static(path.join(__dirname, 'images'), {
    setHeaders: (res, path, stat) => {
      if (path.endsWith('.webp')) {
        res.setHeader('Content-Type', 'image/webp');
      }
    }
}));

app.use(bodyParser.json());

app.use('/api/auth', userRoutes)
app.use('/api/books', bookRouter)




module.exports = app
