import dbConnection from "../DB/dbConnection.js";

import defineClienteXBitacora from "../models/clientexbitacora.js";
import defineBitacora from "../models/bitacora.js";
import defineCliente from "../models/cliente_servicio.js";
import defineCama from "../models/cama.js";
import defineCuarto from "../models/cuarto.js";

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


bitacoraCtr.createBitacora = async (req, res) => {
  try {
    const db = dbConnection.getInstance();
    const bitacora = defineBitacora(db.Sequelize, db.dataType);
    const bitacora_date = req.params.bitacora_date;
    let fecha = convertirFechaADate(bitacora_date);

    const bitacoraFindResult = await bitacora.findOne({
      where: { fecha: fecha }
    });
    if (bitacoraFindResult) {
      return res.status(409).json({ message: "Esta bitacora con la fecha ingresada ya existe en el sistema", status: 409 });
    }

    const bitacoraCreateResult = await bitacora.create({ fecha: fecha });

    return res.status(200).json({ message: "Bitacora Creada", data: bitacoraCreateResult, status: 200 });




  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Error al obtener la crear una nueva entidad de la bitacora", status: 500 });
  }
}
bitacoraCtr.getBitacora = async (req, res) => {
  try {
    const db = dbConnection.getInstance();
    const bitacora = defineBitacora(db.Sequelize, db.dataType);
    const { bitacora_date } = req.params;
    const { limit = 10, offset = 0 } = req.query; // valores por defecto


    const fecha = convertirFechaADate(bitacora_date);

    const bitacoraResult = await bitacora.findOne({
      where: { fecha: fecha }
    });

    if (!bitacoraResult) {
      return res.status(404).json({ message: "La bitácora no existe como entidad", status: 404 });
    }

    const defineList = defineClienteXBitacora(db.Sequelize, db.dataType);

    const totalClientes = await defineList.count({
      where: { bitacora_id: bitacoraResult.dataValues.id }
    });

    const clienteList = await defineList.findAll({
      where: { bitacora_id: bitacoraResult.dataValues.id },
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    const clienteOR = defineCliente(db.Sequelize, db.dataType);
    const bitacoraList = [];


    for (const cliente of clienteList) {
      const clienteId = cliente.dataValues.cliente_servicio_id;

      const clienteData = await clienteOR.findOne({
        attributes: ["id", "nombre", "edad", "fechaingreso"],
        where: { id: clienteId },
      });
      const cama_Id = cliente.dataValues.cama_id || null; // Manejo de cama_id nulo
      if (cama_Id !== null) {
        const nombreCama = await db.Sequelize.query(
          "SELECT c.nombre AS nombre_cama, cu.nombre AS nombre_cuarto FROM cama c JOIN cuarto cu ON c.cuarto_id = cu.id WHERE c.id = :camaId",
          {
            replacements: { camaId: cama_Id }
          })
        clienteData.dataValues.cuarto = nombreCama[0][0].nombre_cama;
        clienteData.dataValues.cama = nombreCama[0][0].nombre_cuarto;
      } else {
        clienteData.dataValues.cuarto = "No asignada";
        clienteData.dataValues.cama = "No asignada";
      }

      bitacoraList.push(clienteData.dataValues);
    }

    return res.status(200).json({
      idbitacora: bitacoraResult.dataValues.id,
      bitacora: bitacoraList,
      total: totalClientes,
      status: 200
    });

  } catch (error) {
    console.error("Error al obtener los datos de la bitácora:", error);
    return res.status(500).json({ message: "Error interno del servidor", status: 500 });
  }
}

bitacoraCtr.getBitacoraIdByFecha = async (req, res) => {
  try {
    const db = dbConnection.getInstance();
    const bitacora = defineBitacora(db.Sequelize, db.dataType);
    const { fecha } = req.params;

    const bitacoraResult = await bitacora.findOne({
      where: { fecha }
    });

    if (!bitacoraResult) {
      return res.status(404).json({ message: "No se encontró una bitácora con esa fecha", status: 404 });
    }
    return res.status(200).json({ bitacora_id: bitacoraResult.dataValues.id, status: 200 });
  } catch (error) {
    console.error("Error al buscar bitácora por fecha:", error);
    return res.status(500).json({ message: "Error interno del servidor", status: 500 });
  }
};

bitacoraCtr.clienteSaveBitacora = async (req, res) => {
  try {
    const db = dbConnection.getInstance();
    const data = req.body
    const defineList = defineClienteXBitacora(db.Sequelize, db.dataType);
    const resultFind = await defineList.findOne({
      where: {
        bitacora_id: data.bitacora_id,
        cliente_servicio_id: data.cliente_servicio_id
      }
    });

    if (resultFind) {
      return res.status(409).json({ message: "El usuario ya existe en esta bitacora", status: 409 });
    }
    const newBitacora = await defineList.create(data);
    return res.status(200).json({ message: "Se logro guardar el usuario en la bitacora", data: newBitacora, status: 200 })

  } catch (error) {
    console.error("Error al guardar el cliente:", error)
    res.status(500).json({ message: "Error al obtener la informacion del usuario a buscar en la bitacora", status: 500 });
  }
}

bitacoraCtr.clienteDeleteBitacora = async (req, res) => {
  try {
    const db = dbConnection.getInstance();
    const data = req.body
    const defineList = defineClienteXBitacora(db.Sequelize, db.dataType);
    console.log(data)
    const resultFind = await defineList.findOne({
      where: {
        bitacora_id: data.bitacora_id,
        cliente_servicio_id: data.cliente_servicio_id
      }
    });
    if (resultFind) {
      const destroyedValue = await defineList.destroy({
        where: {
          bitacora_id: data.bitacora_id,
          cliente_servicio_id: data.cliente_servicio_id
        }
      });
      return res.status(200).json({ message: "El usuario se borro de la bitacora", data: destroyedValue, status: 200 });
    }

    return res.status(404).json({ message: "El usuario no existe en la bitacora", status: 404 });

  } catch (error) {
    console.error("Error al guardar el cliente:", error)
    res.status(500).json({ message: "Error al obtener la informacion del usuario a buscar en la bitacora", status: 500 });
  }
}

bitacoraCtr.getLastRoom = async (req, res) => {
  try {
    const idCliente = req.params.id;
    const idBitacora = req.params.idBitacora;
    const db = dbConnection.getInstance();
    const defineList = defineClienteXBitacora(db.Sequelize, db.dataType);
    const resultFind = await defineList.findOne({
      where: {
        bitacora_id: idBitacora,
        cliente_servicio_id: idCliente
      }
    });
    if (resultFind) {
      return res.status(409).json({ message: "El usuario ya existe en esta bitacora", status: 409 });
    }

    const [results] = await db.Sequelize.query(
      "SELECT * FROM fn_obtener_ultimo_Cuarto(:p_cliente_id)"
      , {
        replacements: { p_cliente_id: idCliente },
      }
    );
    console.log("Resultados de la consulta:", results);

    if (results.length === 0) {
      return res.status(404).json({ message: "No se encontró el último cuarto para el cliente", status: 404 });
    } else {
      const ultimoCuarto = results[0];
      return res.status(200).json({ message: "Último cuarto obtenido", data: ultimoCuarto, status: 200 });
    }


  } catch (error) {
    console.error("Error al obtener el ultimo Cuarto:", error);
    res.status(500).json({ message: "Error al obtener la información de la bitacora", status: 500 });
  }
}

export default bitacoraCtr;

