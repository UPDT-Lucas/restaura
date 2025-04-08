import { DataTypes } from "@sequelize/core";

export default function definePensionXCliente(sequelize) {
  return sequelize.define('pensionxcliente', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    tipo_pension_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'tipo_pension',
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
  }, {
    sequelize,
    tableName: 'pensionxcliente',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pensionxcliente_pkey",
        unique: true,
        fields: [
          { name: "id" },
          { name: "tipo_pension_id" },
          { name: "cliente_servicio_id" },
        ],
      },
    ],
  });
}