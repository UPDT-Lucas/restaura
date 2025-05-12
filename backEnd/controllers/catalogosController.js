/**
 * @file catalogoController.js
 * @description Controlador que contiene la lógica de negocio de los catalogos.
 */
import dbConnection from "../DB/dbConnection.js";


import defineDroga from "../models/droga.js";
import defineDondeDormi from "../models/donde_dormi.js";
import defineTiposAyuda from "../models/tipos_ayuda.js";
import defineTipoPension from "../models/tipo_pension.js";
import defineTipoId from "../models/tipo_id.js";
import defineTiempoCalle from "../models/tiempo_calle.js";
import defineRazonServicio from "../models/razon_servicio.js";
import defineProvincia from "../models/provincia.js";
import definePais from "../models/pais.js";
import defineInstitucionesViolencia from "../models/instituciones_violencia.js";
import defineGradoAcademico from "../models/grado_academico.js";
import defineGenero from "../models/genero.js";
import defineEstadoCivil from "../models/estado_civil.js";
import defineCanton from "../models/canton.js";
import defineTipoViolencia from "../models/tipo_violencia.js";



const catalogosCtr = {};

/**
 * @description Recupera todos los catalogos de informacion general.
 * @route GET /Movies
 * @returns {Object} 200 - Listas de catalogos
 * @returns {Error} 500 - Error al obtener los catalagos
 */
catalogosCtr.getCatalogos = async (req, res) => {
    try {
        const db = dbConnection.getInstance();
        //console.log(db)
        const Droga = defineDroga(db.Sequelize,db.dataType);
        const DondeDormi = defineDondeDormi(db.Sequelize,db.dataType);
        const TiposAyuda = defineTiposAyuda(db.Sequelize,db.dataType);
        const TipoPension = defineTipoPension(db.Sequelize,db.dataType);
        const TipoId = defineTipoId(db.Sequelize,db.dataType);
        const TiempoCalle = defineTiempoCalle(db.Sequelize,db.dataType);
        const RazonServicio = defineRazonServicio(db.Sequelize,db.dataType);
        const Provincia = defineProvincia(db.Sequelize,db.dataType);
        const Pais = definePais(db.Sequelize,db.dataType);
        const InstitucionesViolencia = defineInstitucionesViolencia(db.Sequelize,db.dataType);
        const GradoAcademico = defineGradoAcademico(db.Sequelize,db.dataType);
        const Genero = defineGenero(db.Sequelize,db.dataType);
        const EstadoCivil = defineEstadoCivil(db.Sequelize,db.dataType);
        const Canton = defineCanton(db.Sequelize,db.dataType);
        const TipoViolencia = defineTipoViolencia(db.Sequelize,db.dataType);

        // Obtener los datos de cada modelo
        const [droga, dondeDormi, tiposAyuda, tipoPension, tipoId, tiempoCalle, razonServicio, provincia, pais, institucionesViolencia, gradoAcademico, genero, estadoCivil, canton,tipoViolencia] = await Promise.all([
            Droga.findAll({ order: [['id', 'ASC']] }),
            DondeDormi.findAll({ order: [['id', 'ASC']] }),
            TiposAyuda.findAll({ order: [['id', 'ASC']] }),
            TipoPension.findAll({ order: [['id', 'ASC']] }),
            TipoId.findAll({ order: [['id', 'ASC']] }),
            TiempoCalle.findAll({ order: [['id', 'ASC']] }),
            RazonServicio.findAll({ order: [['id', 'ASC']] }),
            Provincia.findAll({ order: [['id', 'ASC']] }),
            Pais.findAll({ order: [['id', 'ASC']] }),
            InstitucionesViolencia.findAll({ order: [['id', 'ASC']] }),
            GradoAcademico.findAll({ order: [['id', 'ASC']] }),
            Genero.findAll({ order: [['id', 'ASC']] }),
            EstadoCivil.findAll({ order: [['id', 'ASC']] }),
            Canton.findAll({ order: [['id', 'ASC']] }),
            TipoViolencia.findAll({ order: [['id', 'ASC']] })
        ]);

        // Enviar la respuesta con los datos
        return res.status(200).json({
            droga,
            dondeDormi,
            tiposAyuda,
            tipoPension,
            tipoId,
            tiempoCalle,
            razonServicio,
            provincia,
            pais,
            institucionesViolencia,
            gradoAcademico,
            genero,
            estadoCivil,
            canton,
            tipoViolencia
        });
    } catch (error) {
        console.error("Error al obtener los catalogos:", error);
        res.status(500).json({ message: "Error al obtener los catalogos" });
    }
}

catalogosCtr.getCantones = async (req,res)=> {
    const { p_provincia_id} = req.params; 
    console.log("Parametros recibidos:", p_provincia_id); 

    try {
        const sequelize = dbConnection.getInstance().Sequelize; 


        const cantonesProvincia = await sequelize.query(
            'SELECT * FROM buscar_canton(:p_provincia_id)',
            {
                replacements: {p_provincia_id},
                type: sequelize.QueryTypes.SELECT, 
            }
        );

        console.log("Resultados del procedimiento:", cantonesProvincia);

    return res.status(200).json(cantonesProvincia); 
    } catch (error) {
        console.error('Error al obtener el canton de la provincia:', error);
        res.status(500).json({ message: 'Error al obtener el canton de la provincia', error: error.message });
    }
}

