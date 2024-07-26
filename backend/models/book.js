const mongoose = require("mongoose");

<<<<<<< HEAD


const bookSchema = new mongoose.Schema(
    {
        userId: { type:String, required: true },
=======
 

const bookSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true },
>>>>>>> 8ae4bc96173989aa7b179a374f19d07eba26d527
        title:{type:String, required:true},
        author:{type:String, required:true},
        imageUrl:{type:String, required:true},
        year:{type:Number, required:true},
        genre:{type:String, required:true},
        ratings: [
            {
                userId: { type:String, required: true },
                grade: { type: Number, required: true}
            }
        ],
        averageRating:{type:Number, default: 0}
    }
)

<<<<<<< HEAD
module.exports = mongoose.model("Book", bookSchema) 

/*
const bookSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        title: { type: String, required: true },
        author: { type: String, required: true },
        imageUrl: { type: String, required: true },
        year: { type: Number, required: true },
        genre: { type: String, required: true },
        ratings: [
            {
                userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
                grade: { type: Number, required: true }
            }
        ],
        averageRating: { type: Number, default: 0 }
    }
);

module.exports = mongoose.model("Book", bookSchema); */
=======
module.exports = mongoose.model("Book", bookSchema)
>>>>>>> 8ae4bc96173989aa7b179a374f19d07eba26d527

