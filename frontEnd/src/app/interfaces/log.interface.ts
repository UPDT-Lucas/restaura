export interface Log {
    Client: Client[];
    status: number;
}

export interface Client {
    id: string;
    nombre: string;
    edad: number;
    fechaingreso: Date;
    cuarto: string;
    cama: string;
}
