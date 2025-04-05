import { DataTypes } from "@sequelize/core";

export default function defineTipoPension(sequelize) {
  return sequelize.define('tipo_pension', {
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
    tableName: 'tipo_pension',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "tipo_pension_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ],
      },
    ],
  });
}