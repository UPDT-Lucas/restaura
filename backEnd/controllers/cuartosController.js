import defineCama from "../models/cama.js";
import defineCuarto from "../models/cuarto.js";
import dbConnection from "../DB/dbConnection.js";
import defineTipoCuarto from "../models/tipo_cuarto.js";
import defineTipoCama from "../models/tipo_cama.js";

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


cuartosCtr.getCuartosAndType = async (req, res) => { 
  try {
    const db = dbConnection.getInstance();

    // Obtén la fecha del query param o usa la fecha actual
    const fecha = req.params.fecha || new Date().toISOString().slice(0, 10);

    const [results] = await db.Sequelize.query(
      'SELECT * FROM fn_get_cuartos_con_tipo()'
    );
    console.log(results);
    const [camasEstado] = await db.Sequelize.query(
      'SELECT * FROM fn_obtener_estado_camas_por_cuarto(:fecha)', {
        replacements: { fecha }
      }
    );

    const cuartosConTipo = results.map(row => {
      const estado = camasEstado.find(e => e.cuarto_id === row.id) || {};
      return {
        id: row.id,
        nombre: row.nombre,
        active: row.active,
        tipo_cuarto_id: row.tipo_cuarto_id,
        tipo_cuarto: {
          id: row.tipo_cuarto_id,
          nombre: row.tipo_cuarto_nombre,
          color: row.tipo_cuarto_color
        },
        camas: {
          can_no_usadas: estado.can_no_usadas || 0,
          can_usadas: estado.can_usadas || 0,
          total_camas: estado.total_camas || 0
        }
      };
    });

    res.status(200).json({ message: "Cuartos obtenidos", data: cuartosConTipo, status: 200 });
  } catch (error) {
    console.error('Error al obtener los cuartos:', error);
    res.status(500).json({ message: 'Error al obtener los cuartos', error: error.message, status: 500 });
  }
};



cuartosCtr.getCamasbyId = async (req, res) => { 
    try{
        const db = dbConnection.getInstance();
        const cama   = defineCama(db.Sequelize, db.dataType);
        const camas = await cama.findAll({where: {cuarto_id: req.params.id}});
        
        return res.status(200).json({ message: "Camas encontradas por id obtenidas", data: camas, status: 200 });
    } catch (error) {
        console.error('Error al obtener los cuartos:', error);
        res.status(500).json({ message: 'Error al obtener los cuartos', error: error.message ,status: 500});
    }
}

cuartosCtr.getCamasAndTypebyId = async (req, res) => { 
    try{
        const db = dbConnection.getInstance();
        const cama   = defineCama(db.Sequelize, db.dataType);
        const tipoCama = defineTipoCama(db.Sequelize, db.dataType);

        const camas = await cama.findAll({where: {cuarto_id: req.params.id}});
        const tipoCamas = await tipoCama.findAll();
        const camasConTipo = camas.map(cama => {
            const tipo = tipoCamas.find(t => t.id === cama.tipo_cama_id);
            return {
                ...cama.toJSON(),
                tipo_cama: tipo ? { id: tipo.id, nombre: tipo.nombre, color: tipo.color } : null
            };
        });
        
        return res.status(200).json({ message: "Camas encontradas por id obtenidas", data: camasConTipo, status: 200 });
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