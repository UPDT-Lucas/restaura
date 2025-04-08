import { DataTypes } from "@sequelize/core";

export default function defineInformacionInamu(sequelize) {
  return sequelize.define('informacion_inamu', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: "informacion_inamu_id_key",
    },
    jefehogar: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    contactofamilia: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    apoyoeconomico: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    pareja: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    parejacentro: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    parejano: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    solucionesdetalle: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    cliente_servicio_id: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'cliente_servicio',
        key: 'id',
      },
    },
  }, {
    sequelize,
    tableName: 'informacion_inamu',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "informacion_inamu_id_key",
        unique: true,
        fields: [
          { name: "id" },
        ],
      },
      {
        name: "informacion_inamu_pkey",
        unique: true,
        fields: [
          { name: "id" },
          { name: "cliente_servicio_id" },
        ],
      },
    ],
  });
}