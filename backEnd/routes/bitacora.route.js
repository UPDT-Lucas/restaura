import express from 'express';
import bitacoraCtr from '../controllers/bitacoraController.js';

var api = express.Router();

api.get('/bitacora/:bitacora_date', bitacoraCtr.getBitacora);

export default api;