import { DataTypes } from "@sequelize/core";

export default function defineClienteServicio(sequelize) {
  return sequelize.define('cliente_servicio', {
    id: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    edad: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    fechanacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    nombreentrevistador: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    fechaingreso: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    observacion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    sitrabaja: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    empresa: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    ocupacion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    licencia: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    tipo_licencia: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    tosflemafiebre: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    condicionespecial: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    discapacidad: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    medicacion: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    detallemedicamento: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    cantidadhijos: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    leerescribir: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    nombretecnico: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    consumodrogas: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    edadiniciodrogas: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    numerointernamientos: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    carcel: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    razoncarcel: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    pendienteresolucion: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    edadiniciocarcel: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    droga_principal:{
        type: DataTypes.TEXT,
        allowNull: true,
    }
    ,
    genero_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'genero',
        key: 'id',
      },
    },
    tipo_id_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'tipo_id',
        key: 'id',
      },
    },
    canton_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'canton',
        key: 'id',
      },
    },
    pais_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'pais',
        key: 'id',
      },
    },
    donde_dormi_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'donde_dormi',
        key: 'id',
      },
    },
    tiempo_calle_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'tiempo_calle',
        key: 'id',
      },
    },
    estado_civil_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'estado_civil',
        key: 'id',
      },
    },
  }, {
    sequelize,
    tableName: 'cliente_servicio',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "cliente_servicio_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ],
      },
    ],
  });
}