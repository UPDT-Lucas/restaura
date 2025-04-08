import { DataTypes } from "@sequelize/core";

export default function defineViolenciaXInamu(sequelize) {
  return sequelize.define('violenciaxinamu', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    tipo_violencia_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'tipo_violencia',
        key: 'id',
      },
    },
    informacion_inamu_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'informacion_inamu',
        key: 'id',
      },
    },
  }, {
    sequelize,
    tableName: 'violenciaxinamu',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "violenciaxinamu_pkey",
        unique: true,
        fields: [
          { name: "id" },
          { name: "tipo_violencia_id" },
          { name: "informacion_inamu_id" },
        ],
      },
    ],
  });
}