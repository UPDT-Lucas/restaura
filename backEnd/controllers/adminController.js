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

adminCtr.auth = async (req,res)=> {
    try{
        const db = dbConnection.getInstance();
        const data = req.body;
        
        const UsuarioSistema = defineUsuarioSistema(db.Sequelize,db.dataType);
       //agregar encriptación al sistema por mientras tenerlo ahi por parte
        const resultAsistente = await UsuarioSistema.findOne({
            where:{
                correo:data.correo
            }});
        if(resultAsistente && resultAsistente.dataValues.contrasena === data.contrasena){
            
            return res.status(200).json({message:"Ingreso Correcto",status:200,rol:resultAsistente.rol});
        }else{
            return res.status(404).json({message:"Error con el usuario o contrasena",status:404});
        }
        
    } catch(error){
        console.error("Error al crear asistente:", error);
        res.status(500).json({message:"Error al crear asistente",status:500});
    }
}

adminCtr.getConsulta = async (req,res)=>{
    try{
        const {p_genero_id, p_canton_id, p_edad_desde, p_edad_hasta, 
            p_discapacidad, p_tipo_pension_id, 
            p_fecha_ingreso_desde, p_fecha_ingreso_hasta, p_carcel, 
            p_razon_servicio_id, p_grado_academico_id} = req.body;
        
        console.log("Data:",req.body);
        const db = dbConnection.getInstance();
        const sequelize = db.Sequelize;
        const filters = await sequelize.query(
            "SELECT * FROM buscar_porfiltros(:p_genero_id, :p_canton_id, :p_edad_desde, :p_edad_hasta, :p_discapacidad, :p_tipo_pension_id, :p_fecha_ingreso_desde, :p_fecha_ingreso_hasta, :p_carcel, :p_razon_servicio_id, :p_grado_academico_id);",
            {
                replacements: {p_genero_id, p_canton_id, p_edad_desde, p_edad_hasta, 
                                p_discapacidad, p_tipo_pension_id, 
                                p_fecha_ingreso_desde, p_fecha_ingreso_hasta, p_carcel, 
                                p_razon_servicio_id, p_grado_academico_id},
                type: sequelize.QueryTypes.SELECT, 
            }
        );
        
        res.status(200).json({message:"Consulta realizada correctamente",status:200,filters,count:filters.length});
        
    }catch(error){
        console.error("Error al realizar la consulta:", error);
        res.status(500).json({message:"Error al realizar la consulta",status:500});
    }
}



export default adminCtr;