catalogosCtr.addCanton = async (req,res)=>{
    try{
        const nombreCanton = req.body.nombreCanton;
        const provinciaId = req.body.idProvincia;
        const db = dbConnection.getInstance();
        const Canton = defineCanton(db.Sequelize,db.dataType);
        const resultCanton = await Canton.create({
            nombre: nombreCanton,
            provincia_id:provinciaId
        })
        res.status(200).json({message: "Canton creado", canton: resultCanton,status: 200});
    }catch(error){
        console.error("Error al crear el canton:", error);
        res.status(500).json({message: "Error al crear el canton", error: error.message, status: 500});
    }
}

catalogosCtr.editCanton = async (req, res) => {
    try {
        const { idCanton, nombreCanton, idProvincia } = req.body;
        const db = dbConnection.getInstance();
        const Canton = defineCanton(db.Sequelize, db.dataType);
        const result = await Canton.update(
            { nombre: nombreCanton, provincia_id: idProvincia },
            { where: { id: idCanton } }
        );
        res.status(200).json({ message: "Cantón actualizado", result, status: 200 });
    } catch (error) {
        console.error("Error al actualizar el cantón:", error);
        res.status(500).json({ message: "Error al actualizar el cantón", error: error.message, status: 500 });
    }
};

catalogosCtr.deleteCanton = async (req,res)=>{
    try{
        const idCanton = req.body.idCanton;
        const db = dbConnection.getInstance();
        const Canton = defineCanton(db.Sequelize,db.dataType);
        const rowAffected = await Canton.destroy({
            where: {
                id: idCanton
            }
        })
        res.status(200).json({message: "Canton eliminado", rowAffected: rowAffected,status: 200});
    }catch(error){
        console.error("Error al eliminar:", error);
        res.status(500).json({message: "Error al eliminar", error: error.message, status: 500});
    }
}

catalogosCtr.getAllDrogas = async (req, res) => {
    try {
        const db = dbConnection.getInstance();
        const Droga = defineDroga(db.Sequelize, db.dataType);
        const drogas = await Droga.findAll();
        res.status(200).json({ message: "Drogas recuperadas", drogas: drogas, status: 200 });
    } catch (error) {
        console.error("Error al recuperar las drogas:", error);
        res.status(500).json({ message: "Error al recuperar las drogas", error: error.message, status: 500 });
    }
}

catalogosCtr.addDroga = async (req,res)=>{
    try{
        const nombreDroga = req.body.nombreDroga;
        const db = dbConnection.getInstance();
        const Droga = defineDroga(db.Sequelize,db.dataType);
        const resultDroga = await Droga.create({
            nombre: nombreDroga,
        })
        res.status(200).json({message: "Canton creado", droga: resultDroga,status: 200});
    }catch(error){
        console.error("Error al crear la droga:", error);
        res.status(500).json({message: "Error al crear la droga", error: error.message, status: 500});
    }
}

catalogosCtr.editDroga = async (req, res) => {
  try {
    const { idDroga, nombreDroga } = req.body;
    const db = dbConnection.getInstance();
    const Droga = defineDroga(db.Sequelize, db.dataType);
    const result = await Droga.update(
      { nombre: nombreDroga },
      { where: { id: idDroga } }
    );
    res.status(200).json({ message: "Droga actualizada", result, status: 200 });
  } catch (error) {
    console.error("Error al actualizar la droga:", error);
    res
      .status(500)
      .json({
        message: "Error al actualizar la droga",
        error: error.message,
        status: 500,
      });
  }
};

catalogosCtr.deleteDroga = async (req,res)=>{
    try{
        const idDroga = req.body.idDroga;
        const db = dbConnection.getInstance();
        const Droga = defineDroga(db.Sequelize,db.dataType);
        const rowAffected = await Droga.destroy({
            where: {
                id: idDroga
            }
        })
        res.status(200).json({message: "Droga eliminada", rowAffected: rowAffected,status: 200});
    }catch(error){
        console.error("Error al eliminar:", error);
        res.status(500).json({message: "Error al eliminar", error: error.message, status: 500});
    }
}

catalogosCtr.getAllTiposAyuda = async (req, res) => {
    try {
        const db = dbConnection.getInstance();
        const TiposAyuda = defineTiposAyuda(db.Sequelize, db.dataType);
        const tiposAyuda = await TiposAyuda.findAll();
        res.status(200).json({ message: "Tipos de ayuda recuperados", tiposAyuda: tiposAyuda, status: 200 });
    } catch (error) {
        console.error("Error al recuperar los tipos de ayuda:", error);
        res.status(500).json({ message: "Error al recuperar los tipos de ayuda", error: error.message, status: 500 });
    }
}

catalogosCtr.addTiposAyuda = async (req,res)=>{
    try{
        const nombreTiposAyuda = req.body.nombreTiposAyuda;
        const db = dbConnection.getInstance();
        const tiposAyuda = defineTiposAyuda(db.Sequelize,db.dataType);
        const resultTiposAyuda = await tiposAyuda.create({
            nombre: nombreTiposAyuda,
        })
        res.status(200).json({message: "Tipo de ayuda creado", tiposAyuda: resultTiposAyuda,status: 200});
    }catch(error){
        console.error("Error al crear el tipo de ayuda:", error);
        res.status(500).json({message: "Error al crear el tipo de ayuda", error: error.message, status: 500});
    }
}

