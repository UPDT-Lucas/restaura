import { DataTypes } from "@sequelize/core";

export default function defineClienteXBitacora(sequelize) {
  return sequelize.define('clientexbitacora', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    bitacora_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'bitacora',
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
    cama_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true,
      references: {
        model: 'cama',
        key: 'id',
      },
    },
  }, {
    sequelize,
    tableName: 'clientexbitacora',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "clientexbitacora_pkey",
        unique: true,
        fields: [
          { name: "id" },
          { name: "bitacora_id" },
          { name: "cliente_servicio_id" }
        ],
      },
    ],
  });
}