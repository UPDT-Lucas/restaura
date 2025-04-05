import { DataTypes } from "@sequelize/core";

export default function defineProvincia(sequelize) {
  return sequelize.define('provincia', {
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
    tableName: 'provincia',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "provincia_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ],
      },
    ],
  });
}