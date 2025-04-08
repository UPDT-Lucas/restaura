import { DataTypes } from "@sequelize/core";

export default function defineInstituxViolen(sequelize) {
  return sequelize.define('instituxviolen', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    instituciones_violencia_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'instituciones_violencia',
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
    tableName: 'instituxviolen',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "instituxviolen_pkey",
        unique: true,
        fields: [
          { name: "id" },
          { name: "instituciones_violencia_id" },
          { name: "informacion_inamu_id" },
        ],
      },
    ],
  });
}