catalogosCtr.editTiposAyuda = async (req, res) => {
  try {
    const { idTiposAyuda, nombreTiposAyuda } = req.body;
    const db = dbConnection.getInstance();
    const tiposAyuda = defineTiposAyuda(db.Sequelize, db.dataType);
    const result = await tiposAyuda.update(
      { nombre: nombreTiposAyuda },
      { where: { id: idTiposAyuda } }
    );
    res
      .status(200)
      .json({ message: "Tipo de ayuda actualizado", result, status: 200 });
  } catch (error) {
    console.error("Error al actualizar el tipo de ayuda:", error);
    res
      .status(500)
      .json({
        message: "Error al actualizar el tipo de ayuda",
        error: error.message,
        status: 500,
      });
  }
};

catalogosCtr.deleteTiposAyuda = async (req,res)=>{
    try{
        const idTiposAyuda = req.body.idTiposAyuda;
        const db = dbConnection.getInstance();
        const tiposAyuda = defineTiposAyuda(db.Sequelize,db.dataType);
        const rowAffected = await tiposAyuda.destroy({
            where: {
                id: idTiposAyuda
            }
        })
        res.status(200).json({message: "Tipo de ayuda eliminada", rowAffected: rowAffected,status: 200});
    }catch(error){
        console.error("Error al eliminar:", error);
        res.status(500).json({message: "Error al eliminar", error: error.message, status: 500});
    }
}

catalogosCtr.getAllTiposPension = async (req, res) => {
    try {
        const db = dbConnection.getInstance();
        const TipoPension = defineTipoPension(db.Sequelize, db.dataType);
        const tiposPension = await TipoPension.findAll();
        res.status(200).json({ message: "Tipos de pensión recuperados", tiposPension: tiposPension, status: 200 });
    } catch (error) {
        console.error("Error al recuperar los tipos de pensión:", error);
        res.status(500).json({ message: "Error al recuperar los tipos de pensión", error: error.message, status: 500 });
    }
}
catalogosCtr.addTipoPension = async (req,res)=>{
    try{
        const nombreTipoPension = req.body.nombreTipoPension;
        const db = dbConnection.getInstance();
        const tipoPension = defineTipoPension(db.Sequelize,db.dataType);
        const resultTipoPension = await tipoPension.create({
            nombre: nombreTipoPension,
        })
        res.status(200).json({message: "Tipo de pension creado", tipoPension: resultTipoPension,status: 200});
    }catch(error){
        console.error("Error al crear el tipo de pension:", error);
        res.status(500).json({message: "Error al crear el tipo de pension", error: error.message, status: 500});
    }
}

catalogosCtr.editTipoPension = async (req, res) => {
  try {
    const { idTipoPension, nombreTipoPension } = req.body;
    const db = dbConnection.getInstance();
    const tipoPension = defineTipoPension(db.Sequelize, db.dataType);
    const result = await tipoPension.update(
      { nombre: nombreTipoPension },
      { where: { id: idTipoPension } }
    );
    res
      .status(200)
      .json({ message: "Tipo de pensión actualizado", result, status: 200 });
  } catch (error) {
    console.error("Error al actualizar el tipo de pensión:", error);
    res
      .status(500)
      .json({
        message: "Error al actualizar el tipo de pensión",
        error: error.message,
        status: 500,
      });
  }
};

catalogosCtr.deleteTipoPension = async (req,res)=>{
    try{
        const idTipoPension = req.body.idTipoPension;
        const db = dbConnection.getInstance();
        const tipoPension = defineTipoPension(db.Sequelize,db.dataType);
        const rowAffected = await tipoPension.destroy({
            where: {
                id: idTipoPension
            }
        })
        res.status(200).json({message: "Tipo de pension eliminada", rowAffected: rowAffected,status: 200});
    }catch(error){
        console.error("Error al eliminar:", error);
        res.status(500).json({message: "Error al eliminar", error: error.message, status: 500});
    }
}

catalogosCtr.getAllTiposId = async (req, res) => {
    try {
        const db = dbConnection.getInstance();
        const TipoId = defineTipoId(db.Sequelize, db.dataType);
        const tiposId = await TipoId.findAll();
        res.status(200).json({ message: "Tipos de ID recuperados", tiposId: tiposId, status: 200 });
    } catch (error) {
        console.error("Error al recuperar los tipos de ID:", error);
        res.status(500).json({ message: "Error al recuperar los tipos de ID", error: error.message, status: 500 });
    }
}

catalogosCtr.addTipoId = async (req,res)=>{
    try{
        const nombreTipoId = req.body.nombreTipoId;
        const db = dbConnection.getInstance();
        const tipoId = defineTipoId(db.Sequelize,db.dataType);
        const resultTipoId = await tipoId.create({
            nombre: nombreTipoId,
        })
        res.status(200).json({message: "Tipo de id creado", tipoId: resultTipoId,status: 200});
    }catch(error){
        console.error("Error al crear el tipo de id:", error);
        res.status(500).json({message: "Error al crear el tipo de id", error: error.message, status: 500});
    }
}

