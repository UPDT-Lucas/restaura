import { DataTypes } from "@sequelize/core";

export default function defineEstadoCivil(sequelize) {
  return sequelize.define('estado_civil', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    sequelize,
    tableName: 'estado_civil',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "estado_civil_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ],
      },
    ],
  });
}