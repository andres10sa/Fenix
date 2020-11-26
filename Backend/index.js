//Modulos de Node
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
//Modulos internos
const usuario = require("./routes/usuario");
const auth = require("./routes/auth");
const feligres = require("./routes/feligres");
const aportes = require("./routes/aportes");  /////--> Aportes
//App
const app = express();
app.use(cors())
app.use(express.json());
app.use("/api/usuario/", usuario);
app.use("/api/auth/", auth);
app.use("/api/feligres",feligres);
app.use("/api/aportes",aportes);   /////--> Aportes

// Puerto para ejecutar nuestro servidor
const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Ejecutando en el puerto: " + port));

// Conexion con MongoDB
mongoose
  .connect("mongodb://localhost/fenixdb", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conexion a MongoDB: Online"))
  .catch((error) => console.log("Conexion a MongoDB: Offline"));
