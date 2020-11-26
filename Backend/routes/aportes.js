 // Modulos NodeJS
 const express = require("express");
 const router = express.Router();
 const aportesController = require('../controller/aportesController');
 
 
 
 router.post("/", aportesController.crearAportes);
 router.get("/",aportesController.obtenerAportes);
 router.delete("/:id",aportesController.eliminarAportes);
 router.put("/:id",aportesController.editarAportes);
 
 //Exports
 module.exports = router;
 