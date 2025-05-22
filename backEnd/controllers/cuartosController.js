import defineCama from "../models/cama.js";
import defineCuarto from "../models/cuarto.js";
import dbConnection from "../DB/dbConnection.js";

const cuartosCtr = {};
// GET endpoints
cuartosCtr.getCuartos = async (req, res) => { 
    try {
        const db = dbConnection.getInstance();
        const cuarto = defineCuarto(db.Sequelize, db.dataType);
        const cuartos = await cuarto.findAll();
        
        return res.status(200).json({ message: "Cuartos obtenidos", data: cuartos, status: 200 });
    } catch (error) {
        console.error('Error al obtener los cuartos:', error);
        res.status(500).json({ message: 'Error al obtener los cuartos', error: error.message,status: 500});
    }
}

cuartosCtr.getCamasbyId = async (req, res) => { 
    try{
        const db = dbConnection.getInstance();
        const cama = defineCama(db.Sequelize, db.dataType);
        const camas = await cama.findAll({where: {cuarto_id: req.params.id}});
        
        return res.status(200).json({ message: "Camas encontradas por id obtenidas", data: camas, status: 200 });
    } catch (error) {
        console.error('Error al obtener los cuartos:', error);
        res.status(500).json({ message: 'Error al obtener los cuartos', error: error.message ,status: 500});
    }
}
// POST endpoints
cuartosCtr.addCuarto = async (req, res) => { 
    try {
        const data = req.body;
        const db = dbConnection.getInstance();
        const cuarto = defineCuarto(db.Sequelize, db.dataType);

        const nuevoCuarto = await cuarto.create(data);
        
        return res.status(200).json({ message: "Cuarto creado", data: nuevoCuarto, status: 200 });
    } catch (error) {
        console.error('Error al obtener los cuartos:', error);
        res.status(500).json({ message: 'Error al obtener los cuartos', error: error.message,status: 500});
    }
}

cuartosCtr.addCama = async (req, res) => { 
    try {
        const data = req.body;
        const db = dbConnection.getInstance();
        const cama = defineCama(db.Sequelize, db.dataType);
        const camas = await cama.create(data);
        
        return res.status(200).json({ message: "Cama creada", data: camas, status: 200 });
    } catch (error) {
        console.error('Error al crear cama:', error);
        res.status(500).json({ message: 'Error al crear cama', error: error.message,status: 500});
    }
}
// Delete endpoints
cuartosCtr.deleteCuarto = async (req, res) => { 
    try {
        const db = dbConnection.getInstance();
        const cuarto = defineCuarto(db.Sequelize, db.dataType);
        const id = req.body.id;
        const cuartoEliminado = await cuarto.destroy({ where: { id: id } });
        
        return res.status(200).json({ message: "Cuarto eliminado", data: cuartoEliminado, status: 200 });
    } catch (error) {
        console.error('Error al eliminar el cuarto:', error);
        res.status(500).json({ message: 'Error al eliminar el cuarto', error: error.message,status: 500});
    }
}
cuartosCtr.deleteCama = async (req, res) => { 
    try {
        const db = dbConnection.getInstance();
        const cama = defineCama(db.Sequelize, db.dataType);
        const id = req.body.id;
        const camaEliminada = await cama.destroy({ where: { id: id } });
        
        return res.status(200).json({ message: "Cama eliminada", data: camaEliminada, status: 200 });
    } catch (error) {
        console.error('Error al eliminar la cama:', error);
        res.status(500).json({ message: 'Error al eliminar la cama', error: error.message,status: 500});
    }
}
// PUT endpoints
cuartosCtr.editCuarto = async (req, res) => { 
    try {
        const data = req.body;
        const db = dbConnection.getInstance();
        const cuarto = defineCuarto(db.Sequelize, db.dataType);
        const id = req.body.id;
        const cuartoEditado = await cuarto.update(data, { where: { id: id } });
        
        return res.status(200).json({ message: "Cuarto editado", data: cuartoEditado, status: 200 });
    } catch (error) {
        console.error('Error al editar el cuarto:', error);
        res.status(500).json({ message: 'Error al editar el cuarto', error: error.message,status: 500});
    }
}
cuartosCtr.editCama = async (req, res) => { 
    try {
        const data = req.body;
        const db = dbConnection.getInstance();
        const cama = defineCama(db.Sequelize, db.dataType);
        const id = req.body.id;
        const camaEditada = await cama.update(data, { where: { id: id } });
        
        return res.status(200).json({ message: "Cama editada", data: camaEditada, status: 200 });
    } catch (error) {
        console.error('Error al editar la cama:', error);
        res.status(500).json({ message: 'Error al editar la cama', error: error.message,status: 500});
    }
}
export default cuartosCtr;