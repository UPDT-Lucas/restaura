import { DataTypes } from "@sequelize/core";

export default function defineCuarto(sequelize) {
  return sequelize.define('cuarto', {
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
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    tipo_cuarto_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tipo_cuarto',
        key: 'id',
      },
    },
  }, {
    sequelize,
    tableName: 'cuarto',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "cuarto_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ],
      },
    ],
  });
}