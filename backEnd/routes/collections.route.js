import express from 'express';
import catalogosCtr from '../controllers/catalogosController.js';

var api = express.Router();

api.get('/catalogos', catalogosCtr.getCatalogos);

export default api;