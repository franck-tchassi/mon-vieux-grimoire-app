const Book = require("../models/book")
const fs = require("fs");


//get - renvoie à la bibliothèque (plusieurs livres)
exports.library = (req, res, next) => {
  Book.find()
    .then((books) => res.status(200).json(books))
    .catch((error) => res.status(400).json({ error }));
};

//get - renvoie un livre (id)
exports.oneBook = (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then((books) => res.status(200).json(books))
    .catch((error) => res.status(400).json({ error }));
};

//post - ajoute un livre
exports.createBook =  (req, res, next)=>{
    const bookObject = JSON.parse(req.body.book);
    // Suppression du faux _id envoyé par le front
    delete bookObject._id;
    // Suppression de _userId auquel on ne peut faire confiance
    delete bookObject._userId;
    // Création d'une instance du modèle Book
    const book = new Book({
        ...bookObject,
        userId: req.auth.userId,
        imageUrl:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })
    // Enregistrement dans la base de données
    book.save()
    .then(()=>{res.status(200).json({message: 'un livre enregistré !!'})})
    .catch((error)=>{res.status(400).json({error})})
}














