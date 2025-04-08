import { DataTypes } from "@sequelize/core";

export default function defineAyudaXInamu(sequelize) {
  return sequelize.define('ayudaxinamu', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    tipos_ayuda_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'tipos_ayuda',
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
    tableName: 'ayudaxinamu',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "ayudaxinamu_pkey",
        unique: true,
        fields: [
          { name: "id" },
          { name: "tipos_ayuda_id" },
          { name: "informacion_inamu_id" },
        ],
      },
    ],
  });
}