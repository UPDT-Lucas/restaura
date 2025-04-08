import { DataTypes } from "@sequelize/core";

export default function defineInfo3Meses(sequelize) {
  return sequelize.define('info3meses', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    carcel: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    razon_carcel: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    tratamiento_medico: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    razon_trat: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    tratamiento_psiq: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    razon_psiq: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    tratamiento_drogas: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    razon_drogas: {
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
    tableName: 'info3meses',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "info3meses_pkey",
        unique: true,
        fields: [
          { name: "id" },
          { name: "cliente_servicio_id" },
        ],
      },
    ],
  });
}