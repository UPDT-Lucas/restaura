import express from 'express';
import catalogosCtr from '../controllers/catalogosController.js';

var api = express.Router();

api.get('/catalogos', catalogosCtr.getCatalogos);
api.get('/cantones/:p_provincia_id', catalogosCtr.getCantones);
api.post('/addCanton', catalogosCtr.addCanton);
api.delete('/deleteCanton', catalogosCtr.deleteCanton);
api.post('/addDroga', catalogosCtr.addDroga);
api.delete('/deleteDroga', catalogosCtr.deleteDroga);
api.post('/addTiposAyuda', catalogosCtr.addTiposAyuda);
api.delete('/deleteTiposAyuda', catalogosCtr.deleteTiposAyuda);
api.post('/addTipoPension', catalogosCtr.addTipoPension);
api.delete('/deleteTipoPension', catalogosCtr.deleteTipoPension);
api.post('/addTipoId', catalogosCtr.addTipoId);
api.delete('/deleteTipoId', catalogosCtr.deleteTipoId);



export default api;