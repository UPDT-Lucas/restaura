import { DataTypes } from "@sequelize/core";

export default function defineDondeDormi(sequelize) {
  return sequelize.define('donde_dormi', {
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
    tableName: 'donde_dormi',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "donde_dormi_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ],
      },
    ],
  });
}