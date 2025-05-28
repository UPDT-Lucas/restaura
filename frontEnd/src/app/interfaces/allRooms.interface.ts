export interface AllRooms {
    rooms:  Room[];
    status: number;
}

export interface Room {
    id:             number;
    nombre:         string;
    active:         boolean;
    tipo_cuarto_id: number;
    tipo_cuarto:    TipoCuarto;
}

export interface TipoCuarto {
    id:     number;
    nombre: string;
    color:  string;
}