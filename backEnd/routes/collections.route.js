import express from 'express';
import catalogosCtr from '../controllers/catalogosController.js';

var api = express.Router();

// GET endpoints
api.get('/catalogos', catalogosCtr.getCatalogos);
api.get('/cantones/:p_provincia_id', catalogosCtr.getCantones);
api.get('/getAllDrogas', catalogosCtr.getAllDrogas);
api.get('/getAllDondeDormi', catalogosCtr.getAllDondeDormi);
api.get('/getAllTiposAyuda', catalogosCtr.getAllTiposAyuda);
api.get('/getAllTiposPension', catalogosCtr.getAllTiposPension);
api.get('/getAllTiposId', catalogosCtr.getAllTiposId);
api.get('/getAllTiempoCalle', catalogosCtr.getAllTiempoCalle);
api.get('/getAllRazonServicio', catalogosCtr.getAllRazonServicio);
api.get('/getAllProvincias', catalogosCtr.getAllProvincias);
api.get('/getAllPaises', catalogosCtr.getAllPaises);
api.get('/getAllInstitucionesViolencia', catalogosCtr.getAllInstitucionesViolencia);
api.get('/getAllGradosAcademicos', catalogosCtr.getAllGradosAcademicos);
api.get('/getAllGeneros', catalogosCtr.getAllGeneros);
api.get('/getAllEstadosCiviles', catalogosCtr.getAllEstadosCiviles);
api.get('/getAllTiposViolencia', catalogosCtr.getAllTiposViolencia);

// POST endpoints
api.post('/addDroga', catalogosCtr.addDroga);
api.post('/addDondeDormi', catalogosCtr.addDondeDormi);
api.post('/addTiposAyuda', catalogosCtr.addTiposAyuda);
api.post('/addTipoPension', catalogosCtr.addTipoPension);
api.post('/addTipoId', catalogosCtr.addTipoId);
api.post('/addTiempoCalle', catalogosCtr.addTiempoCalle);
api.post('/addRazonServicio', catalogosCtr.addRazonServicio);
api.post('/addProvincia', catalogosCtr.addProvincia);
api.post('/addPais', catalogosCtr.addPais);
api.post('/addInstitucionesViolencia', catalogosCtr.addInstitucionesViolencia);
api.post('/addGradoAcademico', catalogosCtr.addGradoAcademico);
api.post('/addGenero', catalogosCtr.addGenero);
api.post('/addEstadoCivil', catalogosCtr.addEstadoCivil);
api.post('/addTipoViolencia', catalogosCtr.addTipoViolencia);
api.post('/addCanton', catalogosCtr.addCanton);

// PUT endpoints
api.put('/editDroga', catalogosCtr.editDroga);
api.put('/editDondeDormi', catalogosCtr.editDondeDormi);
api.put('/editTiposAyuda', catalogosCtr.editTiposAyuda);
api.put('/editTipoPension', catalogosCtr.editTipoPension);
api.put('/editTipoId', catalogosCtr.editTipoId);
api.put('/editTiempoCalle', catalogosCtr.editTiempoCalle);
api.put('/editRazonServicio', catalogosCtr.editRazonServicio);
api.put('/editProvincia', catalogosCtr.editProvincia);
api.put('/editPais', catalogosCtr.editPais);
api.put('/editInstitucionesViolencia', catalogosCtr.editInstitucionesViolencia);
api.put('/editGradoAcademico', catalogosCtr.editGradoAcademico);
api.put('/editGenero', catalogosCtr.editGenero);
api.put('/editEstadoCivil', catalogosCtr.editEstadoCivil);
api.put('/editTipoViolencia', catalogosCtr.editTipoViolencia);
api.put('/editCanton', catalogosCtr.editCanton);

// DELETE endpoints
api.delete('/deleteDroga', catalogosCtr.deleteDroga);
api.delete('/deleteDondeDormi', catalogosCtr.deleteDondeDormi);
api.delete('/deleteTiposAyuda', catalogosCtr.deleteTiposAyuda);
api.delete('/deleteTipoPension', catalogosCtr.deleteTipoPension);
api.delete('/deleteTipoId', catalogosCtr.deleteTipoId);
api.delete('/deleteTiempoCalle', catalogosCtr.deleteTiempoCalle);
api.delete('/deleteRazonServicio', catalogosCtr.deleteRazonServicio);
api.delete('/deleteProvincia', catalogosCtr.deleteProvincia);
api.delete('/deletePais', catalogosCtr.deletePais);
api.delete('/deleteInstitucionesViolencia', catalogosCtr.deleteInstitucionesViolencia);
api.delete('/deleteGradoAcademico', catalogosCtr.deleteGradoAcademico);
api.delete('/deleteGenero', catalogosCtr.deleteGenero);
api.delete('/deleteEstadoCivil', catalogosCtr.deleteEstadoCivil);
api.delete('/deleteTipoViolencia', catalogosCtr.deleteTipoViolencia);
api.delete('/deleteCanton', catalogosCtr.deleteCanton);


export default api;