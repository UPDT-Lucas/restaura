import express from 'express';
import clienteCtr from '../controllers/clienteController.js';

var api = express.Router();

api.post('/saveCliente', clienteCtr.saveCliente);

export default api;