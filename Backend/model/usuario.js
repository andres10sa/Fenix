// Modulos internos

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

// Esquema
const esquemaUsuario = new mongoose.Schema({
  nombres:String,
  apellidos:String,
  grupo:String,
  correo:String,
  password:String,
});

// Generamos el JWT
esquemaUsuario.methods.generateJWT = function () {
  return jwt.sign(
    {
      _id: this._id,
      nombres: this.nombres,
      correo: this.correo,
    },
    "clave"
  );
};


// creamos los exports
const Usuario = mongoose.model("usuario", esquemaUsuario);
module.exports.Usuario = Usuario;

// En caso de emergencia
module.exports.esquemaUsuario =esquemaUsuario;
