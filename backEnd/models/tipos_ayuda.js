import { DataTypes } from "@sequelize/core";

export default function defineTiposAyuda(sequelize) {
  return sequelize.define('tipos_ayuda', {
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
    tableName: 'tipos_ayuda',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "tipos_ayuda_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ],
      },
    ],
  });
}