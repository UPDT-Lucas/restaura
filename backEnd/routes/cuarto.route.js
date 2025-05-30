import express from 'express';
import cuarto from '../controllers/cuartosController.js';

var api = express.Router();

// GET endpoints
api.get('/cuartos', cuarto.getCuartos);
api.get('/camasbyId/:id', cuarto.getCamasbyId);
api.get('/cuarto/:id', cuarto.getCuartoById);
api.get('/cama/:id', cuarto.getCamabyId);

//GET especiales enpoints
api.get('/cuartosAndType/:fecha', cuarto.getCuartosAndType);
api.get('/camasAndTypeById/:id', cuarto.getCamasAndTypebyId);

//POST endpoints
api.post('/addCuarto', cuarto.addCuarto);
api.post('/addCama', cuarto.addCama);

//PUT endpoints
api.put('/editCuarto', cuarto.editCuarto);
api.put('/editCama', cuarto.editCama);
//DELETE endpoints
api.delete('/deleteCuarto', cuarto.deleteCuarto);
api.delete('/deleteCama', cuarto.deleteCama);


export default api;