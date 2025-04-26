import express from 'express';
import adminCtr from '../controllers/adminController.js';

var api = express.Router();

api.post('/saveAdmin', adminCtr.saveAsistente);

export default api;