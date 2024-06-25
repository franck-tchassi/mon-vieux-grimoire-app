const bookModel = require("../models/bookModel")



const addBook = async (req, res)=>{
    
    //validation de tous les données
    const {title, author, year, genre, ratings} = req.body
    if(!title || !author || !year || !genre || !ratings){
        res.status(400).json({success: false, message: "Tous les champs sont requis"})
    }

    //calcul note moyenne du livre
    //const valueRating = ratings.every(rating => rating.grade >= 1 && rating.grade <=5)
    const totalRatings = ratings.lenght
    const sumRatings = ratings.reduce((sum, rating)=> sum + rating.grade, 0)
    const averageRating = totalRatings===0 ? 0 :  sumRatings / totalRatings

    //creation url de l'image
    let image_Filename = `${req.file.filename}`

    //creation nouvel objet book
    const book = new bookModel(
        {
            title: title,
            author: author,
            imageUrl:image_Filename,
            year: year,
            genre: genre,
            ratings: ratings,
            averageRating: averageRating
        }
    )
    try{
        await book.save()
        res.status(201).json({ success: true, message: "Un livre a été ajouté" });
    }
    catch(error){
        console.log(error)
        res.status(500).json({ success: false, message: "Échec de l'ajout du livre" });
    }
    
    
}



module.exports = addBook