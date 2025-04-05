import { DataTypes } from "@sequelize/core";

export default function defineTipoViolencia(sequelize) {
  return sequelize.define('tipo_violencia', {
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
    tableName: 'tipo_violencia',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "tipo_violencia_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ],
      },
    ],
  });
}