catalogosCtr.editTipoId = async (req, res) => {
  try {
    const { idTipoId, nombreTipoId } = req.body;
    const db = dbConnection.getInstance();
    const tipoId = defineTipoId(db.Sequelize, db.dataType);
    const result = await tipoId.update(
      { nombre: nombreTipoId },
      { where: { id: idTipoId } }
    );
    res
      .status(200)
      .json({ message: "Tipo de ID actualizado", result, status: 200 });
  } catch (error) {
    console.error("Error al actualizar el tipo de ID:", error);
    res
      .status(500)
      .json({
        message: "Error al actualizar el tipo de ID",
        error: error.message,
        status: 500,
      });
  }
};

catalogosCtr.deleteTipoId = async (req,res)=>{
    try{
        const idTipoId = req.body.idTipoId;
        const db = dbConnection.getInstance();
        const tipoId = defineTipoId(db.Sequelize,db.dataType);
        const rowAffected = await tipoId.destroy({
            where: {
                id: idTipoId
            }
        })
        res.status(200).json({message: "Tipo de id eliminada", rowAffected: rowAffected,status: 200});
    }catch(error){
        console.error("Error al eliminar:", error);
        res.status(500).json({message: "Error al eliminar", error: error.message, status: 500});
    }
}

catalogosCtr.getAllDondeDormi = async (req, res) => {
    try {
        const db = dbConnection.getInstance();
        const DondeDormi = defineDondeDormi(db.Sequelize, db.dataType);
        const dondeDormiList = await DondeDormi.findAll();
        res.status(200).json({ message: "Tipos de donde dormi recuperados", dondeDormi: dondeDormiList, status: 200 });
    } catch (error) {
        console.error("Error al recuperar los tipos de donde dormi:", error);
        res.status(500).json({ message: "Error al recuperar los tipos de donde dormi", error: error.message, status: 500 });
    }
}
catalogosCtr.addDondeDormi = async (req,res)=>{
    try{
        const nombreDondeDormi = req.body.nombreDondeDormi;
        const db = dbConnection.getInstance();
        const dondeDormi = defineDondeDormi(db.Sequelize,db.dataType);
        const resultDondeDormi = await dondeDormi.create({
            nombre: nombreDondeDormi,
        })
        res.status(200).json({message: "Tipo de donde dormi creado", resultDondeDormi: resultDondeDormi,status: 200});
    }catch(error){
        console.error("Error al crear el tipo de donde dormi:", error);
        res.status(500).json({message: "Error al crear el tipo de donde dormi", error: error.message, status: 500});
    }
}

catalogosCtr.editDondeDormi = async (req, res) => {
  try {
    const { idDondeDormi, nombreDondeDormi } = req.body;
    const db = dbConnection.getInstance();
    const dondeDormi = defineDondeDormi(db.Sequelize, db.dataType);
    const result = await dondeDormi.update(
      { nombre: nombreDondeDormi },
      { where: { id: idDondeDormi } }
    );
    res
      .status(200)
      .json({ message: "Lugar donde dormí actualizado", result, status: 200 });
  } catch (error) {
    console.error("Error al actualizar donde dormí:", error);
    res
      .status(500)
      .json({
        message: "Error al actualizar donde dormí",
        error: error.message,
        status: 500,
      });
  }
};

catalogosCtr.deleteDondeDormi = async (req,res)=>{
    try{
        const idDondeDormi = req.body.idDondeDormi;
        const db = dbConnection.getInstance();
        const dondeDormi = defineDondeDormi(db.Sequelize,db.dataType);
        const rowAffected = await dondeDormi.destroy({
            where: {
                id: idDondeDormi
            }
        })
        res.status(200).json({message: "Tipo de donde dormi eliminado", rowAffected: rowAffected,status: 200});
    }catch(error){
        console.error("Error al eliminar:", error);
        res.status(500).json({message: "Error al eliminar", error: error.message, status: 500});
    }
}

catalogosCtr.getAllTiempoCalle = async (req, res) => {
    try {
        const db = dbConnection.getInstance();
        const TiempoCalle = defineTiempoCalle(db.Sequelize, db.dataType);
        const tiempoCalleList = await TiempoCalle.findAll();
        res.status(200).json({ message: "Tipos de tiempo de calle recuperados", tiempoCalle: tiempoCalleList, status: 200 });
    } catch (error) {
        console.error("Error al recuperar los tipos de tiempo de calle:", error);
        res.status(500).json({ message: "Error al recuperar los tipos de tiempo de calle", error: error.message, status: 500 });
    }
}

catalogosCtr.addTiempoCalle = async (req,res)=>{
    try{
        const nombreTiempoCalle = req.body.nombreTiempoCalle;
        const db = dbConnection.getInstance();
        const tiempoCalle = defineTiempoCalle(db.Sequelize,db.dataType);
        const resultTiempoCalle = await tiempoCalle.create({
            nombre: nombreTiempoCalle,
        })
        res.status(200).json({message: "Tipo de tiempo de calle creado", resultTiempoCalle: resultTiempoCalle,status: 200});
    }catch(error){
        console.error("Error al crear el tipo de tiempo de calle:", error);
        res.status(500).json({message: "Error al crear el tipo de tiempo de calle", error: error.message, status: 500});
    }
}

