import express from 'express';
import clienteCtr from '../controllers/clienteController.js';

var api = express.Router();

api.get('/clients/:p_id/:p_nombre', clienteCtr.getCliente);
api.get('/getClienteAll/:id', clienteCtr.getClienteAll);
api.post('/saveCliente', clienteCtr.saveCliente);
api.delete('/deleteCliente', clienteCtr.deleteCliente);

export default api;