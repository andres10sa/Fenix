// Modulos internos

const mongoose = require("mongoose");


// Esquema
const esquemaFeligres = new mongoose.Schema({
  
  nombres: String,
  apellidos: String,
  documento:String,
  genero:String,
  edad:Number,
  celular:String,
  correo:String,
  grupo:String,
  doc:String,
  ministerio:String,
  registro:{
      type:Date,
      default:Date.now()
  },
  

});


// creamos los exports
const Feligres = mongoose.model("feligres", esquemaFeligres);

module.exports.Feligres = Feligres;
// En caso de emergencia
module.exports.esquemaFeligres =esquemaFeligres;
