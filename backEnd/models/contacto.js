import { DataTypes } from "@sequelize/core";

export default function defineContacto(sequelize) {
  return sequelize.define('contacto', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    telefono: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    relacion: {
      type: DataTypes.TEXT,
      allowNull: true,
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
    tableName: 'contacto',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "contacto_pkey",
        unique: true,
        fields: [
          { name: "id" },
          { name: "cliente_servicio_id" },
        ],
      },
    ],
  });
}