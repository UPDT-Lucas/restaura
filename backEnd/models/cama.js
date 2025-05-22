import { DataTypes } from "@sequelize/core";

export default function defineCama(sequelize) {
  return sequelize.define('cama', {
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
    tipo_cama_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tipo_cama',
        key: 'id',
      },
    },
    cuarto_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'cuarto',
        key: 'id',
      },
    },
  }, {
    sequelize,
    tableName: 'cama',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "cama_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ],
      },
    ],
  });
}