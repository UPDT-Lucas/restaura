import express from 'express';
import cuarto from '../controllers/cuartosController.js';

var api = express.Router();

// GET endpoints
api.get('/cuartos', cuarto.getCuartos);
api.get('/camasbyId/:id', cuarto.getCamasbyId);

//GET especiales enpoints
api.get('/cuartosAndType', cuarto.getCuartosAndType);
api.get('/camasAndTypeById/:id', cuarto.getCamasAndTypebyId);

//POST endpoints
api.post('/addCuarto', cuarto.addCuarto);
api.post('/addCama', cuarto.addCama);

//PUT endpoints
api.put('/editCuarto', cuarto.editCuarto);
api.put('/editCama', cuarto.editCama);
//DELETE endpoints
api.delete('/deleteCuarto/:id', cuarto.deleteCuarto);
api.delete('/deleteCama/:id', cuarto.deleteCama);


export default api;