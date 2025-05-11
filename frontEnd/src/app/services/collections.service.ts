import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class CollectionsService {
    private apiUrl = 'http://localhost:3100';

    constructor(private http: HttpClient) {}

    /* CATALOGOS */
    getCatalogos(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/catalogos`);
    }

    /* CANTONES */
    addCanton(canton: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/addCanton`, canton);
    }

    editCanton(canton: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/editCanton`, canton);
    }

    deleteCanton(idCanton: any): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/deleteCanton`, {
            body: { idCanton },
        });
    }

    /* DROGAS */
    addDroga(droga: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/addDroga`, droga);
    }

    editDroga(droga: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/editDroga`, droga);
    }

    deleteDroga(idDroga: any): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/deleteDroga`, {
            body: { idDroga },
        });
    }

    /* TIPOS DE AYUDA */
    addTiposAyuda(tiposAyuda: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/addTiposAyuda`, tiposAyuda);
    }

    editTiposAyuda(tiposAyuda: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/editTiposAyuda`, tiposAyuda);
    }

    deleteTiposAyuda(idTiposAyuda: any): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/deleteTiposAyuda`, {
            body: { idTiposAyuda },
        });
    }

    /* TIPO DE PENSIÓN */
    addTipoPension(tipoPension: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/addTipoPension`, tipoPension);
    }

    editTipoPension(tipoPension: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/editTipoPension`, tipoPension);
    }

    deleteTipoPension(idTipoPension: any): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/deleteTipoPension`, {
            body: { idTipoPension },
        });
    }

    /* TIPO DE ID */
    addTipoId(tipoId: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/addTipoId`, tipoId);
    }

    editTipoId(tipoId: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/editTipoId`, tipoId);
    }

    deleteTipoId(idTipoId: any): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/deleteTipoId`, {
            body: { idTipoId },
        });
    }

    /* DONDE DURMIÓ */
    addDondeDormi(dondeDormi: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/addDondeDormi`, dondeDormi);
    }

    editDondeDormi(dondeDormi: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/editDondeDormi`, dondeDormi);
    }

    deleteDondeDormi(idDondeDormi: any): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/deleteDondeDormi`, {
            body: { idDondeDormi },
        });
    }

    /* TIEMPO EN LA CALLE */
    addTiempoCalle(tiempoCalle: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/addTiempoCalle`, tiempoCalle);
    }

    editTiempoCalle(tiempoCalle: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/editTiempoCalle`, tiempoCalle);
    }

    deleteTiempoCalle(idTiempoCalle: any): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/deleteTiempoCalle`, {
            body: { idTiempoCalle },
        });
    }

    /* RAZÓN DE SERVICIO */
    addRazonServicio(razonServicio: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/addRazonServicio`, razonServicio);
    }

    editRazonServicio(razonServicio: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/editRazonServicio`, razonServicio);
    }

    deleteRazonServicio(idRazonServicio: any): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/deleteRazonServicio`, {
            body: { idRazonServicio },
        });
    }

    /* PROVINCIA */
    addProvincia(provincia: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/addProvincia`, provincia);
    }

    editProvincia(provincia: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/editProvincia`, provincia);
    }

    deleteProvincia(idProvincia: any): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/deleteProvincia`, {
            body: { idProvincia },
        });
    }

    /* PAÍS */
    addPais(pais: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/addPais`, pais);
    }

    editPais(pais: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/editPais`, pais);
    }

    deletePais(idPais: any): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/deletePais`, {
            body: { idPais },
        });
    }

    /* INSTITUCIONES DE VIOLENCIA */
    addInstitucionesViolencia(institucion: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/addInstitucionesViolencia`, institucion);
    }

    editInstitucionesViolencia(institucion: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/editInstitucionesViolencia`, institucion);
    }

    deleteInstitucionesViolencia(idInstitucionesViolencia: any): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/deleteInstitucionesViolencia`, {
            body: { idInstitucionesViolencia },
        });
    }

    /* GRADO ACADÉMICO */
    addGradoAcademico(grado: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/addGradoAcademico`, grado);
    }

    editGradoAcademico(grado: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/editGradoAcademico`, grado);
    }

    deleteGradoAcademico(idGradoAcademico: any): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/deleteGradoAcademico`, {
            body: { idGradoAcademico },
        });
    }

    /* GÉNERO */
    addGenero(genero: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/addGenero`, genero);
    }

    editGenero(genero: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/editGenero`, genero);
    }

    deleteGenero(idGenero: any): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/deleteGenero`, {
            body: { idGenero },
        });
    }

    /* ESTADO CIVIL */
    addEstadoCivil(estadoCivil: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/addEstadoCivil`, estadoCivil);
    }

    editEstadoCivil(estadoCivil: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/editEstadoCivil`, estadoCivil);
    }

    deleteEstadoCivil(idEstadoCivil: any): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/deleteEstadoCivil`, {
            body: { idEstadoCivil },
        });
    }

    /* TIPO DE VIOLENCIA */
    addTipoViolencia(tipo: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/addTipoViolencia`, tipo);
    }

    editTipoViolencia(tipo: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/editTipoViolencia`, tipo);
    }

    deleteTipoViolencia(idTipoViolencia: any): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/deleteTipoViolencia`, {
            body: { idTipoViolencia },
        });
    }

}