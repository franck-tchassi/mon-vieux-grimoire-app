const mongoose = require("mongoose");

const radingSchema = mongoose.Schema(
    {   
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        grade:{type:Number, required:true}
    }
)

const bookSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        title:{type:String, required:true},
        author:{type:String, required:true},
        imageUrl:{type:String, required:true},
        year:{type:Number, required:true},
        genre:{type:String, required:true},
        ratings: [radingSchema],
        averageRating:{type:Number, default: 0}
    }
)

const bookModel = mongoose.model("Book", bookSchema)

module.exports = bookModel