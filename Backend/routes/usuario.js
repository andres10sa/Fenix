 // Modulos NodeJS
const express = require("express");
const router = express.Router();
const usuarioController = require('../controller/usuarioController');



router.post("/", usuarioController.crearUsuario);
router.get("/",usuarioController.obtenerUsuarios);
router.delete("/:id",usuarioController.eliminarUsuario);
router.put("/:id",usuarioController.editarUsuario);

//Exports
module.exports = router;
