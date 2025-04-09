export interface AllInfoClient {
    personal:                Personal;
    info3meses_id:           Info3MesesID;
    contacto:                Contacto;
    inamu:                   Inamu;
    tipos_ayuda:             Gradosacademico[];
    tipos_violencia:         Gradosacademico[];
    instituciones_violencia: Gradosacademico[];
    gradosacademicos:        Gradosacademico[];
    drogas:                  any[];
    pensiones:               Gradosacademico[];
    razon_servicio:          any[];
}

export interface Contacto {
    id:                  number;
    nombre:              string;
    telefono:            string;
    relacion:            string;
    cliente_servicio_id: string;
}

export interface Gradosacademico {
    id:     number;
    nombre: string;
}

export interface Inamu {
    id:                  number;
    jefehogar:           boolean;
    contactofamilia:     boolean;
    apoyoeconomico:      boolean;
    pareja:              boolean;
    parejacentro:        boolean;
    parejano:            null;
    solucionesdetalle:   string;
    cliente_servicio_id: string;
}

export interface Info3MesesID {
    id:                  number;
    carcel:              boolean;
    razon_carcel:        null;
    tratamiento_medico:  boolean;
    razon_trat:          null;
    tratamiento_psiq:    boolean;
    razon_psiq:          null;
    tratamiento_drogas:  boolean;
    razon_drogas:        null;
    cliente_servicio_id: string;
}

export interface Personal {
    id:                   string;
    nombre:               string;
    edad:                 number;
    fechanacimiento:      Date;
    nombreentrevistador:  string;
    fechaingreso:         Date;
    observacion:          null;
    sitrabaja:            boolean;
    empresa:              string;
    ocupacion:            string;
    licencia:             boolean;
    tipo_licencia:        null;
    tosflemafiebre:       boolean;
    condicionespecial:    null;
    discapacidad:         boolean;
    medicacion:           boolean;
    detallemedicamento:   null;
    cantidadhijos:        number;
    leerescribir:         boolean;
    nombretecnico:        string;
    consumodrogas:        boolean;
    edadiniciodrogas:     null;
    numerointernamientos: number;
    carcel:               boolean;
    razoncarcel:          null;
    pendienteresolucion:  boolean;
    edadiniciocarcel:     null;
    genero_id:            number;
    tipo_id_id:           number;
    canton_id:            number;
    pais_id:              number;
    donde_dormi_id:       number;
    tiempo_calle_id:      number;
    estado_civil_id:      null;
    droga_principal:      null;
}
