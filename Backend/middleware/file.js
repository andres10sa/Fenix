// Modulos Node
const multer = require("multer");

//Ruta directorio donde quedaran los archivos
const directorio = "./public";
//DiskStorage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, directorio);
  },
  filename: (req, file, cb) => {
    const filename =
      Date.now() + "-" + file.originalname.toLowerCase().split(" ").join("-");
      cb(null, filename)
  },
});

//Cargar Archivos
const cargarArchivo = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
      console.log(file.mimetype)
    if (
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/png" ||
      file.mimetype == "image/gif"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Solo se aceptan extensiones .jpg - .png - .gif"));
    }
  },
});
module.exports = cargarArchivo;
