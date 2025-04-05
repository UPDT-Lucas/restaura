import { DataTypes } from "@sequelize/core";

export default function defineTiempoCalle(sequelize) {
  return sequelize.define('tiempo_calle', {
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
    tableName: 'tiempo_calle',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "tiempo_calle_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ],
      },
    ],
  });
}