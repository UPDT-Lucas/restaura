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
api.post('/addDondeDormi', catalogosCtr.addDondeDormi);
api.delete('/deleteDondeDormi', catalogosCtr.deleteDondeDormi);
api.post('/addTiempoCalle', catalogosCtr.addTiempoCalle);
api.delete('/deleteTiempoCalle', catalogosCtr.deleteTiempoCalle);
api.post('/addRazonServicio', catalogosCtr.addRazonServicio);
api.delete('/deleteRazonServicio', catalogosCtr.deleteRazonServicio);
api.post('/addProvincia', catalogosCtr.addProvincia);
api.delete('/deleteProvincia', catalogosCtr.deleteProvincia);
api.post('/addPais', catalogosCtr.addPais);
api.delete('/deletePais', catalogosCtr.deletePais);
api.post('/addInstitucionesViolencia', catalogosCtr.addInstitucionesViolencia);
api.delete('/deleteInstitucionesViolencia', catalogosCtr.deleteInstitucionesViolencia);
api.post('/addGradoAcademico', catalogosCtr.addGradoAcademico);
api.delete('/deleteGradoAcademico', catalogosCtr.deleteGradoAcademico);
api.post('/addGenero', catalogosCtr.addGenero);
api.delete('/deleteGenero', catalogosCtr.deleteGenero);
api.post('/addEstadoCivil', catalogosCtr.addEstadoCivil);
api.delete('/deleteEstadoCivil', catalogosCtr.deleteEstadoCivil);
api.post('/addTipoViolencia', catalogosCtr.addTipoViolencia);
api.delete('/deleteTipoViolencia', catalogosCtr.deleteTipoViolencia);

export default api;