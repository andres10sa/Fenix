//Modulos Node
const express = require("express");
const router = express.Router();
const authController = require('../controller/authController');


router.post('/',authController.validarLogin)


module.exports = router;
