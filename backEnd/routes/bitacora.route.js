import express from 'express';
import bitacoraCtr from '../controllers/bitacoraController.js';


var api = express.Router();

api.get('/bitacora/:bitacora_date', bitacoraCtr.getBitacora);
api.get('/getLastRoom/:id/:idBitacora', bitacoraCtr.getLastRoom);
api.get('/getBitacoraByFecha/:fecha', bitacoraCtr.getBitacoraIdByFecha);
api.post('/clienteSaveBitacora',bitacoraCtr.clienteSaveBitacora);
api.delete('/clienteDeleteBitacora',bitacoraCtr.clienteDeleteBitacora);
api.post('/createBitacora/:bitacora_date',bitacoraCtr.createBitacora)

export default api;