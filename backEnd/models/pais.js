import { DataTypes } from "@sequelize/core";

export default function definePais(sequelize) {
  return sequelize.define('pais', {
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
    tableName: 'pais',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pais_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ],
      },
    ],
  });
}