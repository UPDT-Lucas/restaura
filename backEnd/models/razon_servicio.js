import { DataTypes } from "@sequelize/core";

export default function defineRazonServicio(sequelize) {
  return sequelize.define('razon_servicio', {
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
    tableName: 'razon_servicio',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "razon_servicio_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ],
      },
    ],
  });
}