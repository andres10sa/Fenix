const {Aportes} = require('../model/aportes');


exports.crearAportes = async(req,res)=>{

    const {idAportes}=req.body;
  try {
    let aportes = await Aportes.findOne({idAportes});

    if(aportes) return res.status(400).json({msg:'El idAportes ya existe'})

    aportes = new Aportes(req.body);
    //guardar usuario
    await aportes.save();
     res.status(200).send({ msj:'Creado' });
    
  } catch (error) {
     console.log(error);
     res.status(400).json({msg:'Hubo un error'})
  }
}


exports.obtenerAportes = async(req,res)=>{

  try {
    let grupo = await Aportes.find({});
    if(!grupo) res.status(400).send('No hay aportes');
    res.status(200).json(grupo)
    
  } catch (error) {
    console.log(error);
     res.status(400).json({msg:'Hubo un error'})
  }
}


exports.eliminarAportes = async(req,res)=>{
  const id = req.params.id;
  try {
    await Aportes.findOneAndRemove({_id:id})
    res.status(200).json('Aportes eliminado');
    
  } catch (error) {
    res.status(400).json('Hubo un error',error)
  }
}

exports.editarAportes = async(req,res)=>{
  const id = req.params.id;
  try {
   const aportes =  await Aportes.findOneAndUpdate({_id:id},req.body,{
     new:true
   });
    res.status(200).json('Aportes Editado');
    
  } catch (error) {
    res.status(400).json('Hubo un error',error)
  }
}