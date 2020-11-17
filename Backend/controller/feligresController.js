const {Feligres} = require('../model/feligres');


exports.crearFeligres = async(req,res)=>{

    const {correo}=req.body;
  try {
    let feligres = await Feligres.findOne({correo});

    if(feligres) return res.status(400).json({msg:'El Feligres ya existe'})

    feligres = new Feligres(req.body);
    //guardar usuario
    await feligres.save();
     res.status(200).send({ msj:'Creado' });
    
  } catch (error) {
     console.log(error);
     res.status(400).json({msg:'Hubo un error'})
  }
}


exports.obtenerFeligreses = async(req,res)=>{

  try {
    let grupo = await Feligres.find({});
    if(!grupo) res.status(400).send('No hay feligreses');
    res.status(200).json(grupo)
    
  } catch (error) {
    console.log(error);
     res.status(400).json({msg:'Hubo un error'})
  }
}


exports.eliminarFeligres = async(req,res)=>{
  const id = req.params.id;
  try {
    await Feligres.findOneAndRemove({_id:id})
    res.status(200).json('Feligres eliminado');
    
  } catch (error) {
    res.status(400).json('Hubo un error',error)
  }
}

exports.editarFeligres = async(req,res)=>{
  const id = req.params.id;
  try {
   const feligres =  await Feligres.findOneAndUpdate({_id:id},req.body,{
     new:true
   });
    res.status(200).json('Feligres Editado');
    
  } catch (error) {
    res.status(400).json('Hubo un error',error)
  }
}