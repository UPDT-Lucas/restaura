import dbConnection from "../DB/dbConnection.js";

import defineUsuarioSistema from "../models/usuario_sistema.js";

const adminCtr = {};

adminCtr.saveAsistente = async (req,res)=> {
    try{
        const db = dbConnection.getInstance();
        const data = req.body;
        console.log("Data:",data);
        data.id= data.id.replaceAll(" ","").replaceAll("\n","");
        const UsuarioSistema = defineUsuarioSistema(db.Sequelize,db.dataType);
       
        const nuevoAsistente = await UsuarioSistema.create(data);
        
        return res.status(200).json({message:"Asistente creado correctamente",status:200});
    } catch(error){
        console.error("Error al crear asistente:", error);
        res.status(500).json({message:"Error al crear asistente",status:500});
    }
}

export default adminCtr;