import express from 'express';
import adminCtr from '../controllers/adminController.js';

var api = express.Router();

api.post('/saveAsistente', adminCtr.saveAsistente);
api.post('/auth',adminCtr.auth);
api.post('/Quering', adminCtr.getConsulta);
api.get("/getBitacora", adminCtr.getBitacora);
api.get("/getMovimientosBitacora/:id", adminCtr.getMovimientosBitacora);

export default api;
