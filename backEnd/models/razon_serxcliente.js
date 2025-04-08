import { DataTypes } from "@sequelize/core";

export default function defineRazonSerXCliente(sequelize) {
  return sequelize.define('razon_serxcliente', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
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
    razon_servicio_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'razon_servicio',
        key: 'id',
      },
    },
  }, {
    sequelize,
    tableName: 'razon_serxcliente',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "razon_serxcliente_pkey",
        unique: true,
        fields: [
          { name: "razon_servicio_id" },
          { name: "cliente_servicio_id" },
          { name: "id" },
        ],
      },
    ],
  });
}