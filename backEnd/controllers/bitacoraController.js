import dbConnection from "../DB/dbConnection.js";

import defineClienteXBitacora from "../models/clientexbitacora.js";
import defineBitacora from "../models/bitacora.js";

const bitacoraCtr = {};


bitacoraCtr.getBitacora = async(req,res) =>{
  try{
     const db = dbConnection.getInstance();
     const bitacora = defineBitacora(db.Sequelize,db.dataType);
     const {bitacora_date} = req.params 
     const bitacoraResult = bitacora.findAll({
       where:{fecha: bitacora_date}
     });
    if(bitacoraResult !== undefined && bitacoraResult !== null){
      const usersList 
    }else{
      res.status(404).json({message:"La bitacora no existe como entidad",status:404})
    }
      
  }catch(error){
        console.error("Error al obtener los catalogos:", error);
        res.status(500).json({ message: "Error al obtener la información de la bitacora",status:500 });
  }
  
}


