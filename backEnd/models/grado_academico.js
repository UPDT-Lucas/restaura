import { DataTypes } from "@sequelize/core";

export default function defineGradoAcademico(sequelize) {
  return sequelize.define('grado_academico', {
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
    tableName: 'grado_academico',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "grado_academico_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ],
      },
    ],
  });
}