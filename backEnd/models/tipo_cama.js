import { DataTypes } from "@sequelize/core";

export default function defineTipoCama(sequelize) {
  return sequelize.define('tipo_cama', {
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
    tableName: 'tipo_cama',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "tipo_cama_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ],
      },
    ],
  });
}