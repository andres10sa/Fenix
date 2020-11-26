// Modulos internos

const mongoose = require("mongoose");


// Esquema
const esquemaAportes = new mongoose.Schema({
  
  fecha:{
    type:Date,
    default:Date.now()
},
  documento:String,
  nombres: String,
  apellidos: String,
  clase:String,
  fondo:String,
  idAportes: String,
  cantidadAporte: Number,
  valorAporte: Number,
  tipoAporte: String,
  totalAporte: Number,
  registro:{
      type:Date,
      default:Date.now()
  }

});


// creamos los exports
const Aportes = mongoose.model("aportes", esquemaAportes);

module.exports.Aportes = Aportes;
// En caso de emergencia
module.exports.esquemaAportes =esquemaAportes;
