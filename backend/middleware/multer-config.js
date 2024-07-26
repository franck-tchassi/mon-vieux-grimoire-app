const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

<<<<<<< HEAD
// Configuration du stockage Multer dans la mémoire virtuelle
=======
//configuration du stockage Multer dans la mémoire virtuelle
>>>>>>> 8ae4bc96173989aa7b179a374f19d07eba26d527
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single("image");

// Redimensionnement de l'image et conversion en WebP
const resizeImage = (req, res, next) => {
  if (!req.file) {
    return next();
  }

  // Le fichier image est contenu dans req.file.buffer
<<<<<<< HEAD
  const fileBuffer = req.file.buffer;
=======
  const filePath = req.file.buffer;
>>>>>>> 8ae4bc96173989aa7b179a374f19d07eba26d527
  const fileName = req.file.originalname.split(".")[0];
  const outputFilePath = path.join("images", `${fileName}.webp`);
  console.log(outputFilePath);

  // Utilisation de sharp pour redimensionner et convertir l'image en format WebP
<<<<<<< HEAD
  sharp(fileBuffer)
=======
  sharp(filePath)
>>>>>>> 8ae4bc96173989aa7b179a374f19d07eba26d527
    .resize({ width: 206, height: 260 })
    .toFormat("webp")
    .toFile(outputFilePath)
    .then(() => {
<<<<<<< HEAD
      // Remplace par le fichier redimensionné
=======
      //remplace par le fichier redimensionné
>>>>>>> 8ae4bc96173989aa7b179a374f19d07eba26d527
      req.file.path = outputFilePath;
      req.file.filename = `${fileName}.webp`;
      next();
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    });
};

<<<<<<< HEAD
module.exports = { upload, resizeImage };
=======
module.exports = { upload, resizeImage };
>>>>>>> 8ae4bc96173989aa7b179a374f19d07eba26d527