catalogosCtr.editTiempoCalle = async (req, res) => {
  try {
    const { idTiempoCalle, nombreTiempoCalle } = req.body;
    const db = dbConnection.getInstance();
    const tiempoCalle = defineTiempoCalle(db.Sequelize, db.dataType);
    const result = await tiempoCalle.update(
      { nombre: nombreTiempoCalle },
      { where: { id: idTiempoCalle } }
    );
    res
      .status(200)
      .json({ message: "Tiempo en calle actualizado", result, status: 200 });
  } catch (error) {
    console.error("Error al actualizar tiempo en calle:", error);
    res
      .status(500)
      .json({
        message: "Error al actualizar tiempo en calle",
        error: error.message,
        status: 500,
      });
  }
};

catalogosCtr.deleteTiempoCalle = async (req, res) => {
    try {
        const idTiempoCalle = req.body.idTiempoCalle;
        const db = dbConnection.getInstance();
        const tiempoCalle = defineTiempoCalle(db.Sequelize, db.dataType);
        const rowAffected = await tiempoCalle.destroy({ where: { id: idTiempoCalle } });
        res.status(200).json({ message: "Tiempo de calle eliminado", rowAffected, status: 200 });
    } catch (error) {
        console.error("Error al eliminar el tiempo de calle:", error);
        res.status(500).json({ message: "Error al eliminar el tiempo de calle", error: error.message, status: 500 });
    }
};

catalogosCtr.getAllRazonServicio = async (req, res) => {
    try {
        const db = dbConnection.getInstance();
        const RazonServicio = defineRazonServicio(db.Sequelize, db.dataType);
        const razonesServicio = await RazonServicio.findAll();
        res.status(200).json({ message: "Razones de servicio recuperadas", razonesServicio: razonesServicio, status: 200 });
    } catch (error) {
        console.error("Error al recuperar las razones de servicio:", error);
        res.status(500).json({ message: "Error al recuperar las razones de servicio", error: error.message, status: 500 });
    }
}

catalogosCtr.addRazonServicio = async (req, res) => {
    try {
        const nombreRazonServicio = req.body.nombreRazonServicio;
        const db = dbConnection.getInstance();
        const razonServicio = defineRazonServicio(db.Sequelize, db.dataType);
        const resultRazonServicio = await razonServicio.create({ nombre: nombreRazonServicio });
        res.status(200).json({ message: "Razón de servicio creada", resultRazonServicio, status: 200 });
    } catch (error) {
        console.error("Error al crear la razón de servicio:", error);
        res.status(500).json({ message: "Error al crear la razón de servicio", error: error.message, status: 500 });
    }
};

catalogosCtr.editRazonServicio = async (req, res) => {
  try {
    const { idRazonServicio, nombreRazonServicio } = req.body;
    const db = dbConnection.getInstance();
    const razonServicio = defineRazonServicio(db.Sequelize, db.dataType);
    const result = await razonServicio.update(
      { nombre: nombreRazonServicio },
      { where: { id: idRazonServicio } }
    );
    res
      .status(200)
      .json({ message: "Razón de servicio actualizada", result, status: 200 });
  } catch (error) {
    console.error("Error al actualizar razón de servicio:", error);
    res
      .status(500)
      .json({
        message: "Error al actualizar razón de servicio",
        error: error.message,
        status: 500,
      });
  }
};

catalogosCtr.deleteRazonServicio = async (req, res) => {
    try {
        const idRazonServicio = req.body.idRazonServicio;
        const db = dbConnection.getInstance();
        const razonServicio = defineRazonServicio(db.Sequelize, db.dataType);
        const rowAffected = await razonServicio.destroy({ where: { id: idRazonServicio } });
        res.status(200).json({ message: "Razón de servicio eliminada", rowAffected, status: 200 });
    } catch (error) {
        console.error("Error al eliminar la razón de servicio:", error);
        res.status(500).json({ message: "Error al eliminar la razón de servicio", error: error.message, status: 500 });
    }
};

catalogosCtr.getAllProvincias = async (req, res) => {
    try {
        const db = dbConnection.getInstance();
        const Provincia = defineProvincia(db.Sequelize, db.dataType);
        const provincias = await Provincia.findAll();
        res.status(200).json({ message: "Provincias recuperadas", provincias: provincias, status: 200 });
    } catch (error) {
        console.error("Error al recuperar las provincias:", error);
        res.status(500).json({ message: "Error al recuperar las provincias", error: error.message, status: 500 });
    }
}

catalogosCtr.addProvincia = async (req, res) => {
    try {
        const nombreProvincia = req.body.nombreProvincia;
        const db = dbConnection.getInstance();
        const provincia = defineProvincia(db.Sequelize, db.dataType);
        const resultProvincia = await provincia.create({ nombre: nombreProvincia });
        res.status(200).json({ message: "Provincia creada", resultProvincia, status: 200 });
    } catch (error) {
        console.error("Error al crear la provincia:", error);
        res.status(500).json({ message: "Error al crear la provincia", error: error.message, status: 500 });
    }
};

catalogosCtr.editProvincia = async (req, res) => {
  try {
    const { idProvincia, nombreProvincia } = req.body;
    const db = dbConnection.getInstance();
    const provincia = defineProvincia(db.Sequelize, db.dataType);
    const result = await provincia.update(
      { nombre: nombreProvincia },
      { where: { id: idProvincia } }
    );
    res
      .status(200)
      .json({ message: "Provincia actualizada", result, status: 200 });
  } catch (error) {
    console.error("Error al actualizar la provincia:", error);
    res
      .status(500)
      .json({
        message: "Error al actualizar la provincia",
        error: error.message,
        status: 500,
      });
  }
};

