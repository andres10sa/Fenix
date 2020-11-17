//Modulo Node
const jwt = require("jsonwebtoken");

// creamos validación para identificar el usuario logueado y todos sus procesos
function auth(req, res, next) {
  let jwToken = req.header("Authorization");
  // Split al JWT para separar el beare que pone por defecto el header del Auth
  jwToken = jwToken.split(" ")[1];
  //Si el token no existe
  if (!jwToken) return res.status(405).send("No hay token para un acceso");
  //Si el token existe
  try {
    const payLoad = jwt.verify(jwToken, "clave");
    req.usuario = payLoad;
    next();
  } catch (error) {
    res.status(405).send("Token sin autorizacion");
  }
}

// Exports
module.exports = auth;
