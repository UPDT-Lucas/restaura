export interface AllBeds {
    beds:   Bed[];
    status: number;
}

export interface Bed {
    id:           number;
    nombre:       string;
    active:       boolean;
    tipo_cama_id: number;
    ocupado:        boolean;
    cliente_servicio_id: number | null;
    cuarto_id:    number;
    tipo_cama:    TipoCama;
}

export interface TipoCama {
    id:     number;
    nombre: string;
    color:  string;
}
