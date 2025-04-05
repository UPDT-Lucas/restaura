import { DataTypes } from "@sequelize/core";

export default function defineTipoId(sequelize) {
  return sequelize.define('tipo_id', {
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
    tableName: 'tipo_id',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "tipo_id_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ],
      },
    ],
  });
}