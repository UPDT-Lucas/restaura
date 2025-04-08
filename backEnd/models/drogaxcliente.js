import { DataTypes } from "@sequelize/core";

export default function defineDrogaXCliente(sequelize) {
  return sequelize.define('drogaxcliente', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    droga_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'droga',
        key: 'id',
      },
    },
    cliente_servicio_id: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'cliente_servicio',
        key: 'id',
      },
    },
    importante: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  }, {
    sequelize,
    tableName: 'drogaxcliente',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "drogaxcliente_pkey",
        unique: true,
        fields: [
          { name: "id" },
          { name: "droga_id" },
          { name: "cliente_servicio_id" },
        ],
      },
    ],
  });
}