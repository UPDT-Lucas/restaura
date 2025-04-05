import { DataTypes } from "@sequelize/core";

export default function defineInstitucionesViolencia(sequelize) {
  return sequelize.define('instituciones_violencia', {
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
    tableName: 'instituciones_violencia',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "instituciones_violencia_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ],
      },
    ],
  });
}