catalogosCtr.deleteProvincia = async (req, res) => {
    try {
        const idProvincia = req.body.idProvincia;
        const db = dbConnection.getInstance();
        const provincia = defineProvincia(db.Sequelize, db.dataType);
        const rowAffected = await provincia.destroy({ where: { id: idProvincia } });
        res.status(200).json({ message: "Provincia eliminada", rowAffected, status: 200 });
    } catch (error) {
        console.error("Error al eliminar la provincia:", error);
        res.status(500).json({ message: "Error al eliminar la provincia", error: error.message, status: 500 });
    }
};

catalogosCtr.getAllPaises = async (req, res) => {
    try {
        const db = dbConnection.getInstance();
        const Pais = definePais(db.Sequelize, db.dataType);
        const paises = await Pais.findAll();
        res.status(200).json({ message: "Países recuperados", paises: paises, status: 200 });
    } catch (error) {
        console.error("Error al recuperar los países:", error);
        res.status(500).json({ message: "Error al recuperar los países", error: error.message, status: 500 });
    }
}

catalogosCtr.addPais = async (req, res) => {
    try {
        const nombrePais = req.body.nombrePais;
        const db = dbConnection.getInstance();
        const pais = definePais(db.Sequelize, db.dataType);
        const resultPais = await pais.create({ nombre: nombrePais });
        res.status(200).json({ message: "País creado", resultPais, status: 200 });
    } catch (error) {
        console.error("Error al crear el país:", error);
        res.status(500).json({ message: "Error al crear el país", error: error.message, status: 500 });
    }
};

catalogosCtr.editPais = async (req, res) => {
  try {
    const { idPais, nombrePais } = req.body;
    const db = dbConnection.getInstance();
    const pais = definePais(db.Sequelize, db.dataType);
    const result = await pais.update(
      { nombre: nombrePais },
      { where: { id: idPais } }
    );
    res.status(200).json({ message: "País actualizado", result, status: 200 });
  } catch (error) {
    console.error("Error al actualizar el país:", error);
    res
      .status(500)
      .json({
        message: "Error al actualizar el país",
        error: error.message,
        status: 500,
      });
  }
};

catalogosCtr.deletePais = async (req, res) => {
    try {
        const idPais = req.body.idPais;
        const db = dbConnection.getInstance();
        const pais = definePais(db.Sequelize, db.dataType);
        const rowAffected = await pais.destroy({ where: { id: idPais } });
        res.status(200).json({ message: "País eliminado", rowAffected, status: 200 });
    } catch (error) {
        console.error("Error al eliminar el país:", error);
        res.status(500).json({ message: "Error al eliminar el país", error: error.message, status: 500 });
    }
};


catalogosCtr.getAllInstitucionesViolencia = async (req, res) => {
    try {
        const db = dbConnection.getInstance();
        const InstitucionesViolencia = defineInstitucionesViolencia(db.Sequelize, db.dataType);
        const institucionesViolenciaList = await InstitucionesViolencia.findAll();
        res.status(200).json({ message: "Instituciones de violencia recuperadas", institucionesViolencia: institucionesViolenciaList, status: 200 });
    } catch (error) {
        console.error("Error al recuperar las instituciones de violencia:", error);
        res.status(500).json({ message: "Error al recuperar las instituciones de violencia", error: error.message, status: 500 });
    }
}

catalogosCtr.addInstitucionesViolencia = async (req, res) => {
    try {
        const nombreInstitucionesViolencia = req.body.nombreInstitucionesViolencia;
        const db = dbConnection.getInstance();
        const institucionesViolencia = defineInstitucionesViolencia(db.Sequelize, db.dataType);
        const resultInstitucionesViolencia = await institucionesViolencia.create({ nombre: nombreInstitucionesViolencia });
        res.status(200).json({ message: "Institución de violencia creada", resultInstitucionesViolencia, status: 200 });
    } catch (error) {
        console.error("Error al crear la institución de violencia:", error);
        res.status(500).json({ message: "Error al crear la institución de violencia", error: error.message, status: 500 });
    }
};

catalogosCtr.editInstitucionesViolencia = async (req, res) => {
  try {
    const { idInstitucionesViolencia, nombreInstitucionesViolencia } = req.body;
    const db = dbConnection.getInstance();
    const institucionesViolencia = defineInstitucionesViolencia(
      db.Sequelize,
      db.dataType
    );
    const result = await institucionesViolencia.update(
      { nombre: nombreInstitucionesViolencia },
      { where: { id: idInstitucionesViolencia } }
    );
    res
      .status(200)
      .json({
        message: "Institución de violencia actualizada",
        result,
        status: 200,
      });
  } catch (error) {
    console.error("Error al actualizar la institución de violencia:", error);
    res
      .status(500)
      .json({
        message: "Error al actualizar la institución de violencia",
        error: error.message,
        status: 500,
      });
  }
};

