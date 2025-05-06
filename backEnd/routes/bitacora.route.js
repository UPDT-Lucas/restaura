import express from 'express';
import bitacoraCtr from '../controllers/bitacoraController.js';


var api = express.Router();

api.get('/bitacora/:bitacora_date', bitacoraCtr.getBitacora);
api.get('/getLastRoom/:id', bitacoraCtr.getLastRoom);
api.post('/clienteSaveBitacora',bitacoraCtr.clienteSaveBitacora);
api.delete('/clienteDeleteBitacora',bitacoraCtr.clienteDeleteBitacora);

export default api;