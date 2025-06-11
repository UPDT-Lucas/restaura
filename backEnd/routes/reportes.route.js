import express from 'express';
import reporteCtr from '../controllers/reportesController.js';

var api = express.Router();
api.put('/reporteGeneral', reporteCtr.reporteGeneral);

export default api;