catalogosCtr.deleteInstitucionesViolencia = async (req, res) => {
    try {
        const idInstitucionesViolencia = req.body.idInstitucionesViolencia;
        const db = dbConnection.getInstance();
        const institucionesViolencia = defineInstitucionesViolencia(db.Sequelize, db.dataType);
        const rowAffected = await institucionesViolencia.destroy({ where: { id: idInstitucionesViolencia } });
        res.status(200).json({ message: "Institución de violencia eliminada", rowAffected, status: 200 });
    } catch (error) {
        console.error("Error al eliminar la institución de violencia:", error);
        res.status(500).json({ message: "Error al eliminar la institución de violencia", error: error.message, status: 500 });
    }
};

catalogosCtr.getAllGradosAcademicos = async (req, res) => {
    try {
        const db = dbConnection.getInstance();
        const GradoAcademico = defineGradoAcademico(db.Sequelize, db.dataType);
        const gradosAcademicos = await GradoAcademico.findAll();
        res.status(200).json({ message: "Grados académicos recuperados", gradosAcademicos: gradosAcademicos, status: 200 });
    } catch (error) {
        console.error("Error al recuperar los grados académicos:", error);
        res.status(500).json({ message: "Error al recuperar los grados académicos", error: error.message, status: 500 });
    }
}
catalogosCtr.addGradoAcademico = async (req, res) => {
    try {
        const nombreGradoAcademico = req.body.nombreGradoAcademico;
        const db = dbConnection.getInstance();
        const gradoAcademico = defineGradoAcademico(db.Sequelize, db.dataType);
        const resultGradoAcademico = await gradoAcademico.create({ nombre: nombreGradoAcademico });
        res.status(200).json({ message: "Grado académico creado", resultGradoAcademico, status: 200 });
    } catch (error) {
        console.error("Error al crear el grado académico:", error);
        res.status(500).json({ message: "Error al crear el grado académico", error: error.message, status: 500 });
    }
};

catalogosCtr.editGradoAcademico = async (req, res) => {
  try {
    const { idGradoAcademico, nombreGradoAcademico } = req.body;
    const db = dbConnection.getInstance();
    const gradoAcademico = defineGradoAcademico(db.Sequelize, db.dataType);
    const result = await gradoAcademico.update(
      { nombre: nombreGradoAcademico },
      { where: { id: idGradoAcademico } }
    );
    res
      .status(200)
      .json({ message: "Grado académico actualizado", result, status: 200 });
  } catch (error) {
    console.error("Error al actualizar el grado académico:", error);
    res
      .status(500)
      .json({
        message: "Error al actualizar el grado académico",
        error: error.message,
        status: 500,
      });
  }
};

catalogosCtr.deleteGradoAcademico = async (req, res) => {
    try {
        const idGradoAcademico = req.body.idGradoAcademico;
        const db = dbConnection.getInstance();
        const gradoAcademico = defineGradoAcademico(db.Sequelize, db.dataType);
        const rowAffected = await gradoAcademico.destroy({ where: { id: idGradoAcademico } });
        res.status(200).json({ message: "Grado académico eliminado", rowAffected, status: 200 });
    } catch (error) {
        console.error("Error al eliminar el grado académico:", error);
        res.status(500).json({ message: "Error al eliminar el grado académico", error: error.message, status: 500 });
    }
};

catalogosCtr.getAllGeneros = async (req, res) => {
    try {
        const db = dbConnection.getInstance();
        const Genero = defineGenero(db.Sequelize, db.dataType);
        const generos = await Genero.findAll();
        res.status(200).json({ message: "Géneros recuperados", generos: generos, status: 200 });
    } catch (error) {
        console.error("Error al recuperar los géneros:", error);
        res.status(500).json({ message: "Error al recuperar los géneros", error: error.message, status: 500 });
    }
}

catalogosCtr.addGenero = async (req, res) => {
    try {
        const nombreGenero = req.body.nombreGenero;
        const db = dbConnection.getInstance();
        const genero = defineGenero(db.Sequelize, db.dataType);
        const resultGenero = await genero.create({ nombre: nombreGenero });
        res.status(200).json({ message: "Género creado", resultGenero, status: 200 });
    } catch (error) {
        console.error("Error al crear el género:", error);
        res.status(500).json({ message: "Error al crear el género", error: error.message, status: 500 });
    }
};

catalogosCtr.editGenero = async (req, res) => {
  try {
    const { idGenero, nombreGenero } = req.body;
    const db = dbConnection.getInstance();
    const genero = defineGenero(db.Sequelize, db.dataType);
    const result = await genero.update(
      { nombre: nombreGenero },
      { where: { id: idGenero } }
    );
    res
      .status(200)
      .json({ message: "Género actualizado", result, status: 200 });
  } catch (error) {
    console.error("Error al actualizar el género:", error);
    res
      .status(500)
      .json({
        message: "Error al actualizar el género",
        error: error.message,
        status: 500,
      });
  }
};

catalogosCtr.deleteGenero = async (req, res) => {
    try {
        const idGenero = req.body.idGenero;
        const db = dbConnection.getInstance();
        const genero = defineGenero(db.Sequelize, db.dataType);
        const rowAffected = await genero.destroy({ where: { id: idGenero } });
        res.status(200).json({ message: "Género eliminado", rowAffected, status: 200 });
    } catch (error) {
        console.error("Error al eliminar el género:", error);
        res.status(500).json({ message: "Error al eliminar el género", error: error.message, status: 500 });
    }
};

