import dbConnection from "../DB/dbConnection.js";
import defineUsuarioSistema from "../models/usuario_sistema.js";
import defineBitacora from "../models/sistema_bitacora.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import config from '../config.js';
dotenv.config();
const adminCtr = {};
const token = process.env.JWT_SECRET || "Xj9@3*kL8s!wP#Z^2h1uR+eB";

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
    try {
        const db = dbConnection.getInstance();
        const data = req.body;

        const UsuarioSistema = defineUsuarioSistema(db.Sequelize, db.dataType);
        
        const resultAsistente = await UsuarioSistema.findOne({
            where: { correo: data.correo }
        });
        
        
        if (resultAsistente && resultAsistente.dataValues.contrasena === data.contrasena) {
            const token = jwt.sign(
              { id: resultAsistente.id, rol: resultAsistente.rol, nombre: resultAsistente.nombre },
               config.JWT_SECRET,
              { expiresIn: '1h' }
            );

            return res.status(200).json({
                message: "Ingreso Correcto",
                status: 200,
                rol: resultAsistente.rol,
                token: token // << Enviar token al frontend
            });
        } else {
            return res.status(404).json({
                message: "Error con el usuario o contraseña",
                status: 404
            });
        }

    } catch(error) {
        console.error("Error al autenticar:", error);
        res.status(500).json({ message: "Error interno", status: 500 });
    }
}

adminCtr.getConsulta = async (req,res)=>{
    try{
        const {p_genero_id, p_canton_id, p_edad_desde, p_edad_hasta, 
            p_discapacidad, p_tipo_pension_id, 
            p_fecha_ingreso_desde, p_fecha_ingreso_hasta, p_carcel, 
            p_razon_servicio_id, p_grado_academico_id,p_embarazo} = req.body;
        
      
        const db = dbConnection.getInstance();
        const sequelize = db.Sequelize;
        const filters = await sequelize.query(
            "SELECT * FROM buscar_porfiltros(:p_genero_id, :p_canton_id, :p_edad_desde, :p_edad_hasta, :p_discapacidad, :p_tipo_pension_id, :p_fecha_ingreso_desde, :p_fecha_ingreso_hasta, :p_carcel, :p_razon_servicio_id, :p_grado_academico_id,:p_embarazo);",
            {
                replacements: {p_genero_id, p_canton_id, p_edad_desde, p_edad_hasta, 
                                p_discapacidad, p_tipo_pension_id, 
                                p_fecha_ingreso_desde, p_fecha_ingreso_hasta, p_carcel, 
                                p_razon_servicio_id, p_grado_academico_id,p_embarazo},
                type: sequelize.QueryTypes.SELECT, 
            }
        );
        
        res.status(200).json({message:"Consulta realizada correctamente",status:200,filters,count:filters.length});
        
    }catch(error){
        console.error("Error al realizar la consulta:", error);
        res.status(500).json({message:"Error al realizar la consulta",status:500});
    }
}

adminCtr.getBitacora = async (req, res) => {
  try {
    const db = dbConnection.getInstance();
    const Bitacora = defineBitacora(db.Sequelize, db.dataType);

    const registros = await Bitacora.findAll();

    res.status(200).json({
      message: "Datos de bitácora obtenidos correctamente",
      status: 200,
      registros,
      count: registros.length,
    });
  } catch (error) {
    console.error("Error al obtener datos de bitácora:", error);
    res.status(500).json({
      message: "Error al obtener datos de bitácora",
      status: 500,
    });
  }
};


adminCtr.getMovimientosBitacora = async (req, res) => {
  try {
    const db = dbConnection.getInstance();
    const Bitacora = defineBitacora(db.Sequelize, db.dataType);

    const bitacoraId = req.params.id;
      
    console.log("ID de bitácora:", bitacoraId);

    if (!bitacoraId) {
      return res.status(400).json({
        message: "ID de bitácora requerido",
        status: 400,
      });
    }

    const registro = await Bitacora.findOne({
      where: { id: bitacoraId },
      attributes: ["valor"],
    });

    if (!registro) {
      return res.status(404).json({
        message: "Registro no encontrado",
        status: 404,
      });
    }

    res.status(200).json({
      message: "Movimiento obtenido correctamente",
      status: 200,
      valor: registro.valor,
    });
  } catch (error) {
    console.error("Error al obtener el movimiento de bitácora:", error);
    res.status(500).json({
      message: "Error al obtener movimiento",
      status: 500,
    });
  }
};




export default adminCtr;
