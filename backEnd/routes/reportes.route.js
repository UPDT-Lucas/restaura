import express from 'express';
import reporteCtr from '../controllers/reportesController.js';

var api = express.Router();
api.get('/reporteGeneral', reporteCtr.reporteGeneral);

export default api;