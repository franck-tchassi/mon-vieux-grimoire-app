const mongoose = require('mongoose');

const dbConnect = async ()=>{
    await mongoose.connect("mongodb+srv://franck77:12Abcdef@cluster0.18ghjan.mongodb.net/", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(()=> console.log("connexion db success !"))
    .catch(()=> console.log("connexion db failled"))
}


module.exports = dbConnect