import express from 'express';
import catalogosCtr from '../controllers/catalogosController.js';

var api = express.Router();

api.get('/catalogos', catalogosCtr.getCatalogos);
api.get('/cantones/:p_provincia_id', catalogosCtr.getCantones);

export default api;