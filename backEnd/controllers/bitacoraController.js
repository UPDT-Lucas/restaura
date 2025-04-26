import dbConnection from "../DB/dbConnection.js";

import defineClienteXBitacora from "../models/clientexbitacora.js";
import defineBitacora from "../models/bitacora.js";
import defineCliente from "../models/cliente_servicio.js";

const bitacoraCtr = {};

function convertirFechaADate(fecha) {
  if (!fecha) return null; // Manejar fechas nulas o indefinidas

  // Verificar si la fecha ya está en formato YYYY-MM-DD
  const formatoYYYYMMDD = /^\d{4}-\d{2}-\d{2}$/; // Expresión regular para validar el formato
  if (formatoYYYYMMDD.test(fecha)) {
      return fecha; // Si ya está en el formato correcto, devolver la fecha
  }

  // Si no está en el formato correcto, convertirla
  const [dia, mes, ano] = fecha.split('-'); // Dividir la fecha en partes
  return `${ano}-${mes}-${dia}`; // Reorganizar en formato YYYY-MM-DD
}

bitacoraCtr.getBitacora = async(req,res) =>{
  try{
      const db = dbConnection.getInstance();
      const bitacora = defineBitacora(db.Sequelize,db.dataType);
      const {bitacora_date} = req.params
      console.log(bitacora_date)
      let fecha = convertirFechaADate(bitacora_date);
      
      
      const bitacoraResult = await bitacora.findOne({
        where:{fecha: fecha}
      });
      console.log("Bitacora encontrada:", bitacoraResult.dataValues);
      if(bitacoraResult !== undefined && bitacoraResult !== null){
        const defineList = defineClienteXBitacora(db.Sequelize,db.dataType);
        
        const clienteList = await defineList.findAll({
          where:{bitacora_id: bitacoraResult.dataValues.id}
        });
        
        if(clienteList.length !== 0) {
          const clienteOR = defineCliente(db.Sequelize,db.dataType);
          for (let i = 0; i < clienteList.length; i++) {
            const cliente = clienteList[i];
            const clienteId = cliente.dataValues.cliente_servicio_id;
            const clienteData = await clienteOR.findOne({
              where: { id: clienteId },
            });
            console.log(clienteData);
          }
        }
          
        
        
      }else{
        res.status(404).json({message:"La bitacora no existe como entidad",status:404})
      }
      
  }catch(error){
        console.error("Error al obtener los catalogos:", error);
        res.status(500).json({ message: "Error al obtener la información de la bitacora",status:500 });
  }
  
}

export default bitacoraCtr;

