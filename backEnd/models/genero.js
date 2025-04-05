import { DataTypes } from "@sequelize/core";

export default function defineGenero(sequelize) {
  return sequelize.define('genero', {
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
    tableName: 'genero',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "genero_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ],
      },
    ],
  });
}