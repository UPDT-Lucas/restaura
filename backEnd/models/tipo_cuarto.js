import { DataTypes } from "@sequelize/core";

export default function defineTipoCuarto(sequelize) {
  return sequelize.define('tipo_cuarto', {
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
    color: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  }, {
    sequelize,
    tableName: 'tipo_cuarto',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "tipo_cuarto_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ],
      },
    ],
  });
}