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
            Droga.findAll(),
            DondeDormi.findAll(),
            TiposAyuda.findAll(),
            TipoPension.findAll(),
            TipoId.findAll(),
            TiempoCalle.findAll(),
            RazonServicio.findAll(),
            Provincia.findAll(),
            Pais.findAll(),
            InstitucionesViolencia.findAll(),
            GradoAcademico.findAll(),
            Genero.findAll(),
            EstadoCivil.findAll(),
            Canton.findAll(),
            TipoViolencia.findAll()
        ]);

        // Enviar la respuesta con los datos
        res.status(200).json({
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

    res.status(200).json(cantonesProvincia); 
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


/*
const TiempoCalle = defineTiempoCalle(db.Sequelize,db.dataType);
const RazonServicio = defineRazonServicio(db.Sequelize,db.dataType);
const Provincia = defineProvincia(db.Sequelize,db.dataType);
const Pais = definePais(db.Sequelize,db.dataType);
const InstitucionesViolencia = defineInstitucionesViolencia(db.Sequelize,db.dataType);
const GradoAcademico = defineGradoAcademico(db.Sequelize,db.dataType);
const Genero = defineGenero(db.Sequelize,db.dataType);
const EstadoCivil = defineEstadoCivil(db.Sequelize,db.dataType);
const TipoViolencia = defineTipoViolencia(db.Sequelize,db.dataType);
*/

export default catalogosCtr;
