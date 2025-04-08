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
        console.log(db)
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

export default catalogosCtr;
