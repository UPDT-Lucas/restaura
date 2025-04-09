export interface ClienteServicio {
    id:                   string;
    nombre:               string;
    edad:                 number | null;
    fechanacimiento:      Date | null;
    nombreentrevistador:  string;
    fechaingreso:         Date;
    observacion:          string | null;
    sitrabaja:            boolean | null;
    empresa:              string | null;
    ocupacion:            string | null;
    licencia:             boolean | null;
    tipo_licencia:        string | null; 
    tosflemafiebre:       boolean | null;
    condicionespecial:    string | null;
    discapacidad:         boolean | null;
    medicacion:           boolean | null;
    detallemedicamento:   string | null;
    cantidadhijos:        number | null;
    leerescribir:         boolean | null;
    nombretecnico:        string | null;
    consumodrogas:        boolean | null;
    edadiniciodrogas:     number | null;
    numerointernamientos: number | null;
    carcel:               boolean | null;
    razoncarcel:          string | null;
    pendienteresolucion:  boolean | null;
    edadiniciocarcel:     number | null;
    genero_id:            number | null;
    tipo_id_id:           number | null;
    provincia_id:         number | null;
    pais_id:              number | null;
    donde_dormi_id:       number | null;
    tiempo_calle_id:      number | null;
    estado_civil_id:      number | null;
  }
  