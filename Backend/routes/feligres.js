 // Modulos NodeJS
 const express = require("express");
 const router = express.Router();
 const feligresController = require('../controller/feligresController');
 
 
 
 router.post("/", feligresController.crearFeligres);
 router.get("/",feligresController.obtenerFeligreses);
 router.delete("/:id",feligresController.eliminarFeligres);
 router.put("/:id",feligresController.editarFeligres);
 
 //Exports
 module.exports = router;
 