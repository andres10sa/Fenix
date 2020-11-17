const {Usuario} = require('../model/usuario');


exports.validarLogin = async(req,res)=>{

    try {
        const usuario = await Usuario.findOne({ correo: req.body.correo });
        //Si el correo no existe
        if (!usuario)
          return res.status(400).send("Datos inválidos");
        //Si el password no existe
        if (usuario.password !== req.body.password)
          return res.status(400).send("Datos invalidos");
        //Generar un JWT
        const jwToken = usuario.generateJWT();
        res.status(200).send({ jwToken });

    } catch (error) {
        console.log(error);
      res.status(400).json({msg:'Hubo un error'})
    }
}


