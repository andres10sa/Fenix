const {Usuario} = require('../model/usuario');


exports.crearUsuario = async(req,res)=>{

    const {correo}=req.body;
  try {
    let usuario = await Usuario.findOne({correo});

    if(usuario) return res.status(400).json({msg:'Usuario ya existe'})

    usuario = new Usuario(req.body);
    //guardar usuario
    await usuario.save();
     const jwtToken = usuario.generateJWT();
     res.status(200).send({ jwtToken,msj:'Creado' });
    
  } catch (error) {
     console.log(error);
     res.status(400).json({msg:'Hubo un error'})
  }
}

exports.obtenerUsuarios = async(req,res)=>{
  try {
    let usuario = await Usuario.find({});
    if(!usuario) res.status(400).send('No hay admins');
    res.status(200).json(usuario)
    
  } catch (error) {
    console.log(error);
     res.status(400).json({msg:'Hubo un error'})
  }
}

exports.eliminarUsuario = async(req,res)=>{
  const id = req.params.id;
  try {
    await Usuario.findOneAndRemove({_id:id})
    res.status(200).json('Usuario eliminado');
    
  } catch (error) {
    res.status(400).json('Hubo un error',error)
  }
}

exports.editarUsuario = async(req,res)=>{
  const id = req.params.id;
  try {
   const usuario =  await Usuario.findOneAndUpdate({_id:id},req.body,{
     new:true
   });
    res.status(200).json('Usuario Editado');
    
  } catch (error) {
    res.status(400).json('Hubo un error',error)
  }
}