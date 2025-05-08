import dbConnection from "../DB/dbConnection.js";

import defineUsuarioSistema from "../models/usuario_sistema.js";

const adminCtr = {};

adminCtr.saveAsistente = async (req,res)=> {
    try{
        const db = dbConnection.getInstance();
        const data = req.body;
        data.id= data.id.replaceAll(" ","").replaceAll("\n","");
        const UsuarioSistema = defineUsuarioSistema(db.Sequelize,db.dataType);
       
        const nuevoAsistente = await UsuarioSistema.create(data);
        
        return res.status(200).json({message:"Asistente creado correctamente",status:200});
    } catch(error){
        console.error("Error al crear asistente:", error);
        res.status(500).json({message:"Error al crear asistente",status:500});
    }
}

adminCtr.auth = async (req,res)=> {
    try{
        const db = dbConnection.getInstance();
        const data = req.body;
        
        const UsuarioSistema = defineUsuarioSistema(db.Sequelize,db.dataType);
       //agregar encriptación al sistema por mientras tenerlo ahi por parte
        const resultAsistente = await UsuarioSistema.findOne(
            where:{
                id:data.id
            });
        if(resultAsistente && resultAsistente.dataValues.contrasena === data.contrasena){
            
            return res.status(200).json({message:"Ingreso Correcto",status:200,rol:resultAsistente.rol});
        }else{
            return return res.status(404).json({message:"Error con el usuario o contrasena",status:404});
        }
        
    } catch(error){
        console.error("Error al crear asistente:", error);
        res.status(500).json({message:"Error al crear asistente",status:500});
    }
}

export default adminCtr;
