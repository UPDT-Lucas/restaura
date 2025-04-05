import { DataTypes } from "@sequelize/core";

export default function defineAcademicoXCliente(sequelize) {
  return sequelize.define('academicoxcliente', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    grado_academico_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'grado_academico',
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
    tableName: 'academicoxcliente',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "academicoxcliente_pkey",
        unique: true,
        fields: [
          { name: "id" },
          { name: "grado_academico_id" },
          { name: "cliente_servicio_id" },
        ],
      },
    ],
  });
}