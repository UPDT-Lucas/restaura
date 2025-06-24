export interface AllRooms {
    message: string;
    rooms:   Room[];
}

export interface Room {
    id:             number;
    nombre:         string;
    active:         boolean;
    tipo_cuarto_id: number;
    tipo_cuarto:    TipoCuarto;
    camas:          Camas;
}

export interface Camas {
    can_no_usadas: string;
    can_usadas:    string;
    total_camas:   string;
}

export interface TipoCuarto {
    id:     number;
    nombre: string;
    color:  string;
}
