import express from 'express';
import adminCtr from '../controllers/adminController.js';

var api = express.Router();

api.post('/saveAsistente', adminCtr.saveAsistente);
api.get('/auth',adminCtr.auth);
api.post('/Quering',adminCtr.getConsulta);

export default api;
