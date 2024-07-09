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

//delete
exports.deleteBook = (req, res, next) => {
  // Récupération du livre à supprimer
  Book.findOne({ _id: req.params.id })
    .then((book) => {
      // Le livre ne peut être supprimé que par le créateur de sa fiche
      if (book.userId != req.auth.userId) {
        res.status(401).json({ message: "Suppression non autorisée" });
      } else {
        // Séparation du nom du fichier image
        const filename = book.imageUrl.split("/images/")[1];
        // Suppression du fichier image puis suppression du livre dans la base de données dans le callback
        fs.unlink(`images/${filename}`, () => {
          Book.deleteOne({ _id: req.params.id })
            .then(() => {
              res.status(200).json({ message: "Livre supprimé !" });
            })
            .catch((error) => res.status(401).json({ error }));
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

// post - affecte une note (id)
exports.rateBook = (req, res, next) => {
    const userId = req.auth.userId;
    const { grade } = req.body;

    // Vérifier si la note est comprise entre 0 et 5
    if (grade < 0 || grade > 5) {
        return res.status(400).json({ message: "La note doit être comprise entre 0 et 5." });
    }

    Book.findOne({ _id: req.params.id })
        .then((book) => {
            if (!book) {
                return res.status(404).json({ message: "Livre non trouvé." });
            }

            const userRating = book.ratings.find(
                (r) => r.userId.toString() === userId
            );
            if (userRating) {
                return res.status(400).json({ message: "Vous avez déjà noté ce livre." });
            }

            // Ajouter la nouvelle note
            book.ratings.push({ userId, grade });

            // Mettre à jour la moyenne des notes
            const totalRatings = book.ratings.length;
            const averageRating = book.ratings.reduce((sum, rating) => sum + rating.grade, 0) / totalRatings;
            book.averageRating = Math.round(averageRating);

            // Sauvegarder les modifications
            book.save()
                .then((updatedBook) => {
                    res.status(200).json(updatedBook);
                })
                .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(400).json({ error }));
};














