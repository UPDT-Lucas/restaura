import express from 'express';
import clienteCtr from '../controllers/clienteController.js';

var api = express.Router();

api.get('/clients', clienteCtr.getClientService);
api.get('/clientsById', clienteCtr.getClientsById);
api.get('/clientsByName', clienteCtr.getClientsByName);

api.get('/getClienteAll/:id', clienteCtr.getClienteAll);
api.put('/updateCliente', clienteCtr.updateCliente);
api.post('/saveCliente', clienteCtr.saveCliente);
api.delete('/deleteCliente', clienteCtr.deleteCliente);
api.get('/getClienteExist/:id', clienteCtr.getClienteExist);
api.get('/getClientCount', clienteCtr.getClientCount);
api.get('/getClientCountByName/:name', clienteCtr.getClientCountByName);
api.get('/getClientCountById/:id', clienteCtr.getClientCountById);
 
export default api;