catalogosCtr.getAllEstadosCiviles = async (req, res) => {
    try {
        const db = dbConnection.getInstance();
        const EstadoCivil = defineEstadoCivil(db.Sequelize, db.dataType);
        const estadosCiviles = await EstadoCivil.findAll();
        res.status(200).json({ message: "Estados civiles recuperados", estadosCiviles: estadosCiviles, status: 200 });
    } catch (error) {
        console.error("Error al recuperar los estados civiles:", error);
        res.status(500).json({ message: "Error al recuperar los estados civiles", error: error.message, status: 500 });
    }
}

catalogosCtr.addEstadoCivil = async (req, res) => {
    try {
        const nombreEstadoCivil = req.body.nombreEstadoCivil;
        const db = dbConnection.getInstance();
        const estadoCivil = defineEstadoCivil(db.Sequelize, db.dataType);
        const resultEstadoCivil = await estadoCivil.create({ nombre: nombreEstadoCivil });
        res.status(200).json({ message: "Estado civil creado", resultEstadoCivil, status: 200 });
    } catch (error) {
        console.error("Error al crear el estado civil:", error);
        res.status(500).json({ message: "Error al crear el estado civil", error: error.message, status: 500 });
    }
};

catalogosCtr.editEstadoCivil = async (req, res) => {
  try {
    const { idEstadoCivil, nombreEstadoCivil } = req.body;
    const db = dbConnection.getInstance();
    const estadoCivil = defineEstadoCivil(db.Sequelize, db.dataType);
    const result = await estadoCivil.update(
      { nombre: nombreEstadoCivil },
      { where: { id: idEstadoCivil } }
    );
    res
      .status(200)
      .json({ message: "Estado civil actualizado", result, status: 200 });
  } catch (error) {
    console.error("Error al actualizar el estado civil:", error);
    res
      .status(500)
      .json({
        message: "Error al actualizar el estado civil",
        error: error.message,
        status: 500,
      });
  }
};

catalogosCtr.deleteEstadoCivil = async (req, res) => {
    try {
        const idEstadoCivil = req.body.idEstadoCivil;
        const db = dbConnection.getInstance();
        const estadoCivil = defineEstadoCivil(db.Sequelize, db.dataType);
        const rowAffected = await estadoCivil.destroy({ where: { id: idEstadoCivil } });
        res.status(200).json({ message: "Estado civil eliminado", rowAffected, status: 200 });
    } catch (error) {
        console.error("Error al eliminar el estado civil:", error);
        res.status(500).json({ message: "Error al eliminar el estado civil", error: error.message, status: 500 });
    }
};

catalogosCtr.getAllTiposViolencia = async (req, res) => {
    try {
        const db = dbConnection.getInstance();
        const TipoViolencia = defineTipoViolencia(db.Sequelize, db.dataType);
        const tiposViolencia = await TipoViolencia.findAll();
        res.status(200).json({ message: "Tipos de violencia recuperados", tiposViolencia: tiposViolencia, status: 200 });
    } catch (error) {
        console.error("Error al recuperar los tipos de violencia:", error);
        res.status(500).json({ message: "Error al recuperar los tipos de violencia", error: error.message, status: 500 });
    }
}

catalogosCtr.addTipoViolencia = async (req, res) => {
    try {
        const nombreTipoViolencia = req.body.nombreTipoViolencia;
        const db = dbConnection.getInstance();
        const tipoViolencia = defineTipoViolencia(db.Sequelize, db.dataType);
        const resultTipoViolencia = await tipoViolencia.create({ nombre: nombreTipoViolencia });
        res.status(200).json({ message: "Tipo de violencia creado", resultTipoViolencia, status: 200 });
    } catch (error) {
        console.error("Error al crear el tipo de violencia:", error);
        res.status(500).json({ message: "Error al crear el tipo de violencia", error: error.message, status: 500 });
    }
};

catalogosCtr.editTipoViolencia = async (req, res) => {
  try {
    const { idTipoViolencia, nombreTipoViolencia } = req.body;
    const db = dbConnection.getInstance();
    const tipoViolencia = defineTipoViolencia(db.Sequelize, db.dataType);
    const result = await tipoViolencia.update(
      { nombre: nombreTipoViolencia },
      { where: { id: idTipoViolencia } }
    );
    res
      .status(200)
      .json({ message: "Tipo de violencia actualizado", result, status: 200 });
  } catch (error) {
    console.error("Error al actualizar el tipo de violencia:", error);
    res
      .status(500)
      .json({
        message: "Error al actualizar el tipo de violencia",
        error: error.message,
        status: 500,
      });
  }
};

catalogosCtr.deleteTipoViolencia = async (req, res) => {
    try {
        const idTipoViolencia = req.body.idTipoViolencia;
        const db = dbConnection.getInstance();
        const tipoViolencia = defineTipoViolencia(db.Sequelize, db.dataType);
        const rowAffected = await tipoViolencia.destroy({ where: { id: idTipoViolencia } });
        res.status(200).json({ message: "Tipo de violencia eliminado", rowAffected, status: 200 });
    } catch (error) {
        console.error("Error al eliminar el tipo de violencia:", error);
        res.status(500).json({ message: "Error al eliminar el tipo de violencia", error: error.message, status: 500 });
    }
};

export default catalogosCtr;
